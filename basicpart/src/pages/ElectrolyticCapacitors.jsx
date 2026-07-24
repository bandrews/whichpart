import { ComponentGrid } from '../components/ComponentGrid.jsx';
import { TierLegend } from '../components/TierLegend.jsx';
import capacitorData from '../data/electrolytic-capacitors.json';
import imgElectrolyticCap from '../assets/electrolyticcapacitor.png';

export function ElectrolyticCapacitors() {
	const partCount = Object.keys(capacitorData.data).length;
	const hasData = partCount > 0;

	// Get active columns (ones that have data)
	const activeColumns = capacitorData.meta.columns.filter(col => {
		return Object.values(capacitorData.data).some(entry => entry[col]);
	});

	// Simplified column labels
	const columnLabels = {
		'CASE-A-3216-18(mm)': 'Case A',
		'CASE-B-3528-21(mm)': 'Case B',
		'CASE-C-6032-28(mm)': 'Case C',
		'CASE-D-7343-31(mm)': 'Case D',
	};

	return (
		<div>
			<div class="page-header">
				<img src={imgElectrolyticCap} alt="" class="page-header-image" />
				<div class="page-header-text">
					<h1 class="page-title">Electrolytic & Tantalum Capacitors</h1>
					<p class="page-subtitle">
						{partCount > 0 ? (
							<>
								{partCount} tantalum capacitor values in the current JLCPCB Basic and Preferred Extended catalog.
								Most electrolytic capacitors are ordinary Extended parts.
							</>
						) : (
							<>
								Very few electrolytic capacitors are available as Basic or Preferred Extended parts.
								Check the broader JLCPCB library for ordinary Extended options.
							</>
						)}
					</p>
				</div>
			</div>

			{hasData && (
				<>
					<TierLegend />

					<ComponentGrid
						data={capacitorData}
						columns={activeColumns}
						columnLabels={columnLabels}
						unit=""
						renderRowHeader={(row) => (
							<div>
								<strong>{row.display}</strong>
								<br />
								<small style={{ color: 'var(--text-muted)' }}>
									{row.voltage}
								</small>
							</div>
						)}
					/>

					<p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
						Basic and Preferred Extended data collected on {capacitorData.meta?.lastUpdated}.
					</p>
				</>
			)}

			<div style={{
				marginTop: 'var(--spacing-xl)',
				padding: 'var(--spacing-md)',
				backgroundColor: 'var(--bg-secondary)',
				borderRadius: 'var(--radius-md)',
				border: '1px solid var(--border)',
			}}>
				<h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Looking for more options?</h3>
				<p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
					JLCPCB's broader library has hundreds of ordinary Extended electrolytic and tantalum capacitors.
					Feeder-loading charges depend on the selected PCBA service, so confirm the current order pricing before use.
				</p>
				<a
					href="https://jlcpcb.com/parts"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: 'var(--accent)' }}
				>
					Browse JLCPCB Parts Library →
				</a>
			</div>
		</div>
	);
}
