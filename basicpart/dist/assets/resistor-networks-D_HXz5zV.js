var e=`---
family: Resistor networks and arrays
part_count: 5
categories:
  - Resistor Networks, Arrays
kind: passive
catalog_snapshot: 2026-07-24
summary: Four resistors of the same value in one body — for pull-ups and series termination on a bus.
---

# Resistor networks and arrays

## What they are

A resistor array is several identical resistors in a single package. The catalog
holds five, all UNI-ROYAL parts: four in \`0603x4\` form and one in \`0402x4\` —
four resistors in the footprint of one 1206. All five are ±5 %, four elements,
eight pins, and rated 62.5 mW per element. [1]

They exist for one reason: when you need the same value many times in one place,
an array saves board area, placement cost and assembly time. Pull-ups on an
eight-bit bus, series termination on a set of parallel lines, current-limiting
for a row of LEDs.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Resistance** | The value — the same for every element in the package. |
| **Number of resistors** | Usually four in this catalog. |
| **Number of pins** | Eight for four isolated resistors; fewer if the elements share a common terminal. |
| **Power rating** | **Per element** — 62.5 mW here, at 70 °C ambient, derated above that. See below for what the datasheet does *not* say. [1] [2] |
| **Tolerance** | e.g. ±5 %. |
| **Temperature coefficient** | ±200 ppm/°C at 10 Ω and above, ±400 ppm/°C below — looser than a discrete chip resistor's ±100 ppm/°C. [2] |

## What actually matters in practice

**The power rating is per element, and there is no published package total.**
The catalog lists 62.5 mW for these arrays, matching a single 0603 resistor, and
UNI-ROYAL's array specification confirms 1/16 W as the rated power per element at
70 °C with a derating curve above that. [1] [2] What the document does *not*
give is a total for the package — and four elements in one body share one thermal
path, so 4 × 62.5 mW is not something the manufacturer underwrites. If all four
elements will carry significant current at the same time, derate deliberately
rather than assuming the per-element figure four times over.

**The voltage limits come from the same document.** Maximum working voltage is
50 V, maximum overload voltage 100 V, and the dielectric withstanding voltage
between elements is 300 V for the 0603-size arrays. As with discrete chip
resistors, the working voltage is √(P × R) or the 50 V ceiling, whichever is
lower. [2]

**Isolated or common?** An eight-pin, four-resistor array has four independent
resistors. Some arrays instead bring one end of every resistor to a shared pin,
which is convenient for pull-ups to a single rail and useless for series
termination. The \`Number of Pins\` attribute distinguishes them.

**Matching is the underrated benefit.** All four elements come from the same
substrate and the same firing, so their values track each other far better than
four separate resistors would — and they track each other over temperature too.
For a divider network or a ladder, that matching is worth more than absolute
accuracy.

**They are harder to rework.** One damaged element means replacing all four, and
the fine pitch is less forgiving than four discrete parts.

**±200 ppm/°C is loose.** The discrete 1 % resistors in this catalog are
±100 ppm/°C above 10 Ω. [1] If absolute stability matters, use discretes; if
*matching* matters, the array is better despite the looser absolute figure —
elements that drift together mostly cancel in a ratio.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Resistance\` | Value of each element, e.g. \`4.7kΩ\`. |
| \`Number of Resistors\` | Elements in the package, e.g. \`4\`. |
| \`Number of Pins\` | \`8\` means four isolated resistors. |
| \`Power(Watts)\` | Per element. Check the package total separately. |
| \`Tolerance\` | e.g. \`±5%\`. |
| \`Temperature Coefficient\` | e.g. \`±200ppm/℃\`. |

The part number encodes the arrangement: in \`4D03WGJ0472T5E\`, \`4D\` is a
four-element array, \`03\` the 0603 element size, \`J\` the ±5 % tolerance, and \`0472\`
the value code (47 followed by two zeros = 4,700 Ω).

## Watch out for

- **Check the package power total**, not just the per-element rating.
- **Confirm isolated versus common-terminal** before designing the footprint.
- **Looser temperature coefficient** than discrete parts.
- **Only five parts in this catalog**, so the available values are limited.

## Sources

1. JLCPCB / LCSC catalog records for the Resistor Networks, Arrays category,
   snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Resistance, count, power, tolerance and
   temperature-coefficient figures are the attribute values recorded there.
2. Uniroyal Electronics Global Co., Ltd (UNI-ROYAL / UniOhm), *Chip Resistor
   Array — Resistor Array Series ±1 %, ±5 % & 0 Ω*, Edition 1, 12 June 2017.
   Section 3.3 (Ratings: rated power, working and overload voltage, dielectric
   withstanding voltage, resistance range, temperature coefficient) and
   Section 6.0 (Power rating and the voltage-rating formula). Retrieved via the
   LCSC datasheet link for C1980.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2304140030_UNI-ROYAL-Uniroyal-Elec-4D03WGJ0472T5E_C1980.pdf>
`;export{e as default};