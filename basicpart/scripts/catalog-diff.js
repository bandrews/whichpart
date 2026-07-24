#!/usr/bin/env node
/**
 * Compare the two newest complete JLCPCB snapshots.
 *
 * Usage:
 *   npm run diff
 *   node scripts/catalog-diff.js old.json new.json [output.json]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RAW_DATA_DIR = path.join(__dirname, '../raw-data');
const DEFAULT_OUTPUT = path.join(__dirname, '../catalog-change-manifest.json');

function loadSnapshot(filePath) {
	const snapshot = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	if (!Array.isArray(snapshot.parts) || snapshot.parts.length === 0) {
		throw new Error(`${filePath} does not contain a non-empty parts array`);
	}
	if (
		snapshot.totalExpected !== snapshot.parts.length ||
		snapshot.totalScraped !== snapshot.parts.length
	) {
		throw new Error(
			`${filePath} is incomplete: expected ${snapshot.totalExpected}, ` +
			`scraped ${snapshot.totalScraped}, stored ${snapshot.parts.length}`
		);
	}

	const byPart = new Map();
	for (const part of snapshot.parts) {
		if (!/^C\d+$/.test(part.partNumber || '')) {
			throw new Error(`${filePath} contains an invalid part number: ${part.partNumber}`);
		}
		if (byPart.has(part.partNumber)) {
			throw new Error(`${filePath} contains duplicate part ${part.partNumber}`);
		}
		if (!['basic', 'preferred'].includes(part.tier)) {
			throw new Error(`${filePath} contains unexpected tier "${part.tier}"`);
		}
		byPart.set(part.partNumber, part);
	}

	return { snapshot, byPart };
}

function partSummary(part) {
	return {
		partNumber: part.partNumber,
		manufacturerPart: part.manufacturerPart,
		manufacturer: part.manufacturer,
		category: part.category,
		package: part.package,
		description: part.description,
		tier: part.tier,
		stock: part.stock,
		firstUnitPrice: part.prices?.[0]?.productPrice ?? null,
	};
}

function tierCounts(parts) {
	return parts.reduce((counts, part) => {
		counts[part.tier] = (counts[part.tier] || 0) + 1;
		return counts;
	}, {});
}

function priceChange(oldPart, newPart) {
	const oldPrice = oldPart.prices?.[0]?.productPrice ?? null;
	const newPrice = newPart.prices?.[0]?.productPrice ?? null;
	const percentChange =
		typeof oldPrice === 'number' && oldPrice !== 0 && typeof newPrice === 'number'
			? Number((((newPrice - oldPrice) / oldPrice) * 100).toFixed(2))
			: null;

	return {
		partNumber: newPart.partNumber,
		manufacturerPart: newPart.manufacturerPart,
		category: newPart.category,
		tier: newPart.tier,
		oldFirstUnitPrice: oldPrice,
		newFirstUnitPrice: newPrice,
		percentChange,
		oldPriceBreaks: oldPart.prices?.length || 0,
		newPriceBreaks: newPart.prices?.length || 0,
	};
}

function resolvePaths() {
	const args = process.argv.slice(2);
	if (args.length >= 2) {
		return {
			oldPath: path.resolve(args[0]),
			newPath: path.resolve(args[1]),
			outputPath: args[2] ? path.resolve(args[2]) : DEFAULT_OUTPUT,
		};
	}

	const snapshots = fs.readdirSync(RAW_DATA_DIR)
		.filter(file => /^jlcpcb-basic-parts-\d{4}-\d{2}-\d{2}\.json$/.test(file))
		.sort();
	if (snapshots.length < 2) {
		throw new Error('At least two dated raw snapshots are required for a catalog diff');
	}

	return {
		oldPath: path.join(RAW_DATA_DIR, snapshots.at(-2)),
		newPath: path.join(RAW_DATA_DIR, snapshots.at(-1)),
		outputPath: DEFAULT_OUTPUT,
	};
}

function main() {
	const { oldPath, newPath, outputPath } = resolvePaths();
	const oldData = loadSnapshot(oldPath);
	const newData = loadSnapshot(newPath);
	const added = [];
	const removed = [];
	const tierChanges = [];
	const priceChanges = [];

	for (const [partNumber, newPart] of newData.byPart) {
		const oldPart = oldData.byPart.get(partNumber);
		if (!oldPart) {
			added.push(partSummary(newPart));
			continue;
		}
		if (oldPart.tier !== newPart.tier) {
			tierChanges.push({
				...partSummary(newPart),
				oldTier: oldPart.tier,
				newTier: newPart.tier,
			});
		}
		if (JSON.stringify(oldPart.prices || []) !== JSON.stringify(newPart.prices || [])) {
			priceChanges.push(priceChange(oldPart, newPart));
		}
	}

	for (const [partNumber, oldPart] of oldData.byPart) {
		if (!newData.byPart.has(partNumber)) {
			removed.push(partSummary(oldPart));
		}
	}

	const comparablePriceChanges = priceChanges.filter(change => change.percentChange !== null);
	const manifest = {
		generatedAt: new Date().toISOString(),
		oldSnapshot: path.relative(path.dirname(outputPath), oldPath),
		newSnapshot: path.relative(path.dirname(outputPath), newPath),
		summary: {
			oldTotal: oldData.snapshot.parts.length,
			newTotal: newData.snapshot.parts.length,
			oldTierCounts: tierCounts(oldData.snapshot.parts),
			newTierCounts: tierCounts(newData.snapshot.parts),
			added: added.length,
			removed: removed.length,
			tierChanges: tierChanges.length,
			priceChanges: priceChanges.length,
			priceIncreases: comparablePriceChanges.filter(change => change.percentChange > 0).length,
			priceDecreases: comparablePriceChanges.filter(change => change.percentChange < 0).length,
			unchangedFirstPrice: comparablePriceChanges.filter(change => change.percentChange === 0).length,
		},
		added,
		removed,
		tierChanges,
		largestPriceIncreases: [...comparablePriceChanges]
			.sort((a, b) => b.percentChange - a.percentChange)
			.slice(0, 25),
		largestPriceDecreases: [...comparablePriceChanges]
			.sort((a, b) => a.percentChange - b.percentChange)
			.slice(0, 25),
		priceChanges,
	};

	fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
	console.log(`Compared ${path.basename(oldPath)} -> ${path.basename(newPath)}`);
	console.log(
		`Catalog: ${manifest.summary.oldTotal} -> ${manifest.summary.newTotal}; ` +
		`added ${added.length}, removed ${removed.length}, tier changes ${tierChanges.length}`
	);
	console.log(
		`Pricing changed for ${priceChanges.length} parts ` +
		`(${manifest.summary.priceIncreases} increases, ` +
		`${manifest.summary.priceDecreases} decreases)`
	);
	console.log(`Manifest written to ${outputPath}`);
}

try {
	main();
} catch (error) {
	console.error(`Catalog diff failed: ${error.stack || error.message}`);
	process.exitCode = 1;
}
