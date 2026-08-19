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
| **Tolerance** | How far the real value may be from nominal. ±1 % parts and ±5 % parts sit side by side in this catalog at almost the same price — see below. |
| **Power rating** | How much heat the part can shed before it degrades. Set by package size: the catalog's 0402 parts are rated 62.5 mW. [1] |
| **Voltage rating** | The maximum working voltage. Easy to forget, and it bites in high-voltage dividers — see below. |
| **Temperature coefficient** | How much the value moves with temperature, in parts per million per °C. The catalog's parts are ±100 ppm/°C for 1 % types. [1] |
| **Operating temperature** | −55 °C to +155 °C across this family. [1] |

## What actually matters in practice

**Tolerance costs almost nothing, so take the tighter one.** In this catalog both
±1 % and ±5 % thick-film parts are stocked in the same packages at very similar
prices. Unless you have a specific reason, specifying 1 % costs you nothing and
removes a variable.

**Voltage rating is the specification people forget.** A 0402 resistor in this
catalog is rated 50 V. [1] Put ten of them in series across a 400 V rail and each
sees 40 V — fine. Put *one* 1 MΩ 0402 across 200 V and it is four times over its
rating, whatever the power dissipation says. High-voltage dividers need either
high-voltage parts or several resistors in series.

**Power rating scales with package, and the numbers are small.** 62.5 mW in 0402
means 25 mA through a 100 Ω part — less than an LED. For anything carrying real
current, go up a size or two, and remember the rating assumes a specified copper
area and ambient temperature.

**Temperature coefficient rarely matters, until it does.** ±100 ppm/°C over a
50 °C swing is 0.5 % — five times a 1 % part's initial tolerance. In a divider
where both resistors are the same type and at the same temperature, the effects
largely cancel. In a current-sense or reference circuit where they do not, it is
a real error term.

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

The part number itself encodes most of this. In \`0402WGF2001TCE\`: \`0402\` is the
package, \`F\` is the ±1 % tolerance code, and \`2001\` is the E96 value code — three
significant digits (200) followed by the number of zeros (1), giving 2,000 Ω. A
\`J\` in place of \`F\` denotes ±5 %, and those parts use a three-digit value code
instead.

## Watch out for

- **Check the voltage rating in high-voltage dividers**, not just the power.
- **62.5 mW is genuinely small.** Size up for anything carrying current.
- **Every part here is thick film and from one manufacturer.** If you need thin
  film, precision, or a second source, this catalog will not offer it.
- **The value code is not the value.** \`2001\` is 2 kΩ, not 2,001 Ω.

## Sources

1. JLCPCB / LCSC catalog records for the Chip Resistor – Surface Mount category,
   snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Package, tolerance, power, voltage and
   temperature-coefficient figures are the attribute values recorded there.
`;export{e as default};