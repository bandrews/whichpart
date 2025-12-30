import { useState, useMemo } from 'preact/hooks';
import { TierLegend } from '../components/TierLegend.jsx';
import { JlcLink } from '../components/JlcLink.jsx';
import { useTierFilter } from '../context/TierFilter.jsx';

// Import parts index with full metadata
import partsIndex from '../data/parts-index.json';
import friendlyDescriptions from '../data/friendly-descriptions.json';
import imgDiode from '../assets/diode.png';

// Diode categories to include
const DIODE_CATEGORIES = [
	'Schottky Diodes',
	'Diodes - General Purpose',
	'Zener Diodes',
	'ESD and Surge Protection (TVS/ESD)',
	'Switching Diodes',
	'Fast Recovery / High Efficiency Diodes',
];

const DIODE_TYPE_MAP = {
	'Schottky Diodes': 'Schottky',
	'Diodes - General Purpose': 'General Purpose',
	'Zener Diodes': 'Zener',
	'ESD and Surge Protection (TVS/ESD)': 'TVS/ESD',
	'Switching Diodes': 'Switching',
	'Fast Recovery / High Efficiency Diodes': 'Fast Recovery',
};

/**
 * Extract key specs from attributes
 */
function extractSpecs(attrs) {
	if (!attrs) return {};

	return {
		vr: attrs['Voltage - DC Reverse(Vr)'] || attrs['Zener Voltage'] || attrs['Reverse Stand-Off Voltage(Vrwm)'],
		vf: attrs['Voltage - Forward(Vf@If)'],
		current: attrs['Current - Rectified'] || attrs['Current Rating'],
		power: attrs['Power - Max'],
		channels: attrs['Number of Channels'],
		config: attrs['Diode Configuration'],
	};
}

/**
 * Parse voltage string for sorting (e.g., "40V" -> 40)
 */
function parseVoltage(str) {
	if (!str) return 0;
	const match = str.match(/(\d+(?:\.\d+)?)\s*V/i);
	return match ? parseFloat(match[1]) : 0;
}

/**
 * Parse current string for sorting (e.g., "1A" -> 1)
 */
function parseCurrent(str) {
	if (!str) return 0;
	const match = str.match(/(\d+(?:\.\d+)?)\s*(m)?A/i);
	if (!match) return 0;
	let val = parseFloat(match[1]);
	if (match[2] === 'm') val /= 1000;
	return val;
}

export function Diodes() {
	const [searchTerm, setSearchTerm] = useState('');
	const [typeFilter, setTypeFilter] = useState('All');
	const [sortBy, setSortBy] = useState('type');
	const { showPreferred } = useTierFilter();

	// Get all diodes from parts index
	const allDiodes = useMemo(() => {
		const diodes = [];

		for (const [partNumber, info] of Object.entries(partsIndex)) {
			if (!DIODE_CATEGORIES.includes(info.cat)) continue;

			const specs = extractSpecs(info.attrs);
			const type = DIODE_TYPE_MAP[info.cat] || info.cat;

			diodes.push({
				partNumber,
				mpn: info.mpn,
				mfr: info.mfr,
				type,
				category: info.cat,
				pkg: info.pkg,
				desc: info.desc,
				tier: info.tier,
				specs,
				vr: parseVoltage(specs.vr),
				current: parseCurrent(specs.current),
			});
		}

		return diodes;
	}, []);

	// Get unique types for filter
	const types = useMemo(() => {
		const t = new Set(['All']);
		allDiodes.forEach(d => t.add(d.type));
		return Array.from(t);
	}, [allDiodes]);

	// Filter and sort diodes
	const filteredDiodes = useMemo(() => {
		let diodes = allDiodes;

		// Filter by tier
		if (!showPreferred) {
			diodes = diodes.filter(d => d.tier === 'basic');
		}

		// Filter by type
		if (typeFilter !== 'All') {
			diodes = diodes.filter(d => d.type === typeFilter);
		}

		// Filter by search term
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			diodes = diodes.filter(d =>
				d.partNumber.toLowerCase().includes(term) ||
				d.mpn?.toLowerCase().includes(term) ||
				d.mfr?.toLowerCase().includes(term) ||
				d.desc?.toLowerCase().includes(term) ||
				d.pkg?.toLowerCase().includes(term)
			);
		}

		// Sort
		switch (sortBy) {
			case 'voltage':
				diodes = [...diodes].sort((a, b) => a.vr - b.vr);
				break;
			case 'current':
				diodes = [...diodes].sort((a, b) => b.current - a.current);
				break;
			case 'package':
				diodes = [...diodes].sort((a, b) => (a.pkg || '').localeCompare(b.pkg || ''));
				break;
			case 'type':
			default:
				diodes = [...diodes].sort((a, b) => {
					if (a.type !== b.type) return a.type.localeCompare(b.type);
					return a.vr - b.vr;
				});
				break;
		}

		return diodes;
	}, [allDiodes, typeFilter, searchTerm, sortBy, showPreferred]);

	// Group by type for display (only when sorting by type)
	const groupedDiodes = useMemo(() => {
		if (sortBy !== 'type') return null;

		const groups = {};
		for (const diode of filteredDiodes) {
			if (!groups[diode.type]) groups[diode.type] = [];
			groups[diode.type].push(diode);
		}
		return groups;
	}, [filteredDiodes, sortBy]);

	const totalCount = allDiodes.length;

	return (
		<div>
			<div class="page-header">
				<img src={imgDiode} alt="" class="page-header-image" />
				<div class="page-header-text">
					<h1 class="page-title">Diodes</h1>
					<p class="page-subtitle">
						{totalCount} diodes available as JLCPCB basic parts.
						Search and filter to find the right diode for your application.
					</p>
				</div>
			</div>

			<TierLegend />

			<div class="filter-bar" style={{ flexWrap: 'wrap' }}>
				<div class="filter-group" style={{ flex: 1, minWidth: '200px' }}>
					<label htmlFor="search">Search</label>
					<input
						id="search"
						type="text"
						placeholder="Search by part, package, specs..."
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
							maxWidth: '300px',
						}}
					/>
				</div>
				<div class="filter-group">
					<label htmlFor="type">Type</label>
					<select
						id="type"
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
					>
						{types.map(t => (
							<option key={t} value={t}>{t}</option>
						))}
					</select>
				</div>
				<div class="filter-group">
					<label htmlFor="sort">Sort By</label>
					<select
						id="sort"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="type">Type</option>
						<option value="voltage">Voltage (Low to High)</option>
						<option value="current">Current (High to Low)</option>
						<option value="package">Package</option>
					</select>
				</div>
			</div>

			<p style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
				Showing {filteredDiodes.length} of {totalCount} diodes
			</p>

			{groupedDiodes ? (
				// Grouped by type display
				Object.entries(groupedDiodes).map(([type, diodes]) => (
					<div key={type} style={{ marginBottom: 'var(--spacing-xl)' }}>
						<h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
							{type}
							<span style={{ fontSize: '0.875rem', fontWeight: 400, marginLeft: '8px', color: 'var(--text-muted)' }}>
								({diodes.length})
							</span>
						</h2>
						<DiodeTable diodes={diodes} />
					</div>
				))
			) : (
				// Flat list display
				<DiodeTable diodes={filteredDiodes} />
			)}

			{filteredDiodes.length === 0 && (
				<p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
					No diodes found matching your criteria.
				</p>
			)}

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data scraped from JLCPCB basic parts. Always verify specifications before ordering.
			</p>
		</div>
	);
}

function DiodeTable({ diodes }) {
	return (
		<div class="component-grid-container">
			<table class="component-grid diode-table">
				<thead>
					<tr>
						<th>Part</th>
						<th>Description</th>
						<th>Voltage</th>
						<th>Current</th>
						<th>Package</th>
					</tr>
				</thead>
				<tbody>
					{diodes.map(diode => (
						<tr key={diode.partNumber}>
							<td>
								<JlcLink
									part={diode.partNumber}
									tier={diode.tier}
									info={friendlyDescriptions[diode.partNumber] || `${diode.type} - ${diode.mpn}`}
									description={diode.desc}
								/>
							</td>
							<td style={{ maxWidth: '250px' }}>
								{friendlyDescriptions[diode.partNumber] && (
									<div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '2px' }}>
										{friendlyDescriptions[diode.partNumber]}
									</div>
								)}
								<div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
									{diode.mpn}
									{diode.mfr && ` • ${diode.mfr}`}
								</div>
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{diode.specs.vr || '-'}
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{diode.specs.current || '-'}
							</td>
							<td>{diode.pkg}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
