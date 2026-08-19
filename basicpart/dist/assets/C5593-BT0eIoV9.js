var e=`---
part: C5593
mpn: 74HC08D,653
manufacturer: Nexperia
category: Logic Gates
kind: logic
package: SOIC-14
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: 74HC08; 74HCT08 — Quad 2-input AND gate
  publisher: Nexperia
  document: see datasheet cover
  url: https://assets.nexperia.com/documents/data-sheet/74HC_HCT08.pdf
summary: Four two-input AND gates — output high only when both inputs are high.
---

# 74HC08D,653

## What it is

Four independent AND gates in a 14-pin package. Each gate has two inputs and one
output, and the output goes high only when both inputs are high. [1]

AND gates turn up wherever you need to gate one signal with another: enabling a
clock only while a chip-select is asserted, combining two interlock signals, or
qualifying an interrupt. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Four two-input AND gates, with input clamp diodes [1] | Four gates in one package; each is independent. |
| Logic family | 74HC — CMOS input levels. The 74HCT08 variant has TTL-compatible levels; this order code is the HC version [1] | Threshold scales with supply on HC parts. |
| Supply voltage | 2.0 V to 6.0 V [1] | Works on 3.3 V or 5 V without adjustment. |
| Output drive | ±5.2 mA at 4.5 V per the catalog record [2]; absolute maximum ±25 mA per output and 50 mA total supply current; total power dissipation 500 mW at −40 °C to +85 °C [1] | Fine for logic and small LEDs. |
| Propagation delay | Input to output, 50 pF load: 9 ns typical and 18 ns maximum at V<sub>CC</sub> = 4.5 V and 25 °C, widening to 23 ns maximum over −40 °C to +85 °C and 27 ns over −40 °C to +125 °C, which is this order code's grade. 25 ns typical at 2 V, 7 ns typical at 6 V [1] | Essentially the same family timing as the 74HC04 — the extra gate input costs a nanosecond at most. |
| Operating temperature | Specified from −40 °C to +85 °C and from −40 °C to +125 °C; the \`D\` (SO14) order code is the −40 °C to +125 °C grade [1] | Wide industrial range. |

## What the datasheet actually says

**Input clamp diodes allow interfacing to voltages above V<sub>CC</sub>** through
a series current-limiting resistor — the standard 74HC family arrangement. [1]

**Total power dissipation is 500 mW** over −40 °C to +85 °C. With four gates each
capable of 25 mA, that is a real constraint if you use them all as drivers rather
than as logic. [1]

**Timing at 2 V is five times worse than at 4.5 V.** If your design runs from a
coin cell, budget for it. [1]

## Watch out for

- **HC is not HCT.** Check your logic levels.
- **Tie unused inputs to a rail**, not to each other and not floating.
- **It is an AND, not a NAND.** The NAND equivalent is the 74HC00, and a NAND is
  often the more useful gate because it is functionally complete.

## In this catalog

Preferred Extended part in SOIC-14. At the 2026-07-24 snapshot: 24,536 in stock,
$0.16 at quantity 1, falling to $0.076 at 5,000. The catalog attributes record
2 V–6 V supply, four two-input gates, 27 ns at 4.5 V with a 50 pF load, ±5.2 mA
output current, 2 µA quiescent current and −40 °C to +125 °C. [2]

## Sources

1. Nexperia, *74HC08; 74HCT08 — Quad 2-input AND gate*. Section 1 (General
   description), Section 2 (Features and benefits), Section 4 (Ordering
   information), Section 8 (Limiting values), Section 9 (Recommended operating
   conditions), Section 11 (Dynamic characteristics).
   <https://assets.nexperia.com/documents/data-sheet/74HC_HCT08.pdf>
2. JLCPCB / LCSC catalog record for C5593, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/logic-gates_nexperia-74hc08d-653_C5593.html>
`;export{e as default};