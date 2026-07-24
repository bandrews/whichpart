import resistorData from '../data/resistors.json';

export function Footer() {
	const catalogUpdated = resistorData.meta?.lastUpdated;

	return (
		<footer>
			<p>
				All trademarks are property of their respective owners.
				basicp.art is not affiliated with LCSC or JLCPCB.
				By using this site, you accept all risk associated with use,
				including the risk of inaccurate information in the parts table.
			</p>
			<p class="footer-meta">
				{catalogUpdated && (
					<>
						Parts catalog updated <time dateTime={catalogUpdated}>{catalogUpdated}</time>.
						{' '}
					</>
				)}
				<a
					href="https://github.com/bandrews/whichpart/issues/new"
					target="_blank"
					rel="noopener noreferrer"
				>
					File feedback or report an issue on GitHub
				</a>
				.
			</p>
		</footer>
	);
}
