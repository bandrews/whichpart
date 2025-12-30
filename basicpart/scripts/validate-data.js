#!/usr/bin/env node
/**
 * Validate scraped and transformed data for correctness
 *
 * This script performs sanity checks on the component data:
 * - Part numbers match expected format (C#####)
 * - Package sizes are valid
 * - Values are within expected ranges
 * - No obvious parsing errors
 *
 * Usage: npm run validate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');

// Valid package sizes
const VALID_SMD_PACKAGES = ['0201', '0402', '0603', '0805', '1206', '1210', '1812', '2010', '2512'];
const VALID_DIODE_PACKAGES = ['SOD-123', 'SOD-323', 'SOD-523', 'SOT-23', 'SOT-23-3', 'SOT-23-5', 'SOT-23-6'];
const VALID_TANTALUM_PACKAGES = ['CASE-A-3216-18(mm)', 'CASE-B-3528-21(mm)', 'CASE-C-6032-28(mm)', 'CASE-D-7343-31(mm)'];

// E24 series values (common 5% resistors)
const E24_SERIES = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];

// E96 series values (common 1% resistors)
const E96_SERIES = [
	1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43,
	1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10,
	2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09,
	3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53,
	4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65,
	6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76
];

// Common capacitor values (E12 series)
const E12_CAP_SERIES = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];

let errors = [];
let warnings = [];

function validatePartNumber(partNum, context) {
	if (!partNum) {
		errors.push(`${context}: Missing part number`);
		return false;
	}

	// JLCPCB part numbers should be C followed by digits
	if (!/^C\d+$/.test(partNum)) {
		errors.push(`${context}: Invalid part number format "${partNum}" (expected C#####)`);
		return false;
	}

	return true;
}

function validateResistors() {
	console.log('\nValidating resistors...');

	const filePath = path.join(DATA_DIR, 'resistors.json');
	if (!fs.existsSync(filePath)) {
		errors.push('resistors.json not found');
		return;
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	let partCount = 0;

	for (const [key, entry] of Object.entries(data.data)) {
		const ohms = parseFloat(key);

		// Validate the key is a valid number
		if (isNaN(ohms) && key !== '0') {
			errors.push(`Resistors: Invalid key "${key}" (not a number)`);
			continue;
		}

		// Check if value follows E24/E96 series (normalized to 1-10 range)
		if (ohms > 0) {
			const normalized = ohms / Math.pow(10, Math.floor(Math.log10(ohms)));
			const inE24 = E24_SERIES.some(v => Math.abs(v - normalized) < 0.05);
			const inE96 = E96_SERIES.some(v => Math.abs(v - normalized) < 0.02);

			if (!inE24 && !inE96 && ohms !== 0) {
				warnings.push(`Resistors: Value ${ohms} (${entry.display}) not in E24/E96 series`);
			}
		}

		// Validate each package entry
		for (const pkg of data.meta.columns) {
			if (entry[pkg]) {
				partCount++;
				validatePartNumber(entry[pkg].part, `Resistors[${key}][${pkg}]`);

				if (!VALID_SMD_PACKAGES.includes(pkg)) {
					warnings.push(`Resistors[${key}]: Unexpected package "${pkg}"`);
				}
			}
		}
	}

	console.log(`  Checked ${Object.keys(data.data).length} values, ${partCount} parts`);
}

function validateCeramicCapacitors() {
	console.log('\nValidating ceramic capacitors...');

	const filePath = path.join(DATA_DIR, 'ceramic-capacitors.json');
	if (!fs.existsSync(filePath)) {
		errors.push('ceramic-capacitors.json not found');
		return;
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	let partCount = 0;

	for (const [key, entry] of Object.entries(data.data)) {
		// Validate display value format
		if (!entry.display) {
			errors.push(`Capacitors[${key}]: Missing display value`);
		}

		// Validate voltage
		if (entry.voltage && entry.voltage !== 'Unknown') {
			if (!/^\d+(\.\d+)?V$/.test(entry.voltage)) {
				warnings.push(`Capacitors[${key}]: Unusual voltage format "${entry.voltage}"`);
			}
		}

		// Validate dielectric
		const validDielectrics = ['C0G', 'NP0', 'X5R', 'X7R', 'X5V', 'Y5V', 'Unknown'];
		if (entry.dielectric && !validDielectrics.includes(entry.dielectric)) {
			warnings.push(`Capacitors[${key}]: Unknown dielectric "${entry.dielectric}"`);
		}

		// Validate each package entry
		for (const pkg of data.meta.columns) {
			if (entry[pkg]) {
				partCount++;
				validatePartNumber(entry[pkg].part, `Capacitors[${key}][${pkg}]`);
			}
		}
	}

	console.log(`  Checked ${Object.keys(data.data).length} values, ${partCount} parts`);
}

function validateDiodes() {
	console.log('\nValidating diodes...');

	const filePath = path.join(DATA_DIR, 'diodes.json');
	if (!fs.existsSync(filePath)) {
		errors.push('diodes.json not found');
		return;
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	let partCount = 0;

	const validTypes = ['schottky', 'zener', 'tvs', 'switching', 'general'];

	for (const [key, entry] of Object.entries(data.data)) {
		// Validate type
		if (entry.type && !validTypes.includes(entry.type)) {
			warnings.push(`Diodes[${key}]: Unknown type "${entry.type}"`);
		}

		// Validate each package entry
		for (const pkg of data.meta.columns) {
			if (entry[pkg]) {
				partCount++;
				validatePartNumber(entry[pkg].part, `Diodes[${key}][${pkg}]`);
			}
		}
	}

	console.log(`  Checked ${Object.keys(data.data).length} models, ${partCount} parts`);
}

function validateElectrolyticCapacitors() {
	console.log('\nValidating electrolytic capacitors...');

	const filePath = path.join(DATA_DIR, 'electrolytic-capacitors.json');
	if (!fs.existsSync(filePath)) {
		warnings.push('electrolytic-capacitors.json not found (optional)');
		return;
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
	let partCount = 0;

	for (const [key, entry] of Object.entries(data.data)) {
		// Validate each package entry
		for (const pkg of data.meta.columns) {
			if (entry[pkg]) {
				partCount++;
				validatePartNumber(entry[pkg].part, `Electrolytic[${key}][${pkg}]`);
			}
		}
	}

	console.log(`  Checked ${Object.keys(data.data).length} values, ${partCount} parts`);
}

function main() {
	console.log('Validating component data...\n');

	validateResistors();
	validateCeramicCapacitors();
	validateDiodes();
	validateElectrolyticCapacitors();

	console.log('\n' + '='.repeat(50));

	if (errors.length > 0) {
		console.log(`\nERRORS (${errors.length}):`);
		for (const err of errors) {
			console.log(`  ❌ ${err}`);
		}
	}

	if (warnings.length > 0) {
		console.log(`\nWARNINGS (${warnings.length}):`);
		for (const warn of warnings.slice(0, 20)) {
			console.log(`  ⚠️  ${warn}`);
		}
		if (warnings.length > 20) {
			console.log(`  ... and ${warnings.length - 20} more warnings`);
		}
	}

	if (errors.length === 0 && warnings.length === 0) {
		console.log('\n✅ All validations passed!');
	} else if (errors.length === 0) {
		console.log(`\n⚠️  Validation completed with ${warnings.length} warnings`);
	} else {
		console.log(`\n❌ Validation failed with ${errors.length} errors`);
		process.exit(1);
	}
}

main();
