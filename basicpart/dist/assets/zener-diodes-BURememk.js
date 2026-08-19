var e=`---
family: Zener diodes
part_count: 254
categories:
  - Zener Diodes
kind: discrete-diode
catalog_snapshot: 2026-07-24
summary: Diodes designed to conduct backwards at a known voltage — for clamping, simple regulation and protection.
---

# Zener diodes

## What they are

An ordinary diode blocks reverse current. A Zener diode is built so that it
breaks down at a specific, well-controlled reverse voltage and conducts —
without damage. Put one across a node with a resistor feeding it and the node
sits at the Zener voltage. There are 254 of them in this catalog, all
hongjiacheng-branded BZT52-series parts, in SOD-123, SOD-323 and similar
packages. [1]

Their three everyday uses: clamping a signal that must not exceed a voltage,
protecting a MOSFET gate, and providing a crude fixed reference or supply where a
regulator would be overkill.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Zener voltage (nominal)** | The breakdown voltage — what the diode will hold. |
| **Zener voltage (range)** | The actual guaranteed window, e.g. 3.23–3.37 V for a 3.3 V part. [1] |
| **Tolerance** | The same information as a percentage. |
| **Power dissipation** | The limit on Zener voltage × current. Sets the maximum current you may push through it. |
| **Impedance Z<sub>zt</sub> and Z<sub>zk</sub>** | Dynamic resistance at the test current and near the knee. Low Z<sub>zt</sub> means a flatter, more regulator-like characteristic. |
| **Reverse leakage** | Current flowing below the Zener voltage — never quite zero. |

## What actually matters in practice

**A Zener is not a regulator.** Its voltage moves with current, by roughly the
Z<sub>zt</sub> figure — a few tens of ohms is typical for these parts, so a 10 mA
current swing shifts the output by hundreds of millivolts. For a proper reference
use a shunt reference like the CJ431 (C3113); for a supply use an LDO.

**The knee is soft, and Z<sub>zk</sub> tells you how soft.** Near the breakdown
voltage the diode conducts only gradually, and its dynamic impedance there is
much higher — for the catalog's 3.3 V part, 600 Ω at the knee against 95 Ω at the
test current. [1] Design to operate well above the knee, not at it.

**Power dissipation is the real limit.** A 500 mW part at 3.3 V can pass about
150 mA — but that is the absolute limit with no margin. Size the feed resistor so
that with the load disconnected, the Zener current stays well below it.

**Low-voltage Zeners are not really Zeners.** Below about 5 V the mechanism is
Zener breakdown, which has a *negative* temperature coefficient; above it,
avalanche breakdown, which is positive. Around 5–6 V the two cancel, which is why
5.6 V Zeners are the most temperature-stable. If drift matters, that is worth
knowing.

**Leakage matters in low-power circuits.** A Zener clamping a battery-powered
signal leaks continuously below its breakdown voltage — µA, but continuous.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Zener Voltage(Nom)\` | Nominal voltage, e.g. \`3.3V\`. |
| \`Zener Voltage(Range)\` | Guaranteed window, e.g. \`3.23V~3.37V\`. |
| \`Tolerance\` | The same window as a percentage. |
| \`Pd - Power Dissipation\` | e.g. \`500mW\`. Your current ceiling, divided by the Zener voltage. |
| \`Impedance(Zzt)\` | Dynamic impedance at the test current — how flat the characteristic is. |
| \`Impedance(Zzk)\` | Dynamic impedance near the knee — much higher. Stay above the knee. |
| \`Reverse Leakage Current (Ir)\` | e.g. \`5uA@1V\`. |
| \`Diode Configuration\` | \`1 Independent\` for a single diode. |
| \`Operating Junction Temperature Range\` | e.g. \`-55℃~+150℃\`. |

The BZT52 part numbers encode the voltage: \`BZT52B3V3\` is a 3.3 V part, \`BZT52C12\`
a 12 V one. The letter before the voltage is the tolerance grade.

## Watch out for

- **A Zener regulates badly.** Use a reference or an LDO if accuracy matters.
- **Operate above the knee**, where the impedance is low.
- **Compute the worst-case current** with the load disconnected.
- **Every part in this family is from one manufacturer**, and the LCSC-hosted
  datasheets are not reachable to automated fetching — the catalog attributes are
  the specification of record. See \`ISSUES.md\`.

## Sources

1. JLCPCB / LCSC catalog records for the Zener Diodes category, snapshot
   2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Voltage, tolerance, impedance, dissipation and
   leakage figures are the attribute values recorded there.
`;export{e as default};