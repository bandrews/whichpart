#!/usr/bin/env node
/**
 * Audit component data against the parts index
 *
 * This script cross-references transformed data files against parts-index.json
 * to detect mismatches in category, package, or other attributes.
 *
 * Usage: node scripts/audit-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const MANIFEST_PATH = path.join(__dirname, '../data-audit-manifest.json');

// Expected categories for each component type
const EXPECTED_CATEGORIES = {
	resistor: ['Chip Resistor - Surface Mount'],
	'ceramic-capacitor': ['Multilayer Ceramic Capacitors MLCC - SMD/SMT'],
	'electrolytic-capacitor': ['Tantalum Capacitors', 'Aluminum Electrolytic Capacitors - SMD'],
	diode: [
		'Schottky Barrier Diodes (SBD)',
		'Zener Diodes',
		'TVS',
		'ESD Protection Devices',
		'Switching Diodes',
		'Diodes - General Purpose',
		'Rectifiers',
	],
};

// Package patterns that indicate a mismatch
const PACKAGE_RED_FLAGS = {
	// If claiming 0402, should not contain 'x' (like 0402x4)
	'0402': /0402x/i,
	'0603': /0603x/i,
	'0805': /0805x/i,
	'1206': /1206x/i,
};

function loadPartsIndex() {
	const indexPath = path.join(DATA_DIR, 'parts-index.json');
	return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}

function auditResistors(partsIndex) {
	const issues = [];
	const filePath = path.join(DATA_DIR, 'resistors.json');

	if (!fs.existsSync(filePath)) {
		return [{ type: 'missing_file', file: 'resistors.json', severity: 'error' }];
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	for (const [value, entry] of Object.entries(data.data)) {
		for (const pkg of data.meta.columns) {
			if (!entry[pkg]) continue;

			const partNum = entry[pkg].part;
			const partInfo = partsIndex[partNum];

			if (!partInfo) {
				issues.push({
					type: 'missing_part',
					file: 'resistors.json',
					location: `${value}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					message: `Part ${partNum} not found in parts-index.json`,
				});
				continue;
			}

			// Check category
			if (!EXPECTED_CATEGORIES.resistor.includes(partInfo.cat)) {
				issues.push({
					type: 'category_mismatch',
					file: 'resistors.json',
					location: `${value}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: EXPECTED_CATEGORIES.resistor,
					actual: partInfo.cat,
					message: `Part ${partNum} has category "${partInfo.cat}" but expected "${EXPECTED_CATEGORIES.resistor.join('" or "')}"`,
					partDetails: {
						mpn: partInfo.mpn,
						description: partInfo.desc,
						package: partInfo.pkg,
						tier: partInfo.tier,
					},
				});
			}

			// Check package matches exactly
			if (partInfo.pkg !== pkg) {
				issues.push({
					type: 'package_mismatch',
					file: 'resistors.json',
					location: `${value}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: pkg,
					actual: partInfo.pkg,
					message: `Part ${partNum} has package "${partInfo.pkg}" but is listed under "${pkg}"`,
					partDetails: {
						mpn: partInfo.mpn,
						category: partInfo.cat,
						description: partInfo.desc,
					},
				});
			}

			// Check for package red flags
			if (PACKAGE_RED_FLAGS[pkg] && PACKAGE_RED_FLAGS[pkg].test(partInfo.pkg)) {
				issues.push({
					type: 'package_suspicious',
					file: 'resistors.json',
					location: `${value}/${pkg}`,
					partNumber: partNum,
					severity: 'warning',
					message: `Part ${partNum} package "${partInfo.pkg}" looks like a network/array, not individual component`,
				});
			}
		}
	}

	return issues;
}

function auditCeramicCapacitors(partsIndex) {
	const issues = [];
	const filePath = path.join(DATA_DIR, 'ceramic-capacitors.json');

	if (!fs.existsSync(filePath)) {
		return [{ type: 'missing_file', file: 'ceramic-capacitors.json', severity: 'error' }];
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	for (const [key, entry] of Object.entries(data.data)) {
		for (const pkg of data.meta.columns) {
			if (!entry[pkg]) continue;

			const partNum = entry[pkg].part;
			const partInfo = partsIndex[partNum];

			if (!partInfo) {
				issues.push({
					type: 'missing_part',
					file: 'ceramic-capacitors.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					message: `Part ${partNum} not found in parts-index.json`,
				});
				continue;
			}

			// Check category
			if (!EXPECTED_CATEGORIES['ceramic-capacitor'].includes(partInfo.cat)) {
				issues.push({
					type: 'category_mismatch',
					file: 'ceramic-capacitors.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: EXPECTED_CATEGORIES['ceramic-capacitor'],
					actual: partInfo.cat,
					message: `Part ${partNum} has category "${partInfo.cat}" but expected MLCC`,
					partDetails: {
						mpn: partInfo.mpn,
						description: partInfo.desc,
						package: partInfo.pkg,
					},
				});
			}

			// Check package
			if (partInfo.pkg !== pkg) {
				issues.push({
					type: 'package_mismatch',
					file: 'ceramic-capacitors.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: pkg,
					actual: partInfo.pkg,
					message: `Part ${partNum} has package "${partInfo.pkg}" but is listed under "${pkg}"`,
				});
			}
		}
	}

	return issues;
}

function auditElectrolyticCapacitors(partsIndex) {
	const issues = [];
	const filePath = path.join(DATA_DIR, 'electrolytic-capacitors.json');

	if (!fs.existsSync(filePath)) {
		return []; // Optional file
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	for (const [key, entry] of Object.entries(data.data)) {
		for (const pkg of data.meta.columns) {
			if (!entry[pkg]) continue;

			const partNum = entry[pkg].part;
			const partInfo = partsIndex[partNum];

			if (!partInfo) {
				issues.push({
					type: 'missing_part',
					file: 'electrolytic-capacitors.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					message: `Part ${partNum} not found in parts-index.json`,
				});
				continue;
			}

			// Check package
			if (partInfo.pkg !== pkg) {
				issues.push({
					type: 'package_mismatch',
					file: 'electrolytic-capacitors.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: pkg,
					actual: partInfo.pkg,
					message: `Part ${partNum} has package "${partInfo.pkg}" but is listed under "${pkg}"`,
				});
			}
		}
	}

	return issues;
}

function auditDiodes(partsIndex) {
	const issues = [];
	const filePath = path.join(DATA_DIR, 'diodes.json');

	if (!fs.existsSync(filePath)) {
		return [{ type: 'missing_file', file: 'diodes.json', severity: 'error' }];
	}

	const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

	for (const [key, entry] of Object.entries(data.data)) {
		for (const pkg of data.meta.columns) {
			if (!entry[pkg]) continue;

			const partNum = entry[pkg].part;
			const partInfo = partsIndex[partNum];

			if (!partInfo) {
				issues.push({
					type: 'missing_part',
					file: 'diodes.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					message: `Part ${partNum} not found in parts-index.json`,
				});
				continue;
			}

			// Check package
			if (partInfo.pkg !== pkg) {
				issues.push({
					type: 'package_mismatch',
					file: 'diodes.json',
					location: `${key}/${pkg}`,
					partNumber: partNum,
					severity: 'error',
					expected: pkg,
					actual: partInfo.pkg,
					message: `Part ${partNum} has package "${partInfo.pkg}" but is listed under "${pkg}"`,
				});
			}
		}
	}

	return issues;
}

function findCorrectPart(partsIndex, componentType, value, pkg) {
	// Try to find a correct part for the given value and package
	const expectedCategories = EXPECTED_CATEGORIES[componentType] || [];

	for (const [partNum, info] of Object.entries(partsIndex)) {
		if (info.pkg !== pkg) continue;
		if (!expectedCategories.includes(info.cat)) continue;

		// For resistors, check if resistance matches
		if (componentType === 'resistor') {
			const resistanceAttr = info.attrs?.Resistance;
			if (resistanceAttr) {
				// Parse and compare
				const match = resistanceAttr.match(/^([\d.]+)\s*(m|k|M|G)?Ω?/);
				if (match) {
					let partValue = parseFloat(match[1]);
					const unit = match[2];
					switch (unit) {
						case 'm': partValue *= 0.001; break;
						case 'k': partValue *= 1000; break;
						case 'M': partValue *= 1000000; break;
						case 'G': partValue *= 1000000000; break;
					}
					if (Math.abs(partValue - parseFloat(value)) < 0.001) {
						return {
							partNumber: partNum,
							mpn: info.mpn,
							category: info.cat,
							package: info.pkg,
							tier: info.tier,
							description: info.desc,
						};
					}
				}
			}
		}
	}

	return null;
}

function generateManifest(issues, partsIndex) {
	const manifest = {
		generatedAt: new Date().toISOString(),
		summary: {
			totalIssues: issues.length,
			errors: issues.filter(i => i.severity === 'error').length,
			warnings: issues.filter(i => i.severity === 'warning').length,
			byType: {},
			byFile: {},
		},
		proposedChanges: [],
		issues: issues,
	};

	// Count by type and file
	for (const issue of issues) {
		manifest.summary.byType[issue.type] = (manifest.summary.byType[issue.type] || 0) + 1;
		manifest.summary.byFile[issue.file] = (manifest.summary.byFile[issue.file] || 0) + 1;
	}

	// Generate proposed changes for category/package mismatches
	for (const issue of issues) {
		if (issue.type === 'category_mismatch' || issue.type === 'package_mismatch') {
			const componentType = issue.file.replace('.json', '').replace('s-', '-');
			let correctPart = null;

			// Extract the value from location (e.g., "10000/0402" -> "10000")
			const [value, pkg] = issue.location.split('/');

			if (issue.file === 'resistors.json') {
				correctPart = findCorrectPart(partsIndex, 'resistor', value, pkg);
			}

			manifest.proposedChanges.push({
				file: issue.file,
				location: issue.location,
				action: 'replace',
				currentPart: issue.partNumber,
				currentPartDetails: issue.partDetails,
				suggestedPart: correctPart?.partNumber || 'MANUAL_REVIEW_NEEDED',
				suggestedPartDetails: correctPart || null,
				reason: issue.message,
			});
		}
	}

	return manifest;
}

async function main() {
	console.log('Auditing component data against parts-index.json...\n');

	const partsIndex = loadPartsIndex();
	console.log(`Loaded parts index with ${Object.keys(partsIndex).length} parts\n`);

	const allIssues = [];

	console.log('Auditing resistors...');
	const resistorIssues = auditResistors(partsIndex);
	console.log(`  Found ${resistorIssues.length} issues`);
	allIssues.push(...resistorIssues);

	console.log('Auditing ceramic capacitors...');
	const capIssues = auditCeramicCapacitors(partsIndex);
	console.log(`  Found ${capIssues.length} issues`);
	allIssues.push(...capIssues);

	console.log('Auditing electrolytic capacitors...');
	const electrolyticIssues = auditElectrolyticCapacitors(partsIndex);
	console.log(`  Found ${electrolyticIssues.length} issues`);
	allIssues.push(...electrolyticIssues);

	console.log('Auditing diodes...');
	const diodeIssues = auditDiodes(partsIndex);
	console.log(`  Found ${diodeIssues.length} issues`);
	allIssues.push(...diodeIssues);

	console.log('\n' + '='.repeat(60));

	const manifest = generateManifest(allIssues, partsIndex);

	// Write manifest
	fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
	console.log(`\nManifest written to: ${MANIFEST_PATH}`);

	// Print summary
	console.log('\nSUMMARY:');
	console.log(`  Total issues: ${manifest.summary.totalIssues}`);
	console.log(`  Errors: ${manifest.summary.errors}`);
	console.log(`  Warnings: ${manifest.summary.warnings}`);

	if (Object.keys(manifest.summary.byType).length > 0) {
		console.log('\n  By type:');
		for (const [type, count] of Object.entries(manifest.summary.byType)) {
			console.log(`    ${type}: ${count}`);
		}
	}

	if (Object.keys(manifest.summary.byFile).length > 0) {
		console.log('\n  By file:');
		for (const [file, count] of Object.entries(manifest.summary.byFile)) {
			console.log(`    ${file}: ${count}`);
		}
	}

	if (manifest.proposedChanges.length > 0) {
		console.log('\nPROPOSED CHANGES:');
		for (const change of manifest.proposedChanges) {
			console.log(`\n  ${change.file} [${change.location}]:`);
			console.log(`    Current: ${change.currentPart} (${change.currentPartDetails?.category || 'unknown category'})`);
			console.log(`    Suggested: ${change.suggestedPart}${change.suggestedPartDetails ? ` (${change.suggestedPartDetails.category})` : ''}`);
			console.log(`    Reason: ${change.reason}`);
		}
	}

	if (allIssues.length > 0) {
		console.log('\n' + '='.repeat(60));
		console.log('Review the manifest file for full details.');
		process.exit(1);
	} else {
		console.log('\nAll data validated successfully!');
	}
}

main().catch(err => {
	console.error('Error:', err);
	process.exit(1);
});
