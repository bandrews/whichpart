import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseStandardOnlyPartPage } from './jlcpcb-product-page.js';

const page = `<script type="application/ld+json">{"@type":"Product","sku":"C114586","mpn":"WS2812B-B/W","brand":{"name":"Worldsemi"}}</script>
<h1>WS2812B-B/W</h1><span>Extended</span><dl>
<dt>JLCPCB Part #</dt><dd>C114586</dd>
<dt>MFR.Part #</dt><dd>WS2812B-B/W</dd>
<dt>Manufacturer</dt><dd>Worldsemi</dd>
<dt>Package</dt><dd><span>SMD5050-4P</span></dd>
<dt>PCBA Type</dt><dd>Standard Only</dd></dl>`;

test('Standard-only fallback verifies identity without inventing API flags or prices', () => {
	const part = parseStandardOnlyPartPage(page, 'C114586');
	assert.equal(part.tier, 'extended');
	assert.equal(part.package, 'SMD5050-4P');
	assert.equal(part.pcbaType, 'Standard Only');
	assert.equal(part.preferredComponentFlag, null);
	assert.deepEqual(part.prices, []);
});

test('a generic Extended heading alone cannot establish ordinary Extended status', () => {
	assert.throws(() => parseStandardOnlyPartPage(page.replace('Standard Only', 'Economic and Standard'), 'C114586'), /Cannot establish/);
	assert.throws(() => parseStandardOnlyPartPage(page.replace('<span>Extended</span>', '<span>Preferred Extended</span>'), 'C114586'), /Cannot establish/);
	assert.throws(() => parseStandardOnlyPartPage(page, 'C2040'), /exactly one/);
	assert.throws(() => parseStandardOnlyPartPage(page.replace('<dd>WS2812B-B/W</dd>', '<dd>WS2812B-V6</dd>'), 'C114586'), /disagreement/);
});
