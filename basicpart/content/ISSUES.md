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

## Status review — 2026-08-19

Each issue was revisited before the spec notes were wired into the UI, and again
after the datasheet pass later the same day that closed the last of the
catalog-only notes. Current state:

| # | Issue | Status |
|---|---|---|
| 1 | ATMEGA328P NRND attribution | **Resolved (editorially).** Evidence stays split by channel: Mouser shows NRND, a Findchips review of authorized listings (June 2026) found no flag, MicrochipDirect projects EOL 2040-11. The curated note no longer attributes NRND to Microchip; it now describes the split and points at the ATmega328PB. |
| 2 | NE5532 datasheet self-contradiction | **Open upstream, surfaced.** The inconsistency is in TI's own document; the correction (12 MHz / 5 V/µs from the spec tables) is stated in the C7426 note, which the part page now displays. |
| 3 | ULN2803A datasheet unreachable | **Resolved.** The genuine SLRS049H (Rev H, Feb 2017) was obtained via a mirror; C9683 is now datasheet-sourced and every catalog attribute checks out, including the 18-pin DW package (TI's own device table). The ULN2803C remains a 20-pin non-substitute. |
| 4 | M24C64 ECC tied to process letter | **Open in catalog data, surfaced.** No override path exists for scraped attributes (parts-index.json regenerates from raw-data); the caveat is stated in the C79988 note, now displayed on the part page. |
| 5 | L78M05 datasheet marked obsolete | **Open, surfaced.** Lifecycle warning is stated prominently in the C58069 note, now displayed on the part page. |
| 6 | ADuM1201 data rate understated 25× | **Retracted — false alarm.** The `A` in `ADuM1201ARZ` *is* a speed grade. Analog Devices publishes separate switching-specification tables for the `AR`, `BR` and `CR` grades: 1 Mbps, 10 Mbps and 25 Mbps respectively. The catalog's 1 Mbps was correct for this order code all along, and it was the C9669 note that was wrong. Note rewritten; see the amended issue 6 below. |
| 7 | HT7533/HT7550 30 V and 25 mV "errors" | **Retracted — false alarm.** The current Holtek datasheet (Rev 2.81, 3 Dec 2025, fetched from holtek.com) is titled "30V, 100mA Low Power LDO" and specifies 30 V input (33 V abs max) and 25 mV typ / 55 mV max dropout at 1 mA. The catalog matched the current revision all along; the earlier finding was based on a stale 2006 mirror (Rev 1.50, 24 V / 100 mV). Both component notes rewritten against Rev 2.81. See the amended issue 7 below. |
| 8 | AMS1117 temp range / input voltage | **Open, surfaced.** Issue 7's lesson (revisions move) applies here too — the figures may match a newer AMS datasheet revision than the 2012 one obtained. Noted in the component files. |
| 9 | House-brand datasheets unreachable | **Resolved.** LCSC-hosted PDFs turned out to be retrievable after all — the `www.lcsc.com/datasheet/…` link serves an HTML viewer page whose markup carries the real `datasheet.lcsc.com` URL (finding 18 gives the method). Every house-brand part now cites its own branded manufacturer's datasheet. Two figures changed hands: the BAV99W's 75 V is confirmed correct (finding 20), the SS14's leakage is not (finding 19). |
| 10 | MCP6002T-I/SN temperature grade | **Confirmed Error.** DS20001733L's Product Identification System defines `I` = −40 °C to +85 °C and `E` = −40 °C to +125 °C; the catalog shows the `E` figure on an `-I` order code. Correction stated in the C7377 note, now displayed on the part page. |
| 11 | Green/blue LEDs had no data | **Resolved, with a new finding.** Live LCSC pages identify them as Everlight 19-217/GHC-YR1S2/3T (green) and 19-217/BHC-ZL1M2RY/3T (blue), with full specs now in the component notes — and both listings were marked "not available now" on 2026-08-19. Re-sourcing them on 2026-08-19 also found the repository citing a superseded 2009 Everlight document for the green one (finding 30). The picks list may want a substitute or a stock check. |
| 12 | 27 zero-stock parts in the snapshot | **Open.** Data suggestion stands (surface `stock` in the UI); out of scope for the notes-block change. |
| 13 | MB10S rated at twice the type's current | **Retracted — the catalog was right.** MDD's own datasheet rates the part at 1.0 A, with a derating curve flat to a *case* temperature of 115 °C. The 0.5 A figures came from other vendors' system ratings at 25 °C ambient on a named board. Two conditions do travel with the 1 A and are now stated in the note: resistive or inductive load (derate 20 % for capacitive), and case rather than ambient temperature. |
| 14 | UTC 78L05/78L12 ripple rejection | **Open, surfaced.** Unchanged; stated in the component notes. |
| 15 | KT-0603W colour temperature | **Retracted — faithfully transcribed.** KENTO's datasheet really does specify 40,000 K to "100,000 and above" at 5 mA, with a seven-bin table to match. The number is meaningless rather than mis-scraped: the part's CIE coordinates sit far off the black-body locus, so correlated colour temperature does not describe it. |
| 16 | Conditions omitted from catalog attributes | **Open, surfaced.** More instances found on 2026-08-19 — findings 24, 26, 27 and 29 are all the same shape. |
| 17 | LTV-817S CTR rank ignored | **Open, surfaced, corroborated.** A second Lite-On document (LTV-217-G) publishes the identical rank table, and C115450 is a second instance of the same behaviour (finding 28). |
| 18 | Datasheet hosts blocking retrieval | **Resolved for LCSC.** The viewer-page route (finding 18) recovered all 22 remaining parts, taking the datasheet-backed count from 77 of 99 to **99 of 99**. Two of those documents are scanned drawings with no text layer, read by rendering the page as an image. |
| 19–33 | Findings from the 2026-08-19 datasheet pass | **New.** Fifteen findings recorded while rewriting the last 22 notes against their manufacturers' documents. The two most consequential are 22 (the CJ431's ±0.5 % reference tolerance is not guaranteed for the order code sold) and 26 (the MT25QU512's catalog standby current is twenty times below the grade's guaranteed maximum). Finding 33 — LCSC listing a 3 A connector at 5 A — is the one most likely to cause a hot part. |

Also revisited on 2026-08-19: the CH340C's "no longer manufactured" curated note.
Both the live LCSC and JLCPCB pages showed no EOL marking and ~69,000 units in
stock, so the curated note was softened to "an earlier catalog record carried a
no-longer-manufactured flag that current listings do not show", and the LCSC
page confirmed the CH340C's integrated clock (no external crystal) — previously
an unverified claim in the C84681 note.

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

## 6. ADUM1201ARZ-RL7 — the catalog understates the data rate by 25× — ~~Error~~ RETRACTED

> **Retraction (2026-08-19, second review):** this finding was wrong, and in the
> opposite direction from issue 7 — here the catalog was right and this
> repository's own note was wrong. The letter after `ADuM1201` is a *speed*
> grade, not merely a temperature or package code. Corrected below.

**Where:** `parts-index.json` entry for C9669 (`ADUM1201ARZ-RL7`), attribute
`Data Rate(Max): 1Mbps`.

**What was checked (originally):** Analog Devices *ADuM1200/ADuM1201 —
Dual-Channel Digital Isolators*, Rev. L, Features page 1.

**What the original finding said:** that ADI specifies "High data rate: dc to
25 Mbps (NRZ)", that 1 Mbps appears nowhere in the datasheet, and that `ARZ` is
a temperature/package grade rather than a speed grade.

**What a full read of the datasheet shows:** the Switching Specifications
section contains *three* separate tables, headed `ADuM1200/ADuM1201AR`,
`ADuM1200/ADuM1201BR` and `ADuM1200/ADuM1201CR`. They differ substantially:

| Grade | Maximum data rate | Minimum pulse width | Propagation delay (typ/max) | Pulse-width distortion |
|---|---|---|---|---|
| `AR` | **1 Mbps** | 1,000 ns | 50 ns / 150 ns | 40 ns |
| `BR` | 10 Mbps | 100 ns | 20 ns / 60 ns | 3 ns |
| `CR` | 25 Mbps min, 50 Mbps typ | 20–40 ns | 20 ns / 45 ns | 3 ns |

The supply-current table carries the same distinction explicitly: its 10 Mbps
rows are labelled "BR and CR Grades Only" and its 25 Mbps rows "CR Grade Only".
The front-page "dc to 25 Mbps" headline therefore describes the `CR` part.

The `W` prefix (`WS`, `WT`, `WU`) is what denotes the wider −40 °C to +125 °C
temperature range; `AR`, `BR` and `CR` are all −40 °C to +105 °C, which is what
the catalog records for this part.

**Finding:** the catalog's `Data Rate(Max): 1Mbps` is correct for
`ADUM1201ARZ-RL7`. It matches the `AR` grade's switching specification exactly.
No data error exists.

**Why it matters:** the original finding would have led someone to design an
isolated link at up to 25 Mbps around a part guaranteed only to 1 Mbps. That is
a worse outcome than the conservative figure it set out to correct.

**Action taken:** the C9669 component note has been rewritten to state 1 Mbps as
the part's data rate, to tabulate all three grades, and to say plainly that the
`CR` part is the one to order if speed is needed. No catalog data change is
required.

---

## 7. HT7533-1 and HT7550-1 — catalog input voltage and dropout disagree with Holtek's datasheet — ~~Error~~ RETRACTED

> **Retraction (2026-08-19):** this finding was wrong. The revision checked
> (Rev 1.50, 2006, from a third-party mirror) was stale; Holtek's current
> Rev 2.81 (3 December 2025, fetched directly from holtek.com) is titled
> "30V, 100mA Low Power LDO" and specifies exactly the figures the catalog
> shows: 30 V maximum input (33 V absolute maximum) and 25 mV typical / 55 mV
> maximum dropout at 1 mA. The catalog was correct. The original text is kept
> below as a record of what was claimed and why.

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

## 9. House-brand discretes have no reachable manufacturer datasheet — ~~Note~~ RESOLVED

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

**Suggested action:** none outstanding.

**Resolved 2026-08-19.** All six datasheets were retrieved (see the amended
finding 18 for how), and each of these parts now cites its own branded
manufacturer's document rather than an industry-type substitute. The catalog is
no longer the specification of record for any of them. Two of the resolutions
change what the earlier text said:

- The BAV99W's reverse voltage is settled in the catalog's favour — see finding
  20. hongjiacheng's own front page says 75 V, and its guaranteed breakdown
  voltage is 75 V minimum, so the catalog was right and Nexperia's 100 V simply
  describes a different device.
- The SS14's reverse leakage went the other way: hongjiacheng guarantees 0.5 mA
  at 25 °C where the catalog claims 200 µA. See finding 19.

The MB10S (finding 13) and the US1M (finding 23) were also re-sourced from MDD's
own datasheets in the same pass.

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
worth a second look.

**Updated 2026-08-19.** The data half of this finding is closed: both parts are
identified (Everlight `19-217/GHC-YR1S2/3T` green, `19-217/BHC-ZL1M2RY/3T` blue),
both component notes are written from Everlight's own current datasheets, and
their specification tables are complete. Two things replace it:

- Re-sourcing the green LED turned up a real error — this repository had been
  citing a superseded 2009 Everlight document. See finding 30.
- Both parts read as **out of stock** on LCSC when checked on 2026-08-19. The
  curated list therefore recommends two parts that are both surcharged *and*
  currently unorderable, which sharpens rather than softens the case for finding
  a Basic-tier alternative.

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

---

# Second review — 2026-08-19

The notes were re-checked against primary sources, and datasheets were recovered
for a further twelve parts whose notes had been catalog-only. That work produced
one retraction (issue 6, amended above), a set of corrections to the notes
themselves — recorded in the git history rather than here, since they were
defects in this repository's prose rather than in the site's data — and the
following new findings about the catalog data.

## 13. MB10S — the catalog rates it at twice the current the type is rated for — ~~Error~~ RETRACTED

**Where:** `parts-index.json` entry for C2488 (`MB10S-50MIL`), attribute implying
1 A average forward current.

**What was checked:** EIC Semiconductor *MB1S – MB10S Mini-Bridge Rectifiers*,
Rev. 03, 25 October 2006, plus the published summaries of the Diodes Inc and
onsemi MB10S datasheets.

**Finding:** every retrievable datasheet for the MB10S type rates it well below
1 A. EIC specifies 0.5 A average forward current on a glass-epoxy board with
13 × 13 mm pads, and 0.8 A only on an aluminium substrate. Diodes Inc publishes
0.8 A; onsemi publishes 0.5 A. The rating is a thermal one — the package's
junction-to-ambient resistance is 85 °C/W even with those generous pads — so it
genuinely depends on the board, and 1 A exceeds all published figures for any
board.

**Why it matters:** this is the error most likely to cause a field failure rather
than merely a poor part choice. Someone sizing a supply for 1 A from the catalog
figure would be running the bridge at twice its rating.

**Suggested action:** none. See the retraction below.

**Retracted 2026-08-19 — the catalog was right.** MDD's own datasheet for the
branded part was retrieved (*MB1S THRU MB10S — Single Phase Glass Passivated
Bridge Rectifiers*, Rev. 2024A2). Its Maximum Ratings table specifies
I<sub>F(AV)</sub> = **1.0 A**, and its Fig. 1 derating curve is flat at 1.0 A up
to a **case** temperature of 115 °C before falling to zero at 150 °C.

The two sets of figures were never in conflict about the silicon; they are
different kinds of rating. MDD publishes a case-referenced rating — what the die
can carry if you can hold the package at 115 °C. EIC publishes a system rating —
what the part achieves at 25 °C ambient on a named board with 13 × 13 mm pads.
Both quote the same 85 °C/W junction-to-ambient thermal resistance, and MDD's own
note attaches that figure to four 3.81 × 3.81 cm copper pads, which is far more
copper than its suggested land pattern provides.

Two conditions travel with the 1 A that the catalog attribute does not carry:
it is for a resistive or inductive load, with the datasheet's own instruction to
"derate by 20 %" for a capacitive load — so 0.8 A behind the usual reservoir
capacitor — and it is referenced to case temperature, not to still air. The
C2488 note now says exactly this. The earlier advice to design to 0.5 A was
over-conservative and has been removed.

---

## 14. UTC 78L05 and 78L12 — the catalog overstates ripple rejection by 20 dB — Error

**Where:** `parts-index.json` entries for C71136 (`78L05G-AB3-R`) and C75501
(`78L12G-AB3-R`), attribute `Power Supply Rejection Ratio (PSRR)`, recorded as
`80dB@(120Hz)` and `65dB@(120Hz)`.

**What was checked:** Unisonic Technologies *78LXX — 3-Terminal 0.1A Positive
Voltage Regulator*, document QW-R101-001.AC, © 2024.

**Finding:** UTC specifies ripple rejection of 60 dB minimum for the 78L05 (8 V ≤
V<sub>IN</sub> ≤ 20 V, 120 Hz, 25 °C) and 45 dB minimum for the 78L12 (15 V ≤
V<sub>IN</sub> ≤ 25 V). Both catalog figures are 20 dB high, in the same
direction, for both parts.

**Why it matters:** 20 dB is a factor of ten. A design relying on the regulator
to clean up switching ripple would get a tenth of the assumed attenuation.

**Suggested action:** stated in both component notes. Correcting the attributes
would need the same override path as issues 4 and 13.

---

## 15. KT-0603W — the catalog's colour temperature is not physically possible — ~~Error~~ RETRACTED

**Where:** `parts-index.json` entry for C2290 (`KT-0603W`), attribute
`Color Temperature: 40000K~100000K`.

**What was checked:** the range of colour temperatures white LEDs are actually
manufactured in.

**Finding:** white LEDs run from roughly 2,700 K (warm white) to roughly
10,000 K (very cool white). Nothing emits at 100,000 K; that figure corresponds
to no manufacturable light source. The most likely explanation is a
factor-of-ten transcription error, which would give 4,000–10,000 K and describe
an ordinary cool white.

**Why it matters:** less severe than the electrical errors above — nobody selects
an indicator LED on colour temperature alone — but it is a visible nonsense value
on a page users read, and it undermines confidence in the surrounding figures.

**Suggested action:** none. See the retraction below.

**Retracted 2026-08-19 — the catalog transcribed the manufacturer faithfully.**
KENTO's own document (*承认书 / Specification for Approval*, Rev. A.0,
6 December 2018) specifies, in section 5, a correlated colour temperature of
40,000 K minimum and "100000以上" — 100,000 and above — maximum, at
I<sub>F</sub> = 5 mA. Section 6.3's colour-bin table repeats it: seven bins
DT1–DT7, five of them labelled "above 100,000 K". So the figure came from the
manufacturer, not from a scraping error.

What was right about the original finding is that the number is meaningless, and
the datasheet shows why. Its typical CIE 1931 coordinates are x = 0.232,
y = 0.200, and its spectrum has a blue peak near 470 nm at full scale with only a
small phosphor hump near 550 nm. That is a chromaticity a long way off the
black-body locus, where a correlated colour temperature stops describing
anything. This is a very blue white, and the honest statement is not "4,000 K
mis-scaled" but "colour temperature does not apply to this part". The C2290 note
says that.

---

## 16. Conditions omitted from catalog attributes — Note

Three parts carry attribute values that are real datasheet figures quoted without
the condition that makes them true. None is wrong, exactly, but each would
mislead a reader taking the number at face value. All three are now explained in
the corresponding component notes.

| Part | Attribute | What the datasheet says |
|---|---|---|
| C7881 (`ICL7660AIBAZA-T`) | `Output Resistance: 97Ω`, `Switching Frequency: 8kHz`, `Quiescent Current: 100uA` | All three are the V+ = 3 V figures. At 5 V the same part is 60 Ω, 10 kHz and 80 µA — better than the listing suggests. |
| C75510 (`LM317AG-TN3-R`) | `PSRR: 80dB@(120Hz)` | 80 dB is typical *with a 10 µF capacitor on the adjust pin*. With the pin bare it is 65 dB. The listing omits the capacitor. |
| C61063 (`XL1509-5.0E1`) | `Voltage - Supply: 4.5V~40V` | 4.5 V is the XL1509 family minimum. XLSEMI specifies the 5 V variant's output only from 7 V upward, which follows from its 1.5 V minimum dropout. |

Also worth recording: C75510's `Voltage Dropout: 5V@(500mA)` matches no dropout
specification in UTC's datasheet, but does match its electrical-characteristics
*test condition* (V<sub>IN</sub> − V<sub>OUT</sub> = 5 V, I<sub>OUT</sub> =
0.5 A). It appears to be a transcription of the wrong cell.

---

## 17. LTV-817S-TA1-C — the catalog ignores the order code's CTR rank — Note

**Where:** `parts-index.json` entry for C109227 (`LTV-817S-TA1-C`), attributes
`Current Transfer Ratio (CTR) Minimum: 50%` and `Maximum/Saturation Value: 600%`.

**What was checked:** LITE-ON *LTV-817 series Photocoupler*, Spec No.
DS70-2012-0050, Revision C, section 5 (Rank Table of Current Transfer Ratio).

**Finding:** Lite-On sorts every 817 into CTR ranks — L (50–100 %), A (80–160 %),
B (130–260 %), C (200–400 %), D (300–600 %) — and an ungraded part spans
50–600 %. The catalog quotes the ungraded span, but this order code ends in `-C`,
which corresponds to rank C: a 2:1 spread rather than a 12:1 one.

**Why it matters:** in the *helpful* direction, for once. Designing an
optocoupler circuit around a 12:1 gain spread is much harder than around 2:1, so
the catalog understates how usable the part is. But the rank is an inference from
the order code rather than something the catalog states, so it should be
confirmed with the supplier before being relied on.

**Suggested action:** stated in the C109227 note, with the caveat.

**Corroborated 2026-08-19.** Lite-On's LTV-217-G datasheet, retrieved the same
day, publishes the identical rank table — A 80–160 %, B 130–260 %, C 200–400 %,
D 300–600 %, ungraded 50–600 %, at the same I<sub>F</sub> = 5 mA,
V<sub>CE</sub> = 5 V, 25 °C — so the mechanism is confirmed by a second Lite-On
document. C115450 (`LTV-217-B-G`) is a second instance of the same catalog
behaviour; see finding 28. Neither Lite-On document publishes an order-code
decoder, so both remain inferences from the suffix.

---

## 18. Datasheet hosts that block automated retrieval — Note

Recorded so the next person does not repeat the work. As of 2026-08-19:

- **Blocked to plain HTTP clients:** ST, onsemi, Analog Devices, NXP, Torex,
  Mouser, Diodes Inc, alldatasheet. Several return HTTP 403; ST and Analog
  Devices instead close the HTTP/2 stream.
- **Reachable directly:** Nexperia, Texas Instruments, Vishay, Unisonic, XLSEMI,
  Winbond, Holtek, Epson, Microchip, Raspberry Pi, WIZnet, MaxLinear.
- **Useful mirrors** for the blocked hosts: `mm.digikey.com/Volume0/opasdata/…`
  for Everlight and other passives, `datasheet.octopart.com` for Lite-On,
  `www.mouser.com/datasheet/…` for Torex, `www.cdiweb.com/datasheets/…` for
  InvenSense. Mirrors serve whatever revision they were given: the Digi-Key copy
  of the Everlight green LED datasheet is sixteen years old and disagrees with
  the current one (finding 30), so a mirror's document date is worth checking
  against the manufacturer's.

**LCSC datasheets are reachable after all — here is how.** The `ds` links in
`parts-index.json` come in two shapes, and both resolve:

- `wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/…pdf` serves the PDF directly to
  an ordinary HTTP client. No workaround needed.
- `www.lcsc.com/datasheet/…pdf` redirects to `www.lcsc.com/datasheet/<C-number>.pdf`,
  which returns an **HTML viewer page**, not a PDF — which is what made this look
  like a block. That page contains the real URL, on `datasheet.lcsc.com`, and
  that URL serves the PDF. So: follow redirects, look for a
  `datasheet.lcsc.com/datasheet/pdf/<hash>.pdf` link in the HTML, and fetch it.
- Where a part's `ds` field is empty, the LCSC product page
  (`www.lcsc.com/product-detail/<C-number>.html`) carries a `pdfUrl` field in its
  embedded JSON, which may point at `datasheet.lcsc.com` or straight at the
  manufacturer.

Applied on 2026-08-19, this closed the gap entirely: the datasheet-backed count
went from 77 of 99 to **99 of 99**. The parts it recovered were the KENTO LEDs,
the YXC crystals, the ISOMICRON optocouplers, the FORESEE memories, the SHOU HAN
and Jing Extension connectors, the hongjiacheng and MDD discretes, the TOPPOWER
chargers and the Changjiang reference.

Two of those documents are scanned drawings with no text layer at all — the YXC
crystal series sheet and the Jing Extension connector drawing. Rendering the page
to an image at 150 dpi and reading it, with 400–900 dpi crops for the title block
and the small print, worked where text extraction returned nothing. That is how
the connector's part-number mismatch (finding 32) and its one-micro-inch gold
plating were found.

---

## 19. SS14 — the catalog's reverse leakage is less than half what the manufacturer guarantees — Error

**Where:** `parts-index.json` entry for C7420316 (`SS14`, hongjiacheng),
attribute `Reverse Current: 200uA@40V`.

**What was checked:** Zhuhai Hongjiacheng Technology Co., Ltd, *SS12 THRU SS120 —
Surface Mount Schottky Barrier Rectifier*, Electrical Characteristics table,
page 2. The columns of that table span groups of types, so the rendered page was
read as an image to confirm which column governs the SS14.

**Finding:** hongjiacheng specifies I<sub>R</sub> **0.5 mA maximum at 25 °C** at
the rated DC blocking voltage for the SS12–SS16 group, and **50 mA maximum at
100 °C**. The catalog's 200 µA is 2.5× better than the manufacturer's own
guarantee at room temperature — and it is not the typical either: the datasheet's
Fig. 4 puts the typical near 0.06 mA at 25 °C. The hot figure is eight times
worse than the 6 mA the earlier note had taken from Vishay's SS14 datasheet.

**Why it matters:** for the SS14's usual job — the catch diode in a buck
converter — leakage is irrelevant. For the other common use, reverse-polarity or
battery-isolation blocking, it decides the standing drain: 50 mA at 40 V is 2 W
dissipated in a part rated for a fraction of that, and leakage rises with
temperature faster than the package sheds heat.

**Suggested action:** the C7420316 note now quotes the manufacturer's figures and
flags the disagreement. The catalog attribute would be worth correcting if an
override path ever exists.

---

## 20. BAV99W — the manufacturer's datasheet contradicts itself on reverse voltage — Note

**Where:** `parts-index.json` entry for C7502727 (`BAV99W`, hongjiacheng),
attribute `Reverse Voltage (Vr): 75V`. This supersedes the example given in
finding 9.

**What was checked:** Zhuhai Hongjiacheng Technology Co., Ltd, *BAV99W — Fast
Switching Diodes*, front-page summary and Maximum Ratings table, page 1.

**Finding:** the same page says both things. The summary box prints "Reverse
Voltage 75 V"; the Maximum Ratings table immediately below gives
V<sub>RRM</sub> = 100 V, V<sub>RMS</sub> = 75 V, and a reverse breakdown voltage
V<sub>(BR)R</sub> of 75 V minimum at I<sub>R</sub> = 100 µA. Only the last of
those is a guarantee about the silicon: the part is tested to withstand 75 V.

**Why it matters:** finding 9 recorded the catalog's 75 V as possibly understated,
because Nexperia's BAV99W is a 100 V part. With hongjiacheng's own document in
hand the answer is that the catalog transcribed the defensible number. Design to
75 V.

**Suggested action:** none. The C7502727 note explains which figure to use and
why.

---

## 21. TP4054 — the catalog's 450 mA is a thermally limited figure, not the programmable maximum — Note

**Where:** `parts-index.json` entry for C32574 (`TP4054-42-SOT25R`), attribute
`Charge Current - Max: 450mA`.

**What was checked:** NanJing Top Power ASIC Corp., *TP4054 线性锂离子电池充电器*
(datasheet, no document number or revision printed), Features list, Electrical
Characteristics table and demonstration-board notes.

**Finding:** the datasheet's headline is "up to 800 mA programmable charge
current", and 800 mA is also the absolute-maximum BAT pin current. The catalog's
450 mA is the *maximum* column of the I<sub>BAT</sub> row at
R<sub>PROG</sub> = 1.66 kΩ (250 / 400 / 450 mA) and the top of the demonstration
board's thermally limited sweep. Both numbers are real; they describe different
things.

**Why it matters:** mildly, and in the safe direction — but it also invalidated a
comparison this repository made in the other direction. The C32574 note used to
say the TP4054 charges "slightly below the TP4057's 500 mA". By datasheet the
TP4054 is the higher-current part; in a SOT-23 package neither reaches its
programmable maximum without thermal foldback.

**Suggested action:** none in the data. Both charger notes now state the
programmable maximum, the thermally limited figure, and the worked examples the
manufacturers give for each.

---

## 22. CJ431 — the catalog's ±0.5 % reference tolerance is not what the datasheet guarantees for this order code — Error

**Where:** `parts-index.json` entry for C3113 (`CJ431`), attributes
`Voltage Reference Tolerance: ±0.5%` and `Temperature Coefficient: 50ppm/℃`.

**What was checked:** Jiangsu Changjiang Electronics Technology Co., Ltd (JCET),
*CJ431/CD431 Adjustable Reference Source*, footer "M,Oct,2017"; the
classification-of-V<sub>ref</sub> table, the Electrical Characteristics table and
the Ordering Information table, all page 2.

**Finding:** the datasheet does define a 0.5 % rank (2.487–2.513 V) alongside a
1 % rank (2.475–2.525 V). But its guaranteed Electrical Characteristics give
V<sub>ref</sub> = 2.475 / 2.500 / 2.525 V — the ±1 % window — and the ordering
table offers exactly one SOT-23 line, part number `CJ431`, marking `431`, with no
grade suffix. Nothing ties the 0.5 % rank to the part number LCSC sells. The
temperature-coefficient figure has the same shape: 50 ppm/°C is the feature
list's typical, while the guaranteed number is ΔV<sub>ref</sub> ≤ 17 mV over
−25 °C to +85 °C (4.5 mV typical) — 0.68 % of 2.5 V, larger than the initial
tolerance.

**Why it matters:** a shunt reference is chosen for its accuracy, so this is the
attribute that matters most on the part. A design that budgets ±0.5 % and gets
±1 % initial plus 0.68 % of drift has three times the error it planned for.

**Suggested action:** treat ±1 % as the guaranteed figure unless the supplier
confirms the rank. Stated in the C3113 note.

---

## 23. US1M — the catalog's forward voltage does not appear in the datasheet — Error

**Where:** `parts-index.json` entry for C412437 (`US1M`, MDD), attribute
`Voltage - Forward (Vf) (Max): 1.65V@1A`.

**What was checked:** MDD (Microdiode Semiconductor), *US1A THRU US1M — Surface
Mount Ultra Fast Rectifier*, Rev. 2025A6, Maximum Ratings table, page 1.

**Finding:** MDD specifies V<sub>F</sub> ≤ **1.70 V** at I<sub>F</sub> = 1.0 A for
the US1J/US1K/US1M group (1.00 V for US1A–US1D, 1.30 V for US1G). 1.65 V appears
nowhere in the document. Every other catalog attribute for this part checks out.

**Why it matters:** marginally — 50 mV at 1 A is 50 mW — but it is a figure a
designer might use to size a heatsink or compare against a Schottky, and it is
better than the manufacturer's guarantee.

**Suggested action:** low priority. The C412437 note quotes 1.70 V.

---

## 24. KT-0603R and KT-0603W — the catalog's brightness is the top of an ungraded span, and its current rating is a test condition — Error

**Where:** `parts-index.json` entries for C2286 (`KT-0603R`) and C2290
(`KT-0603W`), attributes `Luminous Intensity` and `Forward Current`.

**What was checked:** Hubei KENTO Elec, *承认书 / Specification for Approval* for
each part, Revision A.0, 6 December 2018 — section 4 (Absolute Maximum Ratings),
section 5 (Electrical Optical Characteristics) and section 6.1 (luminous
intensity bin table).

**Finding:** two distinct problems, both in the same direction.

*Brightness.* KENTO specifies I<sub>V</sub> as a span with no typical: 145–300 mcd
at 20 mA for the red, 145–360 mcd at 5 mA for the white. Parts are sorted into
bins (P22–P24 for the red, P22–P26 for the white, ±10 %), and neither order code
selects a bin. The catalog quotes the *top* of each span — 300 mcd and 360 mcd —
as though it were the part's brightness. The only figure guaranteed for a part
bought under this code is 145 mcd, less than half of it.

*Current.* The catalog's `Forward Current` of 20 mA (red) and 5 mA (white) is the
current at which the optical figures are measured. The absolute maximum DC
forward current is 25 mA for the red and 30 mA for the white, with a 60 mA peak
under a 0.1 ms / 10 % duty pulse. The earlier note took the catalog figure for a
rating and wrongly warned that running the white at 20 mA was "four times its
rating"; 20 mA is inside both the 30 mA and the 100 mW limits, it is simply not
characterised there.

**Why it matters:** brightness is the reason to choose one indicator LED over
another, and a 2:1 spread with no typical is not something to design a
light-guide or a diffuser against. The current figure matters less but points the
wrong way — it makes the parts look more fragile than they are.

**Suggested action:** both notes now give the guaranteed minimum, the span, the
bin structure and the true absolute maximum. Worth correcting at source if the
scrape can be overridden.

---

## 25. FEMDRM008G-58A39 — "8GB" is the raw die density, not the usable capacity — Note

**Where:** `parts-index.json` entry for C719499 (`FEMDRM008G-58A39`), attribute
`Memory Size: 8GB`.

**What was checked:** FORESEE (Shenzhen Longsys Electronics), *Industrial eMMC
Datasheet FEMDRM008G-58A39*, document A-00038, version 1.0, 15 June 2020 —
Table 1 (Product List) and Table 10 (Partition Configuration).

**Finding:** the user-addressable density is **7.28 GB** — 15,269,888 sectors of
512 bytes, or 7,818,182,656 bytes, confirmed by the EXT_CSD `SEC_COUNT` value of
0xE90000. The remainder of the 64 Gbit array goes to the controller's own use,
plus two 4 MB boot partitions and a 4 MB RPMB partition. The datasheet also
carries no endurance or retention specification at all.

**Why it matters:** about 9 % of a figure that reads like a filesystem size. A
partition table sized from the catalog number will not fit.

**Suggested action:** none in the data — "8GB" is how every eMMC is sold. The
C719499 note gives the usable figure.

---

## 26. MT25QU512ABB8E12-0AUT — a standby current that is not in the datasheet, and a clock figure that applies to one mode — Error

**Where:** `parts-index.json` entry for C6847463, attributes
`Standby Supply Current: 15uA` and the 133 MHz maximum clock.

**What was checked:** Micron Technology, *MT25QU512ABB — 512Mb, 1.8V Multiple I/O
Serial Flash Memory*, document mt25q-qlkt-u512-abb-0, Rev. F, January 2018 —
Table 48 (DC Current Characteristics) and Table 50 (Maximum frequency supported).

**Finding:** Micron gives standby current as **20 µA typical**, with a maximum of
100 µA for the industrial grade, 200 µA for automotive and **300 µA for the UT
grade this order code carries**. 15 µA appears nowhere. On clock speed, 133 MHz
is the quad-I/O STR ceiling for the UT grade; single and dual I/O reach 166 MHz
STR and 90 MHz DTR, while the legacy READ (03h) command is limited to 54 MHz on
every grade. The achievable frequency also depends on the number of dummy
cycles, and Micron footnotes those tables as "guaranteed by characterization and
not 100 % tested in production".

**Why it matters:** the standby figure is twenty times optimistic against the
grade's guaranteed maximum, which matters in exactly the battery-powered designs
that choose a 1.8 V part. The clock figure understates the part in fast modes and
badly overstates it for the one command a bootloader is most likely to use.

**Suggested action:** the C6847463 note gives the per-mode table. The catalog's
standby figure is worth correcting if an override path ever exists.

---

## 27. F35UQA512M-WWT — the catalog's program and erase times are the ECC-disabled typicals — Note

**Where:** `parts-index.json` entry for C5126825, attributes for page-program and
block-erase time (`350us`, `2ms`).

**What was checked:** FORESEE (Shenzhen Longsys Electronics), *512Mbit SPI NAND
Flash F35UQA512M*, document LM-00033, Rev 1.1, 10 February 2022 — Table 27 (AC
timing) and §11.4 (internal ECC).

**Finding:** the catalog's figures are the typicals measured with the on-die
error correction switched **off**. Internal ECC is enabled by default; with it on,
page program is 380 µs typical and **750 µs maximum**, and block erase is 2 ms
typical and **10 ms maximum**. Not a contradiction, but the catalog reports the
best case of a distribution whose worst case is 2× and 5× larger.

**Why it matters:** anyone sizing a write budget from the catalog attributes —
firmware update time, log throughput — will be out by a factor of two or more.

**Suggested action:** none in the data. The C5126825 note gives both figures and
says which is which. The same note also records what the density figure means:
512 Mbit is 64 MB of user data, and the array including the 64-byte-per-page
spare area is 528 Mbit.

---

## 28. LTV-217-B-G — a second instance of finding 17, and a datasheet that contradicts itself on isolation — Note

**Where:** `parts-index.json` entry for C115450 (`LTV-217-B-G`), attributes
`Current Transfer Ratio (CTR) Minimum: 50%`, `Maximum/Saturation Value: 600%` and
`Isolation Voltage(Vrms): 3.75kV`.

**What was checked:** LITE-ON Technology Corp., *LTV-217-G Photocoupler*,
Spec No. DS70-2009-0016, Revision A — the Rank Table of Current Transfer Ratio
(page 6), the features page (page 1) and the Absolute Maximum Rating table
(page 4). The pages were read as rendered images as well as extracted text.

**Finding:** two things.

*CTR rank.* Exactly the pattern finding 17 records for the LTV-817S. Lite-On
sorts the 217 into ranks A (80–160 %), B (130–260 %), C (200–400 %) and D
(300–600 %), with an ungraded part spanning 50–600 %. The catalog quotes the
ungraded span against an order code whose `-B-` names rank B. As with finding 17
the mapping is an inference from the order code — Lite-On publishes no decoder,
and the outline drawing notes that the rank "shall be or shall not be marked" —
so it should be confirmed with the supplier before being relied on.

*Isolation voltage.* The datasheet gives two different numbers. Its features page
says V<sub>ISO</sub> = 3.75 kV<sub>rms</sub>; its Absolute Maximum Rating table
says 3,000 V<sub>rms</sub>, AC for one minute at 40–60 % RH. The catalog followed
the higher, features-page figure. The conservative design number is 3,000 V.

**Why it matters:** the CTR half is helpful, as in finding 17 — a 2:1 gain spread
is far easier to design around than 12:1. The isolation half is not: 3.75 kV is
the number a reader would put in a safety calculation, and it is not the one in
the ratings table.

**Suggested action:** stated in the C115450 note, with both caveats.

---

## 29. ICPL-356-50CEAXW — the catalog's saturation-voltage test condition does not exist in the datasheet — Error

**Where:** `parts-index.json` entry for C42432283, attribute
`Vce Saturation(VCE(sat)): 200mV@10mA,1mA`.

**What was checked:** ISOMICRON, *ICPL-356 silicon planar phototransistor*,
Rev. V01, 23 July 2023, Electrical Optical Characteristics table, page 4.

**Finding:** ISOMICRON specifies V<sub>CE(sat)</sub> = 0.06 V typical, 0.2 V
maximum, at I<sub>F</sub> = **20 mA** and I<sub>C</sub> = 1 mA. There is no 10 mA
condition anywhere in the table. The voltage is right; the drive current that
produces it is half what the datasheet requires.

**Why it matters:** saturation voltage is meaningless without its conditions —
it is the number that decides whether the optocoupler's output will read as a
valid logic low. Underestimating the required LED current by half is exactly the
error that produces an output which almost, but not quite, pulls down.

**Suggested action:** the C42432283 note gives the datasheet's conditions. Note
also that the catalog's `@a,b` ordering is not consistent between entries — for
C115450 it is I<sub>F</sub>, I<sub>C</sub>; for C42432160 it is I<sub>C</sub>,
I<sub>F</sub> — so the pair cannot be read positionally.

---

## 30. 19-217/GHC-YR1S2/3T — this repository was citing a superseded Everlight datasheet — Error

**Where:** `content/components/C72043.md`, which cited Everlight document
SZDSE-197-G02, Rev. 2, prepared 8 April 2009, from the Digi-Key mirror.

**What was checked:** the current document — Everlight Electronics Co., Ltd,
*Datasheet — SMD ▪ B, 19-217/GHC-YR1S2/3T*, Issue No. DSE-0006617, Rev. 4,
released 27 May 2017 — obtained from an Octopart mirror, with the exact `/3T`
suffix confirmed on every page header.

**Finding:** the two revisions genuinely disagree. Peak wavelength moved from
525 nm to **518 nm**, and the forward-voltage limits (2.70 / 3.30 / 3.70 V), which
are unchanged, now carry a test condition of I<sub>F</sub> = **20 mA** rather than
5 mA — a four-fold tightening of the same numbers. LCSC's own product
description reads "Emerald Green 518nm", corroborating the newer document. The
2009 sheet remains the top search result for the part and is still served by the
Digi-Key mirror.

**Why it matters:** it is the same lesson as findings 7 and 8, arriving from the
other direction: revisions move, and a mirror is not a publisher. Here it also
changed a design conclusion. The note previously said the part could not be
driven from 3.3 V; Everlight's own I–V curve shows conduction beginning a little
under 2.8 V, so at the 1–3 mA an indicator needs, a 3.3 V rail does light it —
with about half a volt across the series resistor.

**Suggested action:** done — the note is rewritten against Rev. 4, and cites the
2009 document only as the source of the difference.

---

## 31. The catalog's crystals do not match the load capacitance the parts they clock ask for — Note

**Where:** `parts-index.json` entries for C9002 (`X322512MSB4SI`, 12 MHz, 20 pF)
and C9006 (`X322525MOB4SI`, 25 MHz, 12 pF), read against the two parts this site
recommends them for.

**What was checked:** Raspberry Pi, *RP2040 Datasheet*, §2.16.1.1 and Table 257;
WIZnet, *W5500 Datasheet* v1.1.0, §5.5.3 (Crystal Characteristics); and YXC's
*Crystal Unit YSX321SL* series datasheet.

**Finding:** neither pairing is wrong, but neither is a drop-in either.

- The RP2040's reference crystal is an Abracon ABM8-272-T3: **10 pF load, 50 Ω
  maximum ESR, ±30 ppm**. C9002 is a 20 pF part in the YSX321SL's 12–15 MHz band,
  where the ESR ceiling is 80 Ω. Raspberry Pi's own text warns that "even if you
  use a crystal with similar specifications, you will need to test the circuit
  over a range of temperatures" and that "any changes to crystal parameters risk
  instability".
- The W5500 specifies an **18 pF** load capacitance; C9006 is a 12 pF part. It
  will oscillate, but WIZnet's reference-schematic capacitor values cannot be
  copied across.

**Why it matters:** load capacitance is the one crystal parameter a designer must
match to the oscillator, and getting it wrong shifts the frequency rather than
stopping the circuit — which makes it a bug that survives bring-up and shows up
later as a USB or Ethernet link that works on most boards.

**Suggested action:** none in the data; the pairing advice belongs in the notes,
and C9002 and C9006 now carry it with the datasheet citations.

---

## 32. 918-418K2024S40000 — the drawing LCSC serves carries a different part number — Note

**Where:** `parts-index.json` entry for C168688 (`918-418K2024S40000`, Jing
Extension of the Electronic Co.), and the datasheet LCSC links from that
C-number.

**What was checked:** the drawing itself — Shenzhen Jing Tuo Jin Electronics Co.,
Ltd., product drawing for "TYPE-C3.1母座7.35四脚1.0MD*3单排SMT有柱蓝胶298C
16PIN/3A", version A0, dated 2020-05-22. It is a scanned CAD sheet with no
extractable text, so the title block was read from a 900 dpi rendering.

**Finding:** the drawing's own PRODUCT PART NO. field reads
`918-418K2023S40033`. The catalog's MPN for this C-number is
`918-418K2024S40000`. They differ in the middle and in the tail. A second, milder
inconsistency points the same way: the drawing's product name says 蓝胶 (blue
housing) while its own materials table lists the housing as LCP 1301 *white*.

**Why it matters:** it is the only manufacturer document available for the part,
and everything on it — 3 A contact rating, 10,000 mating cycles, −40 °C to
+80 °C, the 16-position pin map — is plausible for the part LCSC sells. But a
mechanical drawing is precisely the document where a digit matters: it is what a
footprint gets traced from.

**Suggested action:** the C168688 note cites the drawing and states the mismatch
in a blockquote at the top. Confirm the drawing with the supplier before
committing a footprint.

**Update, same day:** the curated picks now recommend a single USB-C receptacle,
the SHOU HAN C2765186, and this part is no longer among them. Its note is kept —
the part detail page still renders for any C-number — but the recommendation no
longer depends on a drawing whose part number does not match.

---

## 33. TYPE-C 16PIN 2MD(073) — LCSC's 5 A current rating is not the manufacturer's — Error

**Where:** the live LCSC listing for C2765186 (`TYPE-C 16PIN 2MD(073)`, SHOU
HAN), which states 5 A.

**What was checked:** Shenzhen ShouHan Technology Co., Ltd., *TYPE-C 16PIN
2MD(073) — Specification for Approval*, Rev. A, sheet 1, note 4-1 "Electrical
Performance".

**Finding:** the manufacturer specifies **3.0 A at 5.0 V**. No 5 A figure appears
anywhere in the document. This site's curated description already said 3 A, so
the recommendation was right and the supplier's listing is the outlier.

**Why it matters:** a connector's current rating is a thermal limit on the
contact, and USB-C power delivery negotiates up to 5 A. A designer taking the
listing at face value could build a 5 A charging path through a connector its
maker rates at 3 A.

**Suggested action:** none in this repository's data — the curated entry is
already correct. The C2765186 note now closes its old "sources disagree" hedge
with the manufacturer's citation.

---
