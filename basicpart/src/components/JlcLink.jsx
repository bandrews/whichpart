import { useState } from 'preact/hooks';

/**
 * Clickable part number that copies to clipboard and links to JLCPCB
 *
 * @param {Object} props
 * @param {string} props.part - Part number (e.g., "C17513")
 * @param {string} props.tier - Part tier: "basic" or "preferred"
 */
export function JlcLink({ part, tier = 'basic' }) {
	const [copied, setCopied] = useState(false);

	if (!part) {
		return null;
	}

	const handleClick = async (e) => {
		e.preventDefault();

		try {
			await navigator.clipboard.writeText(part);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const jlcUrl = `https://jlcpcb.com/partdetail/${part}`;
	const tierClass = tier === 'preferred' ? 'preferred' : '';

	return (
		<a
			href={jlcUrl}
			onClick={handleClick}
			class={`jlc-link ${tierClass} ${copied ? 'copied' : ''}`}
			title={`${part} (${tier === 'preferred' ? 'Preferred Extended' : 'Basic'})\nClick to copy, Ctrl+Click to open`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span>{part}</span>
			<span class="jlc-link-icon">{copied ? '✓' : '📋'}</span>
		</a>
	);
}
