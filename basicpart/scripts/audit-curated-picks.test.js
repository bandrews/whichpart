import { test } from 'node:test';
import assert from 'node:assert/strict';
import { auditCuratedPicks } from './audit-curated-picks.js';

const item = { part: 'C1', name: 'Example', tier: 'basic', package: 'SOT-23' };
const picks = items => ({ categories: [{ name: 'Example category', items }] });
const index = { C1: { tier: 'basic', pkg: 'SOT-23' }, C2: { tier: 'preferred', pkg: 'SOIC-8' } };
const selection = { partNumbers: ['C1'] };

test('a qualifying package mismatch is an error that fails the strict audit gate', () => {
	const result = auditCuratedPicks(picks([{ ...item, package: 'SOT-323' }]), index, selection);
	assert.equal(result.summary.errors, 1);
	assert.equal(result.issues[0].type, 'package_label_mismatch');
	assert.equal(result.issues[0].severity, 'error');
});

test('catalog eligibility alone does not authorize an Our Picks addition', () => {
	const addition = { part: 'C2', name: 'New suggestion', tier: 'preferred', package: 'SOIC-8' };
	const result = auditCuratedPicks(picks([item, addition]), index, selection);
	assert.equal(result.summary.errors, 1);
	assert.equal(result.issues[0].type, 'human_selection_mismatch');
	assert.equal(auditCuratedPicks(picks([item, addition]), index, { partNumbers: ['C1', 'C2'] }).summary.errors, 0);
});

test('correcting existing metadata preserves human-selected membership', () => {
	assert.equal(auditCuratedPicks(picks([{ ...item, name: 'Corrected description' }]), index, selection).summary.errors, 0);
	assert.equal(auditCuratedPicks(picks([]), index, selection).issues[0].type, 'human_selection_mismatch');
});
