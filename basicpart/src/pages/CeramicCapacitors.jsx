import { useState, useMemo } from 'preact/hooks';
import { TierLegend } from '../components/TierLegend.jsx';
import { JlcLink } from '../components/JlcLink.jsx';
import { useTierFilter } from '../context/TierFilter.jsx';
import { parseCapacitance, formatCapacitanceWithAlt } from '../utils/formatting.js';
import capacitorData from '../data/ceramic-capacitors.json';
import partsIndex from '../data/parts-index.json';
import imgCeramicCap from '../assets/ceramiccapacitor.png';

/**
 * Get tooltip description from parts-index
 */
function getDescription(part) {
	const partData = partsIndex[part];
	if (!partData) return '';
	const parts = [];
	if (partData.mpn) parts.push(partData.mpn);
	if (partData.mfr) parts.push(`by ${partData.mfr}`);
	if (partData.attrs?.['Tolerance']) parts.push(partData.attrs['Tolerance']);
	return parts.join(' • ');
}

const COLUMNS = ['0402', '0603', '0805', '1206'];

/**
 * Group capacitors by value, collecting all variants (different voltage/dielectric)
 */
function groupByValue(data) {
	const groups = {};

	for (const [key, entry] of Object.entries(data)) {
		const display = entry.display;
		if (!groups[display]) {
			groups[display] = {
				display,
				variants: [],
			};
		}

		// Collect package parts for this variant
		const variant = {
			key,
			voltage: entry.voltage,
			dielectric: entry.dielectric,
			packages: {},
		};

		for (const col of COLUMNS) {
			if (entry[col]) {
				variant.packages[col] = entry[col];
			}
		}

		groups[display].variants.push(variant);
	}

	return groups;
}

export function CeramicCapacitors() {
	const [voltageFilter, setVoltageFilter] = useState('All');
	const [dielectricFilter, setDielectricFilter] = useState('All');
	const { showPreferred } = useTierFilter();

	// Group capacitors by value
	const groupedData = useMemo(() => groupByValue(capacitorData.data), []);

	// Extract unique voltages and dielectrics for filters
	const filterOptions = useMemo(() => {
		const voltages = new Set(['All']);
		const dielectrics = new Set(['All']);

		for (const entry of Object.values(capacitorData.data)) {
			if (entry.voltage && entry.voltage !== 'Unknown') voltages.add(entry.voltage);
			if (entry.dielectric && entry.dielectric !== 'Unknown') dielectrics.add(entry.dielectric);
		}

		return {
			voltage: Array.from(voltages).sort((a, b) => {
				if (a === 'All') return -1;
				if (b === 'All') return 1;
				return parseInt(a) - parseInt(b);
			}),
			dielectric: Array.from(dielectrics).sort(),
		};
	}, []);

	// Filter variants based on tier and filters
	const filterVariant = (variant) => {
		if (voltageFilter !== 'All' && variant.voltage !== voltageFilter) return false;
		if (dielectricFilter !== 'All' && variant.dielectric !== dielectricFilter) return false;

		if (!showPreferred) {
			// Check if any package has a basic tier
			return Object.values(variant.packages).some(p => p.tier === 'basic');
		}
		return true;
	};

	// Filter cell based on tier
	const filterCell = (cell) => {
		if (!cell) return null;
		if (showPreferred) return cell;
		return cell.tier === 'basic' ? cell : null;
	};

	// Get sorted value keys
	const sortedValues = useMemo(() => {
		return Object.keys(groupedData).sort((a, b) => {
			return parseCapacitance(a) - parseCapacitance(b);
		});
	}, [groupedData]);

	// Filter values that have at least one matching variant
	const visibleValues = sortedValues.filter(value => {
		return groupedData[value].variants.some(filterVariant);
	});

	const partCount = Object.keys(capacitorData.data).length;

	return (
		<div>
			<div class="page-header">
				<img src={imgCeramicCap} alt="" class="page-header-image" />
				<div class="page-header-text">
					<h1 class="page-title">Ceramic Capacitors (MLCC)</h1>
					<p class="page-subtitle">
						{partCount} multilayer ceramic capacitor values available as JLCPCB basic parts.
						Use filters to narrow by voltage rating and dielectric type.
					</p>
				</div>
			</div>

			<TierLegend />

			<div class="filter-bar">
				<div class="filter-group">
					<label htmlFor="voltage">Voltage</label>
					<select
						id="voltage"
						value={voltageFilter}
						onChange={(e) => setVoltageFilter(e.target.value)}
					>
						{filterOptions.voltage.map(v => (
							<option key={v} value={v}>{v}</option>
						))}
					</select>
				</div>
				<div class="filter-group">
					<label htmlFor="dielectric">Dielectric</label>
					<select
						id="dielectric"
						value={dielectricFilter}
						onChange={(e) => setDielectricFilter(e.target.value)}
					>
						{filterOptions.dielectric.map(d => (
							<option key={d} value={d}>{d}</option>
						))}
					</select>
				</div>
			</div>

			<div class="component-grid-container">
				<table class="component-grid">
					<thead>
						<tr>
							<th>Capacitance</th>
							{COLUMNS.map(col => (
								<th key={col}>{col}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{visibleValues.map(value => {
							const group = groupedData[value];
							const matchingVariants = group.variants.filter(filterVariant);
							const { main, alt } = formatCapacitanceWithAlt(value);

							return (
								<tr key={value}>
									<td>
										<strong>{main}</strong>
										{alt && (
											<span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '4px' }}>
												({alt})
											</span>
										)}
									</td>
									{COLUMNS.map(col => {
										// Collect all parts for this column across matching variants
										const partsInColumn = [];
										for (const variant of matchingVariants) {
											const cell = filterCell(variant.packages[col]);
											if (cell) {
												partsInColumn.push({
													...cell,
													voltage: variant.voltage,
													dielectric: variant.dielectric,
												});
											}
										}

										if (partsInColumn.length === 0) {
											return <td key={col}><span class="cell-empty">-</span></td>;
										}

										// If only one part, show simple link
										if (partsInColumn.length === 1) {
											const p = partsInColumn[0];
											return (
												<td key={col}>
													<div class="stacked-cell">
														<JlcLink
															part={p.part}
															tier={p.tier}
															info={`${main} ${p.voltage} ${p.dielectric}`}
															description={getDescription(p.part)}
														/>
														<span class="cell-specs">{p.voltage} {p.dielectric}</span>
													</div>
												</td>
											);
										}

										// Multiple parts - stack them
										return (
											<td key={col}>
												<div class="stacked-parts">
													{partsInColumn.map((p, i) => (
														<div key={i} class="stacked-cell">
															<JlcLink
																part={p.part}
																tier={p.tier}
																info={`${main} ${p.voltage} ${p.dielectric}`}
																description={getDescription(p.part)}
															/>
															<span class="cell-specs">{p.voltage} {p.dielectric}</span>
														</div>
													))}
												</div>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{visibleValues.length === 0 && (
				<p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
					No capacitors match your filter criteria.
				</p>
			)}

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data scraped from JLCPCB basic parts on {capacitorData.meta?.lastUpdated}.
				Additional package sizes may be available in the extended library.
			</p>
		</div>
	);
}
