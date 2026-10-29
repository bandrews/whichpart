import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { applySpecificationReview } from './specification-reviews.js';

const reviews = JSON.parse(readFileSync(new URL('../src/data/specification-reviews.json', import.meta.url)));
const raw = JSON.parse(readFileSync(new URL('../raw-data/jlcpcb-basic-parts-2026-10-29.json', import.meta.url))).parts;
const source = id => {
	const part = raw.find(part => part.partNumber === id);
	return { mpn: part.manufacturerPart, pkg: part.package, desc: part.description,
		attrs: Object.fromEntries(part.attributes.map(a => [a.attribute_name_en, a.attribute_value_name])) };
};

test('manufacturer review applies the low-voltage bidirectional leakage footnote and keeps source evidence', () => {
	const original = source('C78395');
	const result = applySpecificationReview(original, reviews.C78395);
	assert.match(result.attrs['Reverse Leakage Current (Ir)'], /^2mA max/);
	assert.ok(!result.desc.includes('1uA'));
	assert.equal(result.catalogOriginal.attributes['Reverse Leakage Current (Ir)'], '1mA');
	assert.equal(original.attrs['Reverse Leakage Current (Ir)'], '1mA');
});

test('confirmed resistor description is corrected and SM08 topology is documented', () => {
	const resistor = applySpecificationReview(source('C25190'), reviews.C25190);
	assert.ok(resistor.desc.includes('±100ppm/℃'));
	assert.ok(resistor.catalogOriginal.description.includes('±200ppm/℃'));
	assert.match(applySpecificationReview(source('C42413902'), reviews.C42413902).specificationReview.summary, /common anode at pin 3/);
});

test('SMF/SMAJ bidirectional footnotes and stale description ratings are corrected together', () => {
	const smf = applySpecificationReview(source('C19077496'), reviews.C19077496);
	assert.match(smf.attrs['Reverse Leakage Current (Ir)'], /^1mA max/);
	assert.ok(smf.desc.includes('22.7A@10/1000us'));
	assert.ok(!smf.desc.includes('7.3V'));
	const smaj = applySpecificationReview(source('C19077522'), reviews.C19077522);
	assert.match(smaj.attrs['Reverse Leakage Current (Ir)'], /^1.6mA max/);
	assert.ok(!smaj.desc.includes('600uA'));
	assert.ok(!smaj.desc.includes('9V'));
});

test('changed identities or source ratings require a new review instead of blindly carrying an override forward', () => {
	const part = source('C78395');
	assert.throws(() => applySpecificationReview({ ...part, mpn: 'Different part' }, reviews.C78395), /identity changed/);
	assert.throws(() => applySpecificationReview({ ...part, attrs: { ...part.attrs, 'Reverse Leakage Current (Ir)': '50nA' } }, reviews.C78395), /Source attribute changed/);
	assert.throws(() => applySpecificationReview({ ...part, desc: 'Different description' }, reviews.C78395), /Source description changed/);
});
