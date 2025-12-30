import { useMemo } from 'preact/hooks';
import { useRoute } from 'preact-iso';

// Import parts index with full metadata
import partsIndex from '../data/parts-index.json';
import friendlyDescriptions from '../data/friendly-descriptions.json';

export function PartDetails() {
	const { params } = useRoute();
	const partNumber = params.id;

	const partInfo = useMemo(() => partsIndex[partNumber] || null, [partNumber]);
	const friendlyDesc = friendlyDescriptions[partNumber];

	const jlcUrl = `https://jlcpcb.com/partdetail/${partNumber}`;

	// Format price for display
	const formatPrice = (price) => {
		if (price < 0.01) return `$${price.toFixed(4)}`;
		if (price < 0.1) return `$${price.toFixed(3)}`;
		return `$${price.toFixed(2)}`;
	};

	return (
		<div>
			<h1 class="page-title">
				{partInfo?.mpn || partNumber}
				<span style={{ fontSize: '0.875rem', fontWeight: 400, marginLeft: '12px', color: 'var(--text-muted)' }}>
					{partNumber}
				</span>
			</h1>

			{partInfo?.mfr && (
				<p class="page-subtitle" style={{ marginTop: '-8px' }}>
					by {partInfo.mfr}
				</p>
			)}

			{friendlyDesc && (
				<div style={{
					fontSize: '1.25rem',
					fontWeight: 600,
					color: 'var(--text-primary)',
					marginBottom: 'var(--spacing-lg)',
					padding: 'var(--spacing-md) var(--spacing-lg)',
					backgroundColor: 'var(--bg-secondary)',
					borderRadius: 'var(--radius-md)',
					borderLeft: '4px solid var(--accent)',
				}}>
					{friendlyDesc}
				</div>
			)}

			<div style={{
				display: 'flex',
				gap: 'var(--spacing-md)',
				marginBottom: 'var(--spacing-xl)',
				flexWrap: 'wrap',
				alignItems: 'stretch',
			}}>
				{partInfo?.ds && (
					<a
						href={partInfo.ds}
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
