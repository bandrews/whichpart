import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const entries = read('../src/data/changelog.json');

test('changelog covers current snapshot and preserves truthful review dates', () => {
  const catalog = read('../src/data/resistors.json');
  const picks = read('../src/data/other-components.json');
  assert.ok(entries.length > 0);
  assert.equal(entries[0].catalogSnapshotDate, catalog.meta.lastUpdated);
  assert.equal(entries[0].curatedReviewedDate, picks.meta.curatedReviewedDate);
  const dates = entries.map(entry => entry.date);
  assert.equal(new Set(dates).size, dates.length);
  assert.deepEqual(dates, [...dates].sort().reverse());
  for (const entry of entries) {
    for (const key of ['date', 'catalogSnapshotDate', 'curatedReviewedDate']) {
      assert.match(entry[key], /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(entry[key]).toISOString().slice(0, 10), entry[key]);
    }
    assert.ok(entry.catalogSnapshotDate <= entry.date);
    assert.ok(entry.curatedReviewedDate <= entry.date);
    for (const key of ['title', 'summary', 'caveat']) assert.ok(entry[key]?.trim());
    assert.ok(entry.changes.length > 0);
    assert.ok(entry.sources.length > 0);
    for (const source of entry.sources) {
      assert.ok(source.label.trim());
      assert.equal(new URL(source.url).protocol, 'https:');
    }
  }
});
