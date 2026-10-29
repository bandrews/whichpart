/** Apply manufacturer-backed corrections without erasing distributor evidence. */
export function applySpecificationReview(part, review) {
	if (!review) return part;
	if (!part || part.mpn !== review.mpn || part.pkg !== review.package) {
		throw new Error(`Specification review identity changed for ${review.mpn}`);
	}
	for (const [name, expected] of Object.entries(review.expectedAttributes)) {
		if (part.attrs?.[name] !== expected) {
			throw new Error(`Source attribute changed for ${part.mpn}: ${name}; re-review its correction`);
		}
	}
	let desc = part.desc;
	for (const { from, to } of review.descriptionReplacements || []) {
		if (typeof desc !== 'string' || !desc.includes(from)) {
			throw new Error(`Source description changed for ${part.mpn}; re-review its correction`);
		}
		desc = desc.replace(from, to);
	}
	return {
		...part, desc, attrs: { ...part.attrs, ...review.attributes },
		catalogOriginal: { description: part.desc, attributes: part.attrs },
		specificationReview: { date: review.date, summary: review.summary, source: review.source },
	};
}
