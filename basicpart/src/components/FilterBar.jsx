/**
 * Filter bar for multi-dimensional component data
 *
 * @param {Object} props
 * @param {Array} props.filters - Array of filter definitions
 * @param {Object} props.values - Current filter values
 * @param {Function} props.onChange - Callback when filter changes
 *
 * Filter definition:
 * {
 *   key: "voltage",
 *   label: "Voltage",
 *   options: ["All", "10V", "16V", "25V", "50V"]
 * }
 */
export function FilterBar({ filters, values, onChange }) {
	const handleChange = (key, value) => {
		onChange({
			...values,
			[key]: value,
		});
	};

	if (!filters || filters.length === 0) {
		return null;
	}

	return (
		<div class="filter-bar">
			{filters.map(filter => (
				<div key={filter.key} class="filter-group">
					<label htmlFor={`filter-${filter.key}`}>{filter.label}</label>
					<select
						id={`filter-${filter.key}`}
						value={values[filter.key] || filter.options[0]}
						onChange={(e) => handleChange(filter.key, e.target.value)}
					>
						{filter.options.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			))}
		</div>
	);
}
