var e=`---
part: C32346
mpn: Q13FC13500004
manufacturer: Seiko Epson
category: Crystals
kind: clock
package: SMD3215-2P
tier: basic
catalog_snapshot: 2026-07-24
summary: The 32.768 kHz watch crystal — what a real-time clock chip needs to keep time.
---

# Q13FC13500004

> **Note on sources.** Seiko Epson's datasheet for this order code could not be
> retrieved automatically. Every figure below comes from the JLCPCB/LCSC catalog
> record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

32.768 kHz is the frequency every real-time clock runs at, and the reason is
arithmetic: 32,768 is 2¹⁵, so a simple 15-stage binary divider turns it into
exactly one pulse per second. This crystal is the part that generates it. [1]

It is what the DS1302 (C8959) and PCF8563 (C7440) in this catalog need on their
X1/X2 pins, and what an STM32's LSE oscillator wants for its RTC. The package is
3.2 × 1.5 mm with two pads. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Nominal frequency | 32.768 kHz [1] | 2¹⁵ Hz — divides to exactly 1 Hz. |
| Frequency tolerance | ±20 ppm at room temperature [1] | About ±10.5 minutes per year. That is the *best* case, before temperature effects. |
| Load capacitance | 12.5 pF [1] | The standard value for watch crystals. Note that some RTCs — the PCF8563 among them — integrate their own load capacitance, so check before adding external capacitors. |
| Equivalent series resistance | 70 kΩ [1] | Kilohms, not ohms. Tuning-fork crystals at this frequency have very high ESR, which is why their oscillator circuits are designed differently from megahertz ones. |
| Stability over temperature | Not recorded separately in the catalog for this part; tuning-fork crystals follow a parabolic curve peaking near 25 °C [1] | See below. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**Temperature affects a watch crystal parabolically, not linearly.** Tuning-fork
crystals of this type are cut so that frequency peaks near room temperature and
falls off on *both* sides — so a clock that lives outdoors runs slow in summer and
in winter alike. The catalog record does not carry a temperature-stability figure
for this part, so if drift over temperature matters to your design, get the
parabolic coefficient from Epson's datasheet for this order code rather than
assuming the ±20 ppm room-temperature tolerance is the whole story.

**70 kΩ of ESR means very low drive.** These crystals are driven with microwatts.
Over-driving one damages it permanently, which is why RTC oscillator circuits
include a drive-level-limiting resistor and why you should not substitute a
megahertz crystal's circuit values.

**Check whether your RTC has integrated load capacitors.** The PCF8563 does; the
DS1302 does not. Adding external capacitors to a part that already has them pulls
the frequency low and the clock runs slow.

## Watch out for

- **Do not add load capacitors blindly.** Check the RTC's datasheet first.
- **Layout matters more here than for a fast crystal**, because the node is
  extremely high-impedance. Keep traces short, guard with ground, and keep
  switching signals away.
- **±20 ppm is ten minutes a year in the best case.** If you need better, you
  need a temperature-compensated oscillator, not a better crystal.
- **Handle gently.** Tuning-fork crystals are mechanically fragile and can be
  damaged by board flexing or ultrasonic cleaning.

## In this catalog

Basic part in SMD3215-2P (3.2 × 1.5 mm), so no assembly surcharge at JLCPCB. At
the 2026-07-24 snapshot: 429,539 in stock, $0.17 at quantity 1, falling to $0.080
at 6,000 — the most expensive crystal here, which is what buying Seiko Epson
rather than a generic brand costs. [1]

## Sources

1. JLCPCB / LCSC catalog record for C32346, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/crystals_seiko-epson-q13fc13500004_C32346.html>
`;export{e as default};