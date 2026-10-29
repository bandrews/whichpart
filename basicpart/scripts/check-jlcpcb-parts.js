#!/usr/bin/env node
/**
 * Independently check ordinary Extended picks, removals and price extremes.
 * Optional C-number arguments add exact checks. Saves current tier flags,
 * full price breaks and identities as evidence; never edits curated content.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PARTS_URL, PARTS_API, fetchExactPart } from './jlcpcb-api.js';
import { fetchStandardOnlyPartPage } from './jlcpcb-product-page.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));

async function main() {
	const files = fs.readdirSync(path.join(root, 'raw-data'))
		.filter(name => /^jlcpcb-basic-parts-\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort();
	const snapshotName = files.at(-1);
	if (!snapshotName) throw new Error('Collect a complete catalog snapshot first');
	const snapshot = read(`raw-data/${snapshotName}`);
	const catalog = new Map(snapshot.parts.map(part => [part.partNumber, part]));
	const picks = read('src/data/other-components.json').categories.flatMap(category => category.items);
	const diff = read('catalog-change-manifest.json');
	if (path.basename(diff.newSnapshot) !== snapshotName) throw new Error('Run npm run diff for the newest snapshot first');
	const ids = new Set([
		...picks.filter(pick => !catalog.has(pick.part) || pick.tier === 'extended').map(pick => pick.part),
		...diff.removed.map(part => part.partNumber),
		...diff.largestPriceIncreases.filter(part => part.percentChange > 0).slice(0, 3).map(part => part.partNumber),
		...diff.largestPriceDecreases.filter(part => part.percentChange < 0).slice(0, 3).map(part => part.partNumber),
		...process.argv.slice(2),
	]);
	if ([...ids].some(id => !/^C\d+$/.test(id))) throw new Error('Arguments must be exact C-numbers');
	const checks = [];
	for (const partNumber of ids) {
		const recorded = catalog.get(partNumber);
		const pick = picks.find(pick => pick.part === partNumber);
		const expectedTier = recorded?.tier || pick?.tier || null;
		try {
			let current;
			let searchIssue = null;
			try {
				current = await fetchExactPart(partNumber);
			} catch (error) {
				if (expectedTier !== 'extended' || !/public search returned zero results/.test(error.message)) throw error;
				searchIssue = error.message;
				current = await fetchStandardOnlyPartPage(partNumber);
			}
			const issues = [];
			if (expectedTier && expectedTier !== current.tier) issues.push(`Tier: ${expectedTier} -> ${current.tier}`);
			const expectedPackage = recorded?.package || pick?.package;
			if (expectedPackage && expectedPackage !== current.package) issues.push(`Package: ${expectedPackage} -> ${current.package}`);
			if (recorded && recorded.manufacturerPart !== current.manufacturerPart) issues.push('Manufacturer part number changed');
			checks.push({
				partNumber, checkedAt: new Date().toISOString(), expectedTier,
				sourceUrl: `https://jlcpcb.com/partdetail/${partNumber}`,
				status: issues.length ? 'review-required' : 'verified', issues,
				verificationMethod: current.verificationMethod || 'search-api', searchIssue,
				snapshotFirstUnitPrice: recorded?.prices?.[0]?.productPrice ?? null,
				priceBreaksMatchSnapshot: recorded ? JSON.stringify(recorded.prices) === JSON.stringify(current.prices) : null,
				current,
			});
			const price = current.prices.length ? `$${current.prices[0].productPrice}` : 'price not supplied by page verification';
			console.log(`${partNumber} (${current.manufacturerPart}): ${current.tier}, ${price}${issues.length ? `; ${issues.join('; ')}` : ''}`);
		} catch (error) {
			checks.push({ partNumber, checkedAt: new Date().toISOString(), status: 'unresolved', error: error.message });
			console.error(`${partNumber}: ${error.message}`);
		}
	}
	const report = {
		checkedAt: new Date().toISOString(), catalogSnapshot: `raw-data/${snapshotName}`,
		sourceUrl: new URL(PARTS_API, PARTS_URL).href,
		note: 'Public search without tier filters; exact C-number matching. expand requires preferredComponentFlag=true to qualify. Price/stock can move between requests.',
		checks,
	};
	const output = path.join(root, `raw-data/jlcpcb-part-checks-${report.checkedAt.slice(0, 10)}.json`);
	fs.writeFileSync(`${output}.tmp`, JSON.stringify(report, null, 2) + '\n');
	fs.renameSync(`${output}.tmp`, output);
	console.log(`Saved ${checks.length} checks to ${output}`);
	if (checks.some(check => check.status !== 'verified')) process.exitCode = 1;
}

main().catch(error => {
	console.error(`Part verification failed: ${error.stack || error.message}`);
	process.exitCode = 1;
});
