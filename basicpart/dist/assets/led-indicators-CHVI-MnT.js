var e=`---
family: Discrete indicator LEDs
part_count: 7
categories:
  - LED Indication - Discrete
kind: led
catalog_snapshot: 2026-07-24
summary: The cheapest user interface there is — and the one thing on a board people notice first.
---

# Discrete indicator LEDs

## What they are

Small light-emitting diodes in surface-mount packages, used to tell a person
something: power is on, data is moving, a fault has occurred. The catalog holds
seven — four in 0805 and three in 0603, five from Hubei KENTO and two from
Foshan NationStar. Between them they cover red, yellow, green and white; there
is **no blue** at Basic or Preferred tier, which is why the curated picks reach
into ordinary Extended parts for one. [1]

Electrically an LED is a diode with a forward voltage that depends on its colour,
because the colour and the voltage both come from the semiconductor's band gap.
Red is around 2 V; green, blue and white are around 3 V. That single fact governs
most LED design decisions.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Illumination colour** and **dominant wavelength** | What it looks like. Dominant wavelength is the perceived colour; peak wavelength is where the emission peaks, and they differ. |
| **Forward voltage (V<sub>F</sub>)** | The drop across it, always a range. Sets the series resistor. |
| **Forward current (I<sub>F</sub>)** | The rated current, not a target. |
| **Luminous intensity** | Brightness in millicandela, measured at a stated current — and always a *span*, because LEDs are sorted into brightness bins. |
| **Viewing angle** | How wide the beam is. 120° is a typical indicator. |
| **Power rating** | Package limit. |
| **Colour temperature** | For white LEDs only — and often a very wide range. |

## What actually matters in practice

**Always fit a series resistor.** An LED has no internal current limit; its
current rises exponentially with voltage. Connect one directly across a supply
and it destroys itself. The resistor value is
(V<sub>supply</sub> − V<sub>F</sub>) / I<sub>desired</sub>.

**Forward voltage varies part to part, and that varies your brightness.** The
catalog's red LED is specified 1.8 V to 2.4 V. [1] From a 3.3 V rail through
1 kΩ, that range gives 1.5 mA to 0.9 mA — nearly 2:1 in brightness between two
parts from the same reel. For LEDs placed side by side that difference is
visible. The fix is a larger voltage across the resistor (so the V<sub>F</sub>
variation is a smaller fraction of it), or constant-current drive.

**3 V LEDs do not work well on 3.3 V rails.** The catalog's white and green
parts are specified 2.6 V to 3.1 V (one white to 3.2 V), so a part at the top of
its range leaves 0.1–0.2 V across the resistor — a tiny, wildly variable current.
Use a 5 V rail for those colours, or a boost driver. Red and yellow, at 1.6–2.6 V,
are comfortable on 3.3 V. [1]

**Run them far below the rated current.** 300 mcd at 20 mA is dazzling as a panel
indicator. At 2 mA it is still clearly visible indoors and uses a tenth of the
power. On a battery product this is one of the easiest savings available.

**The brightness figure is the top of a bin range.** KENTO's datasheet for the
0805 yellow part specifies 70 mcd minimum and 175 mcd maximum at 20 mA, sorted
into five bins (70–85, 85–100, 100–120, 120–145, 145–175 mcd). The catalog
records 175 mcd — the top of the span. Two parts from the same reel can
legitimately differ by two and a half times in brightness, which is worth knowing
before you put four of them in a row on a front panel. [1] [2]

**Reverse voltage is the rating people forget an LED has.** KENTO rates these at
5 V reverse, with 5 µA of reverse leakage at that voltage. An LED fitted
backwards across a 12 V rail is outside its rating even though no current flows
in the direction you wanted. Where a signal can reverse — an AC-coupled
indicator, or a line that floats — add a series diode or an anti-parallel one. [2]

**Check which current each number was measured at.** In the same KENTO
datasheet the forward voltage is specified at 10 mA and the luminous intensity at
20 mA. That is normal, and it means you cannot simply read the two off together:
at 20 mA the forward voltage is a little higher than the quoted range. [2]

**Perceived brightness is not luminous intensity.** The eye is most sensitive to
green and least to blue. A blue LED and a green LED of equal millicandela do not
look equally bright, and equal *drive current* is even less comparable.

**Check the cathode marking.** 0603 LED polarity marks are not standardised — some
manufacturers mark the cathode, some the anode, and the footprint in your library
may assume the other. Compare against the manufacturer's drawing every time.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Illumination Color\` | Red, green, blue, white. |
| \`Voltage - Forward(Vf)\` | A range, e.g. \`1.8V~2.4V\`. Design for the whole range. |
| \`Forward Current\` | Rated current, e.g. \`20mA\`. |
| \`Luminous Intensity\` | Brightness at the rated current, e.g. \`300mcd\`. |
| \`Viewing Angle\` | e.g. \`120°\`. |
| \`Wavelength - Dominant\` | Perceived colour, e.g. \`615nm~630nm\`. |
| \`Peak Wavelength\` | Emission peak — a different, larger number. |
| \`Color Temperature\` | White LEDs only. A wide range means poor tint consistency. |
| \`Power(Watts)\` | Package limit. |
| \`Lens Color\` | \`Water Clear\` or a diffuser/phosphor colour. |

## Watch out for

- **Series resistor, always.**
- **Forward voltage spread makes matched brightness hard.**
- **White and blue need more than a 3.3 V rail.**
- **Rated current is a limit, not a target.**
- **Verify the cathode marking against the manufacturer's drawing.**

## Individual notes in this collection

Four LEDs from the curated picks have their own files: \`C2286\` (red 0603),
\`C2290\` (white 0603), \`C72043\` (green, Extended) and \`C72041\` (blue, Extended).
The addressable \`C114586\` (WS2812B) has its own file too, though it is a
different kind of device.

## Sources

1. JLCPCB / LCSC catalog records for the LED Indication – Discrete category,
   snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). Colour, voltage, current, intensity and angle
   figures are the attribute values recorded there.
2. Hubei KENTO Electronics, *KT-0805Y specification for approval*, Revision A.0,
   6 December 2018. Section 4 (Absolute Maximum Ratings: power dissipation, peak
   and DC forward current, reverse voltage, operating temperature) and Section 5
   and 6 (electrical/optical characteristics and the luminous-intensity bin
   table). Retrieved via the LCSC datasheet link for C2296.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_1806151129_Hubei-KENTO-Elec-KT-0805Y_C2296.pdf>
`;export{e as default};