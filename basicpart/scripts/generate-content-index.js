#!/usr/bin/env node
/**
 * Regenerates content/index.json from the front matter of every note in
 * content/components/ and content/families/.
 *
 * content/README.md has always described this as "a short Node script over the
 * front matter"; this is that script, so the index no longer has to be updated
 * by hand when a note is added or its front matter changes.
 *
 * The index is what src/utils/specNotes.js reads to decide which note (if any)
 * applies to a part detail page, so it must stay in step with the files.
 *
 * Usage:
 *   node scripts/generate-content-index.js          # rewrite content/index.json
 *   node scripts/generate-content-index.js --check  # fail if it is out of date
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, '..', 'content');
const indexPath = join(contentDir, 'index.json');

/**
 * Parses the small subset of YAML the note front matter uses: `key: value`
 * pairs, one nested block (`datasheet:`), and `- item` sequences. Anything
 * richer than that is a format error rather than something to support.
 */
function parseFrontMatter(text, file) {
	const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
	if (!match) throw new Error(`${file}: no YAML front matter`);

	const data = {};
	let block = null;
	let sequence = null;

	for (const rawLine of match[1].split('\n')) {
		if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue;

		const indented = /^\s/.test(rawLine);
		const line = rawLine.trim();

		if (line.startsWith('- ')) {
			if (!sequence) throw new Error(`${file}: list item outside a key: ${line}`);
			sequence.push(unquote(line.slice(2)));
			continue;
		}
		sequence = null;

		const colon = line.indexOf(':');
		if (colon === -1) throw new Error(`${file}: unparsable front-matter line: ${line}`);
		const key = line.slice(0, colon).trim();
		const value = line.slice(colon + 1).trim();

		if (indented) {
			if (!block) throw new Error(`${file}: indented key outside a block: ${line}`);
			block[key] = unquote(value);
			continue;
		}

		block = null;
		if (value === '') {
			// Either a nested block or the start of a sequence; both begin empty.
			const container = {};
			const list = [];
			data[key] = container;
			block = container;
			sequence = list;
			// Whichever fills first wins, resolved after the loop.
			data[key] = { __block: container, __list: list };
			continue;
		}
		data[key] = unquote(value);
	}

	for (const [key, value] of Object.entries(data)) {
		if (value && typeof value === 'object' && '__block' in value) {
			data[key] = value.__list.length ? value.__list : value.__block;
		}
	}
	return data;
}

function unquote(value) {
	const trimmed = value.trim();
	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1);
	}
	return trimmed;
}

function noteFiles(subdir) {
	return readdirSync(join(contentDir, subdir))
		.filter((name) => name.endsWith('.md'))
		.sort()
		.map((name) => {
			const file = `${subdir}/${name}`;
			const text = readFileSync(join(contentDir, file), 'utf8');
			return { file, name, front: parseFrontMatter(text, file) };
		});
}

function datasheetUrl(front) {
	const ds = front.datasheet;
	if (!ds || typeof ds !== 'object' || Array.isArray(ds)) return null;
	return ds.url || null;
}

const components = noteFiles('components').map(({ file, name, front }) => {
	if (front.part !== name.replace(/\.md$/, '')) {
		throw new Error(`${file}: front-matter part "${front.part}" does not match the filename`);
	}
	return {
		part: front.part,
		mpn: front.mpn,
		manufacturer: front.manufacturer,
		category: front.category,
		kind: front.kind,
		package: front.package,
		tier: front.tier,
		summary: front.summary,
		datasheet_url: datasheetUrl(front),
		file,
	};
});

// Components are keyed by C-number and read in filename order; families are
// listed by their display name, which is the order the committed index uses.
const families = noteFiles('families')
	.map(({ file, front }) => ({
		family: front.family,
		part_count: Number(front.part_count),
		categories: Array.isArray(front.categories) ? front.categories : [],
		kind: front.kind,
		summary: front.summary,
		file,
		datasheet_url: datasheetUrl(front),
	}))
	.sort((a, b) => a.family.localeCompare(b.family, 'en'));

const snapshots = new Set(
	[...noteFiles('components'), ...noteFiles('families')].map((n) => n.front.catalog_snapshot),
);
if (snapshots.size !== 1) {
	throw new Error(`notes disagree about catalog_snapshot: ${[...snapshots].join(', ')}`);
}

const index = {
	meta: {
		type: 'component-spec-notes',
		catalogSnapshotDate: [...snapshots][0],
		generated: 'from basicpart/content',
		componentCount: components.length,
		familyCount: families.length,
	},
	components,
	families,
};

const serialized = JSON.stringify(index, null, 2) + '\n';

if (process.argv.includes('--check')) {
	const current = readFileSync(indexPath, 'utf8');
	if (current !== serialized) {
		console.error('content/index.json is out of date — run node scripts/generate-content-index.js');
		process.exit(1);
	}
	console.log(`content/index.json is up to date (${components.length} components, ${families.length} families)`);
} else {
	writeFileSync(indexPath, serialized);
	const withDatasheet = components.filter((c) => c.datasheet_url).length;
	console.log(
		`Wrote content/index.json: ${components.length} components ` +
			`(${withDatasheet} with a datasheet), ${families.length} families`,
	);
}
