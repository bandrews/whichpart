var e=`---
part: C7722
mpn: TPS61040DBVR
manufacturer: Texas Instruments
category: DC-DC Converters
kind: power-switching
package: SOT-23-5
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: TPS6104x — Low-Power DC-DC Boost Converter in SOT-23 / WSON Packages
  publisher: Texas Instruments
  document: SLVS413L
  revised: 2026-08
  url: https://www.ti.com/lit/ds/symlink/tps61040.pdf
summary: Steps a battery voltage up — 1.8 V in, as much as 28 V out — in a five-pin package.
---

# TPS61040DBVR

## What it is

Where a buck converter steps voltage down, a boost converter steps it up. The
TPS61040 takes an input as low as 1.8 V and produces a regulated output up to
28 V, in a SOT-23-5 package. [1]

Its usual jobs are driving strings of white LEDs for backlights, generating a
bias rail for an LCD or an OLED, or producing a higher voltage for a sensor from
a battery. The 28 V ceiling is high enough for a string of eight or nine LEDs in
series. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable, up to 28 V [1] | Two feedback resistors set it. The 28 V figure is the pin's limit, not a fixed output. |
| Output current | Internal switch current limit of 400 mA (the TPS61041 in the same datasheet is 250 mA) [1] | This is *switch* current, not output current. Available output current falls as the step-up ratio rises — a 400 mA switch delivers far less than 400 mA at 28 V. |
| Input voltage range | 1.8 V to 6 V [1] | Runs from two alkaline cells, a single lithium cell, or a 5 V rail. |
| Switching frequency | Up to 1 MHz [1] | High switching frequency keeps the inductor physically small — important in a design that chose SOT-23 for size. |
| Efficiency | No-load quiescent current typically 28 µA; shutdown current typically 1 µA [1] | The 28 µA figure is what makes it usable in a battery product that is idle most of the time. |
| Operating temperature | −40 °C to +125 °C junction [2] | A junction limit; the small package means thermal headroom is modest. |

## What the datasheet actually says

**"400 mA" is the switch current limit, and this is the most misread number on
the part.** In a boost converter the switch carries the input current, which is
higher than the output current by roughly the step-up ratio. Boosting 3.3 V to
28 V, a 400 mA switch limit corresponds to well under 50 mA of output. Size your
expectations from the power, not the current. [1]

**Internal soft start** limits inrush at power-up without an external
capacitor. [1]

**The frequency is "up to 1 MHz", not fixed.** This part uses a hysteretic
control scheme, so the switching frequency varies with load — one reason its
light-load quiescent current is so low, and a reason its output ripple spectrum
is not a clean single tone. [1]

## Watch out for

- **A boost converter has no off.** Even when the chip stops switching, current
  flows from input to output through the inductor and diode. If you need the
  output truly disconnected, add a series switch.
- **Compute available output current from power, not from 400 mA.**
- **Inductor choice matters** more than on a buck converter — saturation current
  must exceed the switch limit, and its resistance directly costs efficiency.
- **Feedback layout.** With a 28 V output in a five-pin package, keep the
  feedback node short and away from the switch node.

## In this catalog

Preferred Extended part in SOT-23-5. At the 2026-07-24 snapshot: 17,926 in stock,
$1.21 at quantity 1, falling to $0.81 at 1,000 — the most expensive converter in
this group, and stock is thinner than the buck parts. The catalog attributes
record 1.8 V–6 V input, 28 V output, 400 mA, 1 MHz, 28 µA quiescent current, a
non-synchronous boost topology and −40 °C to +125 °C junction temperature, all
consistent with the datasheet. Note that the catalog's "Output Current: 400mA"
field is the datasheet's switch current limit, not deliverable output
current. [2]

## Sources

1. Texas Instruments, *TPS6104x — Low-Power DC-DC Boost Converter in SOT-23 /
   WSON Packages*, SLVS413L, October 2002, revised August 2026. Section 1
   (Features), Section 5.3 (Recommended Operating Conditions).
   <https://www.ti.com/lit/ds/symlink/tps61040.pdf>
2. JLCPCB / LCSC catalog record for C7722, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/dc-dc-converters_texas-instruments-tps61040dbvr_C7722.html>
`;export{e as default};