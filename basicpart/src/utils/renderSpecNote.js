/**
 * Minimal Markdown renderer for the spec notes in content/.
 *
 * This is NOT a general-purpose Markdown parser. The note files follow the
 * fixed, validated format described in content/FORMAT.md, so only the
 * constructs that format uses are supported:
 *
 *   - YAML front matter (stripped)
 *   - # / ## / ### headings (demoted two levels to fit the page hierarchy)
 *   - paragraphs, > blockquotes, - bullet lists, 1. numbered lists
 *   - | pipe | tables | with a |---| separator row
 *   - **bold**, *italic*, `code`, [text](url), <https://autolink>,
 *     and the <sub> tags used for electrical symbols
 *
 * Everything is HTML-escaped first; only markup generated here (plus <sub>)
 * reaches the output, so repo-authored note content cannot inject markup.
 */

function escapeHtml(s) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function renderInline(text) {
	let s = escapeHtml(text);

	// Code spans first, so their contents skip emphasis/link processing.
	// The sentinel character cannot appear in the source text: escapeHtml
	// output never contains it, and the note files are validated plain text.
	const SENT = String.fromCharCode(1);
	const codeTokens = [];
	s = s.replace(/`([^`]+)`/g, (m, code) => {
		codeTokens.push('<code>' + code + '</code>');
		return SENT + (codeTokens.length - 1) + SENT;
	});

	// Re-allow the one HTML tag the notes use.
	s = s.replace(/&lt;(\/?sub)&gt;/g, '<$1>');

	// Markdown links, then bare autolinks.
	s = s.replace(
		/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
	);
	s = s.replace(
		/&lt;(https?:\/\/[^\s&]+)&gt;/g,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
	);

	// Bold before italic so ** is not eaten as two *.
	s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	s = s.replace(/(^|[\s(])\*(\S(?:[^*]*\S)?)\*/g, '$1<em>$2</em>');

	// Restore code spans.
	s = s.replace(new RegExp(SENT + '(\\d+)' + SENT, 'g'), (m, i) => codeTokens[Number(i)]);
	return s;
}

function renderTable(lines) {
	const rows = lines.map((line) =>
		line.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim()),
	);
	// rows[1] is the |---| separator.
	const header = rows[0];
	const body = rows.slice(2);
	let html = '<div class="ai-note-table-wrap"><table><thead><tr>';
	for (const cell of header) html += `<th>${renderInline(cell)}</th>`;
	html += '</tr></thead><tbody>';
	for (const row of body) {
		html += '<tr>';
		for (const cell of row) html += `<td>${renderInline(cell)}</td>`;
		html += '</tr>';
	}
	html += '</tbody></table></div>';
	return html;
}

function renderList(lines, ordered) {
	// An item starts with the marker; following lines indented under it are
	// continuations. Join each item's lines before inline rendering so
	// emphasis and links that wrap across source lines still work.
	const items = [];
	const startRe = ordered ? /^\d+\.\s+/ : /^-\s+/;
	for (const line of lines) {
		if (startRe.test(line)) {
			items.push(line.replace(startRe, ''));
		} else if (items.length > 0) {
			items[items.length - 1] += ` ${line.trim()}`;
		}
	}
	const tag = ordered ? 'ol' : 'ul';
	return `<${tag}>${items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</${tag}>`;
}

/**
 * Render a spec-note Markdown file to HTML.
 * Returns { html, title } where title is the file's H1 text (if any).
 */
export function renderSpecNote(raw) {
	// Strip front matter.
	let text = raw.replace(/^---\n[\s\S]*?\n---\n/, '');

	const blocks = text.split(/\n{2,}/);
	const out = [];
	let title = null;

	for (const block of blocks) {
		const lines = block.split('\n').filter((l) => l.trim().length > 0);
		if (lines.length === 0) continue;
		const first = lines[0];

		if (/^#{1,3}\s/.test(first)) {
			const level = first.match(/^#+/)[0].length;
			const content = first.replace(/^#+\s*/, '');
			if (level === 1 && title === null) title = content;
			// Demote by two so the block's own banner (h3-ish) stays on top.
			const tag = `h${Math.min(level + 2, 6)}`;
			out.push(`<${tag}>${renderInline(content)}</${tag}>`);
			// A heading block can carry trailing paragraph lines (rare).
			if (lines.length > 1) {
				out.push(`<p>${renderInline(lines.slice(1).join(' '))}</p>`);
			}
		} else if (first.startsWith('>')) {
			const inner = lines.map((l) => l.replace(/^>\s?/, '')).join(' ');
			out.push(`<blockquote>${renderInline(inner)}</blockquote>`);
		} else if (first.startsWith('|')) {
			out.push(renderTable(lines));
		} else if (/^-\s+/.test(first)) {
			out.push(renderList(lines, false));
		} else if (/^\d+\.\s+/.test(first)) {
			out.push(renderList(lines, true));
		} else {
			out.push(`<p>${renderInline(lines.join(' '))}</p>`);
		}
	}

	return { html: out.join('\n'), title };
}
