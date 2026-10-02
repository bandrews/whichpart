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

const generatedDate = new Date().toISOString().split('T')[0];
const rawDir = path.join(__dirname, '..', 'raw-data');
const latestSnapshot = fs.readdirSync(rawDir)
  .filter(file => /^jlcpcb-basic-parts-\d{4}-\d{2}-\d{2}\.json$/.test(file))
  .sort().at(-1);
if (!latestSnapshot) throw new Error('No catalog snapshot found; run npm run scrape first');
const catalogSnapshotDate = latestSnapshot.slice('jlcpcb-basic-parts-'.length, -'.json'.length);
const merged = {
  _meta: {
    generated: generatedDate,
    catalogSnapshotDate,
    description: 'Human-friendly part descriptions for basicp.art',
  },
};

// Read all task output files
const files = fs.readdirSync(tasksDir).filter(f => f.startsWith('descriptions-') && f.endsWith('.json'));
console.log(`Found ${files.length} task output files`);

let descriptionCount = 0;
for (const file of files) {
  const filePath = path.join(tasksDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const [partId, desc] of Object.entries(data)) {
      if (partId !== '_meta') {
        merged[partId] = desc;
        descriptionCount++;
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
console.log(`Merged ${descriptionCount} descriptions. Total: ${Object.keys(sortedMerged).length - 1} parts`);
