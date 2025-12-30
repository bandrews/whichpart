import { JlcLink } from './JlcLink.jsx';

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
 * @param {string} props.unit - Unit to display after row values (e.g., "Ω", "F")
 */
export function ComponentGrid({
	data,
	columns,
	columnLabels = {},
	columnImages = {},
	renderRowHeader,
	sortRows,
	unit = '',
}) {
	if (!data || !data.data) {
		return <div class="cell-empty">No data available</div>;
	}

	// Get and sort row keys
	let rowKeys = Object.keys(data.data);
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
									const cell = row[col];
									return (
										<td key={col}>
											{cell ? (
												<JlcLink
													part={cell.part}
													tier={cell.tier}
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
