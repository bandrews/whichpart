import { useTierFilter } from '../context/TierFilter.jsx';

/**
 * Legend showing the meaning of part tiers with toggle for preferred extended
 */
export function TierLegend() {
	const { showPreferred, setShowPreferred } = useTierFilter();

	return (
		<div class="tier-legend">
			<div class="tier-legend-items">
				<div class="tier-legend-item">
					<span class="tier-legend-swatch basic"></span>
					<span>Basic Part (no extra fee)</span>
				</div>
				{showPreferred && (
					<div class="tier-legend-item">
						<span class="tier-legend-swatch preferred"></span>
						<span>Preferred Extended (low fee)</span>
					</div>
				)}
			</div>
			<div class="tier-toggle">
				<label class="tier-toggle-label">
					<input
						type="checkbox"
						checked={showPreferred}
						onChange={(e) => setShowPreferred(e.target.checked)}
					/>
					<span class="tier-toggle-text">
						Show preferred extended
					</span>
				</label>
			</div>
		</div>
	);
}
