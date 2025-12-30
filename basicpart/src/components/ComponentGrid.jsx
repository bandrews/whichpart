import { useTierFilter } from '../context/TierFilter.jsx';
import { JlcLink } from './JlcLink.jsx';
import partsIndex from '../data/parts-index.json';

/**
 * Get helpful tooltip info from parts-index
 */
function getTooltipInfo(part, rowDisplay, unit, col) {
	const partData = partsIndex[part];
	if (!partData) {
		return { info: `${rowDisplay}${unit} ${col}`, description: '' };
	}

	// Build a concise info line
	const info = `${rowDisplay}${unit} ${col}`;

	// Build a helpful description from attributes
	const descParts = [];
	if (partData.mpn) descParts.push(partData.mpn);
	if (partData.mfr) descParts.push(`by ${partData.mfr}`);

	// Add key specs based on category
	const attrs = partData.attrs || {};
	if (attrs['Tolerance']) descParts.push(attrs['Tolerance']);
	if (attrs['Voltage-Supply(Max)']) descParts.push(`${attrs['Voltage-Supply(Max)']} max`);
	if (attrs['Voltage']) descParts.push(attrs['Voltage']);
	if (attrs['Dielectric Type']) descParts.push(attrs['Dielectric Type']);

	return { info, description: descParts.join(' • ') };
}

/**
 * Generic grid component for displaying component data
 *
 * @param {Object} props
 * @param {Object} props.data - Component data in the standard schema format
 * @param {Array<string>} props.columns - Column keys to display (e.g., ["0402", "0603", "0805", "1206"])
 * @param {Object} props.columnLabels - Optional labels for columns (e.g., { "0402": "0402 (1.0x0.5mm)" })
 * @param {Object} props.columnImages - Optional images for column headers (e.g., { "0402": "/path/to/img" })
 * @param {Function} props.renderRowHeader - Function to render the row header cell
 * @param {Function} props.sortRows - Optional function to sort row keys
 * @param {Function} props.renderCell - Optional custom cell renderer
 * @param {string} props.unit - Unit to display after row values (e.g., "Ω", "F")
 */
export function ComponentGrid({
	data,
	columns,
	columnLabels = {},
	columnImages = {},
	renderRowHeader,
	renderCell,
	sortRows,
	unit = '',
}) {
	const { showPreferred } = useTierFilter();

	if (!data || !data.data) {
		return <div class="cell-empty">No data available</div>;
	}

	// Filter out rows that have no visible parts when preferred is hidden
	const filterRow = (row) => {
		if (showPreferred) return true;
		// Check if any column has a basic part
		return columns.some(col => row[col]?.tier === 'basic');
	};

	// Filter cell based on tier
	const filterCell = (cell) => {
		if (!cell) return null;
		if (showPreferred) return cell;
		return cell.tier === 'basic' ? cell : null;
	};

	// Get and sort row keys, filtering out empty rows
	let rowKeys = Object.keys(data.data).filter(key => filterRow(data.data[key]));
	if (sortRows) {
		rowKeys = sortRows(rowKeys);
	}

	return (
		<div class="component-grid-container">
			<table class="component-grid">
				<thead>
					<tr>
						<th>{data.meta?.rowLabel || 'Value'}</th>
						{columns.map(col => (
							<th key={col}>
								<div class="package-header">
									{columnImages[col] && (
										<img src={columnImages[col]} alt={col} />
									)}
									<span>{columnLabels[col] || col}</span>
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rowKeys.map(rowKey => {
						const row = data.data[rowKey];
						return (
							<tr key={rowKey}>
								<td>
									{renderRowHeader
										? renderRowHeader(row, rowKey)
										: <strong>{row.display || rowKey}{unit}</strong>
									}
								</td>
								{columns.map(col => {
									const cell = filterCell(row[col]);
									if (renderCell) {
										return <td key={col}>{renderCell(cell, col, row)}</td>;
									}
									const tooltip = cell ? getTooltipInfo(cell.part, row.display || rowKey, unit, col) : null;
								return (
									<td key={col}>
										{cell ? (
											<JlcLink
												part={cell.part}
												tier={cell.tier}
												info={tooltip.info}
												description={tooltip.description}
											/>
										) : (
											<span class="cell-empty">-</span>
										)}
									</td>
								);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
