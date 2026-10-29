export function validSnapshotDate(value) {
	return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
		&& Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

export function snapshotMetadata(dates) {
	if (!dates.length || dates.some(date => !validSnapshotDate(date))) {
		throw new Error('Every note must carry a valid catalog_snapshot date');
	}
	const distinct = [...new Set(dates)].sort();
	return {
		catalogSnapshotDate: distinct.length === 1 ? distinct[0] : null,
		catalogSnapshotDates: distinct,
	};
}
