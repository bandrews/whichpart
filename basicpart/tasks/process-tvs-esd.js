#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the parts index
const partsIndex = JSON.parse(fs.readFileSync(
  path.join(__dirname, '../src/data/parts-index.json'),
  'utf8'
));

// Filter for TVS/ESD parts
const tvsEsdParts = {};
for (const [partNum, part] of Object.entries(partsIndex)) {
  if (part.cat === "ESD and Surge Protection (TVS/ESD)") {
    tvsEsdParts[partNum] = part;
  }
}

console.log(`Found ${Object.keys(tvsEsdParts).length} TVS/ESD parts`);

// Generate descriptions
function generateDescription(part) {
  const attrs = part.attrs || {};
  const pkg = part.pkg || '';
  const desc = part.desc || '';

  // Get key attributes
  const type = attrs['Type'] || '';
  const polarity = attrs['Polarity'] || '';
  const channels = attrs['Number of Channels'] || '';
  const workingVoltage = attrs['Reverse Stand-Off Voltage (Vrwm)'] || '';
  const breakdownVoltage = attrs['Voltage - Breakdown'] || '';

  // Determine if it's TVS or ESD type based on attrs.Type field first
  // The desc often contains both "TVS" and "ESD" because the category name is in the desc
  const isESD = type === 'ESD';
  const isTVS = type === 'TVS';
  // If no type is specified, default to TVS/ESD hybrid
  const isUnknownType = !isESD && !isTVS;

  // Determine polarity
  const isBidirectional = polarity === 'Bidirectional' ||
    desc.toLowerCase().includes('bidirectional');
  const isUnidirectional = polarity === 'Unidirectional' ||
    desc.toLowerCase().includes('unidirectional');

  // Check for application-specific hints
  const isUSB = desc.toLowerCase().includes('usb');
  const isHDMI = desc.toLowerCase().includes('hdmi');
  const isEthernet = desc.toLowerCase().includes('ethernet');
  const isCAN = desc.toLowerCase().includes(' can ') || desc.toLowerCase().includes('can bus');
  const isRS485 = desc.toLowerCase().includes('rs485') || desc.toLowerCase().includes('rs-485');
  const isRS232 = desc.toLowerCase().includes('rs232') || desc.toLowerCase().includes('rs-232');

  // Build the description
  let result = '';

  // Voltage
  let voltage = workingVoltage || '';
  if (!voltage && breakdownVoltage) {
    // Try to infer working voltage from breakdown (usually lower)
    voltage = breakdownVoltage;
  }

  if (voltage) {
    result += voltage + ' ';
  }

  // Polarity
  if (isBidirectional) {
    result += 'Bi-directional ';
  } else if (isUnidirectional) {
    result += 'Uni-directional ';
  }

  // Number of channels (if > 1)
  const numChannels = parseInt(channels, 10);
  if (numChannels > 1) {
    result += numChannels + 'ch ';
  }

  // Application-specific
  if (isUSB) {
    result += 'USB ';
  } else if (isHDMI) {
    result += 'HDMI ';
  } else if (isEthernet) {
    result += 'Ethernet ';
  } else if (isCAN) {
    result += 'CAN ';
  } else if (isRS485) {
    result += 'RS-485 ';
  } else if (isRS232) {
    result += 'RS-232 ';
  }

  // Type
  if (isESD) {
    result += 'ESD Protection';
  } else if (isTVS) {
    result += 'TVS';
  } else if (isUnknownType) {
    result += 'TVS/ESD Protection';
  }

  // Package
  if (pkg) {
    // Normalize package names
    let normalizedPkg = pkg;
    if (pkg.includes('DO-214AA') || pkg.includes('SMB')) {
      normalizedPkg = 'SMB';
    } else if (pkg.includes('DO-214AC') || pkg.includes('SMA')) {
      normalizedPkg = 'SMA';
    } else if (pkg.includes('DO-214AB') || pkg.includes('SMC')) {
      normalizedPkg = 'SMC';
    } else if (pkg.includes('SOD-323')) {
      normalizedPkg = 'SOD-323';
    } else if (pkg.includes('SOD-523')) {
      normalizedPkg = 'SOD-523';
    } else if (pkg.includes('SOD-123')) {
      normalizedPkg = 'SOD-123FL';
    } else if (pkg.includes('SOT-23-6') || pkg.includes('SOT-23-6L')) {
      normalizedPkg = 'SOT-23-6';
    } else if (pkg.includes('SOT-23')) {
      normalizedPkg = 'SOT-23';
    } else if (pkg.includes('SOT-143')) {
      normalizedPkg = 'SOT-143';
    } else if (pkg.includes('SOT-363')) {
      normalizedPkg = 'SOT-363';
    } else if (pkg.includes('SC-88')) {
      normalizedPkg = 'SC-88';
    } else if (pkg.includes('DFN')) {
      // Keep DFN packages as-is but simplify
      normalizedPkg = pkg.replace(/[()]/g, '');
    } else if (pkg.includes('P600')) {
      normalizedPkg = 'P600';
    }
    result += ' (' + normalizedPkg + ')';
  }

  return result.trim();
}

// Generate all descriptions
const descriptions = {};
for (const [partNum, part] of Object.entries(tvsEsdParts)) {
  descriptions[partNum] = generateDescription(part);
}

// Write output
fs.writeFileSync(
  path.join(__dirname, 'descriptions-tvs-esd.json'),
  JSON.stringify(descriptions, null, 2)
);

console.log(`Generated ${Object.keys(descriptions).length} descriptions`);
console.log('Output written to: tasks/descriptions-tvs-esd.json');

// Print a few samples
console.log('\nSamples:');
const samples = Object.entries(descriptions).slice(0, 10);
for (const [partNum, desc] of samples) {
  console.log(`  ${partNum}: ${desc}`);
}
