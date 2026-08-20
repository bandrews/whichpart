var e=`---
part: C7955
mpn: LM393DR2G
manufacturer: onsemi
category: Comparators
kind: analog
package: SOIC-8
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: LM393, LM393E, LM293, LM2903, LM2903E, LM2903V, NCV2903 — Low Offset Voltage Dual Comparators
  publisher: onsemi
  document: LM393/D Rev. 34
  revised: 2025-09
  url: https://www.onsemi.com/download/data-sheet/pdf/lm393-d.pdf
summary: Two comparators with open-collector outputs — for turning an analog threshold into a clean digital signal.
---

# LM393DR2G

## What it is

A comparator answers one question: is this voltage higher than that one? The
LM393 contains two of them, with open-collector outputs, and works from a single
supply with an input range that goes all the way to ground. [1]

It is the standard part for threshold detection — battery-low warnings,
over-temperature trips, zero-crossing detectors, converting a sine wave into a
square wave. The open-collector output means you can pull it up to whatever logic
voltage you need, so a 12 V-powered comparator can drive a 3.3 V input
directly. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Two independent precision voltage comparators with open-collector outputs [1] | Open collector needs an external pull-up resistor — that is a feature, not an omission. |
| Supply voltage | 2.0 V to 36 V single supply, or ±1.0 V to ±18 V split [1] | Even wider than the LM358's, and it works from 2 V. |
| Input offset voltage | ±1.0 mV typical, ±5.0 mV maximum at 25 °C for the LM393; ±9.0 mV maximum over the full temperature range [1] | Tight enough that you rarely need to trim a threshold. |
| Gain bandwidth | Not applicable; response time is 1.3 µs typical with a 100 mV step and 5 mV of overdrive, and large-signal response time is 300 ns typical with a TTL-level input step [1] | Both figures are typicals — onsemi guarantees no minimum or maximum for either. The 1.3 µs assumes just 5 mV of overdrive; larger overdrive gives faster response. |
| Output swing | Open collector. Output sink current 6.0 mA minimum, 16 mA typical; saturation voltage 150 mV typical, 400 mV maximum at 4 mA sink. Input common-mode range runs from ground to V<sub>CC</sub> − 1.5 V at 25 °C, tightening to V<sub>CC</sub> − 2.0 V over temperature [1] | The low side is a saturated transistor; the high side is whatever your pull-up resistor is tied to. The inputs reach ground but not the top rail, so a threshold set near V<sub>CC</sub> is outside the specified range. |
| Supply current | 0.4 mA typical for both comparators, no load; 1.0 mA maximum at 5 V and 2.5 mA maximum at 30 V [1] | Very low. onsemi's feature list calls the drain "independent of supply voltage", and the typical is — but the guaranteed maximum still rises with the rail. |
| Operating temperature | 0 °C to +70 °C for the LM393, which is this part. (The LM2903 covers a wider range; the NCV2903 is automotive) [1] | **Commercial grade.** Check the datasheet column. |

## What the datasheet actually says

**The famous 25 nA input bias current is a headline figure, not a guarantee.**
It comes from onsemi's feature list; the electrical characteristics table gives
20 nA typical but 250 nA maximum at 25 °C, rising to 400 nA maximum over the
temperature range. Size a threshold divider against the maximum, not the
typical: 400 nA through a 100 kΩ Thévenin resistance shifts the threshold by
40 mV, which swamps the ±5 mV offset. onsemi also notes the inputs are PNP, so
the current flows *out* of the pins, which fixes the direction of the shift.
Input offset current is 5.0 nA typical, ±50 nA maximum. [1]

**Differential input voltage may equal the supply voltage.** You can compare a
signal near V<sub>CC</sub> against one near ground without damage, provided both
inputs stay at or above ground. [1]

**Response time is specified at 5 mV of overdrive**, which is a deliberately hard
condition. onsemi says outright that "with larger magnitudes of overdrive faster
response times are obtainable". If your signal crosses the threshold sharply, you
will do better than 1.3 µs. [1]

**Add hysteresis yourself.** There is none built in. A comparator without
hysteresis will chatter when the input dwells near the threshold — a resistor
from output to non-inverting input is the standard fix, and it is your job, not
the chip's.

## Watch out for

- **Open collector: you must fit a pull-up resistor.** Without one, the output
  never goes high.
- **No internal hysteresis.** Expect chatter on slow signals unless you add
  positive feedback.
- **0 °C to +70 °C.** The LM2903 is the wider-temperature part.
- **Don't use an op-amp as a comparator** and don't use this as an op-amp — the
  LM393 has no frequency compensation and will oscillate in a linear circuit.

## In this catalog

Basic part in SOIC-8, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 272,573 in stock, $0.066 at quantity 1, falling to $0.032 at 10,000.
The catalog attributes record 5 mV offset, 25 nA bias current, 5 nA offset
current, 400 µA quiescent current, 1.3 µs response time, 300 ns propagation
delay, 2 V–36 V single supply, ±18 V dual and 0 °C to +70 °C. All of these track
the datasheet, but three are typical or feature-page values rather than
guaranteed limits — the 25 nA bias current (250 nA maximum), the 400 µA supply
current (1.0 mA maximum), and the 300 ns propagation delay (a typical with no
maximum specified). [1] [2]

## Sources

1. onsemi, *LM393, LM393E, LM293, LM2903, LM2903E, LM2903V, NCV2903 — Low Offset
   Voltage Dual Comparators*, LM393/D Rev. 34, September 2025. Description and
   Features page 1, Electrical Characteristics and its notes.
   <https://www.onsemi.com/download/data-sheet/pdf/lm393-d.pdf>
2. JLCPCB / LCSC catalog record for C7955, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/comparators_onsemi-lm393dr2g_C7955.html>
`;export{e as default};