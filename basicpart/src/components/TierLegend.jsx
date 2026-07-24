import { useTierFilter } from '../context/TierFilter.jsx';

/**
 * Legend showing the meaning of part tiers with toggle for preferred extended
 */
export function TierLegend({ showToggle = true, includeExtended = false }) {
	const { showPreferred, setShowPreferred } = useTierFilter();
	const showPreferredLegend = showPreferred || !showToggle;

	return (
		<div class="tier-legend">
			<div class="tier-legend-items">
				<div class="tier-legend-item">
					<span class="tier-legend-swatch basic"></span>
					<span>Basic</span>
				</div>
				{showPreferredLegend && (
					<div class="tier-legend-item">
						<span class="tier-legend-swatch preferred"></span>
						<span>Preferred Extended (no feeder-loading fee for Economic PCBA)</span>
					</div>
				)}
				{includeExtended && (
						<div class="tier-legend-item">
							<span class="tier-legend-swatch extended"></span>
							<span>Extended (ordinary Extended; additional fee may apply)</span>
						</div>
				)}
			</div>
			{showToggle && (
				<div class="tier-toggle">
					<label class="tier-toggle-label">
						<input
							type="checkbox"
							checked={showPreferred}
							onChange={(e) => setShowPreferred(e.target.checked)}
						/>
						<span class="tier-toggle-text">
							Show Preferred Extended
						</span>
					</label>
				</div>
			)}
		</div>
	);
}
