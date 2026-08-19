var e=`---
part: C28646265
mpn: BSS138W
manufacturer: hongjiacheng
category: MOSFETs
kind: discrete-mosfet
package: SOT-323
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: BSS138W — N-Channel MOSFET
  publisher: Zhuhai Hongjiacheng Technology co., Ltd
  revised: Rev 2.0
  url: https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2407151447_hongjiacheng-BSS138W_C28646265.pdf
summary: A small logic-level N-channel MOSFET — the one inside every bidirectional I²C level shifter.
---

# BSS138W

## What it is

The BSS138 is a small N-channel MOSFET — a transistor switched on by a voltage on
its gate rather than a current. It is *logic-level*, meaning the gate voltage
needed to turn it on is low enough that a 3.3 V or 5 V logic output can do it
directly, with no driver in between. The manufacturer, Zhuhai Hongjiacheng,
describes it as a voltage-controlled small-signal switch and lists
battery-operated systems, solid-state relays and direct TTL/CMOS logic interfacing
as its applications. [1]

It cannot switch much current — 220 mA — but that is rarely why it is chosen. Its
fame comes from one circuit: the two-resistor, one-MOSFET bidirectional level
shifter that lets a 3.3 V I²C bus talk to a 5 V one. Almost every I²C level
shifter board is built from BSS138s. The \`W\` suffix denotes the SOT-323 (SC-70)
package, smaller than the original SOT-23. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Channel | N-channel, enhancement mode, trench construction [1] | Low-side switching, or the level-shifter circuit. Enhancement mode means it is off until you drive the gate positive. |
| Drain-source voltage | 50 V, with breakdown guaranteed at 50 V minimum when the gate is off, measured at 250 µA [1] | Higher than the AO3400A's 30 V — useful for switching a small relay or a signal that swings above logic levels. |
| Continuous drain current | 0.22 A, alongside a total power dissipation of 0.3 W at 25 °C ambient and a typical junction-to-ambient thermal resistance of 417 °C/W [1] | Two orders of magnitude below the AO3400A. This is a signal-level device, and as the next section explains, the current and power limits are really the same limit. |
| On-resistance at stated drive | 3.5 Ω maximum at V<sub>GS</sub> = 10 V and 6.0 Ω maximum at 4.5 V, both measured at 0.22 A. The typical curves (Fig. 3) sit near 0.9 Ω and 1.05 Ω at that current [1] | Ohms, not milliohms. At 220 mA the 6 Ω worst case drops 1.3 V — fine for a level shifter, useless as a power switch. Design to the maximum and treat the typical as headroom. |
| Gate threshold | 0.7 V minimum, 1.5 V maximum, measured with gate tied to drain at 250 µA [1] | Low enough that 3.3 V logic drives it, which is what makes the level shifter work. The 0.7 V lower end matters too: a device from that end of the spread turns on more readily than you might plan for. |
| Operating temperature | Junction and storage both −55 °C to +150 °C [1] | Wide. |

## What the datasheet actually says

**The guaranteed on-resistance is four to six times the typical one.** The table
promises no worse than 3.5 Ω at 10 V of gate drive and 6.0 Ω at 4.5 V. The
typical curves in Fig. 3, taken at 25 °C, put the same device near 0.9 Ω and
1.05 Ω at the rated 220 mA. That is an unusually wide margin, and it cuts both
ways: your prototype will behave far better than the datasheet promises, and a
production batch is entitled to be four times worse. Size the circuit on the
maximum. [1]

**The current rating and the power rating are the same limit wearing two hats.**
At 220 mA through the 6.0 Ω worst-case on-resistance, the part dissipates 0.29 W
— against a 0.3 W ceiling. And with 417 °C/W from junction to ambient, 0.3 W
alone raises the junction 125 °C, which from a 25 °C ambient lands exactly on the
150 °C maximum. There is no hidden headroom in either number. [1]

**Gate drive below about 3 V is where this part stops being cheap.** Fig. 4 plots
on-resistance against gate voltage and turns almost vertical below 3 V — at
2.5 V the curve has already left the top of the chart. Fig. 2 adds the
temperature story: the 25 °C and 100 °C transfer curves cross near 3.2 V of gate
drive, so below that a hot device conducts *more* for the same gate voltage and
above it, less. For the classic 3.3 V-to-5 V level shifter, with the gate at
3.3 V, none of this is a problem. For a 1.8 V low side the gate never rises above
1.8 V, which is only 300 mV clear of the 1.5 V worst-case threshold and deep in
the steep part of the curve. [1]

**The body diode is specified, but not under the conditions you use it in.** The
level-shifter circuit leans on the transistor's built-in source-to-drain diode:
when the high-voltage side pulls down first, current flows through that diode
until the gate-source voltage rises enough to turn the channel on properly. The
datasheet gives a source-to-drain forward voltage of 1.4 V maximum — but measures
it at 0.44 A *with the gate held at 10 V*, so the figure includes the channel
conducting, not the diode alone. In the level shifter the gate sits at the
low-side supply, so expect the diode to drop more than that number suggests. [1]

## Watch out for

- **Ohms of on-resistance.** Not a power switch. For that, use the AO3400A.
- **0.3 W is the ceiling**, and the rated 220 mA already spends it at 4.5 V of
  gate drive. [1]
- **Pull-up resistors are part of the level-shifter circuit**, one on each side,
  and their value sets the bus speed. Too large and the edges are slow; too small
  and the MOSFET cannot pull the line low.
- **It does not work for push-pull signals** such as SPI — the circuit needs
  open-drain lines with pull-ups.
- **The gate is limited to ±20 V** and leaks up to ±100 nA there. Do not let a
  supply transient reach it. [1]

## In this catalog

Preferred Extended part in SOT-323. At the 2026-07-24 snapshot: 181,016 in stock,
$0.025 at quantity 1, falling to $0.0127 at 21,000. The catalog attributes record
50 V, 220 mA, 300 mW, 3.5 Ω at 10 V and 6 Ω at 4.5 V, a 1.5 V gate threshold,
27 pF input capacitance, 13 pF output capacitance, 6 pF reverse transfer
capacitance and −55 °C to +150 °C. Every one of them matches the manufacturer's
datasheet. [2]

## Sources

1. Zhuhai Hongjiacheng Technology co., Ltd, *BSS138W — N-Channel MOSFET*
   (SOT-323 Plastic-Encapsulate MOSFETS), Rev 2.0. Features; Applications;
   Maximum Ratings; Static Parameter Characteristics; Dynamic Parameters;
   Fig. 2 (Transfer Characteristics), Fig. 3 (On-Resistance vs. Drain Current and
   Gate Voltage) and Fig. 4, which is captioned "On-Resistance vs. Junction
   Temperature" but whose axes are in fact on-resistance against gate voltage, at
   25 °C and 100 °C.
   The document carries no document number and no date. Its printed page footers
   read Rev:2.0; an older \`Rev:1.0\` string survives underneath in the PDF's text
   layer, hidden behind the printed footer, so text extraction reports both.
   Rev 2.0 is what the document displays and is what is recorded here.
   <https://wmsc.lcsc.com/wmsc/upload/file/pdf/v2/lcsc/2407151447_hongjiacheng-BSS138W_C28646265.pdf>
2. JLCPCB / LCSC catalog record for C28646265, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/mosfets_hongjiacheng-bss138w_C28646265.html>
`;export{e as default};