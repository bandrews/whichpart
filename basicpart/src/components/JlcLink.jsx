import { useState, useRef } from 'preact/hooks';

/**
 * Clickable part number with hover info and navigation to details
 *
 * @param {Object} props
 * @param {string} props.part - Part number (e.g., "C17513")
 * @param {string} props.tier - Part tier: "basic" or "preferred"
 * @param {string} props.info - Optional info to show on hover (e.g., "50V X7R")
 * @param {string} props.description - Optional longer description for tooltip
 */
export function JlcLink({ part, tier = 'basic', info, description }) {
	const [copied, setCopied] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const tooltipTimeout = useRef(null);

	if (!part) {
		return null;
	}

	const handleClick = async (e) => {
		// Ctrl+click or Cmd+click: open JLC page directly
		if (e.ctrlKey || e.metaKey) {
			// Let the default link behavior work
			return;
		}

		// Shift+click: copy to clipboard
		if (e.shiftKey) {
			e.preventDefault();
			try {
				await navigator.clipboard.writeText(part);
				setCopied(true);
				setTimeout(() => setCopied(false), 1500);
			} catch (err) {
				console.error('Failed to copy:', err);
			}
			return;
		}

		// Regular click: navigate to details page
		e.preventDefault();
		window.location.href = `/part/${part}`;
	};

	const handleMouseEnter = () => {
		tooltipTimeout.current = setTimeout(() => {
			setShowTooltip(true);
		}, 300);
	};

	const handleMouseLeave = () => {
		clearTimeout(tooltipTimeout.current);
		setShowTooltip(false);
	};

	const jlcUrl = `https://jlcpcb.com/partdetail/${part}`;
	const tierClass = tier === 'preferred' ? 'preferred' : tier === 'extended' ? 'extended' : '';
	const tierLabel = tier === 'preferred' ? 'Preferred Extended' : tier === 'extended' ? 'Extended' : 'Basic';

	return (
		<span class="jlc-link-wrapper">
			<a
				href={jlcUrl}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				class={`jlc-link ${tierClass} ${copied ? 'copied' : ''}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>{part}</span>
				{copied && <span class="jlc-link-icon">✓</span>}
			</a>
			{showTooltip && (
				<div class="jlc-tooltip">
					<div class="jlc-tooltip-header">{part}</div>
					<div class="jlc-tooltip-tier">{tierLabel}</div>
					{info && <div class="jlc-tooltip-info">{info}</div>}
					{description && <div class="jlc-tooltip-desc">{description}</div>}
					<div class="jlc-tooltip-hint">
						Click for details | Shift+click to copy | Ctrl+click for JLC
					</div>
				</div>
			)}
		</span>
	);
}
