import { useTierFilter } from '../context/TierFilter.jsx';

/**
 * Toggle for showing/hiding preferred extended parts
 */
export function TierToggle() {
	const { showPreferred, setShowPreferred } = useTierFilter();

	return (
		<div class="tier-toggle">
			<label class="tier-toggle-label">
				<input
					type="checkbox"
					checked={showPreferred}
					onChange={(e) => setShowPreferred(e.target.checked)}
				/>
				<span class="tier-toggle-text">
					Show preferred extended parts
				</span>
			</label>
		</div>
	);
}
