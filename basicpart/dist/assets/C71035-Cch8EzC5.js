var e=`---
part: C71035
mpn: LM324DT
manufacturer: STMicroelectronics
category: Operational Amplifier
kind: analog
package: SOIC-14
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: LM124, LM224, LM324, LM2902 — Low-power quad operational amplifiers
  publisher: STMicroelectronics
  document: DS0985 Rev 8
  revised: 2019-09
  url: https://www.st.com/resource/en/datasheet/lm124.pdf
summary: Four op-amps in one package, running from a single supply with inputs that work down to ground.
---

# LM324DT

## What it is

The LM324 is four op-amps in a 14-pin package, and it is probably the most-used
general-purpose amplifier ever made. Two things explain its longevity: it runs
from a single supply as low as 3 V, and its input common-mode range includes
ground — so you can amplify a signal referenced to 0 V without a negative
supply. [1]

It is slow, noisy and imprecise by modern standards, and it does not need to be
otherwise. Use it for conditioning sensor outputs, building simple filters,
buffering references, and any job where four cheap amplifiers is exactly what you
want. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Four independent operational amplifiers, internally compensated [1] | Four in one package is the cheapest way to get several amplifiers. |
| Supply voltage | 3 V to 30 V single supply, or ±1.5 V to ±15 V dual (absolute maximum 32 V or ±16 V) [1] | The very wide single-supply range is its defining feature. |
| Input offset voltage | 5 mV maximum per the catalog record; input offset voltage drift 7 µV/°C typical, 30 µV/°C maximum [1] [2] | Loose. Fine for a comparator-ish job or an AC signal; not for precision DC. |
| Gain bandwidth | 1.3 MHz typical at V<sub>CC</sub> = 30 V; slew rate 0.4 V/µs [1] | Slow. At a gain of 10 you have roughly 130 kHz of bandwidth. |
| Output swing | Common-mode input range 0 V to V<sub>CC</sub> − 1.5 V; output source current 40 mA typical, sink current 20 mA typical at 15 V [1] | The input goes to ground but stops 1.5 V short of the positive rail — a very common source of confusion. |
| Supply current | 0.8 mA typical, 1.2 mA maximum for all four amplifiers at V<sub>CC</sub> = 5 V; 1.5 mA typical at 30 V [1] | Around 200 µA per amplifier — genuinely low power for four channels. |
| Operating temperature | 0 °C to +70 °C for the LM324, which is this part. (The LM224 covers −40 °C to +105 °C) [1] | **Commercial grade.** Same silicon, different screening. |

## What the datasheet actually says

**The input range includes ground but not the positive rail.** ST specifies the
common-mode input voltage range as 0 V to V<sub>CC</sub> − 1.5 V. Circuits that
put the input near the top of the supply will misbehave, and this is the single
most common LM324 mistake. [1]

**Input bias current is 20 nA typical, 100 nA maximum at 25 °C, rising to 200 nA
over temperature.** With a 100 kΩ source resistance that is up to 20 mV of error —
four times the offset voltage. Match the impedance at each input if DC accuracy
matters. [1]

**Output crossover distortion is the LM324's known weakness.** Total harmonic
distortion is 0.015 % typical at 1 kHz with 20 dB of gain, but the class-B output
stage produces distortion near zero output that the number does not capture. For
audio, this is why people reach for the NE5532 or TL072 instead.

**Supply voltage rejection is 65 dB minimum, 110 dB typical** over a 5 V to 30 V
supply. [1]

## Watch out for

- **0 °C to +70 °C.** The LM224 is the industrial-temperature equivalent.
- **The input does not reach the positive rail.** Stay 1.5 V below it.
- **Crossover distortion near zero output.** A small pull-down resistor from
  output to the negative rail is the traditional fix.
- **1.3 MHz is slow.** Do not expect it to handle fast signals.

## In this catalog

Basic part in SOIC-14, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 47,226 in stock, $0.18 at quantity 1, falling to $0.097 at 5,000. The
catalog attributes record 5 mV offset, 300 nA bias current, 1.3 MHz gain
bandwidth, 40 nV/√Hz noise, 80 dB CMRR, 1.2 mA quiescent current, 70 mA output
current, 3 V–30 V single supply, ±1.5 V to ±15 V dual and 0 °C to +70 °C. Two
entries need care: the "Slew Rate: 400V/ms" attribute is 0.4 V/µs expressed in
different units, and the 300 nA bias-current figure is above the datasheet's
200 nA over-temperature maximum for the LM324 grade. [2]

## Sources

1. STMicroelectronics, *LM124, LM224, LM324, LM2902 — Low-power quad operational
   amplifiers*, DS0985 Rev 8, September 2019. Features page 1, Table 2 (Absolute
   maximum ratings), Table 3 (Operating conditions), Table 4 (Electrical
   characteristics). <https://www.st.com/resource/en/datasheet/lm124.pdf>
2. JLCPCB / LCSC catalog record for C71035, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/operational-amplifier_stmicroelectronics-lm324dt_C71035.html>
`;export{e as default};