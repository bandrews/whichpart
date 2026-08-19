var e=`---
part: C9002
mpn: X322512MSB4SI
manufacturer: YXC Crystal Oscillators
category: Crystals
kind: clock
package: SMD3225-4P
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: Crystal Unit YSX321SL
  publisher: YXC Crystal Oscillators
  url: https://datasheet.lcsc.com/datasheet/pdf/a84bd8d530dd46e4b0f6d0ee59d8a89c.pdf
summary: A 12 MHz crystal with a 20 pF load — the frequency the RP2040's USB bootloader requires.
---

# X322512MSB4SI

> **Note on sources.** The datasheet is YXC's own, but it describes the
> **YSX321SL series** rather than this particular part number. It fixes the
> package, the way the quartz vibrates, the shunt capacitance, the drive level,
> the aging rate, the resistance ceiling for each frequency band and the
> temperature ranges. Three things it deliberately leaves open: load
> capacitance, frequency tolerance and temperature stability all end "or
> specify", meaning they are chosen when you order. So this part's 12 MHz, 20 pF
> and ±10 ppm are on the catalog's authority \`[2]\`, not the datasheet's \`[1]\`.

## What it is

A quartz crystal is a small slab of quartz that vibrates at a very precise
frequency when you put a voltage across it. Paired with the oscillator circuit
built into almost every microcontroller, it gives you a clock far more accurate
than the chip's own internal RC oscillator, which is why anything doing USB,
Ethernet or timekeeping usually has one.

This one runs at 12 MHz [2] and comes from YXC's YSX321SL series: a 3.20 × 2.50
× 0.70 mm four-pad ceramic package covering 8 to 64 MHz, using an AT-cut crystal
run in its fundamental mode — the ordinary arrangement, where the quartz
vibrates at the frequency printed on it rather than at a multiple of it. [1] The
datasheet's connection drawing shows the quartz wired diagonally between pads #1
and #3; pads #2 and #4 connect to the metal lid. Soldering those two to ground
is what keeps the oscillator quiet. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Nominal frequency | 12 MHz [2], within the series range of 8–64 MHz, AT fundamental mode [1] | The exact frequency is chosen at order time, so only the catalog record states it. 12 MHz is not a free choice on an RP2040: its datasheet says the USB bootloader requires a 12 MHz crystal or a 12 MHz clock input. [3] |
| Frequency tolerance | ±10 ppm at 25 °C [2]; the series offers ±10 ppm, ±20 ppm, or specify [1] | How far off it can be when new, at room temperature. ±10 ppm is one of the two grades the datasheet names as standard, so this is a normal stock configuration — and comfortably tighter than the ±30 ppm Raspberry Pi's recommended crystal is specified to. [3] |
| Load capacitance | 20 pF [2] | **The number that matters most.** 20 pF is one of the two values the series names as standard, so this is a plain catalog configuration — but the sheet still does not tie it to this part number. Note that Raspberry Pi's recommended RP2040 crystal is a 10 pF part, so the Pico's capacitor values do not carry across to this one. [3] |
| Equivalent series resistance | 80 Ω maximum, from the series table's 12–15 MHz band [1]; the catalog agrees [2] | How much the quartz resists being driven — effectively how hard your oscillator has to push. It is a ceiling for the whole 12–15 MHz band, not a measured value. Worth checking against your chip: the RP2040's recommended crystal is specified at 50 Ω maximum. [3] |
| Stability over temperature | ±20 ppm [2]; the series' standard value, the alternative being "or specify" [1] | Drift as the board heats and cools, on top of the room-temperature tolerance — about ±30 ppm all told. |
| Operating temperature | −40 °C to +85 °C [1][2] | The industrial range, and the series default. Storage is wider: −55 °C to +125 °C. [1] |

## What the datasheet actually says

**Half the table is a menu, not a measurement.** Load capacitance, frequency
tolerance and frequency-versus-temperature each end with "or specify", and the
frequency itself is given as a range. That is what a series datasheet is for: it
guarantees how the package and the quartz behave, and leaves the electrical trim
to the purchase order. Reading "±10 ppm" off this sheet tells you what YXC is
able to build, not what arrived on the reel. This part's 20 pF load is at least
one of the two values the sheet names as standard. [1]

**The resistance ceiling depends on the frequency band, and 12 MHz sits at the
bottom of a step.** The series table runs 180 Ω maximum from 8 to 11.2892 MHz,
80 Ω from 12 to 15 MHz, 50 Ω from 16 to 31 MHz and 40 Ω from 32 to 64 MHz. [1]
Change the frequency by a couple of megahertz and the resistance you are allowed
to design around changes with it, so a figure carried over from a previous
design is not safe to reuse.

**Drive level, shunt capacitance and aging are all specified, and none of them
appear in the catalog attributes.** The crystal wants 10–200 µW of drive with
100 µW typical; its shunt capacitance — the stray capacitance of the electrodes
and holder, which sits in parallel with the vibrating quartz — is 3 pF maximum;
and it ages by up to ±3 ppm per year. [1] Over five years the aging term alone
is up to ±15 ppm, on top of the ±10 ppm it started with and the ±20 ppm it
drifts across temperature.

## Watch out for

- **The RP2040 is fussier than this part number suggests.** Raspberry Pi
  specifies the Abracon ABM8-272-T3 — 12 MHz, fundamental AT cut, 10 pF load,
  50 Ω maximum resistance, ±30 ppm — and warns that even a crystal with similar
  specifications needs testing over temperature, that the recommended damping
  resistor is tuned for 3.3 V operation, and that any change to crystal
  parameters risks instability. [3] This YXC part differs on both load
  capacitance (20 pF) and resistance ceiling (80 Ω), so it is a substitution to
  test, not a drop-in.
- **Work out the load capacitors; do not copy them.** The load capacitance is
  what the crystal sees, not the value of each capacitor: C<sub>load</sub> =
  (C1 × C2)/(C1 + C2) + C<sub>stray</sub>, where C<sub>stray</sub> is the pin
  and track capacitance of *your* board, which no crystal datasheet can know and
  this one does not state.
- **Solder pads #2 and #4 to ground.** They are the case connection, not
  decoration. [1]
- **Do not overdrive it.** 200 µW is the limit, not the target; 100 µW is
  typical. [1]
- **The recommended land pattern is bigger than the part.** YXC suggests pads of
  1.4 × 1.2 mm with 0.8 mm and 0.5 mm gaps — 3.6 × 2.9 mm overall — against a
  3.20 × 2.50 mm body whose own pads measure 1.2 × 0.7 mm. A footprint traced
  from the package outline will be too small. [1]
- **Tolerance, temperature drift and aging are three separate numbers** and they
  add up.

## In this catalog

Basic part in SMD3225-4P (3.2 × 2.5 mm), so no assembly surcharge at JLCPCB. At
the 2026-07-24 snapshot: 260,055 in stock, $0.095 at quantity 1, falling to $0.048 at 6,000. [2]

## Sources

1. YXC, *Crystal Unit YSX321SL*, series datasheet for the 3.20 × 2.50 × 0.70 mm
   YSX321SL crystal unit. A single page carrying no document number and no
   revision marking. Sections used: Features; Specifications; Equivalent Series
   Resistance; Dimensions and Recommended Land Pattern.
   <https://datasheet.lcsc.com/datasheet/pdf/a84bd8d530dd46e4b0f6d0ee59d8a89c.pdf>
2. JLCPCB / LCSC catalog record for C9002, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). The source for the frequency,
   load capacitance and frequency tolerance — the three the series datasheet
   leaves open — and for price, stock and tier.
   <https://www.lcsc.com/product-detail/crystals_yxc-crystal-oscillators_C9002.html>
3. Raspberry Pi Ltd, *RP2040 Datasheet — A microcontroller by Raspberry Pi*,
   build-version 3184e62-clean, build-date 2025-02-20. Section 1.4.2 (Pin
   Descriptions, Table 1 — the USB bootloader's 12 MHz requirement) and
   Section 2.16.1.1 with Table 257 (Recommended Crystals). Cited here for what the RP2040 asks of a crystal, not
   for anything about this part.
   <https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf>
`;export{e as default};