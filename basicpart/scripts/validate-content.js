#!/usr/bin/env node
/**
 * Checks every note in content/ against the format described in
 * content/FORMAT.md, so a malformed note is caught here rather than by a
 * reader noticing a missing row or a source marker that points nowhere.
 *
 * What it enforces:
 *   - front matter parses, carries the required keys, and agrees with the
 *     filename and with the one catalog snapshot the collection covers
 *   - body sections use the permitted headings, in the permitted order
 *   - the Key specifications table carries exactly the rows FORMAT.md fixes
 *     for the note's `kind`, in order
 *   - every value in that table carries a [n] source marker, and every marker
 *     used anywhere in the body resolves to a numbered source
 *   - the third section's heading matches how the note is actually sourced:
 *     a note with a datasheet in its front matter says "What the datasheet
 *     actually says"; one without says "What the specification implies"
 *   - the note uses only the Markdown constructs src/utils/renderSpecNote.js
 *     can render
 *
 * Usage: node scripts/validate-content.js
 */

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, '..', 'content');

const COMPONENT_ROWS = {
	microcontroller: [
		'Core and maximum clock',
		'Flash',
		'RAM',
		'Supply voltage',
		'GPIO count',
		'Notable peripherals',
		'Operating temperature',
	],
	'power-linear': [
		'Output voltage',
		'Output current',
		'Input voltage range',
		'Dropout voltage',
		'Quiescent current',
		'Output accuracy',
		'Operating temperature',
	],
	'power-switching': [
		'Output voltage',
		'Output current',
		'Input voltage range',
		'Switching frequency',
		'Efficiency',
		'Operating temperature',
	],
	'battery-management': [
		'Function',
		'Charge voltage',
		'Charge current',
		'Input voltage range',
		'Termination and status',
		'Operating temperature',
	],
	interface: [
		'Function',
		'Signalling standard',
		'Maximum data rate',
		'Supply voltage',
		'Isolation or protection',
		'Operating temperature',
	],
	logic: [
		'Function',
		'Logic family',
		'Supply voltage',
		'Output drive',
		'Propagation delay',
		'Operating temperature',
	],
	analog: [
		'Function',
		'Supply voltage',
		'Input offset voltage',
		'Gain bandwidth',
		'Output swing',
		'Supply current',
		'Operating temperature',
	],
	memory: [
		'Capacity',
		'Interface',
		'Maximum clock',
		'Supply voltage',
		'Endurance and retention',
		'Operating temperature',
	],
	clock: [
		'Nominal frequency',
		'Frequency tolerance',
		'Load capacitance',
		'Equivalent series resistance',
		'Stability over temperature',
		'Operating temperature',
	],
	'discrete-mosfet': [
		'Channel',
		'Drain-source voltage',
		'Continuous drain current',
		'On-resistance at stated drive',
		'Gate threshold',
		'Operating temperature',
	],
	'discrete-diode': [
		'Function',
		'Repetitive peak reverse voltage',
		'Average forward current',
		'Forward voltage',
		'Recovery or capacitance',
		'Operating temperature',
	],
	protection: [
		'Function',
		'Working voltage',
		'Clamping',
		'Capacitance',
		'Peak pulse rating',
		'Operating temperature',
	],
	led: [
		'Colour',
		'Forward voltage',
		'Forward current',
		'Luminous intensity',
		'Viewing angle',
		'Operating temperature',
	],
	sensor: [
		'Measurand and ranges',
		'Interface',
		'Resolution',
		'Supply voltage',
		'Supply current',
		'Operating temperature',
	],
	connector: [
		'Contact count',
		'Current rating',
		'Voltage rating',
		'Mating cycles',
		'Mounting',
		'Operating temperature',
	],
	isolation: [
		'Function',
		'Isolation rating',
		'Channel count and direction',
		'Maximum data rate',
		'Supply voltage',
		'Operating temperature',
	],
};

const FAMILY_KINDS = new Set([
	...Object.keys(COMPONENT_ROWS),
	'passive',
	'discrete',
	'electromechanical',
]);

const THIRD_SECTION = ['What the datasheet actually says', 'What the specification implies'];

const COMPONENT_SECTIONS = [
	'What it is',
	'Key specifications',
	THIRD_SECTION,
	'Watch out for',
	'In this catalog',
	'Sources',
];

// Family files describe a group rather than one part, so their sections differ
// from a component's: "What they are", their own practice section in place of
// the datasheet-versus-catalog one, the catalog-attribute mapping FORMAT.md
// requires of them, and — where the family contains individually notable parts
// — a list pointing at those component files.
const FAMILY_SECTIONS = [
	['What it is', 'What they are'],
	'The specs that matter',
	['What actually matters in practice', ...THIRD_SECTION],
	'How to read the catalog attributes',
	'Watch out for',
	'Individual notes in this collection',
	'In this catalog',
	'Sources',
];

const errors = [];
const warnings = [];

function fail(file, message) {
	errors.push(`${file}: ${message}`);
}

function warn(file, message) {
	warnings.push(`${file}: ${message}`);
}

function splitFrontMatter(text, file) {
	const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
	if (!match) {
		fail(file, 'no YAML front matter');
		return null;
	}
	const front = {};
	let block = null;
	let list = null;
	for (const rawLine of match[1].split('\n')) {
		if (!rawLine.trim()) continue;
		const indented = /^\s/.test(rawLine);
		const line = rawLine.trim();
		if (line.startsWith('- ')) {
			if (list) list.push(line.slice(2).replace(/^["']|["']$/g, ''));
			continue;
		}
		const colon = line.indexOf(':');
		if (colon === -1) {
			fail(file, `unparsable front-matter line: ${line}`);
			continue;
		}
		const key = line.slice(0, colon).trim();
		const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
		if (indented) {
			if (block) block[key] = value;
			continue;
		}
		if (value === '') {
			block = {};
			list = [];
			front[key] = { block, list };
			continue;
		}
		block = null;
		list = null;
		front[key] = value;
	}
	for (const [key, value] of Object.entries(front)) {
		if (value && typeof value === 'object' && 'block' in value) {
			front[key] = value.list.length ? value.list : value.block;
		}
	}
	return { front, body: match[2] };
}

function sectionsOf(body) {
	return [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
}

function checkSectionOrder(file, found, expected) {
	let cursor = 0;
	for (const heading of found) {
		let matched = -1;
		for (let i = cursor; i < expected.length; i++) {
			const slot = expected[i];
			const ok = Array.isArray(slot) ? slot.includes(heading) : slot === heading;
			if (ok) {
				matched = i;
				break;
			}
		}
		if (matched === -1) {
			fail(file, `unexpected or out-of-order section heading "## ${heading}"`);
			return;
		}
		cursor = matched + 1;
	}
}

function tableAfter(body, heading) {
	const start = new RegExp(`^## ${heading}\\s*$`, 'm').exec(body);
	if (!start) return null;
	const rest = body.slice(start.index + start[0].length);
	const next = /^## /m.exec(rest);
	const section = [null, next ? rest.slice(0, next.index) : rest];
	const rows = section[1]
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.startsWith('|'))
		.map((line) => line.slice(1, -1).split('|').map((cell) => cell.trim()));
	if (rows.length < 3) return null;
	return { header: rows[0], separator: rows[1], body: rows.slice(2) };
}

function sourceNumbers(body, file) {
	const re = /^## Sources\s*$([\s\S]*)$/m;
	const section = re.exec(body);
	if (!section) {
		fail(file, 'no "## Sources" section');
		return new Set();
	}
	const numbers = new Set();
	for (const m of section[1].matchAll(/^(\d+)\.\s/gm)) numbers.add(Number(m[1]));
	const expected = [...numbers].sort((a, b) => a - b);
	expected.forEach((n, i) => {
		if (n !== i + 1) fail(file, `source list is not numbered 1..n (found ${n} at position ${i + 1})`);
	});
	return numbers;
}

function checkRenderableMarkdown(file, body) {
	if (/^```/m.test(body)) fail(file, 'fenced code block: renderSpecNote.js cannot render it');
	if (/^#{4,} /m.test(body)) fail(file, 'heading deeper than ### is not rendered');
	if (/!\[[^\]]*\]\(/.test(body)) fail(file, 'image syntax is not rendered');
	// <https://…> autolinks are rendered; any other angle-bracket tag is not.
	const withoutAutolinks = body.replace(/<https?:\/\/[^\s>]+>/g, '');
	for (const m of withoutAutolinks.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g)) {
		if (m[1].toLowerCase() !== 'sub') {
			fail(file, `HTML tag <${m[1]}> is escaped by the renderer; only <sub> is supported`);
		}
	}
}

function checkNote(dir, name) {
	const file = `${dir}/${name}`;
	const text = readFileSync(join(contentDir, file), 'utf8');
	const parsed = splitFrontMatter(text, file);
	if (!parsed) return null;
	const { front, body } = parsed;
	const isComponent = dir === 'components';

	const required = isComponent
		? ['part', 'mpn', 'manufacturer', 'category', 'kind', 'package', 'tier', 'catalog_snapshot', 'summary']
		: ['family', 'part_count', 'categories', 'kind', 'catalog_snapshot', 'summary'];
	for (const key of required) {
		if (!front[key]) fail(file, `front matter is missing "${key}"`);
	}

	if (isComponent && front.part !== name.replace(/\.md$/, '')) {
		fail(file, `front-matter part "${front.part}" does not match the filename`);
	}
	if (isComponent && !['basic', 'preferred', 'extended'].includes(front.tier)) {
		fail(file, `tier "${front.tier}" is not basic, preferred or extended`);
	}
	if (front.kind && !FAMILY_KINDS.has(front.kind)) fail(file, `unknown kind "${front.kind}"`);
	if (front.summary && front.summary.length > 140) {
		fail(file, `summary is ${front.summary.length} characters; FORMAT.md caps it at 140`);
	}

	const datasheet = front.datasheet;
	const hasDatasheet = datasheet && typeof datasheet === 'object' && !Array.isArray(datasheet);
	if (hasDatasheet) {
		for (const key of ['title', 'publisher', 'url']) {
			if (!datasheet[key]) fail(file, `datasheet front matter is missing "${key}"`);
		}
	}

	const sections = sectionsOf(body);
	checkSectionOrder(file, sections, isComponent ? COMPONENT_SECTIONS : FAMILY_SECTIONS);

	const third = sections.find((h) => THIRD_SECTION.includes(h));
	if (!isComponent) {
		// Optional for family files; when present it must still be sourced honestly.
		if (third && hasDatasheet && third !== THIRD_SECTION[0]) {
			fail(file, `front matter names a datasheet, so the third section must be "## ${THIRD_SECTION[0]}"`);
		}
	} else if (!third) {
		fail(file, `no third section: expected one of ${THIRD_SECTION.map((t) => `"${t}"`).join(' or ')}`);
	} else if (hasDatasheet && third !== THIRD_SECTION[0]) {
		fail(file, `front matter names a datasheet, so the third section must be "## ${THIRD_SECTION[0]}"`);
	} else if (!hasDatasheet && third !== THIRD_SECTION[1]) {
		fail(file, `no datasheet in front matter, so the third section must be "## ${THIRD_SECTION[1]}"`);
	}

	const sources = sourceNumbers(body, file);
	for (const m of body.matchAll(/\[(\d+)\]/g)) {
		const n = Number(m[1]);
		if (!sources.has(n)) fail(file, `source marker [${n}] has no matching entry in "## Sources"`);
	}
	const cited = new Set([...body.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])));
	for (const n of sources) {
		if (!cited.has(n)) warn(file, `source ${n} is listed but never cited in the body`);
	}

	const table = tableAfter(body, isComponent ? 'Key specifications' : 'The specs that matter');
	if (!table) {
		fail(file, `no table under "## ${isComponent ? 'Key specifications' : 'The specs that matter'}"`);
	} else if (isComponent) {
		const expected = COMPONENT_ROWS[front.kind] || [];
		const actual = table.body.map((row) => row[0].replace(/\*/g, '').trim());
		if (actual.length !== expected.length || actual.some((row, i) => row !== expected[i])) {
			fail(
				file,
				`Key specifications rows do not match kind "${front.kind}".\n` +
					`    expected: ${expected.join(' | ')}\n` +
					`    found:    ${actual.join(' | ')}`,
			);
		}
		for (const row of table.body) {
			if (row[1] && !/\[\d+\]/.test(row[1])) {
				fail(file, `Key specifications row "${row[0]}" has a value with no source marker`);
			}
		}
	}

	checkRenderableMarkdown(file, body);
	return front;
}

const snapshots = new Set();
let count = 0;
for (const dir of ['components', 'families']) {
	for (const name of readdirSync(join(contentDir, dir)).sort()) {
		if (!name.endsWith('.md')) continue;
		count += 1;
		const front = checkNote(dir, name);
		if (front && front.catalog_snapshot) snapshots.add(front.catalog_snapshot);
	}
}
if (snapshots.size > 1) {
	errors.push(`notes disagree about catalog_snapshot: ${[...snapshots].join(', ')}`);
}

for (const message of warnings) console.warn(`WARN  ${message}`);
if (errors.length) {
	for (const message of errors) console.error(`ERROR ${message}`);
	console.error(`\n${errors.length} error(s) in ${count} note files.`);
	process.exit(1);
}
console.log(`content/: ${count} note files valid (snapshot ${[...snapshots][0]}), ${warnings.length} warning(s).`);
