/**
 * Legend showing the meaning of part tiers
 */
export function TierLegend() {
	return (
		<div class="tier-legend">
			<div class="tier-legend-item">
				<span class="tier-legend-swatch basic"></span>
				<span>Basic Part (no extra fee)</span>
			</div>
			<div class="tier-legend-item">
				<span class="tier-legend-swatch preferred"></span>
				<span>Preferred Extended (low fee)</span>
			</div>
		</div>
	);
}
