import { useState, useMemo } from 'preact/hooks';
import { ComponentGrid } from '../components/ComponentGrid.jsx';
import { FilterBar } from '../components/FilterBar.jsx';
import { TierLegend } from '../components/TierLegend.jsx';
import capacitorData from '../data/ceramic-capacitors.json';

export function CeramicCapacitors() {
	const [filters, setFilters] = useState({
		voltage: 'All',
		dielectric: 'All',
	});

	// Extract unique voltages and dielectrics from data
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

	// Filter the data based on selected filters
	const filteredData = useMemo(() => {
		const filtered = { ...capacitorData, data: {} };

		for (const [key, entry] of Object.entries(capacitorData.data)) {
			const matchesVoltage = filters.voltage === 'All' || entry.voltage === filters.voltage;
			const matchesDielectric = filters.dielectric === 'All' || entry.dielectric === filters.dielectric;

			if (matchesVoltage && matchesDielectric) {
				filtered.data[key] = entry;
			}
		}

		return filtered;
	}, [filters]);

	// Sort capacitance values
	const sortCapacitance = (keys) => {
		return keys.sort((a, b) => {
			// Parse capacitance values for comparison
			const parseVal = (key) => {
				const entry = capacitorData.data[key];
				const display = entry?.display || '';
				const match = display.match(/^([\d.]+)(p|n|u|µ)?F?/i);
				if (!match) return 0;
				let val = parseFloat(match[1]);
				const unit = match[2]?.toLowerCase();
				if (unit === 'p') val *= 1e-12;
				else if (unit === 'n') val *= 1e-9;
				else if (unit === 'u' || unit === 'µ') val *= 1e-6;
				return val;
			};
			return parseVal(a) - parseVal(b);
		});
	};

	const filterConfig = [
		{
			key: 'voltage',
			label: 'Voltage',
			options: filterOptions.voltage,
		},
		{
			key: 'dielectric',
			label: 'Dielectric',
			options: filterOptions.dielectric,
		},
	];

	const partCount = Object.keys(capacitorData.data).length;

	return (
		<div>
			<h1 class="page-title">Ceramic Capacitors (MLCC)</h1>
			<p class="page-subtitle">
				{partCount} multilayer ceramic capacitor values available as JLCPCB basic parts.
				Use filters to narrow by voltage rating and dielectric type.
			</p>

			<TierLegend />

			<FilterBar
				filters={filterConfig}
				values={filters}
				onChange={setFilters}
			/>

			<ComponentGrid
				data={filteredData}
				columns={['0402', '0603', '0805', '1206']}
				sortRows={sortCapacitance}
				renderRowHeader={(row) => (
					<div>
						<strong>{row.display}</strong>
						<br />
						<small style={{ color: 'var(--text-muted)' }}>
							{row.voltage} {row.dielectric}
						</small>
					</div>
				)}
			/>

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data scraped from JLCPCB basic parts on {capacitorData.meta?.lastUpdated}.
				Additional package sizes may be available in the extended library.
			</p>
		</div>
	);
}
