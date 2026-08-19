var e=`---
part: C13738
mpn: X322516MLB4SI
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
summary: A 16 MHz crystal with a 9 pF load — the classic Arduino Uno clock frequency.
---

# X322516MLB4SI

> **Note on sources.** The datasheet is YXC's own, but it describes the
> **YSX321SL series** rather than this particular part number. It fixes the
> package, the way the quartz vibrates, the shunt capacitance, the drive level,
> the aging rate, the resistance ceiling for each frequency band and the
> temperature ranges. Three things it deliberately leaves open: load
> capacitance, frequency tolerance and temperature stability all end "or
> specify", meaning they are chosen when you order. So this part's 16 MHz, 9 pF
> and ±10 ppm are on the catalog's authority \`[2]\`, not the datasheet's \`[1]\`.

## What it is

A quartz crystal is a small slab of quartz that vibrates at a very precise
frequency when you put a voltage across it. Paired with the oscillator circuit
built into almost every microcontroller, it gives you a clock far more accurate
than the chip's own internal RC oscillator, which is why anything doing USB,
Ethernet or timekeeping usually has one.

This one runs at 16 MHz [2] and comes from YXC's YSX321SL series: a 3.20 × 2.50
× 0.70 mm four-pad ceramic package covering 8 to 64 MHz, using an AT-cut crystal
run in its fundamental mode — the ordinary arrangement, where the quartz
vibrates at the frequency printed on it rather than at a multiple of it. [1] The
datasheet's connection drawing shows the quartz wired diagonally between pads #1
and #3; pads #2 and #4 connect to the metal lid. Soldering those two to ground
is what keeps the oscillator quiet. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Nominal frequency | 16 MHz [2], within the series range of 8–64 MHz, AT fundamental mode [1] | The exact frequency is chosen at order time, so only the catalog record states it. 16 MHz is the classic Arduino Uno clock and a common input for phase-locked loops in 32-bit microcontrollers. |
| Frequency tolerance | ±10 ppm at 25 °C [2]; the series offers ±10 ppm, ±20 ppm, or specify [1] | How far off it can be when new, at room temperature. ±10 ppm is one of the two grades the datasheet names as standard, so this is a normal stock configuration rather than a special order. |
| Load capacitance | 9 pF [2] | **The number that matters most**, and the datasheet does not list it: the series' named values are 10 pF and 20 pF, "or specify". 9 pF is therefore a specify-to-order variant, and only the catalog states it. Your two capacitors plus the board's own stray capacitance have to add up to this figure or the frequency comes out wrong. |
| Equivalent series resistance | 50 Ω maximum, from the series table's 16–31 MHz band [1]; the catalog agrees [2] | This is how much the quartz resists being driven — effectively how hard your oscillator has to push. It is a ceiling for the whole 16–31 MHz band, not a measured value for this part. If it exceeds what the oscillator circuit can drive, the clock never starts. |
| Stability over temperature | ±20 ppm [2]; the series' standard value, the alternative being "or specify" [1] | Drift as the board heats and cools, on top of the room-temperature tolerance — about ±30 ppm all told. |
| Operating temperature | −40 °C to +85 °C [1][2] | The industrial range, and the series default. Storage is wider: −55 °C to +125 °C. [1] |

## What the datasheet actually says

**Half the table is a menu, not a measurement.** Load capacitance, frequency
tolerance and frequency-versus-temperature each end with "or specify", and the
frequency itself is given as a range. That is what a series datasheet is for: it
guarantees how the package and the quartz behave, and leaves the electrical trim
to the purchase order. Reading "±10 ppm" off this sheet tells you what YXC is
able to build, not what arrived on the reel — and its two named load
capacitances, 10 pF and 20 pF, do not include the 9 pF this part is sold as. [1]

**Drive level is specified, and it is easy to exceed.** The crystal wants
10–200 µW, with 100 µW typical. [1] Drive level is simply how much power your
oscillator dissipates in the quartz; too much makes it age faster and shifts the
frequency, which is what the series damping resistor you see in reference
designs is there to prevent. If your microcontroller offers a low-power or
high-drive oscillator mode, this is the specification that decides which to use.

**Aging is ±3 ppm per year, and nobody puts it in a catalog attribute.** [1]
Over five years that is up to ±15 ppm of extra error, stacking on the ±10 ppm it
started with and the ±20 ppm it drifts across temperature. For a serial port
none of this matters. For a clock that has to still be right in 2031, it is the
term people forget.

## Watch out for

- **The datasheet is for the series, not for this part.** Its 9 pF load is not
  one of the values the sheet names, so nothing in the manufacturer's own
  document confirms it. If that figure is critical, ask LCSC or YXC to confirm
  the ordering code before committing a board.
- **Work out the load capacitors; do not copy them.** The load capacitance is
  what the crystal sees, not the value of each capacitor: C<sub>load</sub> =
  (C1 × C2)/(C1 + C2) + C<sub>stray</sub>, where C<sub>stray</sub> is the pin
  and track capacitance of *your* board, which no crystal datasheet can know and
  this one does not state. Fitting 9 pF capacitors because the part says 9 pF is
  a common and consistent way to end up running fast.
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
the 2026-07-24 snapshot: 144,946 in stock, $0.093 at quantity 1, falling to $0.048 at 6,000. [2]

## Sources

1. YXC, *Crystal Unit YSX321SL*, series datasheet for the 3.20 × 2.50 × 0.70 mm
   YSX321SL crystal unit. A single page carrying no document number and no
   revision marking. Sections used: Features; Specifications; Equivalent Series
   Resistance; Dimensions and Recommended Land Pattern.
   <https://datasheet.lcsc.com/datasheet/pdf/a84bd8d530dd46e4b0f6d0ee59d8a89c.pdf>
2. JLCPCB / LCSC catalog record for C13738, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). The source for the frequency,
   load capacitance and frequency tolerance — the three the series datasheet
   leaves open — and for price, stock and tier.
   <https://www.lcsc.com/product-detail/crystals_yxc-crystal-oscillators_C13738.html>
`;export{e as default};