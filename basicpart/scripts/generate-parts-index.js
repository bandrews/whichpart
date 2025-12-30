#!/usr/bin/env node
/**
 * Generate a parts index file from raw scraped data
 * This creates a lookup table by part number with full metadata
 *
 * Usage: node scripts/generate-parts-index.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DATA_DIR = path.join(__dirname, '../raw-data');
const OUTPUT_DIR = path.join(__dirname, '../src/data');

async function main() {
	console.log('Generating parts index...\n');

	// Find the most recent raw data file
	const files = fs.readdirSync(RAW_DATA_DIR)
		.filter(f => f.startsWith('jlcpcb-basic-parts-') && f.endsWith('.json'))
		.sort()
		.reverse();

	if (files.length === 0) {
		console.error('No raw data files found. Run npm run scrape first.');
		process.exit(1);
	}

	const latestFile = path.join(RAW_DATA_DIR, files[0]);
	console.log(`Using raw data from: ${latestFile}`);

	const rawData = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
	const parts = rawData.parts || [];

	console.log(`Total parts: ${parts.length}\n`);

	// Create index by part number
	const index = {};

	for (const part of parts) {
		index[part.partNumber] = {
			mpn: part.manufacturerPart,
			mfr: part.manufacturer,
			cat: part.category,
			pkg: part.package,
			desc: part.description,
			attrs: part.attributes?.reduce((acc, a) => {
				acc[a.attribute_name_en] = a.attribute_value_name;
				return acc;
			}, {}),
			stock: part.stock,
			prices: part.prices?.map(p => ({
				qty: p.startNumber,
				price: p.productPrice,
			})),
			ds: part.datasheetUrl,
			lcsc: part.lcscUrl,
			tier: part.tier,
		};
	}

	// Write the index file
	const outputPath = path.join(OUTPUT_DIR, 'parts-index.json');
	fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

	console.log(`Generated parts index with ${Object.keys(index).length} parts`);
	console.log(`Output: ${outputPath}`);
}

main().catch(err => {
	console.error('Error:', err);
	process.exit(1);
});
