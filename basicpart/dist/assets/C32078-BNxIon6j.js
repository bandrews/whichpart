var e=`---
part: C32078
mpn: MC34063ADR2G
manufacturer: onsemi
category: DC-DC Converters
kind: power-switching
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: MC34063A, MC33063A, SC33063A, NCV33063A — Inverting Regulator, Buck, Boost, Switching, 1.5 A
  publisher: onsemi
  document: MC34063A/D Rev. 27
  revised: 2026-08
  url: https://www.onsemi.com/download/data-sheet/pdf/mc34063a-d.pdf
summary: One chip that can be wired as a step-down, step-up, or voltage-inverting converter — unusually flexible, and old.
---

# MC34063ADR2G

## What it is

The MC34063A is a switching-converter control circuit from the early 1980s that
is still made because it does something few modern parts do: with the same eight
pins, you can build a buck (step-down), a boost (step-up), or an inverting
(positive-to-negative) converter, just by rearranging the external components. [1]

Inside are a temperature-compensated reference, a comparator, an oscillator with
active current limiting, a driver, and an output switch rated to 1.5 A. It is not
efficient or fast by modern standards, but if you need a negative rail from a
positive supply and do not want a charge pump, it remains one of the simplest
answers. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable, set by an external divider against a 1.25 V reference with ±2 % precision [1] | The catalog records an output range of 1.25 V to 40 V. [2] |
| Output current | Output switch current to 1.5 A [1] | This is the *switch* rating. In boost or inverting configurations, deliverable output current is much lower. |
| Input voltage range | 3.0 V to 40 V [1] | A very wide range, and one reason it survives in 12 V and 24 V systems. |
| Switching frequency | Operation to 100 kHz, set by an external timing capacitor [1] | You choose the frequency. Higher means smaller magnetics; 100 kHz is the ceiling. |
| Efficiency | Not stated as a headline figure; the part uses a bipolar output switch with a significant saturation voltage [1] | Efficiency is modest — this is the price of the flexibility and the age of the design. |
| Operating temperature | 0 °C to +70 °C ambient for the MC34063A per the catalog record [2]; the MC33063A and NCV33063A in the same datasheet cover wider ranges [1] | **Commercial grade** for this part number. |

## What the datasheet actually says

**Current limiting is set by a resistor.** A sense resistor between the supply pin
and the switch sets the peak current at which the oscillator terminates the
cycle. Getting this value right is the main design decision, and it is what
protects both the chip and the inductor. [1]

**onsemi points at two application notes** — AN920A/D and AN954/D — for design
guidance. That is unusual and a fair signal: this part needs more design work
than a modern integrated converter, and the manufacturer knows it. [1]

**The reference is 1.25 V with 2 % precision.** Your feedback divider is
referenced to that, and its accuracy sets your output accuracy. [1]

**The NCV prefix denotes automotive qualification** (AEC-Q100, PPAP capable) — a
different part number. [1]

## Watch out for

- **You design the converter, not just place the chip.** Inductor value, timing
  capacitor, sense resistor and diode all have to be calculated.
- **The switch drop is significant.** A bipolar Darlington output means a volt or
  more lost across the switch — poor efficiency at low output voltages.
- **1.5 A is the switch rating.** Output current in a boost or inverting
  configuration is far less.
- **0 °C to +70 °C** for the MC34063A grade.
- **For a plain buck, a modern part is better.** The TPS54331 or LM2596 will be
  smaller, more efficient and easier. Choose the MC34063A for its inverting or
  boost flexibility.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 113,738 in stock,
$0.52 at quantity 1, falling to $0.26 at 1,000. The catalog attributes record
3 V–40 V input, 1.25 V–40 V adjustable output, 1.5 A, 100 kHz, buck and boost
topologies, overcurrent protection and 0 °C to +70 °C ambient, all consistent
with the datasheet. The catalog does not list the inverting configuration, which
the datasheet's title and description both name. [2]

## Sources

1. onsemi, *MC34063A, MC33063A, SC33063A, NCV33063A — Inverting Regulator, Buck,
   Boost, Switching, 1.5 A*, MC34063A/D Rev. 27, August 2026. Description and
   Features page 1. <https://www.onsemi.com/download/data-sheet/pdf/mc34063a-d.pdf>
2. JLCPCB / LCSC catalog record for C32078, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/dc-dc-converters_onsemi-mc34063adr2g_C32078.html>
`;export{e as default};