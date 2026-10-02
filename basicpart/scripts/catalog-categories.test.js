import test from 'node:test';
import assert from 'node:assert/strict';
import { isDiodePart } from './catalog-categories.js';

test('ESD protection in an IC description does not make it a diode', () => {
  for (const [partNumber, category] of [
    ['C7950', 'Operational Amplifier'],
    ['C7955', 'Comparators'],
    ['C12084', 'CAN Transceivers'],
    ['C18229', 'Operational Amplifier'],
  ]) {
    assert.equal(isDiodePart({ partNumber, category, description: 'ESD protection' }), false, partNumber);
  }
});

test('all supported diode and protection categories are included', () => {
  for (const category of [
    'Schottky Diodes', 'Zener Diodes', 'ESD and Surge Protection (TVS/ESD)',
    'Switching Diodes', 'Diodes - General Purpose', 'Bridge Rectifiers',
    'Fast Recovery / High Efficiency Diodes',
  ]) assert.equal(isDiodePart({ category, description: '' }), true, category);
});

test('missing or unrelated categories fail closed', () => {
  assert.equal(isDiodePart({ description: 'schottky zener tvs esd diode' }), false);
  assert.equal(isDiodePart({ category: 'Microcontrollers' }), false);
});
