import { useState, useMemo } from 'preact/hooks';
import { TierLegend } from '../components/TierLegend.jsx';
import { JlcLink } from '../components/JlcLink.jsx';
import { useTierFilter } from '../context/TierFilter.jsx';

// Import parts index and friendly descriptions
import partsIndex from '../data/parts-index.json';
import friendlyDescriptions from '../data/friendly-descriptions.json';

// Import data sources to identify categorized parts
import resistorData from '../data/resistors.json';
import capacitorData from '../data/ceramic-capacitors.json';
import electrolyticData from '../data/electrolytic-capacitors.json';
import diodeData from '../data/diodes.json';

// Categories shown on other pages (Diodes, Transistors)
const DIODE_CATEGORIES = [
	'Schottky Diodes',
	'Diodes - General Purpose',
	'Zener Diodes',
	'ESD and Surge Protection (TVS/ESD)',
	'Switching Diodes',
	'Fast Recovery / High Efficiency Diodes',
];

const TRANSISTOR_CATEGORIES = [
	'Bipolar (BJT)',
	'MOSFETs',
	'Darlington Transistor Arrays',
];

/**
 * Get all part numbers from a data source
 */
function getPartNumbers(data, columns) {
	const parts = new Set();
	for (const entry of Object.values(data.data || {})) {
		for (const col of columns) {
			if (entry[col]?.part) {
				parts.add(entry[col].part);
			}
		}
	}
	return parts;
}

/**
 * Get all part numbers from diodes (including non-column packages)
 */
function getDiodePartNumbers(data) {
	const parts = new Set();
	for (const entry of Object.values(data.data || {})) {
		for (const [key, value] of Object.entries(entry)) {
			if (value?.part) {
				parts.add(value.part);
			}
		}
	}
	return parts;
}


export function AllBasicParts() {
	const [searchTerm, setSearchTerm] = useState('');
	const [includeShown, setIncludeShown] = useState(false);
	const [categoryFilter, setCategoryFilter] = useState('All');
	const { showPreferred } = useTierFilter();

	// Collect part numbers already shown on other pages (not including Our Picks)
	const shownParts = useMemo(() => {
		const shown = new Set();
		// Resistors and capacitors from JSON data
		getPartNumbers(resistorData, ['0402', '0603', '0805', '1206']).forEach(p => shown.add(p));
		getPartNumbers(capacitorData, ['0402', '0603', '0805', '1206']).forEach(p => shown.add(p));
		getPartNumbers(electrolyticData, electrolyticData.meta?.columns || []).forEach(p => shown.add(p));
		getDiodePartNumbers(diodeData).forEach(p => shown.add(p));

		// Diodes and transistors are shown by category from parts-index
		for (const [partNumber, info] of Object.entries(partsIndex)) {
			if (DIODE_CATEGORIES.includes(info.cat) || TRANSISTOR_CATEGORIES.includes(info.cat)) {
				shown.add(partNumber);
			}
		}
		return shown;
	}, []);

	// Get all categories from parts index
	const categories = useMemo(() => {
		const cats = new Set(['All']);
		for (const part of Object.values(partsIndex)) {
			if (part.cat) cats.add(part.cat);
		}
		return Array.from(cats).sort();
	}, []);

	// Filter and prepare parts list
	const filteredParts = useMemo(() => {
		const parts = [];

		for (const [partNumber, info] of Object.entries(partsIndex)) {
			// Filter by tier
			if (!showPreferred && info.tier === 'preferred') continue;

			// Filter by "already shown" status
			if (!includeShown && shownParts.has(partNumber)) continue;

			// Filter by category
			if (categoryFilter !== 'All' && info.cat !== categoryFilter) continue;

			// Filter by search term
			if (searchTerm) {
				const term = searchTerm.toLowerCase();
				const matches =
					partNumber.toLowerCase().includes(term) ||
					info.mpn?.toLowerCase().includes(term) ||
					info.mfr?.toLowerCase().includes(term) ||
					info.cat?.toLowerCase().includes(term) ||
					info.desc?.toLowerCase().includes(term);
				if (!matches) continue;
			}

			parts.push({
				partNumber,
				...info,
				isShown: shownParts.has(partNumber),
			});
		}

		// Sort by category, then by part number
		return parts.sort((a, b) => {
			if (a.cat !== b.cat) return (a.cat || '').localeCompare(b.cat || '');
			return a.partNumber.localeCompare(b.partNumber);
		});
	}, [searchTerm, includeShown, categoryFilter, showPreferred, shownParts]);

	// Group by category for display
	const groupedParts = useMemo(() => {
		const groups = {};
		for (const part of filteredParts) {
			const cat = part.cat || 'Uncategorized';
			if (!groups[cat]) groups[cat] = [];
			groups[cat].push(part);
		}
		return groups;
	}, [filteredParts]);

	const totalParts = Object.keys(partsIndex).length;
	const uncategorizedCount = totalParts - shownParts.size;

	return (
		<div>
			<h1 class="page-title">All Basic Parts</h1>
			<p class="page-subtitle">
				Browse all {totalParts} basic and promotional extended parts from JLCPCB.
				{!includeShown && ` Showing ${filteredParts.length} parts not shown on other pages.`}
			</p>

			<TierLegend />

			<div class="filter-bar">
				<div class="filter-group" style={{ flex: 1 }}>
					<label htmlFor="search">Search</label>
					<input
						id="search"
						type="text"
						placeholder="Search by part number, name, or description..."
						value={searchTerm}
						onInput={(e) => setSearchTerm(e.target.value)}
						style={{
							padding: 'var(--spacing-xs) var(--spacing-sm)',
							border: '1px solid var(--border)',
							borderRadius: 'var(--radius-sm)',
							backgroundColor: 'var(--bg-primary)',
							color: 'var(--text-primary)',
							fontSize: '0.875rem',
							width: '100%',
							maxWidth: '400px',
						}}
					/>
				</div>
				<div class="filter-group">
					<label htmlFor="category">Category</label>
					<select
						id="category"
						value={categoryFilter}
						onChange={(e) => setCategoryFilter(e.target.value)}
					>
						{categories.map(cat => (
							<option key={cat} value={cat}>{cat}</option>
						))}
					</select>
				</div>
				<div class="tier-toggle">
					<label class="tier-toggle-label">
						<input
							type="checkbox"
							checked={includeShown}
							onChange={(e) => setIncludeShown(e.target.checked)}
						/>
						<span class="tier-toggle-text">
							Include parts shown on other pages
						</span>
					</label>
				</div>
			</div>

			{Object.entries(groupedParts).map(([category, parts]) => (
				<div key={category} style={{ marginBottom: 'var(--spacing-xl)' }}>
					<h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
						{category}
						<span style={{ fontSize: '0.875rem', fontWeight: 400, marginLeft: '8px', color: 'var(--text-muted)' }}>
							({parts.length})
						</span>
					</h2>
					<div class="component-grid-container">
						<table class="component-grid">
							<thead>
								<tr>
									<th>Part</th>
									<th>Manufacturer Part</th>
									<th>Package</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{parts.map(part => (
									<tr key={part.partNumber} style={part.isShown ? { opacity: 0.6 } : {}}>
										<td>
											<JlcLink
												part={part.partNumber}
												tier={part.tier}
												info={part.mpn}
												description={part.desc}
											/>
										</td>
										<td>
											<strong>{part.mpn}</strong>
											{part.mfr && (
												<div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
													{part.mfr}
												</div>
											)}
										</td>
										<td>{part.pkg}</td>
										<td style={{ maxWidth: '300px' }}>
											{friendlyDescriptions[part.partNumber] && (
												<div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '2px' }}>
													{friendlyDescriptions[part.partNumber]}
												</div>
											)}
											<div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
												{part.desc?.length > 80 ? part.desc.substring(0, 80) + '...' : part.desc}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}

			{filteredParts.length === 0 && (
				<p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
					No parts found matching your criteria.
				</p>
			)}
		</div>
	);
}
