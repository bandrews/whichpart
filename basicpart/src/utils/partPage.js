/**
 * What this site can say about a part, and therefore whether a part detail
 * page is worth linking to.
 *
 * Three sources describe parts, and they do not cover the same set:
 *
 *   - `parts-index.json` — the qualifying Basic/Preferred Extended snapshot.
 *     Full catalog data: attributes, price breaks, stock, datasheet link.
 *   - `other-components.json` — the curated "Our Picks" list, which may also
 *     recommend ordinary Extended parts. Name, description, package, tier and
 *     an editorial note.
 *   - `content/index.json` — the spec notes, which cover every pick and every
 *     non-commodity qualifying part. MPN, manufacturer, category, package,
 *     tier, a summary and the datasheet the note was written from.
 *
 * A curated Extended pick is absent from the first source but present in the
 * other two, so the site has plenty to show for it. Anything that reads
 * `parts-index.json` alone will wrongly conclude it has nothing.
 */

import partsIndex from '../data/parts-index.json';
import curatedComponents from '../data/other-components.json';
import specIndex from '../../content/index.json';

const specEntryByPart = new Map(specIndex.components.map((c) => [c.part, c]));

const curatedByPart = new Map();
for (const category of curatedComponents.categories || []) {
	for (const item of category.items || []) {
		if (item.part) curatedByPart.set(item.part, { ...item, group: category.name });
	}
}

/** The curated "Our Picks" entry for a part, or null. */
export function curatedPickFor(partNumber) {
	return curatedByPart.get(partNumber) || null;
}

/** The spec note's index entry for a part, or null. Carries its front matter. */
export function specEntryFor(partNumber) {
	return specEntryByPart.get(partNumber) || null;
}

/**
 * Does /part/:id have something to show for this part?
 *
 * True when any of the three sources knows it. Used to decide whether a part
 * number links to this site's own detail page or straight out to JLCPCB.
 */
export function hasPartPage(partNumber) {
	if (!partNumber) return false;
	return (
		Boolean(partsIndex[partNumber]) ||
		specEntryByPart.has(partNumber) ||
		curatedByPart.has(partNumber)
	);
}
