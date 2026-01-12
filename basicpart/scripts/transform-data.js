#!/usr/bin/env node
/**
 * Transform raw scraped JLCPCB data into the site's data schema
 *
 * This script takes the raw JSON from the scraper and transforms it into
 * the format used by our components.
 *
 * Usage: npm run transform
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DATA_DIR = path.join(__dirname, '../raw-data');
const OUTPUT_DIR = path.join(__dirname, '../src/data');

/**
 * Parse resistance value from description
 * Returns value in ohms
 */
function parseResistance(desc, attrs) {
	if (!desc && !attrs) return null;

	// Try to find resistance in attributes
	const resistanceAttr = attrs?.find(a =>
		a.attribute_name_en?.toLowerCase().includes('resistance')
	);
	if (resistanceAttr) {
		// Case-sensitive matching for m (milli) vs M (mega)
		const match = resistanceAttr.attribute_value_name?.match(/^([\d.]+)\s*(m|k|M|G)?Ω?/);
		if (match) {
			let value = parseFloat(match[1]);
			const unit = match[2];
			switch (unit) {
				case 'm': value *= 0.001; break;
				case 'k':
				case 'K': value *= 1000; break;
				case 'M': value *= 1000000; break;
				case 'G': value *= 1000000000; break;
			}
			return value;
		}
	}

	// Try to parse from description - case-sensitive for m vs M
	const match = desc?.match(/([\d.]+)\s*(m|k|M|G)?Ω/);
	if (match) {
		let value = parseFloat(match[1]);
		const unit = match[2];
		switch (unit) {
			case 'm': value *= 0.001; break;
			case 'k':
			case 'K': value *= 1000; break;
			case 'M': value *= 1000000; break;
			case 'G': value *= 1000000000; break;
		}
		return value;
	}

	return null;
}

/**
 * Format resistance for display (without Ω symbol - component adds it)
 * Uses uppercase M for mega, lowercase m for milli
 */
function formatResistance(ohms) {
	if (ohms === 0) return '0';
	if (ohms < 1) {
		const mOhms = ohms * 1000;
		// Format milliohms nicely
		if (mOhms % 1 === 0) return `${mOhms}m`;
		return `${mOhms.toFixed(1).replace(/\.0$/, '')}m`;
	}
	if (ohms < 1000) {
		// Format plain ohms
		if (ohms % 1 === 0) return `${ohms}`;
		return `${ohms.toFixed(1).replace(/\.0$/, '')}`;
	}
	if (ohms < 1000000) {
		const k = ohms / 1000;
		if (k % 1 === 0) return `${k}k`;
		return `${k.toFixed(1).replace(/\.0$/, '')}k`;
	}
	// Megaohms - uppercase M
	const M = ohms / 1000000;
	if (M % 1 === 0) return `${M}M`;
	return `${M.toFixed(1).replace(/\.0$/, '')}M`;
}

/**
 * Parse capacitance value from description
 * Returns { value: number, unit: string } in farads
 */
function parseCapacitance(desc, attrs) {
	if (!desc && !attrs) return null;

	// Try attributes first
	const capAttr = attrs?.find(a =>
		a.attribute_name_en?.toLowerCase().includes('capacitance')
	);
	if (capAttr) {
		const match = capAttr.attribute_value_name?.match(/^([\d.]+)\s*(p|n|µ|u|m)?F?/i);
		if (match) {
			let value = parseFloat(match[1]);
			let unit = match[2]?.toLowerCase() || '';
			if (unit === 'µ') unit = 'u';
			return { value, unit, display: `${match[1]}${unit}F` };
		}
	}

	// Try description
	const match = desc?.match(/([\d.]+)\s*(p|n|µ|u|m)?F/i);
	if (match) {
		let value = parseFloat(match[1]);
		let unit = match[2]?.toLowerCase() || '';
		if (unit === 'µ') unit = 'u';
		return { value, unit, display: `${match[1]}${unit}F` };
	}

	return null;
}

/**
 * Extract voltage rating from description or attributes
 */
function parseVoltage(desc, attrs) {
	const voltAttr = attrs?.find(a =>
		a.attribute_name_en?.toLowerCase().includes('voltage') &&
		!a.attribute_name_en?.toLowerCase().includes('breakdown')
	);
	if (voltAttr) {
		// Handle kV (kilovolts) and regular V
		const match = voltAttr.attribute_value_name?.match(/(\d+(?:\.\d+)?)\s*(k)?V/i);
		if (match) {
			const value = match[1];
			const isKilo = match[2]?.toLowerCase() === 'k';
			return isKilo ? `${value}kV` : `${value}V`;
		}
	}

	// Try description - handle kV and V
	const match = desc?.match(/(\d+(?:\.\d+)?)\s*(k)?V(?:DC)?/i);
	if (match) {
		const value = match[1];
		const isKilo = match[2]?.toLowerCase() === 'k';
		return isKilo ? `${value}kV` : `${value}V`;
	}

	return null;
}

/**
 * Extract dielectric type from description or attributes
 */
function parseDielectric(desc, attrs) {
	// Try attributes first (Temperature Coefficient)
	const dielectricAttr = attrs?.find(a =>
		a.attribute_name_en?.toLowerCase().includes('temperature coefficient') ||
		a.attribute_name_en?.toLowerCase().includes('dielectric')
	);
	if (dielectricAttr) {
		const match = dielectricAttr.attribute_value_name?.match(/(C0G|NP0|X5R|X7R|X5V|Y5V)/i);
		if (match) return match[1].toUpperCase();
	}

	// Try description
	const match = desc?.match(/(C0G|NP0|X5R|X7R|X5V|Y5V)/i);
	return match ? match[1].toUpperCase() : null;
}

/**
 * Normalize package size
 */
function normalizePackage(pkg) {
	if (!pkg) return null;

	// Common SMD sizes
	const smdMatch = pkg.match(/(0201|0402|0603|0805|1206|1210|1812|2010|2512)/);
	if (smdMatch) return smdMatch[1];

	// SOD/SOT packages
	const sodMatch = pkg.match(/(SOD-\d+|SOT-\d+(?:-\d+)?)/i);
	if (sodMatch) return sodMatch[1].toUpperCase();

	return pkg;
}

/**
 * Transform resistor data
 */
function transformResistors(parts) {
	const columns = ['0402', '0603', '0805', '1206'];
	const data = {};

	// Filter for individual resistors, excluding networks/arrays
	const resistors = parts.filter(p => {
		const cat = p.category?.toLowerCase() || '';
		const firstSort = p.firstSort?.toLowerCase() || '';
		const isResistor = cat.includes('resistor') || firstSort.includes('resistor');
		const isNetwork = cat.includes('network') || cat.includes('array');
		return isResistor && !isNetwork;
	});

	console.log(`  Found ${resistors.length} resistors`);

	for (const part of resistors) {
		const resistance = parseResistance(part.description, part.attributes);
		const pkg = normalizePackage(part.package);

		if (resistance !== null && columns.includes(pkg)) {
			const key = String(resistance);

			if (!data[key]) {
				data[key] = {
					display: formatResistance(resistance),
				};
			}

			if (!data[key][pkg]) {
				data[key][pkg] = {
					part: part.partNumber,
					tier: part.tier || 'basic',
				};
			}
		}
	}

	return {
		meta: {
			type: 'resistor',
			lastUpdated: new Date().toISOString().split('T')[0],
			columns,
			rowKey: 'value',
			rowLabel: 'Resistance',
		},
		data,
	};
}

/**
 * Transform ceramic capacitor data
 */
function transformCeramicCapacitors(parts) {
	const columns = ['0402', '0603', '0805', '1206'];
	const data = {};

	// Match any capacitor that is MLCC/Ceramic
	const capacitors = parts.filter(p =>
		p.category?.toLowerCase().includes('capacitor') ||
		p.firstSort?.toLowerCase().includes('capacitor') ||
		p.category?.toLowerCase().includes('mlcc')
	);

	console.log(`  Found ${capacitors.length} ceramic capacitors`);

	for (const part of capacitors) {
		const cap = parseCapacitance(part.description, part.attributes);
		const voltage = parseVoltage(part.description, part.attributes);
		const dielectric = parseDielectric(part.description, part.attributes);
		const pkg = normalizePackage(part.package);

		if (cap && columns.includes(pkg)) {
			const key = `${cap.display}_${voltage || 'Unknown'}_${dielectric || 'Unknown'}`;

			if (!data[key]) {
				data[key] = {
					display: cap.display,
					voltage: voltage || 'Unknown',
					dielectric: dielectric || 'Unknown',
				};
			}

			if (!data[key][pkg]) {
				data[key][pkg] = {
					part: part.partNumber,
					tier: part.tier || 'basic',
				};
			}
		}
	}

	return {
		meta: {
			type: 'ceramic-capacitor',
			lastUpdated: new Date().toISOString().split('T')[0],
			columns,
			rowKey: 'capacitance',
			rowLabel: 'Capacitance',
		},
		data,
	};
}

/**
 * Transform electrolytic/tantalum capacitor data
 */
function transformElectrolyticCapacitors(parts) {
	const columns = ['CASE-A-3216-18(mm)', 'CASE-B-3528-21(mm)', 'CASE-C-6032-28(mm)', 'CASE-D-7343-31(mm)'];
	const data = {};

	const capacitors = parts.filter(p =>
		p.category?.toLowerCase().includes('tantalum') ||
		p.category?.toLowerCase().includes('electrolytic') ||
		p.category?.toLowerCase().includes('aluminum')
	);

	console.log(`  Found ${capacitors.length} electrolytic/tantalum capacitors`);

	for (const part of capacitors) {
		const cap = parseCapacitance(part.description, part.attributes);
		const voltage = parseVoltage(part.description, part.attributes);
		let pkg = part.package;

		if (cap) {
			const key = `${cap.display}_${voltage || 'Unknown'}`;

			if (!data[key]) {
				data[key] = {
					display: cap.display,
					voltage: voltage || 'Unknown',
				};
			}

			// Normalize package name
			if (pkg && columns.includes(pkg)) {
				if (!data[key][pkg]) {
					data[key][pkg] = {
						part: part.partNumber,
						tier: part.tier || 'basic',
					};
				}
			}
		}
	}

	return {
		meta: {
			type: 'electrolytic-capacitor',
			lastUpdated: new Date().toISOString().split('T')[0],
			columns,
			rowKey: 'capacitance',
			rowLabel: 'Capacitance',
		},
		data,
	};
}

/**
 * Transform diode data
 */
function transformDiodes(parts) {
	const columns = ['SOD-123', 'SOD-323', 'SOD-523', 'SOT-23', 'SOT-23-3', 'SOT-23-5', 'SOT-23-6'];
	const data = {};

	const diodes = parts.filter(p =>
		p.category?.toLowerCase().includes('diode') ||
		p.firstSort?.toLowerCase().includes('diode') ||
		p.description?.toLowerCase().includes('schottky') ||
		p.description?.toLowerCase().includes('zener') ||
		p.description?.toLowerCase().includes('tvs') ||
		p.description?.toLowerCase().includes('esd')
	);

	console.log(`  Found ${diodes.length} diodes`);

	for (const part of diodes) {
		const pkg = normalizePackage(part.package);
		if (!pkg) continue;

		// Determine diode type
		let diodeType = 'general';
		const descLower = part.description?.toLowerCase() || '';
		if (descLower.includes('schottky')) diodeType = 'schottky';
		else if (descLower.includes('zener')) diodeType = 'zener';
		else if (descLower.includes('tvs') || descLower.includes('esd')) diodeType = 'tvs';
		else if (descLower.includes('switching') || descLower.includes('1n4148')) diodeType = 'switching';

		// Create a key from the description or model
		const key = part.manufacturerPart || part.partNumber;

		if (!data[key]) {
			data[key] = {
				display: part.manufacturerPart || part.partNumber,
				type: diodeType,
				description: part.description,
			};
		}

		if (!data[key][pkg]) {
			data[key][pkg] = {
				part: part.partNumber,
				tier: part.tier || 'basic',
			};
		}
	}

	return {
		meta: {
			type: 'diode',
			lastUpdated: new Date().toISOString().split('T')[0],
			columns,
			rowKey: 'model',
			rowLabel: 'Model',
		},
		data,
	};
}

async function main() {
	console.log('Transforming scraped data...\n');

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

	// Handle both formats: scraped paginated data or raw __NUXT__ data
	let parts;
	if (rawData.parts) {
		parts = rawData.parts;
	} else if (rawData.data?.data?.[0]?.tableInfo?.tableList) {
		// Raw __NUXT__ format - transform it
		parts = rawData.data.data[0].tableInfo.tableList.map(p => ({
			partNumber: p.componentCode,
			manufacturerPart: p.componentModelEn,
			manufacturer: p.componentBrandEn,
			category: p.componentTypeEn,
			firstSort: p.firstSortName,
			secondSort: p.secondSortName,
			package: p.componentSpecificationEn,
			description: p.describe,
			attributes: p.attributes || [],
			stock: p.stockCount,
			tier: p.componentLibraryType === 'base' ? 'basic' : 'preferred',
		}));
	} else {
		console.error('Unrecognized data format');
		process.exit(1);
	}

	console.log(`Total parts in raw data: ${parts.length}\n`);

	// Transform each category
	console.log('Transforming resistors...');
	const resistors = transformResistors(parts);
	console.log(`  Output: ${Object.keys(resistors.data).length} values\n`);

	console.log('Transforming ceramic capacitors...');
	const capacitors = transformCeramicCapacitors(parts);
	console.log(`  Output: ${Object.keys(capacitors.data).length} values\n`);

	console.log('Transforming electrolytic/tantalum capacitors...');
	const electrolytics = transformElectrolyticCapacitors(parts);
	console.log(`  Output: ${Object.keys(electrolytics.data).length} values\n`);

	console.log('Transforming diodes...');
	const diodes = transformDiodes(parts);
	console.log(`  Output: ${Object.keys(diodes.data).length} values\n`);

	// Write output files
	fs.writeFileSync(
		path.join(OUTPUT_DIR, 'resistors.json'),
		JSON.stringify(resistors, null, 2)
	);

	fs.writeFileSync(
		path.join(OUTPUT_DIR, 'ceramic-capacitors.json'),
		JSON.stringify(capacitors, null, 2)
	);

	fs.writeFileSync(
		path.join(OUTPUT_DIR, 'electrolytic-capacitors.json'),
		JSON.stringify(electrolytics, null, 2)
	);

	fs.writeFileSync(
		path.join(OUTPUT_DIR, 'diodes.json'),
		JSON.stringify(diodes, null, 2)
	);

	console.log('Transformation complete!');
	console.log('Output files:');
	console.log('  - src/data/resistors.json');
	console.log('  - src/data/ceramic-capacitors.json');
	console.log('  - src/data/electrolytic-capacitors.json');
	console.log('  - src/data/diodes.json');
}

main().catch(err => {
	console.error('Error:', err);
	process.exit(1);
});
