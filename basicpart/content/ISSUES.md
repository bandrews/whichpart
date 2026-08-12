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
