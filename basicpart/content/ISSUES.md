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

---

## 6. ADUM1201ARZ-RL7 — the catalog understates the data rate by 25× — Error

**Where:** `parts-index.json` entry for C9669 (`ADUM1201ARZ-RL7`), attribute
`Data Rate(Max): 1Mbps`.

**What was checked:** Analog Devices *ADuM1200/ADuM1201 — Dual-Channel Digital
Isolators*, Rev. L, Features page 1.

**Finding:** ADI specifies "High data rate: dc to 25 Mbps (NRZ)" and gives supply
current at 0–2 Mbps, 10 Mbps and 25 Mbps operating points. The catalog's 1 Mbps
figure is not a number that appears in the datasheet.

The `ARZ` order code is the part's temperature/package grade, not a speed grade —
ADI's speed grades for this family are denoted by the `W`/`B`/`C` letter after
the channel-configuration digits, and none of them is 1 Mbps.

**Why it matters:** This is the kind of error that causes someone to reject a
suitable part. Anyone isolating an SPI bus or a fast UART would look at 1 Mbps
and go elsewhere.

**Suggested action:** Correct the attribute to 25 Mbps, or drop it and let the
datasheet link speak. The component note for C9669 quotes the datasheet figure
and flags the discrepancy.

---

## 7. HT7533-1 and HT7550-1 — catalog input voltage and dropout disagree with Holtek's datasheet — Error

**Where:** `parts-index.json` entries for C14289 (`HT7533-1`) and C16106
(`HT7550-1`), attributes `Voltage - Supply: 30V` and
`Voltage Dropout: 25mV@(1mA)`.

**What was checked:** Holtek *HT75XX-1 — 100mA Low Power LDO*, Rev. 1.50
(12 January 2006), obtained from a third-party mirror after holtek.com returned
an HTML page rather than the PDF.

**Finding:** Two mismatches on both parts.

| Attribute | Catalog | Datasheet Rev. 1.50 |
|---|---|---|
| Input voltage | 30 V | 24 V maximum input; 26 V absolute maximum supply |
| Dropout at 1 mA | 25 mV | 100 mV typical |

The input-voltage figure is the more serious of the two: 30 V exceeds even the
absolute-maximum rating in this revision, so a design taken from the catalog
figure could destroy the part.

**Caveat:** the revision obtained is from 2006 and came from a mirror, not from
Holtek directly. It is possible a later revision raised these numbers. Both
component notes quote the datasheet figures and flag the discrepancy.

**Suggested action:** Verify against a current Holtek datasheet and correct the
attributes. Until then, the safe reading is 24 V.

Separately, both parts' output-current attributes (100 mA for the HT7533-1,
150 mA for the HT7550-1) are the datasheet's *typical* values; the guaranteed
minima are 60 mA and 100 mA respectively. That is not an error, but it is worth
knowing the site's figures are typicals here.

---

## 8. AMS1117-3.3 and AMS1117-5.0 — temperature range and input voltage disagree with the datasheet — Note

**Where:** `parts-index.json` entries for C6186 (`AMS1117-3.3`) and C6187
(`AMS1117-5.0`), attributes `Operating Temperature: -40℃~+125℃` and
`Voltage - Supply: 15V`.

**What was checked:** Advanced Monolithic Systems *AMS1117 — 1A Adjustable/Fixed
Low Dropout Linear Regulator*, AMS1117_20120314 (14 March 2012), obtained from
ams-semitech.com after advanced-monolithic.com returned HTTP 503.

**Finding:**

| Attribute | Catalog | Datasheet |
|---|---|---|
| Operating temperature | −40 °C to +125 °C | Operating **junction** temperature range −20 °C to +125 °C |
| Input voltage | 15 V | 4.8 V–10.3 V (3.3 V part) / 6.5 V–12 V (5.0 V part) for guaranteed regulation |

Neither is straightforwardly wrong — the input-voltage rows in the datasheet are
the conditions under which output accuracy is *guaranteed*, not an absolute
maximum, and different AMS1117 datasheet revisions from different vendors quote
different absolute maxima. But a reader taking "15 V" and "−40 °C" from the site
would be outside what this datasheet underwrites.

**Suggested action:** Low priority. If the attributes are ever revisited,
quoting the guaranteed input range per output voltage would be more useful than
a single 15 V figure, and the −20 °C junction floor is worth reflecting.

Note also that the AMS1117 part number is widely second-sourced and relabelled;
different manufacturers' AMS1117 datasheets genuinely differ in these numbers.
The LCSC record names Advanced Monolithic Systems specifically, which is what
this note is checked against.

---

## 9. House-brand discretes have no reachable manufacturer datasheet — Note

**Where:** several `parts-index.json` entries whose manufacturer is
`hongjiacheng` or `MDD(Microdiode Semiconductor)` — including C7502727
(`BAV99W`), C7420316 (`SS14`), C7420372 (`H5VL10B`), C28646265 (`BSS138W`),
C2488 (`MB10S-50MIL`) and C412437 (`US1M`).

**What was checked:** the `ds` field in `parts-index.json` for these parts points
at `lcsc.com/datasheet/...`. Every request to that host returns the LCSC
navigation page rather than the PDF, whether by `curl` or by the fetch tool, so
these datasheets could not be retrieved.

**Finding:** These are industry-standard *types* (BAV99W, SS14, MB10S, US1M,
BSS138) rather than proprietary designs, so other manufacturers' datasheets are
available and describe the same function. But the numbers are not always the
same. The clearest example found: the catalog rates C7502727 (`BAV99W`,
hongjiacheng) at 75 V reverse, while Nexperia's BAV99W is rated 100 V.

**How the notes handle it:** for these parts the component note cites the catalog
record as the primary source for every figure, names it as such in the
specification table, and cites a named manufacturer's datasheet for the same
industry type separately and explicitly — never blending the two.

**Suggested action:** No data change needed. But it is worth knowing that for
this class of part the site's attribute data *is* the specification of record,
and there is no second source to check it against. If the pipeline ever gains a
"datasheet reachable?" check, these would be the parts it flags.

---

## 10. MCP6002T-I/SN — catalog gives the extended temperature range for an industrial-grade order code — Note

**Where:** `parts-index.json` entry for C7377 (`MCP6002T-I/SN`), attribute
`Operating Temperature: -40℃~+125℃`.

**What was checked:** Microchip *MCP6001/1R/1U/2/4 — 1 MHz, Low-Power Op Amp*,
DS20001733L (2020), Features page 1.

**Finding:** Microchip lists two temperature grades for this family: Industrial,
−40 °C to +85 °C, and Extended, −40 °C to +125 °C. The `-I` in `MCP6002T-I/SN`
denotes the *industrial* grade, so the specified range for this order code is
−40 °C to +85 °C. The catalog shows the extended range.

**Why it matters:** modestly. Most MCP6002 parts will work well outside their
specified range; "specified" is about what Microchip guarantees, not about what
fails. But a design qualified against the catalog figure would be relying on an
unguaranteed range.

**Suggested action:** Correct to −40 °C to +85 °C, or verify against Microchip's
product page for this specific order code.

---

## 11. Two curated LEDs are Extended parts with no specification data at all — Note

**Where:** `src/data/other-components.json`, LEDs → `Green LED` (C72043) and
`Blue LED` (C72041), both `"tier": "extended"`.

**What was checked:** the curated list carries only a name, a description
("0603 indicator LED"), a package and a C-number for these two. Because they are
ordinary Extended parts they are absent from `parts-index.json`, so there is no
manufacturer, no forward voltage, no current rating, no luminous intensity, and
no price or stock data anywhere in the repository. The LCSC datasheet is not
reachable to automated fetching.

**Finding:** This is not an error, but it is an asymmetry worth noticing. The red
(C2286) and white (C2290) LEDs in the same recommendation group are Basic-tier
parts from Hubei KENTO with full attribute data. The green and blue ones are
Extended-tier parts with none — meaning they cost more to assemble *and* the site
can say less about them.

**Suggested action:** Check whether Hubei KENTO (or another supplier) has
qualifying Basic or Preferred green and blue 0603 LEDs. Recommending four LEDs of
which two are surcharged Extended parts, when Basic alternatives may exist, is
worth a second look. If the Extended parts are the right call anyway, the notes
for them will remain thin — which the component files now say plainly rather than
filling the gap with plausible-sounding numbers.

---

## 12. Twenty-seven parts in the qualifying snapshot have zero stock — Note

**Where:** `parts-index.json`, snapshot 2026-07-24.

**What was checked:** a scan of the `stock` field across all 1,586 qualifying
parts.

**Finding:** 27 parts show `stock: 0`, and a further 26 show fewer than 100
units. Most are individual resistor and capacitor values, where an out-of-stock
value is a routine inconvenience. Several, though, are individually notable
components that the site presents as normal choices — including every one of the
three large memory devices in the catalog:

| Part | MPN | Tier | Stock |
|---|---|---|---|
| C75501 | 78L12G-AB3-R | preferred | 0 |
| C719499 | FEMDRM008G-58A39 (8 GB eMMC) | preferred | 0 |
| C5126825 | F35UQA512M-WWT (512 Mbit SPI NAND) | preferred | 0 |
| C6847463 | MT25QU512ABB8E12-0AUT (512 Mbit NOR) | preferred | 0 |
| C42432160 | IS281B-N-AXW (optocoupler) | preferred | 4 |

**Why it matters:** a JLCPCB Basic or Preferred listing is an implicit statement
that the part is readily assemblable. A zero-stock Preferred part is not, and a
designer choosing from a table has no way to tell.

**Suggested action:** The data is already there — `stock` is captured per part.
Consider surfacing it in the UI, or at minimum sorting or flagging parts with
zero or very low stock. A "low stock" badge would cost little and prevent a
frustrating discovery at order time.
