# October 13, 2026 catalog review

Source: `raw-data/jlcpcb-basic-parts-2026-10-13.json`, collected from the public
JLCPCB Basic/Preferred endpoint with complete pagination and tier validation.

- 1,586 parts: 351 Basic and 1,235 Preferred Extended; no additions, removals,
  tier, category, manufacturer, or manufacturer-part-number changes.
- 1,520 stock counts and 1,379 price records changed (1,015 first-unit price
  increases, 127 decreases, and 237 parts with unchanged first-unit price but
  changed higher quantity breaks). The three largest price increases and three
  largest decreases were fetched again against the public API:
  C25804, C26108, C17614, C22807, C1554, and C25125. Five matched the snapshot
  identically; C1554 quoted $0.0026 live versus $0.0025 in the snapshot (a
  $0.0001 quote tick). These are distributor quotes, not promises of price or
  availability at checkout.
- 160 parts have changed source specifications/attributes (including 50 free-text
  descriptions updated to include newly populated attribute values, and 4 parts
  with changes to existing named attribute values):
  - **C7420316 (`SS14`):** JLCPCB normalized the package string from
    `SMA_DO-214AC` to `SMA(DO-214AC)` and added a placeholder
    `Power Dissipation: -` field. Updated `src/data/other-components.json`,
    `content/components/C7420316.md`, and `content/index.json` so the curated
    pick and component note metadata match the current catalog package spelling.
  - **C21379 (`CD4051BM96`):** `Turn-on time` changed from `-` to `720ns` and
    `Turn-off time` changed from `-` to `450ns`. Checked against Texas
    Instruments SCHS047O (revised May 2026, Section 5.5): these match the 5 V
    *maximum* `Inhibit-to-Signal OUT` switching delays (400 ns typical / 720 ns
    maximum turning on into 1 kΩ, and 200 ns typical / 450 ns maximum turning
    off into 10 kΩ; address-to-output switching at 5 V is 450 ns typical /
    720 ns maximum). Documented in `content/components/C21379.md`.
  - **154 Schottky Diodes (`Schottky Diodes`):** JLCPCB added or populated
    `Power Dissipation` across 154 records (56 newly added with 150 mW to
    500 mW package limits, 2 updated from `-` to `500mW`/`250mW` on C64885 and
    C22466361, and 96 added as `-`), populated `Non-Repetitive Peak Forward
    Surge Current` on 10 parts, and added `Operating Junction Temperature Range`
    on 37 parts (10 with temperature ranges, 27 with `-`). Documented the
    `Power Dissipation` attribute in
    `content/families/schottky-and-rectifier-diodes.md`.
  - **5 TVS Diodes (`C19077555`, `C42371727`, `C42371730`, `C42394394`,
    `C42394457`):** Added placeholder `Junction Capacitance: -` fields; no
    ratings changed.

Qualifying curated picks retain their current identities and tiers, and C7420316's
package string now matches `SMA(DO-214AC)`. The catalog reference date advances
to `2026-10-13`. Existing curated-review (`2026-08-19`) and manufacturer-note
baseline (`2026-07-24`) dates remain unchanged.

## Remaining upstream metadata conflicts

Preserved the raw source exactly. The upstream attribute-versus-description
discrepancies recorded on October 2, 2026 remain unchanged in the October 13,
2026 snapshot and are not endorsed by friendly labels or local notes. Verify
manufacturer ratings, waveforms, and test conditions before relying on these
figures:

- C15879: leakage 5 µA versus 70 nA
- C2990493: pulse power 200 W versus 1 kW at 8/20 µs; breakdown 33.3 V versus
  36.8 V (waveform or minimum/typical conventions may explain the difference)
- C3019524: breakdown 36.7 V versus 40.6 V
- C5125145: breakdown 7.22 V versus 7.98 V
- C7420339: Ciss 60 pF versus 17.5 pF; Crss 15 pF versus 6.5 pF
- C7420369: leakage 200 µA at 40 V versus 50 µA at 40 V
- C7502707: forward voltage 450 mV at 500 mA versus 385 mV at 500 mA
- C7502715: surge current 10 A versus 30 A
- C18199179, C41411774, C41411775, C41411778: surge current 100 A versus 120 A
- C2500: rectified current 125 mA versus 215 mA
