import { useEffect, useState } from 'preact/hooks';

import { specNoteFor, loadSpecNote } from '../utils/specNotes.js';
import { renderSpecNote } from '../utils/renderSpecNote.js';

function WarningIcon({ size = 16 }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
			<line x1="12" y1="9" x2="12" y2="13"></line>
			<line x1="12" y1="17" x2="12.01" y2="17"></line>
		</svg>
	);
}

/**
 * AI-generated spec notes block for a part detail page.
 *
 * Renders nothing when no note exists for the part. When one does, it is
 * shown inside a prominently labelled "AI GENERATED" container so it cannot
 * be mistaken for scraped catalog data or curated editorial content.
 */
export function SpecNotes({ partNumber, category }) {
	const note = specNoteFor(partNumber, category);
	const [rendered, setRendered] = useState(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		setRendered(null);
		setFailed(false);
		if (!note) return;
		let cancelled = false;
		loadSpecNote(note)
			.then((raw) => {
				if (!cancelled) setRendered(renderSpecNote(raw));
			})
			.catch(() => {
				if (!cancelled) setFailed(true);
			});
		return () => {
			cancelled = true;
		};
	}, [partNumber]);

	if (!note || failed) return null;

	const isFamily = note.type === 'family';

	return (
		<section class="ai-note" aria-label="AI-generated component notes">
			<div class="ai-note-banner" role="note">
				<WarningIcon size={18} />
				<div>
					<strong>AI GENERATED — MAY CONTAIN ERRORS.</strong>{' '}
					The notes below were written by an AI from the sources listed at the
					end of the section. They are not part of the scraped catalog data.
					Verify every figure against the manufacturer's datasheet before
					relying on it.
				</div>
			</div>

			{isFamily && (
				<p class="ai-note-family-label">
					This part was not covered individually; these notes describe its
					component family (<strong>{note.entry.family}</strong>) and how to
					read this category's specifications.
				</p>
			)}

			{rendered ? (
				// Content is authored in this repository and rendered by our own
				// escaping renderer (see utils/renderSpecNote.js) — no external or
				// user-supplied HTML reaches this sink.
				<div class="ai-note-body" dangerouslySetInnerHTML={{ __html: rendered.html }} />
			) : (
				<p class="ai-note-loading">Loading notes…</p>
			)}
		</section>
	);
}
