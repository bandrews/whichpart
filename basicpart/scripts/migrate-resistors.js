#!/usr/bin/env node
/**
 * Migrate old resistors.json format to new schema
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read old data
const oldDataPath = path.join(__dirname, '../src/assets/resistors.json');
const oldData = JSON.parse(fs.readFileSync(oldDataPath, 'utf8'));

// Package size mapping
const packageMap = {
  'SMD0402': '0402',
  'SMD0603': '0603',
  'SMD0805': '0805',
  'SMD1206': '1206',
};

// Transform to new schema
const newData = {
  meta: {
    type: 'resistor',
    lastUpdated: new Date().toISOString().split('T')[0],
    columns: ['0402', '0603', '0805', '1206'],
    rowKey: 'value',
    rowLabel: 'Resistance',
  },
  data: {},
};

// Process each resistor value
for (const [value, entry] of Object.entries(oldData)) {
  const newEntry = {
    display: entry.FriendlyName,
  };

  // Map package sizes
  for (const [oldKey, newKey] of Object.entries(packageMap)) {
    if (entry[oldKey]) {
      newEntry[newKey] = {
        part: entry[oldKey],
        tier: 'basic',
      };
    }
  }

  newData.data[value] = newEntry;
}

// Write new data
const newDataPath = path.join(__dirname, '../src/data/resistors.json');
fs.writeFileSync(newDataPath, JSON.stringify(newData, null, 2));

console.log(`Migrated ${Object.keys(newData.data).length} resistor values to new schema`);
console.log(`Output: ${newDataPath}`);
