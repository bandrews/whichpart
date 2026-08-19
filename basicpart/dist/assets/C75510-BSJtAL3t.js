var e=`---
part: C75510
mpn: LM317AG-TN3-R
manufacturer: UTC(Unisonic Tech)
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: TO-252-2(DPAK)
tier: preferred
catalog_snapshot: 2026-07-24
summary: The adjustable classic — two resistors set any output from 1.2 V to 37 V, at up to 1.5 A.
---

# LM317AG-TN3-R

> **Note on sources.** UTC's datasheet for this part is served through LCSC,
> which blocks automated retrieval. Every figure below comes from the JLCPCB/LCSC
> catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

The LM317 is the adjustable counterpart to the fixed 78xx regulators, and it is
just as old and just as widely used. It has three terminals — input, output and
adjust — and holds a constant 1.25 V between output and adjust. Put a resistor
divider there and you set any output from about 1.2 V up to 37 V. [1]

Because it regulates a *voltage across a resistor*, it also makes a simple
constant-current source: one resistor from output to adjust, and the current is
1.25 V divided by that resistance. That trick is why LM317s appear in LED drivers
and battery chargers. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable, 1.2 V to 37 V [1] | Two resistors. The lower limit is the internal reference voltage. |
| Output current | 1.5 A [1] | Ten times the 78L05's, and it needs ten times the heatsinking. |
| Input voltage range | Up to 40 V [1] | The limit is really the *difference* between input and output — see below. |
| Dropout voltage | 5 V at 500 mA [1] | High. The LM317 is emphatically not a low-dropout regulator; it needs several volts of headroom. |
| Quiescent current | Not recorded in the catalog [1] | The adjust-pin current is small but not zero, which is why the lower divider resistor should not be too large. |
| Output accuracy | Power supply rejection 80 dB at 120 Hz [1] | Good rejection, as with the rest of the classic linear family. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**5 V of dropout at 500 mA is the number people forget.** To get a stable 12 V
out you need around 17 V in. Circuits that try to make 5 V from 6 V with an
LM317 do not work.

**Heat is the design.** Dropping 24 V to 5 V at 500 mA dissipates 9.5 W. The
DPAK's tab must be soldered to a substantial copper pour, and even then that is
far beyond what it can shed. Work out (V<sub>in</sub> − V<sub>out</sub>) × I
first, always.

**The input-output differential has a maximum too**, not just a minimum — the
classic LM317 limit is 40 V between input and output, so a 40 V input with the
output shorted is at the edge.

**Protection is comprehensive:** over-current, short-circuit and thermal
shutdown. [1]

## Watch out for

- **5 V dropout.** Budget the headroom.
- **Heat, heat, heat.** For big input-output differences use a switching
  converter — the XL1509-ADJ (C74192) covers the same output range at 2 A.
- **The adjust pin needs a defined path to ground.** An open lower resistor sends
  the output to the input voltage, which usually destroys whatever it feeds.
- **Add the recommended protection diodes** in high-voltage or high-capacitance
  designs, so that a discharging output capacitor cannot back-feed the regulator.

## In this catalog

Preferred Extended part in TO-252-2 (DPAK). At the 2026-07-24 snapshot: 10,012 in
stock, $0.23 at quantity 1, falling to $0.117 at 5,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C75510, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/voltage-regulators-linear-low-drop-out-ldo-regulators_utc-unisonic-tech-lm317ag-tn3-r_C75510.html>
`;export{e as default};