# JLCPCB catalog refresh and applied audit manifest

Generated: 2026-07-24 UTC

Scope: JLCPCB Basic, Preferred Extended, and explicitly curated ordinary
Extended parts used by basicp.art.

Status: **implemented and validated**

## Catalog refresh

Compared snapshots:

- Previous: `raw-data/jlcpcb-basic-parts-2025-12-30.json`
- Current: `raw-data/jlcpcb-basic-parts-2026-07-24.json`

| Metric | Previous | Current | Change |
|---|---:|---:|---:|
| Total qualifying parts | 1,585 | 1,586 | +1 |
| Basic | 351 | 351 | 0 |
| Preferred Extended | 1,234 | 1,235 | +1 |
| Removed | — | — | 0 |
| Basic/Preferred tier changes | — | — | 0 |
| Existing parts with changed price ladders | — | — | 1,585 |

The only newly qualifying part is C7502727 / BAV99W: Preferred Extended,
SOT-323, 39,158 units in the snapshot, and $0.0133 at the first quantity
break. It is a dual series-connected 75 V, 150 mA switching diode with 4 ns
reverse recovery.

At the first price break, 1,496 existing parts increased and 89 decreased.
The complete machine-readable price and catalog comparison is in
`catalog-change-manifest.json`.

## Curated-picks policy

“Our Picks” intentionally includes useful parts from outside the qualifying
Basic/Preferred snapshot.

- Basic and Preferred Extended picks must exist in `parts-index.json` and match
  its tier and package exactly.
- Ordinary Extended picks use `"tier": "extended"`.
- Ordinary Extended picks are highlighted in orange with an explicit legend
  warning.
- Because ordinary Extended picks are outside the local qualifying index, they
  link directly to their current JLCPCB page instead of a missing local detail
  route.
- The strict audit permits an explicitly declared Extended pick to be absent
  from the qualifying index, but it rejects missing Basic/Preferred picks,
  invalid tiers, duplicates, and tier/package mismatches.

Current curated set:

| Tier | Picks |
|---|---:|
| Basic | 24 |
| Preferred Extended | 25 |
| Ordinary Extended | 10 |
| Total | 59 |

The strict audit reports zero errors and zero warnings.

## Applied decisions from the maintainer review

### Retained ordinary Extended recommendations

These are intentionally present and visibly marked as ordinary Extended:

| Part | Applied correction |
|---|---|
| C2040 / RP2040 | Package corrected to `LQFN-56(7x7)` |
| C529330 / STM32G030F6P6TR | Exact MPN retained; tier set to Extended |
| C168688 / USB-C | Tier set to Extended; footprint/assembly caution added |
| C2765186 / USB-C | Corrected from “6P power only” to a 16-contact, 3 A Type-C receptacle |
| C84681 / CH340C | Tier set to Extended; lifecycle warning added |
| C32843 / W5500 | Package corrected from QFN to `LQFP-48(7x7)` |
| C72043 / green LED | Tier set to Extended |
| C72041 / blue LED | Tier set to Extended |
| C114586 / WS2812B | Tier set to Extended |
| C7484 / SN74AHCT1G125DBVR | Tier set to Extended |

### Removed

- C86607 / PCF8574 identity collision
- C160402 / incorrectly described three-pin connector
- C145956 / obsolete generic connector
- C571134 / stale W25Q32 catalog code
- C191662 / stale EEPROM-with-MAC catalog code
- C82942 / part absent from the qualifying snapshot

### Replaced or corrected

- C7548 was replaced with C7512, Texas Instruments ULN2003ADR, Basic,
  `SOIC-16`.
- C8734 STM32F103C8T6 is now Preferred Extended and
  `LQFP-48(7x7)`.
- C9002 is now correctly described as a 12 MHz, 20 pF,
  `SMD3225-4P` crystal.
- C13738 is now correctly described as a 16 MHz, 9 pF,
  `SMD3225-4P` crystal.
- C9006 was added as the separate 25 MHz, 12 pF,
  `SMD3225-4P` crystal.
- C32346 is now `SMD3215-2P`.
- C97521 is now `SOIC-8-208mil`.
- C8963 uses exact MPN `SP3485EN-L/TR` and package `SOIC-8`.
- C61063 is now `SOIC-8`.
- C85364 is now Preferred Extended with exact MPN `SRV05-4-P-T7`.

## Applied enthusiast recommendations

All approved Priority 1 and Priority 2 candidates were added.

### Microcontrollers

- C23922 / STM32F030C8T6
- C14877 / ATMEGA328P-AU, with its not-recommended-for-new-designs caveat

### Power and battery

- C9864 / TPS5430DDAR
- C5446 / XC6206P332MR-G
- C16581 / TP4056-42-ESOP8, explicitly described as a charger without battery
  protection or power-path management
- C7722 / TPS61040DBVR
- C7881 / ICL7660AIBAZA-T

### Interfaces and isolation

- C12084 / SN65HVD230DR
- C6952 / TJA1050T/CM,118
- C6568 / CP2102-GMR
- C7859 / SN74LVC4245APWR
- C6855 / SP485EEN-L/TR
- C13482 / SP3232EEY-L/TR
- C9669 / ADUM1201ARZ-RL7

### Analog, timing, logic, memory, and RTC

- C7377 / MCP6002T-I/SN
- C7950 / LM358DR2G
- C7562 / M24C02-WMN6TP
- C6482 / AT24C256C-SSHL-T
- C7440 / PCF8563T/5,518
- C7433 / OP07CDR
- C7955 / LM393DR2G
- C21379 / CD4051BM96
- C7593 / NE555DR
- C5605 / 74HC14D,653
- C5947 / 74HC595D,118
- C5613 / 74HC165D,653

### Discretes and protection

- C20917 / AO3400A
- C15127 / AO3401A
- C28646265 / BSS138W
- C37704 / BAT54C,215
- C2488 / MB10S-50MIL
- C412437 / US1M
- C7502727 / BAV99W
- C7420316 / SS14
- C7420372 / H5VL10B, with a warning that its capacitance is unsuitable for
  high-speed USB data

### Sensor lifecycle pick

- C24112 / MPU-6050, retained as a useful legacy-ecosystem part with an
  explicit discontinued lifecycle warning

## Applied content and documentation fixes

- The root README now identifies the application directory and refresh command.
- Page copy consistently says “Basic and Preferred Extended” when both tiers
  are shown.
- “All Basic Parts” user-facing copy is now “All Basic & Preferred Parts.”
- The “Our Picks” page explains ordinary Extended recommendations and shows a
  dedicated tier column.
- Fee language no longer makes unconditional “low fee” or “no extra fee”
  promises.
- The legend states that Preferred Extended parts have no feeder-loading fee
  for Economic PCBA and that ordinary Extended parts may incur an additional
  charge.
- The click instructions reflect actual behavior.
- The home-page catalog count is derived from `parts-index.json`.
- Description and curated metadata distinguish catalog snapshot and editorial
  review dates.
- The README documents the manual description/curation checklist and strict
  release policy.
- Unsafe SOD-123/SOD-123FL interchangeability wording was replaced with
  footprint-verification guidance.
- Historically misleading task filenames were renamed and given scope
  metadata.

## Applied validation and transform fixes

- The scraper sends the Basic-plus-Preferred filter on every page and refuses
  incomplete or inconsistent snapshots.
- Snapshot writes are atomic.
- Upstream `base` and `expand` tiers are mapped explicitly.
- Exact package suffixes such as `SOD-123FL`, `SOT-23-6L`, and `SOT-323` are
  preserved.
- Generic passive-size normalization now applies only to exact size labels.
  This fixed six DFN0603-2/2L ESD parts that were previously collapsed into
  generic `0603`.
- Validation enumerates every nested transformed part cell, including all 875
  diode placements rather than only the 443 placements in display columns.
- Every transformed reference is checked against the current index for C-number,
  tier, and exact package.
- Every index item is schema-checked.
- All task descriptions and merged friendly descriptions must exactly cover
  all 1,586 index parts.
- Duplicate or stale task/description IDs are rejected.
- Diode category validation uses the current source vocabulary and covers
  Schottky, Zener, ESD/TVS, switching, general-purpose, bridge, and
  fast-recovery categories.
- Curated validation is strict in the refresh pipeline.

## Final verification

`npm run refresh:from-raw` completed successfully:

- Catalog diff: passed
- Transform: passed
- Index generation: 1,586 parts
- Description merge: 1,586 descriptions
- Catalog/description validation: passed
- Resistor placements checked: 293
- Ceramic-capacitor placements checked: 135
- Diode placements checked: 875
- Tantalum-capacitor placements checked: 2
- Transformed-data audit: 0 errors, 0 warnings
- Strict curated audit: 59 valid picks, 0 errors, 0 warnings
- Production build: passed

Generated artifacts:

- `raw-data/jlcpcb-basic-parts-2026-07-24.json`
- `catalog-change-manifest.json`
- `curated-picks-audit.json`
- `data-audit-manifest.json`
- `src/data/parts-index.json`
- `src/data/friendly-descriptions.json`
- category-specific transformed JSON files
- `dist/`
