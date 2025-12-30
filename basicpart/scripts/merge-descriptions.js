#!/usr/bin/env node
/**
 * Merge friendly descriptions from task output files into the main JSON file
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tasksDir = path.join(__dirname, '..', 'tasks');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'friendly-descriptions.json');

// Start with existing or empty object
let merged = { _meta: { generated: new Date().toISOString().split('T')[0], description: 'Human-friendly part descriptions for basicp.art' } };
if (fs.existsSync(outputFile)) {
  try {
    merged = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  } catch (e) {
    console.error('Error reading existing file:', e.message);
  }
}

// Read all task output files
const files = fs.readdirSync(tasksDir).filter(f => f.startsWith('descriptions-') && f.endsWith('.json'));
console.log(`Found ${files.length} task output files`);

let newCount = 0;
for (const file of files) {
  const filePath = path.join(tasksDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const [partId, desc] of Object.entries(data)) {
      if (partId !== '_meta' && !merged[partId]) {
        merged[partId] = desc;
        newCount++;
      }
    }
    console.log(`Merged ${file}`);
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
}

// Sort by part number for consistency
const sortedMerged = { _meta: merged._meta };
Object.keys(merged)
  .filter(k => k !== '_meta')
  .sort((a, b) => {
    const numA = parseInt(a.slice(1));
    const numB = parseInt(b.slice(1));
    return numA - numB;
  })
  .forEach(k => { sortedMerged[k] = merged[k]; });

fs.writeFileSync(outputFile, JSON.stringify(sortedMerged, null, 2));
console.log(`Merged ${newCount} new descriptions. Total: ${Object.keys(sortedMerged).length - 1} parts`);
