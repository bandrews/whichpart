# Data Audit Manifest

Generated: 2026-01-12

## Summary

| Category | Issues Found | Severity |
|----------|-------------|----------|
| Resistors | 3 wrong parts | **Critical** - wrong component type |
| Diodes | 74 package variants | Low - pin-compatible variants |

---

## Critical Issues: Resistor Networks Listed as Individual Resistors

These are **actual bugs** where resistor network arrays were incorrectly listed as individual resistors.

### 1. 1kΩ 0603

| Field | Current (Wrong) | Suggested (Correct) |
|-------|-----------------|---------------------|
| Part Number | C20197 | **C21190** |
| MPN | 4D03WGJ0102T5E | 0603WAF1001T5E |
| Category | Resistor Networks, Arrays | Chip Resistor - Surface Mount |
| Package | 0603x4 (4-element network) | 0603 (individual) |
| Tier | basic | basic |
| Description | 1kΩ 4 62.5mW 8 ±200ppm/℃ ±5% | -55℃~+155℃ 100mW 1kΩ 75V Thick Film Resistor ±1% |

**File:** `src/data/resistors.json` at key `"1000"` → `"0603"`

---

### 2. 4.7kΩ 0603

| Field | Current (Wrong) | Suggested (Correct) |
|-------|-----------------|---------------------|
| Part Number | C1980 | **C23162** |
| MPN | 4D03WGJ0472T5E | 0603WAF4701T5E |
| Category | Resistor Networks, Arrays | Chip Resistor - Surface Mount |
| Package | 0603x4 (4-element network) | 0603 (individual) |
| Tier | basic | basic |
| Description | 4 4.7kΩ 62.5mW 8 ±200ppm/℃ ±5% | -55℃~+155℃ 100mW 4.7kΩ 75V Thick Film Resistor ±1% |

**File:** `src/data/resistors.json` at key `"4700"` → `"0603"`

---

### 3. 10kΩ 0402 (User-Reported Bug)

| Field | Current (Wrong) | Suggested (Correct) |
|-------|-----------------|---------------------|
| Part Number | C25725 | **C25744** |
| MPN | 4D02WGJ0103TCE | 0402WGF1002TCE |
| Category | Resistor Networks, Arrays | Chip Resistor - Surface Mount |
| Package | 0402x4 (4-element network) | 0402 (individual) |
| Tier | preferred | basic |
| Description | 10kΩ 4 62.5mW 8 ±200ppm/℃ ±5% | -55℃~+155℃ 10kΩ 50V 62.5mW Thick Film Resistor ±1% |

**File:** `src/data/resistors.json` at key `"10000"` → `"0402"`

---

## Low Priority: Diode Package Variants (74 items)

These are all **SOD-123FL** parts listed under **SOD-123**, or **SOT-23-6L** listed under **SOT-23-6**.

- **SOD-123FL** = "Flat Lead" variant of SOD-123 (pin-compatible, same footprint)
- **SOT-23-6L** = Lead variant of SOT-23-6 (pin-compatible)

**Recommendation:** These are arguably acceptable since the packages are pin-compatible. You may choose to:

1. **Keep as-is** - Users will get a compatible part
2. **Add SOD-123FL as a column** - More precise but adds UI complexity
3. **Update transform to treat FL variants as equivalent** - Group them intentionally

<details>
<summary>Full list of diode package variant issues (click to expand)</summary>

| Model | Current Part | Package Listed | Actual Package |
|-------|--------------|----------------|----------------|
| SM4007PL | C64898 | SOD-123 | SOD-123FL |
| SMF6.0CA | C2990473 | SOD-123 | SOD-123FL |
| SMF30CA | C2990493 | SOD-123 | SOD-123FL |
| SRV05-4 | C7420376 | SOT-23-6 | SOT-23-6L |
| DSK34 | C7502709 | SOD-123 | SOD-123FL |
| DSK14 | C7502711 | SOD-123 | SOD-123FL |
| DSK26 | C7502712 | SOD-123 | SOD-123FL |
| DSK210 | C7502713 | SOD-123 | SOD-123FL |
| 1N4001W | C18199085 | SOD-123 | SOD-123FL |
| 1N4002W | C18199086 | SOD-123 | SOD-123FL |
| 1N4004W | C18199087 | SOD-123 | SOD-123FL |
| 1N4007W | C18199088 | SOD-123 | SOD-123FL |
| FR102W | C18199113 | SOD-123 | SOD-123FL |
| FR107W | C18199114 | SOD-123 | SOD-123FL |
| US1DW | C18199122 | SOD-123 | SOD-123FL |
| US1MW | C18199123 | SOD-123 | SOD-123FL |
| ES1JW | C18199137 | SOD-123 | SOD-123FL |
| ES1DW | C18199155 | SOD-123 | SOD-123FL |
| ES2JW | C18199156 | SOD-123 | SOD-123FL |
| SMF3.3CA | C19077496 | SOD-123 | SOD-123FL |
| SMF5.0A | C19077497 | SOD-123 | SOD-123FL |
| SMF5.0CA | C19077498 | SOD-123 | SOD-123FL |
| SMF6.0A | C19077499 | SOD-123 | SOD-123FL |
| SMF6.5CA | C19077501 | SOD-123 | SOD-123FL |
| SMF7.0CA | C19077502 | SOD-123 | SOD-123FL |
| SMF7.5CA | C19077503 | SOD-123 | SOD-123FL |
| SMF9.0CA | C19077504 | SOD-123 | SOD-123FL |
| SMF10CA | C19077505 | SOD-123 | SOD-123FL |
| SMF12A | C19077506 | SOD-123 | SOD-123FL |
| SMF12CA | C19077507 | SOD-123 | SOD-123FL |
| SMF13CA | C19077508 | SOD-123 | SOD-123FL |
| SMF15A | C19077509 | SOD-123 | SOD-123FL |
| SMF15CA | C19077510 | SOD-123 | SOD-123FL |
| SMF16CA | C19077511 | SOD-123 | SOD-123FL |
| SMF18A | C19077512 | SOD-123 | SOD-123FL |
| SMF18CA | C19077513 | SOD-123 | SOD-123FL |
| SMF24A | C19077514 | SOD-123 | SOD-123FL |
| SMF24CA | C19077515 | SOD-123 | SOD-123FL |
| SMF26CA | C19077516 | SOD-123 | SOD-123FL |
| SMF28CA | C19077517 | SOD-123 | SOD-123FL |
| SMF30A | C19077518 | SOD-123 | SOD-123FL |
| SMF33CA | C19077520 | SOD-123 | SOD-123FL |
| SMF36CA | C19077521 | SOD-123 | SOD-123FL |
| SRV05-4A | C20615829 | SOT-23-6 | SOT-23-6L |
| DSL34 | C22466347 | SOD-123 | SOD-123FL |
| DSL16 | C22466348 | SOD-123 | SOD-123FL |
| DSL14 | C22466349 | SOD-123 | SOD-123FL |
| DSK16 | C22466351 | SOD-123 | SOD-123FL |
| DSK24 | C22466352 | SOD-123 | SOD-123FL |
| DSK36 | C22466353 | SOD-123 | SOD-123FL |
| DSK110 | C22466354 | SOD-123 | SOD-123FL |
| DSK120 | C22466355 | SOD-123 | SOD-123FL |
| DSK12 | C22466356 | SOD-123 | SOD-123FL |
| DSK115 | C28646287 | SOD-123 | SOD-123FL |
| DSK220 | C28646288 | SOD-123 | SOD-123FL |
| DSK310 | C28646289 | SOD-123 | SOD-123FL |
| DSK22 | C28646290 | SOD-123 | SOD-123FL |
| DSK38 | C28646291 | SOD-123 | SOD-123FL |
| DSK320 | C28646292 | SOD-123 | SOD-123FL |
| SMF36A | C41376086 | SOD-123 | SOD-123FL |
| SMF13A | C41376087 | SOD-123 | SOD-123FL |
| SMF7.0A | C41376088 | SOD-123 | SOD-123FL |
| SMF6.5A | C41376089 | SOD-123 | SOD-123FL |
| SMF26A | C41376090 | SOD-123 | SOD-123FL |
| SMF28A | C41376091 | SOD-123 | SOD-123FL |
| SMF60CA | C41376092 | SOD-123 | SOD-123FL |
| SMF20A | C41411782 | SOD-123 | SOD-123FL |
| SMF14CA | C41411783 | SOD-123 | SOD-123FL |
| SMF20CA | C42371747 | SOD-123 | SOD-123FL |
| SMF40CA | C42371749 | SOD-123 | SOD-123FL |
| SMF7.5A | C42371750 | SOD-123 | SOD-123FL |
| SMF150CA | C42371752 | SOD-123 | SOD-123FL |
| SMF58CA | C42371753 | SOD-123 | SOD-123FL |
| SMF48A | C42371754 | SOD-123 | SOD-123FL |

</details>

---

## Root Cause Analysis

The bug in `scripts/transform-data.js` was at lines 190-193:

```javascript
// OLD (buggy):
const resistors = parts.filter(p =>
    p.category?.toLowerCase().includes('resistor') ||
    p.firstSort?.toLowerCase().includes('resistor')
);

// NEW (fixed):
const resistors = parts.filter(p => {
    const cat = p.category?.toLowerCase() || '';
    const firstSort = p.firstSort?.toLowerCase() || '';
    const isResistor = cat.includes('resistor') || firstSort.includes('resistor');
    const isNetwork = cat.includes('network') || cat.includes('array');
    return isResistor && !isNetwork;
});
```

The filter caught "Resistor Networks, Arrays" because it contains "resistor". Then `normalizePackage()` extracted "0402" from "0402x4", causing networks to be placed in individual resistor slots.

---

## Files Changed

1. `scripts/transform-data.js` - Fixed resistor filter to exclude networks
2. `scripts/audit-data.js` - New validation script (cross-references parts-index.json)
3. `data-audit-manifest.json` - Full JSON audit results
4. `DATA-CHANGES-MANIFEST.md` - This file

---

## Next Steps

1. **Review this manifest** - Confirm the 3 resistor changes look correct
2. **Run `npm run transform`** - Regenerate resistors.json with the fix
3. **Run `node scripts/audit-data.js`** - Verify no more critical issues
4. **Decide on diode variants** - Keep as-is or add SOD-123FL handling
