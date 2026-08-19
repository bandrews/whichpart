var e=`---
part: C9006
mpn: X322525MOB4SI
manufacturer: YXC Crystal Oscillators
category: Crystals
kind: clock
package: SMD3225-4P
tier: basic
catalog_snapshot: 2026-07-24
summary: A 25 MHz crystal with a 12 pF load — the usual reference for Ethernet PHYs.
---

# X322525MOB4SI

> **Note on sources.** YXC's datasheet for this part is served through LCSC,
> which blocks automated retrieval, and no manufacturer copy could be reached.
> Every figure below comes from the JLCPCB/LCSC catalog record and is cited as
> \`[1]\`. See \`ISSUES.md\`.

## What it is

A quartz crystal: a small slab of quartz that vibrates at a very precise
frequency when you apply a voltage across it. Paired with the oscillator circuit
built into almost every microcontroller, it gives you a clock far more accurate
than the chip's internal RC oscillator. [1]

This one runs at 25 MHz in a 3.2 × 2.5 mm four-pad surface-mount package. Two of the
four pads are the crystal connections; the other two are ground shields, and
connecting them is what keeps the oscillator quiet. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Nominal frequency | 25 MHz [1] | 25 MHz is the standard reference frequency for Ethernet PHYs, including the W5500 in this catalog. |
| Frequency tolerance | ±10 ppm at room temperature [1] | How far off it is when new, at 25 °C. 10 ppm is about 0.9 seconds per day. |
| Load capacitance | 12 pF [1] | **The number that matters most.** Your two load capacitors, plus the microcontroller's pin capacitance and stray board capacitance, must add up to this. Get it wrong and the frequency is wrong. |
| Equivalent series resistance | 50 Ω [1] | How hard the oscillator has to work. Higher ESR needs more drive; if it exceeds what your microcontroller's oscillator can supply, it will not start. |
| Stability over temperature | ±20 ppm over the operating range [1] | Adds to the room-temperature tolerance — worst case about ±30 ppm in total. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**Load capacitance is not the capacitor value.** The usual rule is
C<sub>load</sub> = (C1 × C2)/(C1 + C2) + C<sub>stray</sub>, where C1 and C2 are
your two capacitors and C<sub>stray</sub> is typically 3–5 pF of pin and trace
capacitance. For a 12 pF crystal with matched capacitors, that means each capacitor
is roughly (C<sub>load</sub> − C<sub>stray</sub>) × 2. Fitting the load
capacitance value directly as each capacitor is a common and consistent error
that pulls the frequency off.

**Tolerance and stability add.** ±10 ppm initial plus ±20 ppm over temperature is
±30 ppm worst case, or about 2.6 seconds a day. For a UART that is irrelevant;
for a clock that must not drift, it is not.

**ESR determines whether it starts.** A microcontroller's oscillator has a
limited negative resistance; the usual design rule is that it should exceed the
crystal's ESR by a factor of about five. At 50 Ω that is rarely a problem for
this frequency, but it is why series resistors on the drive pin should be sized
carefully rather than copied from another design.

## Watch out for

- **Calculate the load capacitors; do not guess them.**
- **Ground the two shield pads.** They are not decorative.
- **Keep the traces short** and guard them with ground; a crystal is a
  high-impedance node and picks up noise readily.
- **Tolerance and stability are separate numbers** and they add.

## In this catalog

Basic part in SMD3225-4P (3.2 × 2.5 mm), so no assembly surcharge at JLCPCB. At
the 2026-07-24 snapshot: 187,494 in stock, $0.100 at quantity 1, falling to $0.050 at 6,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C9006, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/crystals_yxc-crystal-oscillators_C9006.html>
`;export{e as default};