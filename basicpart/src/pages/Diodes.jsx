import { useState, useMemo } from 'preact/hooks';
import { ComponentGrid } from '../components/ComponentGrid.jsx';
import { TierLegend } from '../components/TierLegend.jsx';
import diodeData from '../data/diodes.json';

const diodeTypes = [
	{ key: 'all', label: 'All' },
	{ key: 'schottky', label: 'Schottky' },
	{ key: 'zener', label: 'Zener' },
	{ key: 'tvs', label: 'TVS/ESD' },
	{ key: 'switching', label: 'Switching' },
	{ key: 'general', label: 'General Purpose' },
];

export function Diodes() {
	const [activeType, setActiveType] = useState('all');

	// Filter diodes by type
	const filteredData = useMemo(() => {
		if (activeType === 'all') {
			return diodeData;
		}

		const filtered = { ...diodeData, data: {} };
		for (const [key, entry] of Object.entries(diodeData.data)) {
			if (entry.type === activeType) {
				filtered.data[key] = entry;
			}
		}
		return filtered;
	}, [activeType]);

	// Determine which columns have data
	const activeColumns = useMemo(() => {
		const cols = new Set();
		for (const entry of Object.values(filteredData.data)) {
			for (const col of diodeData.meta.columns) {
				if (entry[col]) {
					cols.add(col);
				}
			}
		}
		// Return columns in order
		return diodeData.meta.columns.filter(c => cols.has(c));
	}, [filteredData]);

	// Count parts per type
	const typeCounts = useMemo(() => {
		const counts = { all: Object.keys(diodeData.data).length };
		for (const entry of Object.values(diodeData.data)) {
			counts[entry.type] = (counts[entry.type] || 0) + 1;
		}
		return counts;
	}, []);

	const partCount = Object.keys(filteredData.data).length;

	return (
		<div>
			<h1 class="page-title">Diodes</h1>
			<p class="page-subtitle">
				{partCount} diodes available as JLCPCB basic parts.
				Select a type to filter by function.
			</p>

			<TierLegend />

			{/* Type tabs */}
			<div class="filter-bar" style={{ gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
				{diodeTypes.map(type => (
					typeCounts[type.key] > 0 && (
						<button
							key={type.key}
							onClick={() => setActiveType(type.key)}
							style={{
								padding: 'var(--spacing-sm) var(--spacing-md)',
								border: activeType === type.key ? '2px solid var(--accent)' : '1px solid var(--border)',
								borderRadius: 'var(--radius-sm)',
								backgroundColor: activeType === type.key ? 'var(--accent)' : 'var(--bg-primary)',
								color: activeType === type.key ? 'white' : 'var(--text-primary)',
								cursor: 'pointer',
								fontWeight: activeType === type.key ? '600' : '400',
							}}
						>
							{type.label} ({typeCounts[type.key]})
						</button>
					)
				))}
			</div>

			<ComponentGrid
				data={filteredData}
				columns={activeColumns}
				renderRowHeader={(row) => (
					<div>
						<strong>{row.display}</strong>
						{row.description && (
							<>
								<br />
								<small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
									{row.description.length > 80
										? row.description.substring(0, 80) + '...'
										: row.description}
								</small>
							</>
						)}
					</div>
				)}
			/>

			<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
				Data scraped from JLCPCB basic parts on {diodeData.meta?.lastUpdated}.
			</p>
		</div>
	);
}
