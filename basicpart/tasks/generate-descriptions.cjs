const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'parts-index.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Define the categories we're looking for
const targetCategories = [
  'Multilayer Ceramic Capacitors MLCC - SMD/SMT',
  'Tantalum Capacitors',
  'Inductors (SMD)',
  'Ferrite Beads'
];

// Helper function to normalize capacitance values
function normalizeCapacitance(value) {
  if (!value) return null;
  // Convert uF to micro-F symbol
  return value.replace(/uF/g, '\u00B5F');
}

// Helper function to normalize inductance values
function normalizeInductance(value) {
  if (!value) return null;
  // Convert uH to micro-H symbol
  return value.replace(/uH/g, '\u00B5H');
}

// Generate description for MLCC capacitors
function generateMLCCDescription(part) {
  const attrs = part.attrs || {};
  const pkg = part.pkg || '';

  const capacitance = normalizeCapacitance(attrs['Capacitance']);
  const voltage = attrs['Voltage Rating'] || '';
  const dielectric = attrs['Temperature Coefficient'] || '';

  if (!capacitance) return null;

  // Format: "{value} {voltage} {dielectric} Cap ({package})"
  let desc = capacitance;
  if (voltage) desc += ' ' + voltage;
  if (dielectric) desc += ' ' + dielectric;
  desc += ' Cap';
  if (pkg) desc += ' (' + pkg + ')';

  return desc;
}

// Generate description for Tantalum capacitors
function generateTantalumDescription(part) {
  const attrs = part.attrs || {};
  const pkg = part.pkg || '';

  const capacitance = normalizeCapacitance(attrs['Capacitance']);
  const voltage = attrs['Voltage Rating'] || '';

  if (!capacitance) return null;

  // Format: "{value} {voltage} Tantalum Cap ({package})"
  let desc = capacitance;
  if (voltage) desc += ' ' + voltage;
  desc += ' Tantalum Cap';
  if (pkg) {
    // Simplify package name for tantalum (remove the mm part)
    let pkgSimple = pkg;
    if (pkg.includes('CASE-')) {
      // Extract just CASE-A, CASE-B, etc.
      const match = pkg.match(/CASE-[A-Z]/);
      if (match) pkgSimple = match[0];
    }
    desc += ' (' + pkgSimple + ')';
  }

  return desc;
}

// Generate description for Inductors
function generateInductorDescription(part) {
  const attrs = part.attrs || {};
  const pkg = part.pkg || '';

  const inductance = normalizeInductance(attrs['Inductance']);
  const currentRating = attrs['Current Rating'] || '';

  if (!inductance) return null;

  // Format: "{value} {current} Inductor ({package})"
  let desc = inductance;
  if (currentRating && currentRating !== '-') desc += ' ' + currentRating;
  desc += ' Inductor';
  if (pkg) desc += ' (' + pkg + ')';

  return desc;
}

// Generate description for Ferrite Beads
function generateFerriteBeadDescription(part) {
  const attrs = part.attrs || {};
  const pkg = part.pkg || '';

  const impedance = attrs['Impedance @ Frequency'] || '';
  const currentRating = attrs['Current Rating'] || '';

  if (!impedance) return null;

  // Format: "{impedance} {current} Ferrite Bead ({package})"
  // Impedance already comes as "600Ohm@100MHz"
  let desc = impedance;
  if (currentRating) desc += ' ' + currentRating;
  desc += ' Ferrite Bead';
  if (pkg) desc += ' (' + pkg + ')';

  return desc;
}

// Process all matching parts
const descriptions = {};
let processed = 0;
let skipped = 0;

for (const [partId, part] of Object.entries(data)) {
  if (!targetCategories.includes(part.cat)) continue;

  let description = null;

  switch (part.cat) {
    case 'Multilayer Ceramic Capacitors MLCC - SMD/SMT':
      description = generateMLCCDescription(part);
      break;
    case 'Tantalum Capacitors':
      description = generateTantalumDescription(part);
      break;
    case 'Inductors (SMD)':
      description = generateInductorDescription(part);
      break;
    case 'Ferrite Beads':
      description = generateFerriteBeadDescription(part);
      break;
  }

  if (description) {
    descriptions[partId] = description;
    processed++;
  } else {
    console.error('Could not generate description for', partId, ':', part.cat);
    skipped++;
  }
}

// Sort keys for consistent output
const sortedDescriptions = {};
Object.keys(descriptions).sort((a, b) => {
  // Sort by numeric part of the ID
  const numA = parseInt(a.replace(/[^0-9]/g, ''));
  const numB = parseInt(b.replace(/[^0-9]/g, ''));
  return numA - numB;
}).forEach(key => {
  sortedDescriptions[key] = descriptions[key];
});

// Write output
const outputPath = path.join(__dirname, 'descriptions-capacitors.json');
fs.writeFileSync(outputPath, JSON.stringify(sortedDescriptions, null, 2), 'utf8');

console.log('Processed:', processed);
console.log('Skipped:', skipped);
console.log('Output written to:', outputPath);
