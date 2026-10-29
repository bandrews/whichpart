import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sourceTier, normalizePart, searchPayload, validatePage, exactPart, fetchExactPart } from './jlcpcb-api.js';

test('ordinary Extended and Preferred share expand; the preferred flag distinguishes them', () => {
	assert.equal(sourceTier({ componentLibraryType: 'base', preferredComponentFlag: false }), 'basic');
	assert.equal(sourceTier({ componentLibraryType: 'expand', preferredComponentFlag: true }), 'preferred');
	assert.equal(sourceTier({ componentLibraryType: 'expand', preferredComponentFlag: false }), 'extended');
	for (const flag of [undefined, null, 'false', 0]) {
		assert.throws(() => sourceTier({ componentLibraryType: 'expand', preferredComponentFlag: flag }), /preferred flag/);
	}
	assert.throws(() => sourceTier({ componentLibraryType: 'new-tier', preferredComponentFlag: false }), /library type/);
});

test('exact-part checks do not apply the qualifying filter and preserve source tier evidence', () => {
	const payload = searchPayload({ keyword: 'C2040', qualifyingOnly: false });
	assert.equal(payload.preferredComponentFlag, null);
	assert.equal(payload.componentLibraryType, null);
	assert.deepEqual(payload.componentLibTypes, []);
	const part = normalizePart({ componentCode: 'C2040', componentLibraryType: 'expand', preferredComponentFlag: false });
	assert.equal(part.tier, 'extended');
	assert.equal(part.preferredComponentFlag, false);
	assert.equal(searchPayload().preferredComponentFlag, true);
});

test('pagination rejects wrong first pages, truncated pages, changed totals, and duplicate rows', () => {
	const list = [{ componentCode: 'C1' }, { componentCode: 'C2' }];
	const page = { total: 3, pageNum: 1, pageSize: 2, list };
	validatePage(page, 1, null, 2);
	validatePage({ ...page, pageNum: 2, list: [{ componentCode: 'C3' }] }, 2, 3, 2);
	assert.throws(() => validatePage({ ...page, pageNum: 2 }, 1, null, 2), /Requested page/);
	assert.throws(() => validatePage({ ...page, list: list.slice(0, 1) }, 1, null, 2), /Incomplete page/);
	assert.throws(() => validatePage(page, 1, 4, 2), /total changed/);
	assert.throws(() => validatePage({ ...page, list: [list[0], list[0]] }, 1, null, 2), /Duplicate/);
	assert.throws(() => validatePage(page, 1, null, 100), /Requested page/);
});

test('part checks reject fuzzy and duplicate matches rather than checking a different component', () => {
	const rows = [{ componentCode: 'C20401' }, { componentCode: 'C2040' }];
	assert.equal(exactPart(rows, 'C2040'), rows[1]);
	assert.throws(() => exactPart(rows, 'C204'), /found 0/);
	assert.throws(() => exactPart([...rows, rows[1]], 'C2040'), /found 2/);
});

test('an empty search is unresolved and never becomes an Extended classification', async t => {
	t.mock.method(globalThis, 'fetch', async () => ({
		ok: true,
		json: async () => ({ code: 200, data: { componentPageInfo: { total: 0, list: null, pageNum: 1, pageSize: 0 } } }),
	}));
	await assert.rejects(fetchExactPart('C114586'), /public search returned zero results/);
	// Empty search results are understood only by the exact-part checker;
	// the full catalog collector must still refuse an empty snapshot.
	assert.throws(() => validatePage({ total: 0, list: null, pageNum: 1, pageSize: 0 }, 1), /schema/);
});
