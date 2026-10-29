import { test } from 'node:test';
import assert from 'node:assert/strict';
import { snapshotMetadata } from './content-snapshots.js';

test('refreshing one note does not falsely advance the date of older notes', () => {
	assert.deepEqual(snapshotMetadata(['2026-07-24', '2026-10-29', '2026-07-24']), {
		catalogSnapshotDate: null, catalogSnapshotDates: ['2026-07-24', '2026-10-29'],
	});
	assert.equal(snapshotMetadata(['2026-07-24']).catalogSnapshotDate, '2026-07-24');
	for (const dates of [[], ['2026-02-30'], [undefined], ['2026-7-24']]) {
		assert.throws(() => snapshotMetadata(dates), /valid catalog_snapshot/);
	}
});
