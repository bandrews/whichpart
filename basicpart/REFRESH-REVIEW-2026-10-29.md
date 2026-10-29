# October 29, 2026 catalog refresh and verified corrections

The complete catalog is refreshed, the identified corrections are implemented,
and the changeset is prepared for the requested commit and push to `main`.
The existing October 13 work was preserved and remains the comparison baseline.
The remote was synchronized before publication work; it was already current.

## Catalog results

| Measure | Result |
|---|---:|
| Complete qualifying snapshot | 1,586 / 1,586 |
| Basic / Preferred Extended | 351 / 1,235 |
| Added / removed / tier changes | 0 / 0 / 0 |
| Changed price records | 1,480 |
| First-price increases / decreases | 1,016 / 298 |
| Other price-break changes | 166 |
| Changed stock counts | 1,550 |
| Changed description/attribute records | 363 |
| Substantive changed-rating records independently checked | 14 |

All 16 pages passed completeness, duplicate, pagination, and explicit tier-flag
checks. Every qualifying part is covered by the generated index and friendly
description sources. No new qualifying catalog entries were discovered.
The three largest first-price increases and decreases were independently
re-fetched; all six price-break arrays matched the collected snapshot.

Evidence: [raw snapshot](raw-data/jlcpcb-basic-parts-2026-10-29.json),
[catalog changes](catalog-change-manifest.json), and
[exact-part checks](raw-data/jlcpcb-part-checks-2026-10-29.json).

**RP2040 C2040 remains ordinary Extended.** Its exact API result is `expand`
with `preferredComponentFlag: false`; it is absent from the complete qualifying
snapshot. A generic public “Extended” label alone is not sufficient to
separate Preferred and ordinary Extended parts.
[JLCPCB RP2040 listing](https://jlcpcb.com/partdetail/RaspberryPi-RP2040/C2040).

## Independent review and fixes

Three Luna agents initially covered all 99 component notes, all 14 family
notes, curated selections, and matching description sources. The primary agent
then independently reviewed **every one of the 16 Luna finding records** and
all 22 consolidated records. **19 records are resolved; three curation
suggestions are excluded by the user's rule.**

The [independent review](reviews/2026-10-29/independent-review.md) records the
verdict, exact scope, sources, and action for every finding. Its
[JSON version](reviews/2026-10-29/independent-review.json) also records hashes
of retrieved manufacturer documents. The original
[manifest](reviews/2026-10-29/proposed-changes.json) now contains the resolution
status and independent review for each record. The earlier Luna reports are
retained as historical evidence, with their access limitations superseded by
this follow-up where documents were retrieved.

Implemented corrections include:

- Manufacturer-backed MPU-6050 discontinuance and ATmega328P NRND guidance.
- RP2040 SRAM boot and guaranteed-clock versus overclock qualifications.
- Removal of the LM2596 “drop-in 7805 replacement” claim.
- Correction of C109227's ADuM1201 comparison to 1 Mbps for the selected AR
  grade. C115450 had no incorrect speed claim and was excluded from that fix.
- HBM versus system ESD guidance, conditional SRV05-4 signal-integrity claims,
  and precise Economic PCBA feeder-loading wording in 27 notes.
- Correct resistor temperature-drift arithmetic and package-substitution
  documentation, plus an explicitly dated ULN2803 availability update.
- W5500 package-label alignment and correction of the existing C114586 pick to
  WS2812B-B/W, SMD5050-4P, Standard PCBA only. Its exact linked V5 sheet was
  retrieved: the note now uses the >280 µs reset requirement, correct logic
  threshold and optical test conditions, and excludes unsupported older-sheet
  claims.

The exact manufacturer sheets for **all 14 changed-rating records** were
retrieved and their changed fields reviewed. Examples include:

- C25190: the exact linked UNI-ROYAL sheet confirms ±100 ppm/°C for this 27 Ω
  0603 resistor; the conflicting 200 ppm description is corrected.
- C78395: the Brightking table's 1,000 µA value must be doubled for this
  low-voltage bidirectional type, giving **2 mA maximum at 5.8 V and 25 °C**.
- C19077496 and C19077522: the same low-voltage bidirectional footnote requires
  1 mA and 1.6 mA maximum leakage respectively; stale description ratings are
  corrected as well.
- C42413902: the SM08 diagram confirms two protected lines with a common anode;
  13.4 V at 1 A and 24 V at 15 A are different clamp test currents.
- ESD capacitance/leakage updates that substituted typical values for maxima
  now show both statistics. Pin-pair and pulse-current conditions are retained.

These changes are explicit, guarded entries in
[specification-reviews.json](src/data/specification-reviews.json). Index
generation checks the exact identity and expected source values before applying
them, preserves originals in `catalogOriginal`, and stops when upstream evidence
changes. The original raw snapshot is preserved. Detail pages show the source
and explanation for each reviewed part; other catalog views also use the
corrected generated description/attributes.

This is an independent review of the identified findings and changed fields,
not a certification of every unrelated electrical statement on the site.

## Our Picks policy

**Only a human may select additions to Our Picks.** All **58 existing C-numbers
are preserved**, with no additions, removals, or substitutions. Metadata and
accuracy corrections to existing picks were applied. The rule is recorded in
[root AGENTS.md](../AGENTS.md), [README](README.md), and
[MAINTENANCE.md](MAINTENANCE.md). The strict audit checks the human-selected
membership in [our-picks-selection.json](src/data/our-picks-selection.json).

The earlier STM8, EEPROM, and other candidate suggestions are not approved
selections. Their manifest records are explicitly marked
`excluded-human-selection`. The existing August 19 selection-review date is
preserved; individual content notes keep their own source dates.

## Tooling and verification

- The full refresh pipeline passes: transform, index, complete descriptions,
  schema/data audit, strict curated audit, content index/format checks, tests,
  and production build.
- **19 regression tests pass**, including tier flags, pagination, empty search,
  strict package mismatches, human-selected membership, mixed note dates, and
  guarded manufacturer corrections.
- **All 15 live checks pass.** C114586 uses a strict product-page fallback that
  requires matching identity plus explicit Extended/Standard Only evidence;
  it does not fabricate a missing API flag, price, or stock value.
- Content validation passes for 113 notes. Per-note dates allow the newly
  reviewed WS2812 and W5500 records to use October 29 without falsely advancing
  older notes.
- Vite was updated to 8.3.5 and source-map-js to 1.2.2. The
  [post-update npm audit](reviews/2026-10-29/npm-audit-after.json) reports zero
  vulnerabilities. The original audit is retained for provenance.
- Browser smoke checks and the final build hash are recorded in
  [validation.json](reviews/2026-10-29/validation.json). The pre-existing large
  catalog bundle still produces a size advisory; it is not a validation error.

The actual commit, remote push, and live deployment verification result are
reported in the completion message for this changeset.
