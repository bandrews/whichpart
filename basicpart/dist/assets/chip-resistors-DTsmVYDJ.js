var e=`---
family: Chip resistors (surface mount)
part_count: 293
categories:
  - Chip Resistor - Surface Mount
kind: passive
catalog_snapshot: 2026-07-24
summary: The most numerous parts in the catalog — thick-film chip resistors from 0402 to 1206, all from one manufacturer.
---

# Chip resistors (surface mount)

## What they are

A resistor limits current or divides voltage, and the surface-mount chip resistor
is the form almost every modern board uses: a ceramic rectangle with a resistive
film on top and metal terminations at each end. There are 293 of them in this
catalog, all thick-film parts from UNI-ROYAL, spanning four package sizes. [1]

They are the highest-count family here, and the one you place most of. The
individual part is not interesting; what matters is knowing which of the five
numbers on the datasheet actually constrains your design.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Resistance** | The nominal value. Every other specification is a qualification of this one. |
| **Tolerance** | How far the real value may be from nominal. Every qualifying part in this catalog is ±1 %, so there is no choice to make here. [1] |
| **Power rating** | How much heat the part can shed before it degrades. Set by package size: 62.5 mW in 0402, 100 mW in 0603, 125 mW in 0805 and 250 mW in 1206 — all specified at 70 °C ambient and derated above it. [1] [2] |
| **Voltage rating** | The maximum working voltage: 50 V in 0402, 75 V in 0603, 150 V in 0805, 200 V in 1206. Easy to forget, and it bites in high-voltage dividers — see below. [1] [2] |
| **Temperature coefficient** | How much the value moves with temperature, in parts per million per °C. Above 10 Ω these parts are ±100 ppm/°C; at 10 Ω and below UNI-ROYAL specifies 200 ppm/°C, and below 1 Ω it rises to 800 ppm/°C or worse. [1] [2] |
| **Operating temperature** | −55 °C to +155 °C across this family. [1] |

## What actually matters in practice

**There is no ±5 % option here — everything qualifying is ±1 %.** All 293 chip
resistors in the 2026-07-24 snapshot are ±1 % parts from UNI-ROYAL. That is worth
knowing in both directions: you get the tighter tolerance at no extra cost, and
if a design specifically calls for ±5 % parts (usually to save money on a large
board), this catalog cannot supply them at Basic or Preferred pricing. [1]

**Voltage rating is the specification people forget, and the datasheet spells
out how it interacts with power.** UNI-ROYAL defines the working voltage as
√(P × R) — the voltage at which the part reaches its rated power — *or* the
package maximum, whichever is lower. For a 0402 that maximum is 50 V, so above
about 40 kΩ the 50 V ceiling binds before the power rating does. Put ten 0402
resistors in series across a 400 V rail and each sees 40 V, which is fine. Put
*one* 1 MΩ 0402 across 200 V and it is four times over its rating, even though it
is dissipating only 40 mW. High-voltage dividers need either high-voltage parts or
several resistors in series. [2]

**Power rating scales with package, and the numbers are small.** 62.5 mW in 0402
means 25 mA through a 100 Ω part — less than an LED. For anything carrying real
current, go up a size or two. The rating is also stated at 70 °C ambient and
derated linearly above that, on a curve the datasheet prints; a resistor inside a
warm enclosure or next to a regulator has less headroom than the number
suggests. [2]

**Temperature coefficient rarely matters, until it does — and it is much worse
at low values.** ±100 ppm/°C over a 50 °C swing is 0.5 %, five times a 1 % part's
initial tolerance. In a divider where both resistors are the same type and at the
same temperature, the effects largely cancel. In a current-sense circuit they do
not — and current sensing is exactly where you use the low-value parts whose
coefficient is worst. UNI-ROYAL specifies 100 ppm/°C only above 10 Ω; from 1 Ω to
10 Ω it is 200 ppm/°C, and below 1 Ω, 800 ppm/°C rising to 1,500 ppm/°C for the
smallest values. A 0.1 Ω shunt at 800 ppm/°C drifts 4 % over a 50 °C rise. The
catalog's own attribute strings follow this pattern, though a few entries record
a looser figure than the datasheet's range implies (some 10 Ω parts are listed at
±400 ppm/°C); where the two differ, design to whichever is worse. [1] [2]

**Zero-ohm links are current-rated, not resistance-rated.** The catalog's 0 Ω
parts are jumpers with a resistance under 50 mΩ. UNI-ROYAL rates them by current
instead: 1 A continuous in 0402 and 0603, 2 A in 0805 and 1206, with maximum
overload currents of 2 A, 2 A, 5 A and 10 A respectively. Treating one as an
unlimited short is the mistake to avoid. [2]

**Thick film is not the only kind.** Every resistor in this catalog is thick
film. Thin-film parts are quieter, more stable and tighter, and cost more; if you
are building something precise, look outside the Basic and Preferred tiers.

## How to read the catalog attributes

The site's resistor table is organised by value and package. Behind each cell,
\`parts-index.json\` carries these attributes:

| Attribute | Meaning |
|---|---|
| \`Resistance\` | Nominal value, e.g. \`2kΩ\`. |
| \`Tolerance\` | e.g. \`±1%\`. |
| \`Power(Watts)\` | Package power rating, e.g. \`62.5mW\`. |
| \`Voltage-Supply(Max)\` | Maximum working voltage, e.g. \`50V\`. |
| \`Temperature Coefficient\` | e.g. \`±100ppm/℃\`. |
| \`Type\` | Construction, e.g. \`Thick Film Resistor\`. |
| \`Operating Temperature\` | e.g. \`-55℃~+155℃\`. |

The part number itself encodes all of this, and UNI-ROYAL documents the scheme.
In \`0402WGF2001TCE\`: \`0402\` is the package; \`WG\` is the power rating (\`W\` plus a
code — \`WG\` is 1/16 W, \`WA\` 1/10 W, \`W8\` 1/8 W, \`W4\` 1/4 W); \`F\` is the ±1 %
tolerance code (\`D\` is ±0.5 %, \`G\` ±2 %, \`J\` ±5 %); \`2001\` is the value, three
significant figures followed by a power of ten, giving 200 × 10¹ = 2,000 Ω; and
\`TCE\` is the packaging. Sub-ohm values use letters for negative powers — \`K\` is
10⁻², so \`100K\` reads as 100 × 10⁻² = 1 Ω. Tolerances of ±5 % and looser use a
different value convention: a leading zero, then two significant figures and the
power of ten. [2]

## Watch out for

- **Check the voltage rating in high-voltage dividers**, not just the power.
- **62.5 mW is genuinely small.** Size up for anything carrying current.
- **Every part here is thick film and from one manufacturer.** If you need thin
  film, precision, or a second source, this catalog will not offer it.
- **Low-value parts drift.** Below 10 Ω the temperature coefficient doubles, and
  below 1 Ω it goes up eightfold.
- **The value code is not the value.** \`2001\` is 2 kΩ, not 2,001 Ω.

## Sources

1. JLCPCB / LCSC catalog records for the Chip Resistor – Surface Mount category,
   snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Counts, package mix, tolerance, power, voltage
   and temperature-coefficient figures are the attribute values recorded there.
2. Uniroyal Electronics Global Co., Ltd. (UNI-ROYAL / UniOhm), *Thick Film Chip
   Resistors — 01005/0201/0402/0603/0805/1206/1210/1812/2010/2512 Series*, V.3,
   12 February 2019. Section 2 (Explanation of Part No. System), Section 6
   (Resistance Range), Section 7 (Ratings), Section 9 (Derating Curve and voltage
   rating formula), and the temperature-coefficient limits in the
   characteristics table. Retrieved via the LCSC datasheet link for C21190.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2206010130_UNI-ROYAL-Uniroyal-Elec-0603WAF1001T5E_C21190.pdf>
`;export{e as default};