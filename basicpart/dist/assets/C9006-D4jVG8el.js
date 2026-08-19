var e=`---
part: C9006
mpn: X322525MOB4SI
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
summary: A 25 MHz crystal with a 12 pF load — the usual reference for Ethernet PHYs.
---

# X322525MOB4SI

> **Note on sources.** The datasheet is YXC's own, but it describes the
> **YSX321SL series** rather than this particular part number. It fixes the
> package, the way the quartz vibrates, the shunt capacitance, the drive level,
> the aging rate, the resistance ceiling for each frequency band and the
> temperature ranges. Three things it deliberately leaves open: load
> capacitance, frequency tolerance and temperature stability all end "or
> specify", meaning they are chosen when you order. So this part's 25 MHz, 12 pF
> and ±10 ppm are on the catalog's authority \`[2]\`, not the datasheet's \`[1]\`.

## What it is

A quartz crystal is a small slab of quartz that vibrates at a very precise
frequency when you put a voltage across it. Paired with the oscillator circuit
built into almost every microcontroller or Ethernet chip, it gives you a clock
far more accurate than an internal RC oscillator — accurate enough that two
devices agree on where one bit ends and the next begins.

This one runs at 25 MHz [2] and comes from YXC's YSX321SL series: a 3.20 × 2.50
× 0.70 mm four-pad ceramic package covering 8 to 64 MHz, using an AT-cut crystal
run in its fundamental mode — the ordinary arrangement, where the quartz
vibrates at the frequency printed on it rather than at a multiple of it. [1] The
datasheet's connection drawing shows the quartz wired diagonally between pads #1
and #3; pads #2 and #4 connect to the metal lid. Soldering those two to ground
is what keeps the oscillator quiet. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Nominal frequency | 25 MHz [2], within the series range of 8–64 MHz, AT fundamental mode [1] | The exact frequency is chosen at order time, so only the catalog record states it. 25 MHz is the standard Ethernet reference — the W5500 in this catalog names 25 MHz in its own crystal specification. [3] |
| Frequency tolerance | ±10 ppm at 25 °C [2]; the series offers ±10 ppm, ±20 ppm, or specify [1] | How far off it can be when new, at room temperature. ±10 ppm is one of the two grades the datasheet names as standard, and it is three times tighter than the ±30 ppm the W5500 asks for — useful headroom rather than a requirement. [3] |
| Load capacitance | 12 pF [2] | **The number that matters most**, and the datasheet does not list it: the series' named values are 10 pF and 20 pF, "or specify". 12 pF is a specify-to-order variant on the catalog's authority alone — and it is not the 18 pF the W5500 datasheet specifies, so WIZnet's reference capacitor values do not carry across unchanged. [3] |
| Equivalent series resistance | 50 Ω maximum, from the series table's 16–31 MHz band [1]; the catalog agrees [2] | How much the quartz resists being driven — effectively how hard your oscillator has to push. It is a ceiling for the whole 16–31 MHz band, not a measured value for this part. If it exceeds what the oscillator circuit can drive, the clock never starts. |
| Stability over temperature | ±20 ppm [2]; the series' standard value, the alternative being "or specify" [1] | Drift as the board heats and cools, on top of the room-temperature tolerance — about ±30 ppm all told. |
| Operating temperature | −40 °C to +85 °C [1][2] | The industrial range, and the series default. Storage is wider: −55 °C to +125 °C. [1] |

## What the datasheet actually says

**Half the table is a menu, not a measurement.** Load capacitance, frequency
tolerance and frequency-versus-temperature each end with "or specify", and the
frequency itself is given as a range. That is what a series datasheet is for: it
guarantees how the package and the quartz behave, and leaves the electrical trim
to the purchase order. Reading "±10 ppm" off this sheet tells you what YXC is
able to build, not what arrived on the reel — and its two named load
capacitances, 10 pF and 20 pF, do not include the 12 pF this part is sold as. [1]

**Drive level and shunt capacitance are specified, and they are what an Ethernet
PHY cares about.** The crystal wants 10–200 µW of drive with 100 µW typical, and
its shunt capacitance — the stray capacitance of the electrodes and holder,
sitting in parallel with the vibrating quartz — is 3 pF maximum. [1] Both suit
the W5500, which drives its crystal at 59.12 µW and allows up to 7 pF of shunt
capacitance. [3] Load capacitance is the one parameter where the two documents
genuinely differ.

**Aging is ±3 ppm per year, and nobody puts it in a catalog attribute.** [1]
Over five years that is up to ±15 ppm of extra error, on top of the ±10 ppm it
started with and the ±20 ppm it drifts across temperature. The W5500 specifies
the same ±3 ppm per year for its crystal, so this part meets it — but the budget
is being spent, not saved. [3]

## Watch out for

- **The datasheet is for the series, not for this part.** Its 12 pF load is not
  one of the values the sheet names, so nothing in the manufacturer's own
  document confirms it. If that figure is critical, ask LCSC or YXC to confirm
  the ordering code before committing a board.
- **A 12 pF crystal is not what the W5500 datasheet specifies.** WIZnet's crystal
  characteristics table calls for 18 pF. [3] The crystal will still work, but the
  capacitors around it have to be recalculated for 12 pF rather than copied from
  the reference schematic — copy them and the clock runs off frequency.
- **Work out the load capacitors; do not copy them.** The load capacitance is
  what the crystal sees, not the value of each capacitor: C<sub>load</sub> =
  (C1 × C2)/(C1 + C2) + C<sub>stray</sub>, where C<sub>stray</sub> is the pin
  and track capacitance of *your* board, which no crystal datasheet can know and
  this one does not state. At 12 pF the board's own contribution is a bigger
  share of the total than it would be at 20 pF, so layout matters more here.
- **Solder pads #2 and #4 to ground.** They are the case connection, not
  decoration. [1]
- **The recommended land pattern is bigger than the part.** YXC suggests pads of
  1.4 × 1.2 mm with 0.8 mm and 0.5 mm gaps — 3.6 × 2.9 mm overall — against a
  3.20 × 2.50 mm body whose own pads measure 1.2 × 0.7 mm. A footprint traced
  from the package outline will be too small. [1]
- **Tolerance, temperature drift and aging are three separate numbers** and they
  add up.

## In this catalog

Basic part in SMD3225-4P (3.2 × 2.5 mm), so no assembly surcharge at JLCPCB. At
the 2026-07-24 snapshot: 187,494 in stock, $0.100 at quantity 1, falling to $0.050 at 6,000. [2]

## Sources

1. YXC, *Crystal Unit YSX321SL*, series datasheet for the 3.20 × 2.50 × 0.70 mm
   YSX321SL crystal unit. A single page carrying no document number and no
   revision marking. Sections used: Features; Specifications; Equivalent Series
   Resistance; Dimensions and Recommended Land Pattern.
   <https://datasheet.lcsc.com/datasheet/pdf/a84bd8d530dd46e4b0f6d0ee59d8a89c.pdf>
2. JLCPCB / LCSC catalog record for C9006, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). The source for the frequency,
   load capacitance and frequency tolerance — the three the series datasheet
   leaves open — and for price, stock and tier.
   <https://www.lcsc.com/product-detail/crystals_yxc-crystal-oscillators_C9006.html>
3. WIZnet Co., Ltd., *W5500 Datasheet*, Version 1.1.0. Section 5.5.3 (Crystal
   Characteristics): 25 MHz, ±30 ppm tolerance at 25 °C, 7 pF maximum shunt
   capacitance, 59.12 µW drive level, 18 pF load capacitance, ±3 ppm/year aging.
   Cited here for what the W5500 asks of a crystal, not for anything about this
   part. <https://docs.wiznet.io/img/products/w5500/W5500_ds_v110e.pdf>
`;export{e as default};