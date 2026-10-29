/** Shared public JLCPCB catalog request and source validation. */
export const PARTS_URL = 'https://jlcpcb.com/parts/basic_parts';
export const PARTS_API = '/api/overseas-pcb-order/v1/shoppingCart/smtGood/selectSmtComponentList/v2';

export function searchPayload({ currentPage = 1, pageSize = 100, keyword = null, qualifyingOnly = true } = {}) {
	return {
		currentPage, pageSize, searchType: 2, keyword,
		componentLibraryType: qualifyingOnly ? 'base' : null,
		presaleType: '', preferredComponentFlag: qualifyingOnly ? true : null,
		stockFlag: null, stockSort: null, firstSortName: null, secondSortName: null,
		componentBrand: null, componentSpecification: null,
		componentAttributes: [], firstSortNameList: [], componentBrandList: [],
		componentSpecificationList: [], componentAttributeList: [],
		searchSource: 'search', presaleTypes: [],
		componentLibTypes: qualifyingOnly ? ['base'] : [], pcbAType: null,
	};
}

// Self-contained so Playwright can serialize this into the browser context.
export async function requestPage({ apiUrl, payload }) {
	const response = await fetch(apiUrl, {
		method: 'POST', headers: { 'content-type': 'application/json' },
		body: JSON.stringify(payload), signal: AbortSignal.timeout(60000),
	});
	if (!response.ok) throw new Error(`JLCPCB API returned HTTP ${response.status}`);
	const body = await response.json();
	if (body.code !== 200 || !body.data?.componentPageInfo) {
		throw new Error(`Unexpected JLCPCB API response code: ${body.code}`);
	}
	return body.data.componentPageInfo;
}

export function sourceTier(part) {
	if (typeof part.preferredComponentFlag !== 'boolean') {
		throw new Error(`Missing/invalid preferred flag for ${part.componentCode}`);
	}
	if (part.componentLibraryType === 'base') return 'basic';
	if (part.componentLibraryType === 'expand') {
		return part.preferredComponentFlag ? 'preferred' : 'extended';
	}
	throw new Error(`Unexpected library type "${part.componentLibraryType}" for ${part.componentCode}`);
}

export function normalizePart(part) {
	if (!/^C\d+$/.test(part.componentCode || '')) {
		throw new Error(`Invalid JLCPCB part number: ${part.componentCode}`);
	}
	return {
		partNumber: part.componentCode,
		manufacturerPart: part.componentModelEn, manufacturer: part.componentBrandEn,
		category: part.componentTypeEn, firstSort: part.firstSortName, secondSort: part.secondSortName,
		package: part.componentSpecificationEn, description: part.describe,
		attributes: part.attributes || [], stock: part.stockCount,
		prices: part.componentPrices || [], minOrder: part.minPurchaseNum,
		lcscUrl: part.lcscGoodsUrl, datasheetUrl: part.dataManualUrl,
		libraryType: part.componentLibraryType, preferredComponentFlag: part.preferredComponentFlag,
		tier: sourceTier(part),
	};
}

export function validatePage(result, requestedPage, expectedTotal = null, pageSize = 100) {
	if (!Number.isInteger(result?.total) || result.total < 0 || !Array.isArray(result.list)) {
		throw new Error('Invalid JLCPCB catalog page schema');
	}
	if (result.pageNum !== requestedPage || result.pageSize !== pageSize) {
		throw new Error(`Requested page ${requestedPage}/${pageSize}, received ${result.pageNum}/${result.pageSize}`);
	}
	if (expectedTotal !== null && result.total !== expectedTotal) {
		throw new Error(`Catalog total changed during pagination (${expectedTotal} -> ${result.total})`);
	}
	const expectedLength = Math.min(pageSize, Math.max(0, result.total - (requestedPage - 1) * pageSize));
	if (result.list.length !== expectedLength) {
		throw new Error(`Incomplete page ${requestedPage}: ${result.list.length} of ${expectedLength} parts`);
	}
	const codes = result.list.map(part => part.componentCode);
	if (new Set(codes).size !== codes.length) throw new Error(`Duplicate parts on page ${requestedPage}`);
}

export function exactPart(parts, partNumber) {
	const matches = parts.filter(part => part.componentCode === partNumber);
	if (matches.length !== 1) {
		throw new Error(`Expected one exact match for ${partNumber}; found ${matches.length}`);
	}
	return matches[0];
}

export async function fetchExactPart(partNumber) {
	if (!/^C\d+$/.test(partNumber)) throw new Error(`Invalid part number: ${partNumber}`);
	const rows = [];
	let total = null;
	for (let currentPage = 1; currentPage === 1 || rows.length < total; currentPage++) {
		const result = await requestPage({
			apiUrl: new URL(PARTS_API, PARTS_URL).href,
			payload: searchPayload({ currentPage, keyword: partNumber, qualifyingOnly: false }),
		});
		// The search API represents no results as list:null/pageSize:0. This
		// is an unresolved lookup, never evidence of an ordinary Extended tier.
		if (currentPage === 1 && result.total === 0 && (result.list === null || result.list?.length === 0)) {
			throw new Error(`No exact match for ${partNumber}: public search returned zero results`);
		}
		validatePage(result, currentPage, total);
		total = result.total;
		rows.push(...result.list);
		// Search is fuzzy: select by the C-number, never by result order or MPN.
		if (rows.some(part => part.componentCode === partNumber)) return normalizePart(exactPart(rows, partNumber));
	}
	return normalizePart(exactPart(rows, partNumber));
}
