import { useMemo, useState } from 'preact/hooks';
import { useRoute } from 'preact-iso';

// Import parts index with full metadata
import partsIndex from '../data/parts-index.json';
import friendlyDescriptions from '../data/friendly-descriptions.json';
import { curatedPickFor, specEntryFor } from '../utils/partPage.js';
import { SpecNotes } from '../components/SpecNotes.jsx';

// Copy icon SVG component
function CopyIcon({ size = 14 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
	);
}

function CheckIcon({ size = 14 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
			<polyline points="20 6 9 17 4 12"></polyline>
		</svg>
	);
}

// Copyable text component with hover icon
function CopyableText({ text, children, className = '' }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<span
			class={`copyable-text ${copied ? 'copied' : ''} ${className}`}
			onClick={handleCopy}
			title="Click to copy"
		>
			{children}
			<span class="copyable-icon">
				{copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
			</span>
		</span>
	);
}

export function PartDetails() {
	const { params } = useRoute();
	const partNumber = params.id;

	const partInfo = useMemo(() => partsIndex[partNumber] || null, [partNumber]);
	// Curated Extended picks are not in the qualifying snapshot, so they have no
	// parts-index record. Their spec note's front matter and their curated entry
	// still identify the part, and the note itself is the substance of the page.
	const specEntry = useMemo(() => specEntryFor(partNumber), [partNumber]);
	const pick = useMemo(() => curatedPickFor(partNumber), [partNumber]);
	const friendlyDesc = friendlyDescriptions[partNumber];

	const mpn = partInfo?.mpn || specEntry?.mpn || partNumber;
	const manufacturer = partInfo?.mfr || specEntry?.manufacturer || null;
	const category = partInfo?.cat || specEntry?.category || null;
	const pkg = partInfo?.pkg || specEntry?.package || pick?.package || null;
	const tier = partInfo?.tier || specEntry?.tier || pick?.tier || null;
	const datasheetUrl = partInfo?.ds || specEntry?.datasheet_url || null;
	const tierName = (t) =>
		t === 'preferred' ? 'Preferred Extended' : t === 'extended' ? 'Extended' : t === 'basic' ? 'Basic' : null;

	const jlcUrl = `https://jlcpcb.com/partdetail/${partNumber}`;

	// Format price for display
	const formatPrice = (price) => {
		if (price < 0.01) return `$${price.toFixed(4)}`;
		if (price < 0.1) return `$${price.toFixed(3)}`;
		return `$${price.toFixed(2)}`;
	};

	return (
		<div>
			{/* Header section with new layout */}
			<div class="part-header">
				{/* Main content area */}
				<div class="part-header-main">
					{/* Lead with friendly description if available */}
					{(friendlyDesc || specEntry?.summary || pick?.description) && (
						<h1 class="part-friendly-desc">
							{friendlyDesc || specEntry?.summary || pick?.description}
						</h1>
					)}

					{/* Part number and manufacturer */}
					<div class="part-identity">
						<CopyableText text={mpn} className="part-mpn">
							{mpn}
						</CopyableText>
						{manufacturer && (
							<span class="part-mfr">by {manufacturer}</span>
						)}
					</div>
				</div>

				{/* JLC part number pill - upper right */}
				<CopyableText text={partNumber} className="part-jlc-pill">
					{partNumber}
				</CopyableText>
			</div>

			<div style={{
				display: 'flex',
				gap: 'var(--spacing-md)',
				marginBottom: 'var(--spacing-xl)',
				flexWrap: 'wrap',
				alignItems: 'stretch',
			}}>
				{datasheetUrl && (
					<a
						href={datasheetUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="detail-button datasheet"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
							<polyline points="14 2 14 8 20 8"></polyline>
							<line x1="16" y1="13" x2="8" y2="13"></line>
							<line x1="16" y1="17" x2="8" y2="17"></line>
							<polyline points="10 9 9 9 8 9"></polyline>
						</svg>
						View Datasheet
					</a>
				)}
				<a
					href={jlcUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="detail-button primary"
				>
					View on JLCPCB
				</a>
				{partInfo?.lcsc && (
					<a
						href={partInfo.lcsc}
						target="_blank"
						rel="noopener noreferrer"
						class="detail-button"
					>
						View on LCSC
					</a>
				)}
			</div>

			{partInfo ? (
				<div style={{ display: 'grid', gap: 'var(--spacing-lg)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
					{/* Basic Info */}
					<div class="part-details-card">
						<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>Basic Info</h3>
						<table class="part-details-table">
							<tbody>
								<tr>
									<th>Category</th>
									<td>{partInfo.cat}</td>
								</tr>
								<tr>
									<th>Package</th>
									<td>{partInfo.pkg}</td>
								</tr>
								<tr>
									<th>Tier</th>
									<td style={{ textTransform: 'capitalize' }}>
										{partInfo.tier === 'preferred' ? 'Preferred Extended' : partInfo.tier === 'extended' ? 'Extended' : 'Basic'}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Pricing */}
					{partInfo.prices && partInfo.prices.length > 0 && (
						<div class="part-details-card">
							<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>
								Pricing
								<span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '8px' }}>
									(historical snapshot)
								</span>
							</h3>
							<table class="part-details-table">
								<tbody>
									{partInfo.prices.map((p, i) => (
										<tr key={i}>
											<th>{p.qty}+</th>
											<td>{formatPrice(p.price)} each</td>
										</tr>
									))}
								</tbody>
							</table>
							<p style={{ margin: 'var(--spacing-sm) 0 0 0', fontSize: '0.75rem', color: 'var(--warning)', fontStyle: 'italic' }}>
								Prices shown are from when data was collected and may not reflect current pricing.
							</p>
						</div>
					)}

					{/* Specifications */}
					{partInfo.attrs && Object.keys(partInfo.attrs).length > 0 && (
						<div class="part-details-card" style={{ gridColumn: '1 / -1' }}>
							<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>Specifications</h3>
							<table class="part-details-table">
								<tbody>
									{Object.entries(partInfo.attrs).map(([key, value]) => (
										<tr key={key}>
											<th>{key}</th>
											<td>{value}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{/* Description */}
					{partInfo.desc && (
						<div class="part-details-card" style={{ gridColumn: '1 / -1' }}>
							<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>Description</h3>
							<p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
								{partInfo.desc}
							</p>
						</div>
					)}
				</div>
			) : specEntry || pick ? (
				<div style={{ display: 'grid', gap: 'var(--spacing-lg)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
					{/* Basic Info, assembled from the spec note's front matter and
					    the curated entry, since there is no catalog record. */}
					<div class="part-details-card">
						<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>Basic Info</h3>
						<table class="part-details-table">
							<tbody>
								{category && (
									<tr>
										<th>Category</th>
										<td>{category}</td>
									</tr>
								)}
								{pkg && (
									<tr>
										<th>Package</th>
										<td>{pkg}</td>
									</tr>
								)}
								{tierName(tier) && (
									<tr>
										<th>Tier</th>
										<td>{tierName(tier)}</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{pick && (
						<div class="part-details-card">
							<h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem' }}>
								Why it is in Our Picks
							</h3>
							<p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
								<strong>{pick.name}</strong>
								{pick.description ? ` — ${pick.description}` : ''}
							</p>
							{pick.notes && (
								<p style={{ margin: 'var(--spacing-sm) 0 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
									{pick.notes}
								</p>
							)}
						</div>
					)}

					<div class="part-details-card" style={{ gridColumn: '1 / -1' }}>
						<p style={{ margin: 0, color: 'var(--text-muted)' }}>
							{tier === 'extended'
								? 'This is an ordinary Extended part, so it is not in the qualifying Basic/Preferred snapshot this site tables. '
								: 'This part is not in the qualifying snapshot this site tables. '}
							That means there is no scraped price, stock or attribute data for it here — check JLCPCB for those.
							{(specEntry ? ' The notes below were written from its manufacturer datasheet.' : '')}
						</p>
					</div>
				</div>
			) : (
				<div class="part-details-card">
					<p style={{ color: 'var(--text-muted)' }}>
						No local data found for this part. It may be in the JLCPCB library but not yet scraped by this site.
					</p>
					<p style={{ marginTop: 'var(--spacing-md)' }}>
						<a
							href={jlcUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="detail-button primary"
						>
							Search on JLCPCB
						</a>
					</p>
				</div>
			)}

			<SpecNotes partNumber={partNumber} category={category} />

			<div style={{
				marginTop: 'var(--spacing-xl)',
				padding: 'var(--spacing-md)',
				backgroundColor: 'var(--bg-secondary)',
				borderRadius: 'var(--radius-md)',
				fontSize: '0.875rem',
				color: 'var(--text-muted)',
			}}>
				<strong>Disclaimer:</strong> Part data shown here is scraped from JLCPCB and may not be complete or up-to-date.
				Always verify specifications on the official JLCPCB product page before ordering. Stock and pricing shown are approximate.
			</div>
		</div>
	);
}
