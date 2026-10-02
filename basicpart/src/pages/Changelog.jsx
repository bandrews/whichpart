import { useEffect, useRef } from 'preact/hooks';
import entries from '../data/changelog.json';

const formatDate = date => new Intl.DateTimeFormat('en', {
	month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export function Changelog() {
	const heading = useRef();
	useEffect(() => {
		const previousTitle = document.title;
		document.title = 'Changelog · basicp.art';
		heading.current?.focus({ preventScroll: true });
		window.scrollTo(0, 0);
		return () => { document.title = previousTitle; };
	}, []);

	return (
		<div class="changelog">
			<a href="/" class="changelog-back">← Back to parts</a>
			<h1 class="page-title" ref={heading} tabIndex={-1}>Changelog</h1>
			<p class="page-subtitle">What changed in the catalog, recommendations, and site.</p>
			<p class="changelog-intro">Catalog dates tell you when supplier data was collected. Review dates tell you when recommendations were checked. They may differ.</p>
			{entries.map(entry => (
				<article class="changelog-entry" key={entry.date} aria-labelledby={`update-${entry.date}`}>
					<p class="changelog-date"><time dateTime={entry.date}>{formatDate(entry.date)}</time></p>
					<h2 id={`update-${entry.date}`}>{entry.title}</h2>
					<dl class="changelog-dates">
						<div><dt>Catalog snapshot</dt><dd><time dateTime={entry.catalogSnapshotDate}>{formatDate(entry.catalogSnapshotDate)}</time></dd></div>
						<div><dt>Our Picks reviewed</dt><dd><time dateTime={entry.curatedReviewedDate}>{formatDate(entry.curatedReviewedDate)}</time></dd></div>
					</dl>
					<p>{entry.summary}</p>
					<ul>{entry.changes.map(change => <li key={change}>{change}</li>)}</ul>
					<p class="changelog-caveat">{entry.caveat}</p>
					<ul class="changelog-sources" aria-label="Sources">{entry.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul>
				</article>
			))}
			<p class="changelog-history">This log starts with the October 2, 2026 refresh. <a href="https://github.com/bandrews/whichpart/commits/main/">Earlier repository history is on GitHub</a>.</p>
		</div>
	);
}
