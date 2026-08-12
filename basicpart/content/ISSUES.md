# Issues found while writing the spec notes

Every part in `components/` was checked against its manufacturer datasheet and
against the JLCPCB/LCSC catalog record in `raw-data/`. This file records the
disagreements, unverifiable claims, and outright errors that turned up on the
way. It is a working log, not a bug tracker — each entry says what was checked,
what was found, and what (if anything) needs deciding.

Severity is used loosely:

- **Error** — a statement in the repository that the source contradicts.
- **Unverified** — a statement that may well be true but that no primary source
  could be found for.
- **Note** — a mismatch that is explainable and probably harmless, recorded so
  the next person does not have to re-check it.

---

## 1. ATMEGA328P-AU "not recommended for new designs" — Unverified

**Where:** `src/data/other-components.json`, Microcontrollers →
`ATMEGA328P-AU` (C14877), `notes` field:
> "Familiar Arduino-compatible MCU; Microchip marks this family not recommended
> for new designs."

**What was checked:** Microchip's own product page for ATmega328P and the
MicrochipDirect product page both returned navigation shells rather than
lifecycle data when fetched, so neither could be read. A web search surfaced a
genuine split: some authorized distributors (Mouser) do flag `ATMEGA328P-AU` as
NRND, while MicrochipDirect is reported to show a projected end-of-life date in
2040 and Rochester Electronics lists the part as active.

**Finding:** The claim attributes the NRND designation specifically to
*Microchip*. That attribution could not be confirmed from a Microchip primary
source, and other Microchip-channel evidence points the other way.

**Suggested action:** Either soften the note to something like "some
distributors flag this part NRND; check your supplier's status before
committing", or replace it with a link to a Microchip lifecycle document if one
can be found. Leaving it as-is risks stating a manufacturer position that the
manufacturer may not hold.

---

## 2. NE5532 — the TI datasheet contradicts itself, and the catalog follows the prose — Note

**Where:** `parts-index.json` entry for C7426 (`NE5532DR`), attributes
`Gain Bandwidth Product: 10MHz` and `Slew Rate: 9V/us`.

**What was checked:** Texas Instruments *NE5532, NE5532A, SA5532, SA5532A — Dual
Low-Noise Operational Amplifiers*, SLOS075K (revised December 2025).

**Finding:** The document gives different numbers in different places.

| Location in SLOS075K | Unity-gain bandwidth | Slew rate |
|---|---|---|
| Section 1, Features | 12 MHz typ | 5 V/µs typ |
| Section 5.5, Electrical Characteristics | 12 MHz typ | — |
| Section 5.6, Operating Characteristics | — | 5 V/µs typ |
| Section 6.3.1 / 6.3.3, descriptive prose | 10 MHz | "9V/ms" |

The catalog's 10 MHz and 9 V/µs match the descriptive prose, not the
specification tables. The prose figure of "9V/ms" is itself almost certainly a
units error in TI's document — milliseconds would make the part unusable, and
9 V/µs is the figure other manufacturers' NE5532 datasheets quote.

**Suggested action:** No change is strictly required — both numbers appear in the
manufacturer's own document. But the specification tables are the normative part
of a TI datasheet, so `12 MHz` and `5 V/µs` would be the safer values to display.
The component note for C7426 quotes the tables and flags the discrepancy.

---

## 3. ULN2803A — TI's datasheet is no longer retrievable, and the "C" successor is a different package — Note

**Where:** `parts-index.json` entry for C9683 (`ULN2803ADWR`).

**What was checked:** Every `ti.com/lit/` path for the ULN2803A datasheet
(SLRS049 / SLRS049H, February 1997, revised February 2017) returned HTTP 404
during this work, including `lit/ds/symlink/uln2803a.pdf`,
`lit/ds/slrs049h/slrs049h.pdf` and `lit/pdf/slrs049`. The seven-channel
ULN2003A datasheet (SLRS027T) and the newer ULN2803C datasheet (SLRS076B) both
download normally.

**Finding:** Two things follow.

1. The spec note for C9683 has to source its electrical figures from the catalog
   record rather than from a manufacturer datasheet. Those figures are
   internally consistent with the ULN2003A's, which is reassuring but not the
   same as verified.
2. TI's current ULN2803C is described in SLRS076B as a **20-pin** SOIC (DW)
   device, while the ULN2803A in this catalog is an **18-pin** part
   (`SOIC-18-300mil`). Anyone treating the ULN2803C as a drop-in replacement
   would get a footprint mismatch.

**Suggested action:** Nothing to fix in the data. Worth knowing that the LCSC
datasheet link for C9683 is the only readily available copy, and worth
recording the 18-pin / 20-pin difference somewhere user-visible if the site ever
suggests successors.

Separately: at $6.22 in ones against $0.17 for the seven-channel ULN2003ADR
(C7512), the price gap between these two parts is large enough that it may be
worth flagging in the UI, or reconsidering whether the ULN2803A earns its place
in the recommendations.

---

## 4. M24C64-RMN6TP — the catalog lists ECC as a feature, but ST ties it to the process letter — Note

**Where:** `parts-index.json` entry for C79988 (`M24C64-RMN6TP`), attribute
`Features: ... 、Built-in error correction code (ECC) function`.

**What was checked:** STMicroelectronics *M24C64-W, M24C64-R, M24C64-F,
M24C64-DF — 64-Kbit serial I²C bus EEPROM*, DS6638 Rev 38 (February 2023),
Section 5.1.5.

**Finding:** ST writes that the ECC "is offered only in devices identified with
process letter K, all other devices (identified with a different process letter)
do not embed the ECC logic." The order code `M24C64-RMN6TP` does not itself
encode the process letter, so the presence of ECC is not determined by the part
number the catalog lists.

This matters beyond a feature checkbox: where ECC *is* present, writing a single
byte cycles all four bytes of its ECC group, so the 4-million-cycle endurance
budget is defined per group rather than per byte.

**Suggested action:** Either qualify the attribute ("ECC on process-letter K
devices only") or drop it. As written it promises a feature that the
manufacturer's own datasheet declines to guarantee for a given order code.

---

## 5. L78M05ABDT-TR — ST's datasheet is watermarked "Obsolete Product(s)" — Error

**Where:** `parts-index.json` entry for C58069 (`L78M05ABDT-TR`), listed as a
JLCPCB **Basic** part with 117,309 units in stock at the 2026-07-24 snapshot.

**What was checked:** STMicroelectronics *L78MxxAB, L78MxxAC — Precision 500 mA
regulators*, Doc ID 2147 Rev 13 (May 2012), fetched from st.com.

**Finding:** All 31 pages of the datasheet carry the watermark
`Obsolete Product(s) - Obsolete Product(s)`. The document's cover still says
"Datasheet − production data", so the two statements inside the same PDF
disagree; the watermark is ST's standard marking for a discontinued product.

**Suggested action:** This is worth surfacing. A Basic-tier part is one the site
actively encourages people to design in, and Basic tier is exactly the situation
where a designer is least likely to go and check lifecycle status themselves.
Consider either a lifecycle warning on this part, or a general mechanism for
flagging parts whose manufacturer documentation is marked obsolete — the
ATMEGA328P-AU note (issue 1) suggests this will not be the only case.

Note that stock and tier are LCSC/JLCPCB facts and remain true; obsolete at the
manufacturer does not mean unavailable today. It does mean the supply has an end
date.
