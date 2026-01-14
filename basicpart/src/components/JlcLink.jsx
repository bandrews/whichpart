import { useState, useRef, useEffect } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import friendlyDescriptions from '../data/friendly-descriptions.json';

/**
 * Clickable part number with hover info and navigation to details
 *
 * @param {Object} props
 * @param {string} props.part - Part number (e.g., "C17513")
 * @param {string} props.tier - Part tier: "basic" or "preferred"
 * @param {string} props.info - Optional info to show on hover (e.g., "50V X7R")
 * @param {string} props.description - Optional longer description for tooltip
 * @param {string} props.specs - Optional specs to show below part number (e.g., "16V X7R")
 */
export function JlcLink({ part, tier = 'basic', info, description, specs }) {
	// Use friendly description if available
	const friendlyDesc = friendlyDescriptions[part];
	const [copied, setCopied] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPos, setTooltipPos] = useState(null);
	const tooltipTimeout = useRef(null);
	const linkRef = useRef(null);
	const tooltipRef = useRef(null);

	if (!part) {
		return null;
	}

	// Calculate tooltip position after it renders
	useEffect(() => {
		if (showTooltip && linkRef.current && tooltipRef.current) {
			const linkRect = linkRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();
			const padding = 12;

			// Position above the link by default
			let top = linkRect.top - tooltipRect.height - padding;
			let left = linkRect.left + linkRect.width / 2 - tooltipRect.width / 2;

			// Keep tooltip on screen horizontally
			if (left < padding) {
				left = padding;
			} else if (left + tooltipRect.width > window.innerWidth - padding) {
				left = window.innerWidth - tooltipRect.width - padding;
			}

			// If tooltip would go above viewport, show below the link instead
			if (top < padding) {
				top = linkRect.bottom + padding;
			}

			setTooltipPos({ top, left });
		} else if (!showTooltip) {
			setTooltipPos(null);
		}
	}, [showTooltip]);

	const copyToClipboard = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await navigator.clipboard.writeText(part);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const handleClick = async (e) => {
		// Shift+click: copy to clipboard
		if (e.shiftKey) {
			await copyToClipboard(e);
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

	const tooltip = showTooltip && createPortal(
		<div
			ref={tooltipRef}
			class="jlc-tooltip"
			style={{
				position: 'fixed',
				top: tooltipPos ? `${tooltipPos.top}px` : '-9999px',
				left: tooltipPos ? `${tooltipPos.left}px` : '-9999px',
				visibility: tooltipPos ? 'visible' : 'hidden',
			}}
		>
			<div class="jlc-tooltip-header">{part}</div>
			<div class="jlc-tooltip-tier">{tierLabel}</div>
			{friendlyDesc && <div class="jlc-tooltip-friendly">{friendlyDesc}</div>}
			{info && !friendlyDesc && <div class="jlc-tooltip-info">{info}</div>}
			{description && <div class="jlc-tooltip-desc">{description}</div>}
			<div class="jlc-tooltip-hint">
				Click for details | Shift+click to copy
			</div>
		</div>,
		document.body
	);

	return (
		<>
			<span class="jlc-link-wrapper">
				<a
					ref={linkRef}
					href={jlcUrl}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					class={`jlc-link ${tierClass} ${copied ? 'copied' : ''} ${specs ? 'has-specs' : ''}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="jlc-link-part">{part}</span>
					{specs && <span class="jlc-link-specs">{specs}</span>}
					{copied && <span class="jlc-link-check">✓</span>}
				</a>
				<button
					class={`jlc-copy-btn ${copied ? 'copied' : ''}`}
					onClick={copyToClipboard}
					title="Copy part number"
					type="button"
				>
					{copied ? (
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					) : (
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					)}
				</button>
			</span>
			{tooltip}
		</>
	);
}
