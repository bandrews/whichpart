// Match the supported categories enforced by audit-data.js.
const diodeCategories = new Set([
  'Schottky Diodes',
  'Zener Diodes',
  'ESD and Surge Protection (TVS/ESD)',
  'Switching Diodes',
  'Diodes - General Purpose',
  'Bridge Rectifiers',
  'Fast Recovery / High Efficiency Diodes',
]);

export function isDiodePart(part) {
  return diodeCategories.has(part.category);
}
