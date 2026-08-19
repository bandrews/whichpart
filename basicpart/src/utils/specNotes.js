/**
 * Loader for the AI-generated spec notes in content/.
 *
 * Every note is a lazy-loaded chunk: nothing in content/ is fetched until a
 * part detail page that has a note actually asks for it.
 */

import specIndex from '../../content/index.json';

// Lazy raw-text importers, keyed by file path.
const componentModules = import.meta.glob('../../content/components/*.md', {
	query: '?raw',
	import: 'default',
});
const familyModules = import.meta.glob('../../content/families/*.md', {
	query: '?raw',
	import: 'default',
});

// part number -> index entry
const componentByPart = new Map(specIndex.components.map((c) => [c.part, c]));

// catalog category -> family index entry
const familyByCategory = new Map();
for (const fam of specIndex.families) {
	for (const cat of fam.categories) familyByCategory.set(cat, fam);
}

function moduleFor(entry) {
	if (!entry) return null;
	const key = `../../content/${entry.file}`;
	const table = entry.file.startsWith('components/') ? componentModules : familyModules;
	return table[key] || null;
}

/**
 * Which note applies to this part?
 * Returns { type: 'component' | 'family', entry } or null.
 */
export function specNoteFor(partNumber, category) {
	const comp = componentByPart.get(partNumber);
	if (comp && moduleFor(comp)) return { type: 'component', entry: comp };
	const fam = category ? familyByCategory.get(category) : null;
	if (fam && moduleFor(fam)) return { type: 'family', entry: fam };
	return null;
}

/**
 * Load the raw Markdown for a note previously returned by specNoteFor.
 */
export function loadSpecNote(note) {
	const loader = moduleFor(note.entry);
	return loader ? loader() : Promise.reject(new Error('note not found'));
}

export const specNotesSnapshotDate = specIndex.meta.catalogSnapshotDate;
