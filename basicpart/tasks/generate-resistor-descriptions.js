import fs from 'fs';
const partsIndex = JSON.parse(fs.readFileSync('src/data/parts-index.json', 'utf8'));

const resistorCategories = ['Chip Resistor - Surface Mount', 'Resistor Networks, Arrays'];
const descriptions = {};

for (const [partNum, part] of Object.entries(partsIndex)) {
  if (!resistorCategories.includes(part.cat)) continue;

  const resistance = part.attrs?.Resistance || '';
  const tolerance = part.attrs?.Tolerance || '';
  const pkg = part.pkg || '';
  const numResistors = part.attrs?.['Number of Resistors'];

  let desc;

  if (part.cat === 'Resistor Networks, Arrays' && numResistors) {
    // Format: {value} x{count} Resistor Network ({package})
    desc = `${resistance} x${numResistors} Resistor Network (${pkg})`;
  } else {
    // Format: {value} {tolerance} Resistor ({package})
    // Clean up tolerance (remove ± if present for cleaner look)
    const cleanTolerance = tolerance.replace('±', '');
    desc = `${resistance} ${cleanTolerance} Resistor (${pkg})`;
  }

  descriptions[partNum] = desc;
}

console.log('Total resistors processed:', Object.keys(descriptions).length);
console.log('\nSample entries:');
const samples = Object.entries(descriptions).slice(0, 10);
samples.forEach(([k, v]) => console.log(`  ${k}: ${v}`));

// Sort keys for consistent output
const sortedDescriptions = {};
Object.keys(descriptions).sort().forEach(key => {
  sortedDescriptions[key] = descriptions[key];
});

fs.writeFileSync('tasks/descriptions-resistors.json', JSON.stringify(sortedDescriptions, null, 2));
console.log('\nFile written to tasks/descriptions-resistors.json');
