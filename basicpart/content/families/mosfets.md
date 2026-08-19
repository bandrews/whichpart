---
family: MOSFETs
part_count: 39
categories:
  - MOSFETs
kind: discrete-mosfet
catalog_snapshot: 2026-07-24
summary: Voltage-controlled switches — nearly no drive current, and milliohms instead of a diode drop.
---

# MOSFETs

## What they are

A MOSFET switches current under the control of a *voltage* on its gate, not a
current. Once on, it behaves like a small resistor rather than a saturated
transistor, so the drop across it is proportional to current instead of being a
fixed few hundred millivolts. There are 39 in this catalog — 22 N-channel, 16
P-channel and one dual — almost all in SOT-23, with a few in SOT-323. [1]

Like bipolars they come in two polarities. **N-channel** parts switch the ground
side of a load and are the default. **P-channel** parts switch the positive side —
useful for high-side switching and reverse-polarity protection, at roughly double
the on-resistance for the same die area.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Channel** | N or P. Determines which side of the load it can switch. |
| **Drain-source voltage (V<sub>DS</sub>)** | The most it will block. |
| **Continuous drain current (I<sub>D</sub>)** | Maximum current, always with a stated gate voltage and thermal assumption. |
| **On-resistance (R<sub>DS(on)</sub>)** | Resistance when on, quoted at one or more gate voltages. **The number that matters most.** |
| **Gate threshold voltage (V<sub>GS(th)</sub>)** | Where it *starts* to conduct — not where it is fully on. Separately, check the gate-source *absolute maximum*: the catalog does not carry it, and on these small parts it is often ±12 V rather than the ±20 V people assume. [2] |
| **Gate charge (Q<sub>g</sub>)** | How much charge the gate needs. Sets the switching loss and the drive current at high frequency. |
| **Input capacitance (C<sub>iss</sub>)** | Related to Q<sub>g</sub>; affects switching speed. |
| **Power dissipation (P<sub>d</sub>)** | Package limit. |

## What actually matters in practice

**Threshold voltage is the most misread specification here.** A part with a
1.45 V maximum threshold is *not* fully on at 1.45 V — it is barely conducting.
The number to look at is on-resistance at the gate voltage you will actually
apply. The catalog's AO3400A quotes 26.5 mΩ at 10 V, 32 mΩ at 4.5 V and 48 mΩ at
2.5 V. [1] The 2.5 V figure is what a 3.3 V microcontroller pin gets you, and it
is the one to design with.

**"Logic level" means the on-resistance is specified at 4.5 V or below.** If a
datasheet only quotes R<sub>DS(on)</sub> at 10 V, the part is not suitable for
direct drive from 3.3 V or 5 V logic.

**The current rating is a package rating, not a promise.** A SOT-23 part rated
5.7 A will never carry 5.7 A continuously on an ordinary board — the die can, the
package and copper cannot. Compute I² × R<sub>DS(on)</sub> and check it against
the package's dissipation and your copper area.

**On-resistance rises with temperature**, typically by 50 % or more from 25 °C to
125 °C. Since the resistance causes the heating, this is a positive feedback loop
that you must include in a thermal calculation.

**P-channel high-side switching needs level shifting.** To turn a P-channel part
off, the gate must be at the source voltage. With a 12 V source and a 3.3 V
microcontroller pin, you cannot do that directly — you need a small N-channel
device or transistor pulling the gate down, with a resistor pulling it up to the
source.

**The body diode is always there.** Every MOSFET contains a diode from source to
drain that conducts regardless of the gate. That is what makes the BSS138 level
shifter work, and what makes a naively-wired MOSFET fail to block reverse
current.

**The gate itself has a voltage limit, and the catalog does not show it.** No
attribute in this family records the gate-source maximum, so it has to come from
the datasheet. Alpha & Omega rates both the AO3400A and AO3401A at ±12 V — which
means driving either one's gate from a 12 V rail sits exactly on the limit, with
nothing left for transients. Above about 10 V of gate drive, add a Zener clamp or
a divider. [2]

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Type` / `Number` | `N-Channel` or `P-Channel`, and how many in the package. |
| `Drain to Source Voltage` | V<sub>DS</sub> rating. |
| `Current - Continuous Drain(Id)` | Maximum current, package-limited in practice. |
| `RDS(on)` | On-resistance, often listed at several gate voltages, e.g. `47mΩ@10V、60mΩ@4.5V、85mΩ@2.5V`. |
| `Gate Threshold Voltage (Vgs(th))` | Where conduction begins — not the drive voltage to use. |
| `Gate Charge(Qg)` | With its test voltage. Sets drive current at high switching frequency. |
| `Input Capacitance(Ciss)` | Affects switching speed. |
| `Pd - Power Dissipation` | Package limit. |

## Watch out for

- **Read on-resistance at your gate voltage**, not the threshold.
- **The current rating assumes a thermal environment.** Compute the dissipation.
- **Allow for on-resistance rising with temperature.**
- **P-channel high-side switching needs a gate driver or a small transistor.**
- **The body diode conducts** whatever the gate does.
- **Check the gate-source maximum in the datasheet.** It is not in the catalog
  attributes, and ±12 V is common here.

## Individual notes in this collection

Three parts from this family have their own files: `C20917` (AO3400A N-channel),
`C15127` (AO3401A P-channel) and `C28646265` (BSS138W, the level-shifter part).

## Sources

1. JLCPCB / LCSC catalog records for the MOSFETs category, snapshot 2026-07-24
   (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Counts, channel mix, packages and the quoted
   attribute strings come from there.
2. Alpha & Omega Semiconductor, *AO3400A — 30V N-Channel MOSFET*, Rev 3.1, July
   2023, and *AO3401A — 30V P-Channel MOSFET*, Rev 3.1, December 2023. Absolute
   Maximum Ratings (gate-source voltage, continuous and pulsed drain current) and
   Electrical Characteristics (on-resistance at each gate voltage, and at
   T<sub>J</sub> = 125 °C). <http://www.aosmd.com/res/data_sheets/AO3400A.pdf>
