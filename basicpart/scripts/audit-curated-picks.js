#!/usr/bin/env node
/**
 * Audit the hand-maintained "Our Picks" list against the refreshed catalog.
 *
 * Explicitly declared ordinary Extended recommendations are allowed to be
 * absent from the qualifying Basic/Preferred index. Qualifying picks must
 * match the index tier and package exactly.
 *
 * The default mode writes a manifest and exits successfully. Pass --strict to
 * return a non-zero exit status when errors are present (used by refresh/CI).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data');
const OUTPUT_PATH = path.join(__dirname, '../curated-picks-audit.json');
const strict = process.argv.includes('--strict');

function loadJson(fileName) {
	return JSON.parse(fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8'));
}

function main() {
	const picks = loadJson('other-components.json');
	const partsIndex = loadJson('parts-index.json');
	const issues = [];
	const seenParts = new Set();
	let totalPicks = 0;
	let extendedPicks = 0;

	for (const category of picks.categories || []) {
		for (const item of category.items || []) {
			totalPicks++;
			const location = `${category.name}/${item.name}`;
			const current = partsIndex[item.part];

			if (!['basic', 'preferred', 'extended'].includes(item.tier)) {
				issues.push({
					severity: 'error',
					type: 'invalid_tier',
					location,
					partNumber: item.part,
					message: `${item.part} has unsupported curated tier "${item.tier}".`,
				});
				continue;
			}

			if (seenParts.has(item.part)) {
				issues.push({
					severity: 'error',
					type: 'duplicate_pick',
					location,
					partNumber: item.part,
					message: `${item.part} appears more than once in Our Picks.`,
				});
			}
			seenParts.add(item.part);

			if (item.tier === 'extended') {
				extendedPicks++;
				if (current) {
					issues.push({
						severity: 'error',
						type: 'tier_mismatch',
						location,
						partNumber: item.part,
						message:
							`${item.part} is marked ordinary Extended, but the refreshed ` +
							`qualifying catalog says ${current.tier}.`,
						curatedTier: item.tier,
						currentTier: current.tier,
					});
				}
				continue;
			}

			if (!current) {
				issues.push({
					severity: 'error',
					type: 'not_in_qualifying_catalog',
					location,
					partNumber: item.part,
					message:
						`${item.part} is not present in the current Basic/Preferred Extended ` +
						'catalog; verify its current JLCPCB tier and remove or replace it.',
					curated: item,
				});
				continue;
			}

			if (item.tier !== current.tier) {
				issues.push({
					severity: 'error',
					type: 'tier_mismatch',
					location,
					partNumber: item.part,
					message: `${item.part} is marked ${item.tier}, but the refreshed catalog says ${current.tier}.`,
					curatedTier: item.tier,
					currentTier: current.tier,
				});
			}

			if (item.package !== current.pkg) {
				issues.push({
					severity: 'warning',
					type: 'package_label_mismatch',
					location,
					partNumber: item.part,
					message:
						`${item.part} is labeled "${item.package}" in Our Picks, while the ` +
						`catalog package is "${current.pkg}".`,
					curatedPackage: item.package,
					currentPackage: current.pkg,
				});
			}
		}
	}

	const manifest = {
		generatedAt: new Date().toISOString(),
		picksDeclaredUpdatedAt:
			picks.meta?.curatedReviewedDate ||
			picks.meta?.lastUpdated ||
			null,
		summary: {
			totalPicks,
			qualifyingPicks: totalPicks - extendedPicks,
			extendedPicks,
			validPicks: totalPicks - new Set(issues.map(issue => issue.location)).size,
			totalIssues: issues.length,
			errors: issues.filter(issue => issue.severity === 'error').length,
			warnings: issues.filter(issue => issue.severity === 'warning').length,
			byType: issues.reduce((counts, issue) => {
				counts[issue.type] = (counts[issue.type] || 0) + 1;
				return counts;
			}, {}),
		},
		issues,
	};

	fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2));
	console.log(
		`Curated picks: ${totalPicks}; ${manifest.summary.errors} errors, ` +
		`${manifest.summary.warnings} warnings`
	);
	console.log(`Manifest written to ${OUTPUT_PATH}`);

	if (strict && manifest.summary.errors > 0) {
		process.exitCode = 1;
	}
}

try {
	main();
} catch (error) {
	console.error(`Curated-picks audit failed: ${error.stack || error.message}`);
	process.exitCode = 1;
}
