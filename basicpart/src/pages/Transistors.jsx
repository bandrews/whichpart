import { useState, useMemo } from 'preact/hooks';
import { TierLegend } from '../components/TierLegend.jsx';
import { JlcLink } from '../components/JlcLink.jsx';
import { useTierFilter } from '../context/TierFilter.jsx';

// Import parts index with full metadata
import partsIndex from '../data/parts-index.json';

// Transistor categories to include
const TRANSISTOR_CATEGORIES = [
	'Bipolar (BJT)',
	'MOSFETs',
	'Darlington Transistor Arrays',
];

const TRANSISTOR_TYPE_MAP = {
	'Bipolar (BJT)': 'BJT',
	'MOSFETs': 'MOSFET',
	'Darlington Transistor Arrays': 'Darlington',
};

/**
 * Extract key specs from attributes
 */
function extractSpecs(attrs, category) {
	if (!attrs) return {};

	if (category === 'MOSFETs') {
		return {
			vds: attrs['Drain-Source Voltage(Vds)'] || attrs['Drain Source Voltage (Vdss)'],
			id: attrs['Continuous Drain Current(Id)'] || attrs['Drain Current (Id)'],
			rds: attrs['Rds On (Typ)'] || attrs['Drain-Source On Resistance'],
			vgs: attrs['Gate-Source Voltage(Vgs)'] || attrs['Gate Threshold Voltage'],
			polarity: extractPolarity(attrs),
		};
	}

	// BJT
	return {
		vceo: attrs['Collector-Emitter Breakdown Voltage'] || attrs['Collector Emitter Voltage(Vceo)'],
		ic: attrs['Collector Current'] || attrs['Collector Current(Ic)'],
		hfe: attrs['Current Gain(hFE)'] || attrs['DC Current Gain(hFE@Ic,Vce)'],
		polarity: extractBJTPolarity(attrs),
	};
}

/**
 * Extract MOSFET polarity (N-Channel, P-Channel)
 */
function extractPolarity(attrs) {
	const type = attrs['Type'] || attrs['FET Type'] || '';
	if (type.includes('N-Channel') || type.includes('N Channel')) return 'N-Ch';
	if (type.includes('P-Channel') || type.includes('P Channel')) return 'P-Ch';
	return '';
}

/**
 * Extract BJT polarity (NPN, PNP)
 */
function extractBJTPolarity(attrs) {
	const type = attrs['Transistor Type'] || attrs['Type'] || '';
	if (type.includes('NPN')) return 'NPN';
	if (type.includes('PNP')) return 'PNP';
	return '';
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

export function Transistors() {
	const [searchTerm, setSearchTerm] = useState('');
	const [typeFilter, setTypeFilter] = useState('All');
	const [polarityFilter, setPolarityFilter] = useState('All');
	const [sortBy, setSortBy] = useState('type');
	const { showPreferred } = useTierFilter();

	// Get all transistors from parts index
	const allTransistors = useMemo(() => {
		const transistors = [];

		for (const [partNumber, info] of Object.entries(partsIndex)) {
			if (!TRANSISTOR_CATEGORIES.includes(info.cat)) continue;

			const specs = extractSpecs(info.attrs, info.cat);
			const type = TRANSISTOR_TYPE_MAP[info.cat] || info.cat;

			transistors.push({
				partNumber,
				mpn: info.mpn,
				mfr: info.mfr,
				type,
				category: info.cat,
				pkg: info.pkg,
				desc: info.desc,
				tier: info.tier,
				specs,
				// For sorting
				voltage: parseVoltage(specs.vds || specs.vceo),
				current: parseCurrent(specs.id || specs.ic),
				polarity: specs.polarity,
			});
		}

		return transistors;
	}, []);

	// Get unique types and polarities for filters
	const types = useMemo(() => {
		const t = new Set(['All']);
		allTransistors.forEach(tr => t.add(tr.type));
		return Array.from(t);
	}, [allTransistors]);

	const polarities = useMemo(() => {
		const p = new Set(['All']);
		allTransistors.forEach(tr => {
			if (tr.polarity) p.add(tr.polarity);
		});
		return Array.from(p);
	}, [allTransistors]);

	// Filter and sort transistors
	const filteredTransistors = useMemo(() => {
		let transistors = allTransistors;

		// Filter by tier
		if (!showPreferred) {
			transistors = transistors.filter(tr => tr.tier === 'basic');
		}

		// Filter by type
		if (typeFilter !== 'All') {
			transistors = transistors.filter(tr => tr.type === typeFilter);
		}

		// Filter by polarity
		if (polarityFilter !== 'All') {
			transistors = transistors.filter(tr => tr.polarity === polarityFilter);
		}

		// Filter by search term
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			transistors = transistors.filter(tr =>
				tr.partNumber.toLowerCase().includes(term) ||
				tr.mpn?.toLowerCase().includes(term) ||
				tr.mfr?.toLowerCase().includes(term) ||
				tr.desc?.toLowerCase().includes(term) ||
				tr.pkg?.toLowerCase().includes(term)
			);
		}

		// Sort
		switch (sortBy) {
			case 'voltage':
				transistors = [...transistors].sort((a, b) => a.voltage - b.voltage);
				break;
			case 'current':
				transistors = [...transistors].sort((a, b) => b.current - a.current);
				break;
			case 'package':
				transistors = [...transistors].sort((a, b) => (a.pkg || '').localeCompare(b.pkg || ''));
				break;
			case 'type':
			default:
				transistors = [...transistors].sort((a, b) => {
					if (a.type !== b.type) return a.type.localeCompare(b.type);
					if (a.polarity !== b.polarity) return (a.polarity || '').localeCompare(b.polarity || '');
					return a.voltage - b.voltage;
				});
				break;
		}

		return transistors;
	}, [allTransistors, typeFilter, polarityFilter, searchTerm, sortBy, showPreferred]);

	// Group by type for display (only when sorting by type)
	const groupedTransistors = useMemo(() => {
		if (sortBy !== 'type') return null;

		const groups = {};
		for (const tr of filteredTransistors) {
			if (!groups[tr.type]) groups[tr.type] = [];
			groups[tr.type].push(tr);
		}
		return groups;
	}, [filteredTransistors, sortBy]);

	const totalCount = allTransistors.length;

	return (
		<div>
			<h1 class="page-title">Transistors</h1>
			<p class="page-subtitle">
				{totalCount} transistors available as JLCPCB basic parts.
				Includes BJTs, MOSFETs, and Darlington arrays.
			</p>

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
					<label htmlFor="polarity">Polarity</label>
					<select
						id="polarity"
						value={polarityFilter}
						onChange={(e) => setPolarityFilter(e.target.value)}
					>
						{polarities.map(p => (
							<option key={p} value={p}>{p}</option>
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
				Showing {filteredTransistors.length} of {totalCount} transistors
			</p>

			{groupedTransistors ? (
				// Grouped by type display
				Object.entries(groupedTransistors).map(([type, transistors]) => (
					<div key={type} style={{ marginBottom: 'var(--spacing-xl)' }}>
						<h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>
							{type}
							<span style={{ fontSize: '0.875rem', fontWeight: 400, marginLeft: '8px', color: 'var(--text-muted)' }}>
								({transistors.length})
							</span>
						</h2>
						<TransistorTable transistors={transistors} type={type} />
					</div>
				))
			) : (
				// Flat list display
				<TransistorTable transistors={filteredTransistors} />
			)}

			{filteredTransistors.length === 0 && (
				<p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
					No transistors found matching your criteria.
				</p>
			)}

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data scraped from JLCPCB basic parts. Always verify specifications before ordering.
			</p>
		</div>
	);
}

function TransistorTable({ transistors, type }) {
	const isMOSFET = type === 'MOSFET' || (transistors.length > 0 && transistors[0].type === 'MOSFET');

	return (
		<div class="component-grid-container">
			<table class="component-grid">
				<thead>
					<tr>
						<th>Part</th>
						<th>Model</th>
						<th>Polarity</th>
						<th>{isMOSFET ? 'Vds' : 'Vceo'}</th>
						<th>{isMOSFET ? 'Id' : 'Ic'}</th>
						{isMOSFET && <th>Rds(on)</th>}
						<th>Package</th>
					</tr>
				</thead>
				<tbody>
					{transistors.map(tr => (
						<tr key={tr.partNumber}>
							<td>
								<JlcLink
									part={tr.partNumber}
									tier={tr.tier}
									info={`${tr.type} ${tr.polarity || ''} - ${tr.mpn}`}
									description={`${tr.mfr || ''} ${tr.specs.vds || tr.specs.vceo ? `• ${tr.specs.vds || tr.specs.vceo}` : ''} ${tr.specs.id || tr.specs.ic ? `• ${tr.specs.id || tr.specs.ic}` : ''} ${tr.pkg ? `• ${tr.pkg}` : ''}`.trim()}
								/>
							</td>
							<td>
								<strong>{tr.mpn}</strong>
								{tr.mfr && (
									<div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
										{tr.mfr}
									</div>
								)}
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{tr.polarity || '-'}
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{tr.specs.vds || tr.specs.vceo || '-'}
							</td>
							<td style={{ whiteSpace: 'nowrap' }}>
								{tr.specs.id || tr.specs.ic || '-'}
							</td>
							{isMOSFET && (
								<td style={{ whiteSpace: 'nowrap' }}>
									{tr.specs.rds || '-'}
								</td>
							)}
							<td>{tr.pkg}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
