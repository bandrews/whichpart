var e=`---
part: C5590
mpn: 74HC04D,653
manufacturer: Nexperia
category: Inverters
kind: logic
package: SOIC-14
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: 74HC04; 74HCT04 — Hex inverter
  publisher: Nexperia
  document: see datasheet cover
  url: https://assets.nexperia.com/documents/data-sheet/74HC_HCT04.pdf
summary: Six plain inverters — the most basic logic chip there is, and still the cheapest way to flip a signal.
---

# 74HC04D,653

## What it is

Six inverters in a 14-pin package. Each one takes a digital input and outputs its
opposite. There is nothing more to it, and that simplicity is why the 74x04 has
been a stock item since the 1960s. [1]

It is what you use to invert a chip-select, to buffer a signal that has to drive
several inputs, or as a general-purpose gate when you need one more logic
function and do not want to add a microcontroller pin. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Six inverting buffers, with input clamp diodes [1] | No latching, no enable — just six independent gates. |
| Logic family | 74HC — CMOS input levels. The 74HCT04 variant has TTL-compatible levels; this order code is the HC version [1] | With HC, the input threshold scales with V<sub>CC</sub>; 3.3 V logic into a 5 V-powered HC part is marginal. |
| Supply voltage | 2.0 V to 6.0 V [1] | Works directly on 3.3 V or 5 V. |
| Output drive | ±5.2 mA at 4.5 V per the catalog record [2]; absolute maximum ±25 mA per output and 50 mA total supply current [1] | Comfortable for driving logic inputs and small indicator LEDs. |
| Propagation delay | Input to output, 50 pF load: 9 ns typical and 17 ns maximum at V<sub>CC</sub> = 4.5 V and 25 °C, widening to 21 ns maximum over −40 °C to +85 °C and 26 ns over −40 °C to +125 °C, which is this order code's grade. 25 ns typical at 2 V, 7 ns typical at 6 V [1] | Fast enough that it rarely matters in hobby-scale designs; the 2 V figure — nearly three times slower — is the one to watch. |
| Operating temperature | Specified from −40 °C to +85 °C and from −40 °C to +125 °C; the \`D\` (SO14) order code is the −40 °C to +125 °C grade [1] | Wide industrial range. |

## What the datasheet actually says

**Input clamp diodes allow over-voltage interfacing** through a series
current-limiting resistor — the same documented technique as on the 74HC14. [1]

**There is no Schmitt trigger here.** Unlike the 74HC14, this part has a single
switching threshold. Feed it a slowly changing signal and the output will
oscillate as the input crosses the threshold. That is the reason to spend a few
extra cents on a 74HC14 when the input is not already a clean digital edge.

**Delay scales strongly with supply.** 7 ns typical at 6 V, 9 ns at 4.5 V and
25 ns at 2 V — so a 2 V design is roughly three times slower than a 5 V one.
Worth remembering that these are typical figures at 25 °C; the guaranteed
maximum at 4.5 V is 17 ns, and 21 ns once you allow for −40 °C to +85 °C. [1]

## Watch out for

- **HC is not HCT.** Check your input logic levels against the supply.
- **No hysteresis.** Slow or noisy edges need the 74HC14, not this part.
- **Tie unused inputs to a rail.** Floating CMOS inputs oscillate and draw
  current.
- **Six inverters, one package.** If you only need one, a single-gate part in
  SOT-23-5 saves a lot of board space.

## In this catalog

Preferred Extended part in SOIC-14. At the 2026-07-24 snapshot: 44,539 in stock,
$0.15 at quantity 1, falling to $0.078 at 5,000 — slightly more expensive than
the Basic-tier 74HC14 next to it. The catalog attributes record 2 V–6 V supply,
14 ns at 6 V with a 50 pF load, ±5.2 mA output current, 2 µA quiescent current,
six circuits and −40 °C to +125 °C. [2]

## Sources

1. Nexperia, *74HC04; 74HCT04 — Hex inverter*. Section 1 (General description),
   Section 2 (Features and benefits), Section 4 (Ordering information),
   Section 8 (Limiting values), Section 9 (Recommended operating conditions),
   Section 11 (Dynamic characteristics).
   <https://assets.nexperia.com/documents/data-sheet/74HC_HCT04.pdf>
2. JLCPCB / LCSC catalog record for C5590, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/inverters_nexperia-74hc04d-653_C5590.html>
`;export{e as default};