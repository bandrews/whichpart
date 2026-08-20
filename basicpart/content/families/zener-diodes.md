---
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
hongjiacheng-branded, covering 46 nominal voltages across several industry
series — BZT52, MMSZ, MM1Z, MM1W, MM3Z, BZX84, BZX584 and SMA/SMB-packaged
1SMA and SMBJ types — in SOD-123, SOD-323, SOD-523, SOT-23, SMA and SMB
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
| **Power dissipation** | The limit on Zener voltage × current. Sets the maximum current you may push through it. This family spans 150 mW to 5 W depending on package. [1] |
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

**Power dissipation is the real limit, and the thermal resistance is the
sharper version of it.** A 500 mW part at 3.3 V can pass about 150 mA on paper —
but that is the rating with no margin at all. hongjiacheng also gives a typical
junction-to-ambient thermal resistance of 357 °C/W for the SOD-123 BZT52B parts,
and with a 150 °C junction limit that works out at about 350 mW from a 25 °C
ambient before the derating curve in the datasheet even starts to bite. Size the
feed resistor so that with the load disconnected, the Zener current stays well
below the nominal rating rather than at it. [2]

**Low-voltage Zeners are not really Zeners, and the datasheet shows the
handover.** Below about 5 V the mechanism is Zener breakdown, which has a
*negative* temperature coefficient; above it, avalanche breakdown, which is
positive. hongjiacheng publishes the coefficient per voltage, and you can watch
the sign change: the 4.7 V part is specified at −3.5 to +0.2 mV/°C, the 5.1 V at
−2.7 to +1.2, the 5.6 V at −2.0 to +2.5, and by 6.2 V it is +0.4 to +3.7 mV/°C.
The 5.1 V to 5.6 V parts straddle zero, which is why that range is the most
temperature-stable choice — and why a 3.3 V Zener used as a reference can drift
by up to −3.5 mV/°C, which is about 105 mV, or 3 %, across a 30 °C swing. [2]

**Leakage matters in low-power circuits.** A Zener clamping a battery-powered
signal leaks continuously below its breakdown voltage — µA, but continuous.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Zener Voltage(Nom)` | Nominal voltage, e.g. `3.3V`. |
| `Zener Voltage(Range)` | Guaranteed window, e.g. `3.23V~3.37V`. |
| `Tolerance` | The same window as a percentage. |
| `Pd - Power Dissipation` | e.g. `500mW`. Your current ceiling, divided by the Zener voltage. |
| `Impedance(Zzt)` | Dynamic impedance at the test current — how flat the characteristic is. |
| `Impedance(Zzk)` | Dynamic impedance near the knee — much higher. Stay above the knee. |
| `Reverse Leakage Current (Ir)` | e.g. `5uA@1V`. |
| `Diode Configuration` | `1 Independent` for a single diode. |
| `Operating Junction Temperature Range` | e.g. `-55℃~+150℃`. |

The BZT52 part numbers encode the voltage: `BZT52B3V3` is a 3.3 V part, `BZT52C12`
a 12 V one. The letter before the voltage is the tolerance grade.

## Watch out for

- **A Zener regulates badly.** Use a reference or an LDO if accuracy matters.
- **Operate above the knee**, where the impedance is low.
- **Compute the worst-case current** with the load disconnected.
- **Every part in this family is from one manufacturer**, so there is no second
  source within the catalog. hongjiacheng's own datasheets are retrievable
  through the LCSC links, and the figures in them match the catalog attributes
  for the parts checked here.

## Sources

1. JLCPCB / LCSC catalog records for the Zener Diodes category, snapshot
   2026-07-24 (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Counts, package and series mix, voltage,
   tolerance, impedance, dissipation and leakage figures are the attribute values
   recorded there.
2. Zhuhai Hongjiacheng Technology Co., Ltd, *BZT52B2V4 THRU BZT52B51 — SOD-123
   Surface Mount Silicon Zener Diodes*, Rev 2.1. Features, Maximum Ratings
   (dissipation, junction temperature, thermal resistance) and the Electrical
   Characteristics table, which carries the per-voltage impedance, leakage and
   temperature-coefficient columns quoted here. Retrieved via the LCSC datasheet
   link for C19077392.
   <https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2310251757_hongjiacheng-BZT52B3V3_C19077392.pdf>
