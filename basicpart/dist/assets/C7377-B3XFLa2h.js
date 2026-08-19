var e=`---
part: C7377
mpn: MCP6002T-I/SN
manufacturer: Microchip Tech
category: Operational Amplifier
kind: analog
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: MCP6001/1R/1U/2/4 — 1 MHz, Low-Power Op Amp
  publisher: Microchip Technology
  document: DS20001733L
  revised: 2020
  url: https://ww1.microchip.com/downloads/en/DeviceDoc/MCP6001-1R-1U-2-4-1-MHz-Low-Power-Op-Amp-DS20001733L.pdf
summary: Two rail-to-rail op-amps that run from 1.8 V and draw 100 µA — the modern replacement for an LM358.
---

# MCP6002T-I/SN

## What it is

The MCP6002 is what you use instead of an LM358 in a modern low-voltage design.
Two op-amps in an 8-pin package, running from a single supply as low as 1.8 V,
drawing 100 µA, and — the important part — rail-to-rail on both input *and*
output. [1]

That last property is what makes it easy to design with. An LM358's input stops
1.5 V short of the positive rail and its output does not reach it either; the
MCP6002 works across the whole supply range, so you can bias a signal at mid-rail
and use all of it. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Dual general-purpose operational amplifier with rail-to-rail input and output [1] | The dual version of a family that also comes as a single (MCP6001) and a quad (MCP6004). |
| Supply voltage | 1.8 V to 6.0 V single supply [1] | Runs from two alkaline cells, a lithium cell, 3.3 V or 5 V. |
| Input offset voltage | ±4.5 mV maximum per the catalog record; input offset drift 2 µV/°C [1] [2] | Similar to an LM358's — this is a general-purpose part, not a precision one. The drift figure is good. |
| Gain bandwidth | 1 MHz typical, with 90° phase margin (45° with a 500 pF capacitive load) [1] | The phase-margin figures matter: this part is unusually tolerant of capacitive loads, which is a common cause of oscillation. |
| Output swing | Rail to rail; output current 23 mA per the catalog record [1] [2] | "Rail-to-rail" always leaves a small residual, but it is millivolts rather than the LM358's 1.5 V. |
| Supply current | 100 µA typical per amplifier [1] | An eighth of the LM358's per-amplifier draw. |
| Operating temperature | −40 °C to +85 °C for this order code. The datasheet's Product Identification System defines \`I\` = −40 °C to +85 °C and \`E\` = −40 °C to +125 °C, and this part is the \`-I\` grade [1] | The catalog records −40 °C to +125 °C — the *extended*-grade figure, wrong for this order code. See \`ISSUES.md\`. |

## What the datasheet actually says

**Input bias current is 1 pA.** This is a CMOS-input part, so it draws
essentially nothing from the source. That makes it suitable for photodiode
amplifiers and high-impedance sensors where an LM358's 45 nA would be a
problem. Microchip lists "photodiode amplifier" among the applications. [1] [2]

**90° phase margin is unusually good**, and it holds 45° with a 500 pF load.
Op-amps commonly oscillate when driving a cable or a long trace; this one is much
more forgiving. [1]

**Rail-to-rail input has a caveat that applies to every such part**: the input
stage switches between two internal transistor pairs as the common-mode voltage
crosses the middle of the supply, and offset voltage shifts a little at the
crossover. For a general-purpose part this rarely matters; for precision it does.

**The \`T\` in the order code means tape and reel**, and \`/SN\` is the SOIC-8
package. Same silicon as the non-\`T\` part. [1]

## Watch out for

- **6 V absolute supply ceiling.** Not a 12 V or ±15 V part.
- **1 MHz bandwidth.** Fine for sensors and filters; not for audio power stages
  or fast signals.
- **The catalog's −40 °C to +125 °C temperature range is wrong for this order
  code.** The datasheet's own ordering table defines \`-I\` as −40 °C to +85 °C;
  −40 °C to +125 °C is the \`-E\` grade. Confirmed against DS20001733L's Product
  Identification System. See \`ISSUES.md\`.
- **CMOS inputs need ESD care** during handling and in circuits exposed to the
  outside world.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 65,405 in stock,
$0.30 at quantity 1, falling to $0.16 at 6,600 — about five times the LM358's
price, for a much better-behaved part. The catalog attributes record 4.5 mV
offset, 1 pA bias current, 2 µV/°C drift, 1 MHz gain bandwidth, 28 nV/√Hz noise,
76 dB CMRR, 100 µA quiescent current, 23 mA output current, 1.8 V–6 V supply and
rail-to-rail input and output, all consistent with the datasheet. Its "Slew Rate:
600V/ms" entry is 0.6 V/µs expressed in different units. [2]

## Sources

1. Microchip Technology, *MCP6001/1R/1U/2/4 — 1 MHz, Low-Power Op Amp*,
   DS20001733L, 2020. Features, Applications and Description page 1.
   <https://ww1.microchip.com/downloads/en/DeviceDoc/MCP6001-1R-1U-2-4-1-MHz-Low-Power-Op-Amp-DS20001733L.pdf>
2. JLCPCB / LCSC catalog record for C7377, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/operational-amplifier_microchip-tech-mcp6002t-i-sn_C7377.html>
`;export{e as default};