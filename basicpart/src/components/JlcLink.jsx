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

	const handleClick = async (e) => {
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
				{copied && <span class="jlc-link-icon">✓</span>}
			</a>
			{tooltip}
		</>
	);
}
