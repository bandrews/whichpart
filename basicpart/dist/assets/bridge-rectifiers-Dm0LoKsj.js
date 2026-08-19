var e=`---
family: Bridge rectifiers
part_count: 26
categories:
  - Bridge Rectifiers
kind: discrete-diode
catalog_snapshot: 2026-07-24
summary: Four diodes in one package that turn AC into DC — at the cost of two diode drops.
---

# Bridge rectifiers

## What they are

Four diodes wired in a bridge so that current always leaves the output in the
same direction, whichever way the input polarity goes. There are 26 in this
catalog: 24 from hongjiacheng and two from MDD. They are not all small — the
range runs from a 1 A part in an MBS body up to 50 A bricks in GBJ and GBU
cases, and 18 of the 26 block 1,000 V. [1]

Two uses dominate: rectifying a low-voltage AC transformer into DC, and making a
DC input polarity-proof so a user cannot destroy the board with a reversed
connector.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Repetitive peak reverse voltage** | The most the bridge blocks. For mains rectification, at least 400 V; 1,000 V parts are common and cost the same. |
| **Average rectified output current** | The continuous DC output, in a specified thermal environment. |
| **Forward voltage** | Per diode, and current passes through *two* of them. |
| **Non-repetitive peak surge current** | The inrush when the reservoir capacitor charges from empty — often the harshest thing the bridge ever sees. |
| **Reverse leakage** | Blocking-state current. |

## What actually matters in practice

**You lose two diode drops, not one.** At any instant current passes through one
diode in and one diode out, so the DC output is roughly 2 × V<sub>F</sub> below
the peak input — about 2.2 V for the catalog's 1.1 V-per-diode parts. [1] From a
5 V AC transformer that is crippling; from 12 V AC it is acceptable.

**Heat is 2 × V<sub>F</sub> × I, and the package decides what you can shed.** A
1 A bridge dissipates over 2 W at full current. hongjiacheng's 50 A GBJ part has a
junction-to-case thermal resistance of 1.5 °C/W but a junction-to-*ambient*
figure of 22 °C/W — so at its rated 50 A, which is more than 100 W of loss, the
50 A only exists with a heatsink bolted to the case. In a small surface-mount
package with no heatsink, the realistic continuous current is a fraction of the
rating. [2]

**Surge current is a real design constraint, and it comes with a waveform.**
When power is applied at the peak of the AC waveform into an empty reservoir
capacitor, the inrush is limited only by the transformer's resistance and the
wiring. That is what the non-repetitive surge rating is for — hongjiacheng
specifies its 50 A bridge at 500 A for a single 8.3 ms half-sine, along with an
I²t fusing rating of 1,037 A²s — and it is why series inrush limiting is common
in larger supplies. The 8.3 ms is one half-cycle of 60 Hz mains: the rating
describes exactly one bad moment, not a repeated one. [2]

**These are 50/60 Hz parts.** Standard rectifier diodes are slow; a bridge
rectifier belongs on the mains side of a transformer, not in a switching
converter.

**For reverse-polarity protection, consider the alternatives.** A bridge makes
the input polarity-proof at a cost of 2.2 V and 2 W. A single P-channel MOSFET
(the AO3401A, C15127, in this catalog) loses millivolts — but only protects
against reversal, it does not rectify AC.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Type\` | e.g. \`Single-Phase Rectifier\`. |
| \`Voltage - DC Reverse(Vr)\` | Blocking voltage, e.g. \`1kV\`. |
| \`Current - Rectified\` | Average DC output current. |
| \`Voltage - Forward(Vf@If)\` | **Per diode**, with its test current. Double it for the bridge. |
| \`Non-Repetitive Peak Forward Surge Current\` | One-shot inrush rating. |
| \`Reverse Leakage Current (Ir)\` | With its test voltage. |
| \`Operating Junction Temperature Range\` | Usually \`-55℃~+150℃\`. |

## Watch out for

- **Two diode drops.** Budget about 2.2 V.
- **Thermal, not electrical, limits the current.**
- **Mains-connected circuits need proper creepage and clearance** on the board,
  whatever the diode ratings say.
- **Not for switching converters.**
- **Reverse leakage rises fiftyfold when hot.** hongjiacheng's GBJ parts are
  specified at 10 µA at 25 °C and 500 µA at 100 °C, at the full blocking
  voltage. [2]
- **Most parts here are house-brand**, but their datasheets are reachable
  through the LCSC links and carry the test conditions the catalog attributes
  drop.

## Individual notes in this collection

One part from this family has its own file: \`C2488\` (MB10S-50MIL).

## Sources

1. JLCPCB / LCSC catalog records for the Bridge Rectifiers category, snapshot
   2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Counts, manufacturers, packages, voltage,
   current, forward-drop and surge figures are the attribute values recorded
   there.
2. Zhuhai Hongjiacheng Technology Co., Ltd, *GBJ50005 THRU GBJ5010 — GBJ 50.0 A
   Plastic-Encapsulate Bridge Rectifier*, Rev 2.1. Maximum Ratings (surge
   current, I²t, thermal resistances) and Electrical Characteristics (forward
   voltage, reverse current at 25 °C and 100 °C). Retrieved via the LCSC
   datasheet link for C42406055.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2501211645_hongjiacheng-GBJ5008_C42406055.pdf>
`;export{e as default};