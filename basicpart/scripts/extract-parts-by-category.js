#!/usr/bin/env node
/**
 * Extract parts from parts-index.json by category
 * Usage: node extract-parts-by-category.js "Category Name 1" "Category Name 2" ...
 */
const fs = require('fs');
const path = require('path');

const partsIndex = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'parts-index.json'),
  'utf8'
));

const categories = process.argv.slice(2);
if (categories.length === 0) {
  // List all categories if none specified
  const cats = {};
  for (const [id, part] of Object.entries(partsIndex)) {
    cats[part.cat] = (cats[part.cat] || 0) + 1;
  }
  console.log('Available categories:');
  for (const [cat, count] of Object.entries(cats).sort((a, b) => b[1] - a[1])) {
    console.log(`  "${cat}": ${count} parts`);
  }
  process.exit(0);
}

const result = {};
for (const [id, part] of Object.entries(partsIndex)) {
  if (categories.includes(part.cat)) {
    result[id] = part;
  }
}

console.log(JSON.stringify(result, null, 2));
