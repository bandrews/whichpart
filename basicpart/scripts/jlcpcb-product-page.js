/** Strict fallback for Standard-only listings omitted by the public search. */
const text = html => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&')
	.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').trim();

export function parseStandardOnlyPartPage(html, partNumber) {
	const products = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
		.map(match => JSON.parse(match[1]))
		.filter(value => value['@type'] === 'Product' && value.sku === partNumber);
	if (products.length !== 1) throw new Error(`Product page must identify exactly one ${partNumber}`);
	const product = products[0];
	const definitions = [...html.matchAll(/<dl\b[^>]*>([\s\S]*?)<\/dl>/g)].map(match =>
		Object.fromEntries([...match[1].matchAll(/<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/g)]
			.map(pair => [text(pair[1]), text(pair[2])])));
	const record = definitions.find(item => item['JLCPCB Part #'] === partNumber);
	if (!record || !record.Package || record['MFR.Part #'] !== product.mpn || record.Manufacturer !== product.brand?.name) {
		throw new Error(`Product-page identity/package disagreement for ${partNumber}`);
	}
	const headingContext = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>([\s\S]*?)<dl\b/);
	if (record['PCBA Type'] !== 'Standard Only' || !headingContext || !/>\s*Extended\s*</.test(headingContext[1])) {
		throw new Error(`Cannot establish Standard-only Extended status for ${partNumber}`);
	}
	return {
		partNumber, manufacturerPart: product.mpn, manufacturer: product.brand.name,
		package: record.Package, category: product.category,
		tier: 'extended', pcbaType: 'Standard Only',
		// Do not invent the missing API flag or mistake JSON-LD's lowest offer
		// for a first-unit quote. The page proves identity/service, not API data.
		libraryType: null, preferredComponentFlag: null, stock: null, prices: [], attributes: [],
		verificationMethod: 'product-page',
		tierEvidence: 'Exact Product SKU and identity match; page badge Extended and PCBA Type Standard Only. No Economic PCBA Preferred exemption is offered.',
		sourceUrl: `https://jlcpcb.com/partdetail/${partNumber}`,
	};
}

export async function fetchStandardOnlyPartPage(partNumber) {
	if (!/^C\d+$/.test(partNumber)) throw new Error(`Invalid part number: ${partNumber}`);
	const response = await fetch(`https://jlcpcb.com/partdetail/${partNumber}`, { signal: AbortSignal.timeout(60000) });
	if (!response.ok) throw new Error(`JLCPCB product page returned HTTP ${response.status}`);
	return parseStandardOnlyPartPage(await response.text(), partNumber);
}
