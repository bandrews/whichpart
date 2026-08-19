var e=`---
part: C7484
mpn: SN74AHCT1G125DBVR
manufacturer: Texas Instruments
category: Buffers, Drivers, Receivers, Transceivers
kind: logic
package: SOT-23-5
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: SN74AHCT1G125 — Single Bus Buffer Gate With 3-State Output
  publisher: Texas Instruments
  document: SCLS378P
  revised: 2024-03
  url: https://www.ti.com/lit/ds/symlink/sn74ahct1g125.pdf
summary: One buffer in a five-pin package — the standard trick for driving a WS2812 strip from 3.3 V logic.
---

# SN74AHCT1G125DBVR

## What it is

This is a single non-inverting buffer with a three-state output, in a SOT-23-5
package barely larger than a transistor. It passes a signal through unchanged,
and an output-enable pin can disconnect the output entirely. [1]

Its most common use in hobby and small-product designs is not really buffering at
all — it is level shifting. Because it runs from 5 V but has TTL-compatible
inputs, a 3.3 V logic high is comfortably above its input threshold, so it
converts a 3.3 V signal into a clean 5 V one. That is the standard recommended
way to drive a WS2812 LED strip from a 3.3 V microcontroller. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single non-inverting buffer with three-state output [1] | One gate per package, so you place it exactly where the signal needs help. |
| Logic family | AHCT — advanced high-speed CMOS with TTL-compatible input thresholds [1] | The \`T\` is what makes 3.3 V-to-5 V translation work: high-level input threshold is 2 V, not 0.7 × V<sub>CC</sub>. |
| Supply voltage | 4.5 V to 5.5 V; input voltage may go to 5.5 V regardless of V<sub>CC</sub> [1] | A 5 V-only part. There is no low-voltage mode. |
| Output drive | ±8 mA at 5 V [1] | Enough for a clean edge into a metre or two of ribbon cable, or an LED strip's data input. |
| Propagation delay | 5.5 ns typical, 6.5 ns maximum over −40 °C to +85 °C, with a 15 pF load; 7.5 ns typical at 50 pF [1] | Fast. The delay is negligible for LED protocols and most GPIO signalling. |
| Operating temperature | −40 °C to +125 °C [1] | Wider than most parts in this catalog. |

## What the datasheet actually says

**Supply current is 10 µA maximum** with inputs at V<sub>CC</sub> or ground. But
there is a second, larger figure: driving an input to a TTL level such as 3.4 V
rather than a full rail adds up to 1.5 mA. That is exactly the condition you are
in when using it as a 3.3 V-to-5 V translator, so budget milliamps, not
microamps. [1]

**The input tolerates 5.5 V independently of V<sub>CC</sub>**, which is why the
part is safe on a bus that may be driven when it is not powered. [1]

**Latch-up performance exceeds 250 mA per JESD 17.** Relevant when the output
drives something with its own supply that can back-feed. [1]

**There is a third specification column for −40 °C to +125 °C**, with slightly
relaxed timing (7 ns rather than 6.5 ns at 15 pF). Use the column that matches
your temperature range. [1]

## Watch out for

- **This is an ordinary Extended part at JLCPCB.** Check the assembly surcharge
  and feeder availability before committing.
- **It shifts up, not down.** A 5 V input into a 3.3 V system needs a different
  part — this one's supply must be 5 V.
- **Supply current jumps under TTL-level inputs.** 1.5 mA per input, not 10 µA,
  in the level-shifting use case.
- **One gate only.** If you need four, the SN74AHCT125 quad version is a better
  buy than four singles.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in SOT-23-5.
Because it is Extended rather than Basic or Preferred, it does not appear in the
qualifying catalog snapshot, so no price or stock figures are recorded here. [2]

## Sources

1. Texas Instruments, *SN74AHCT1G125 — Single Bus Buffer Gate With 3-State
   Output*, SCLS378P, August 1997, revised March 2024. Section 1 (Features),
   Section 5.3 (Recommended Operating Conditions), Section 5.5 (Electrical
   Characteristics), Section 5.6 (Switching Characteristics).
   <https://www.ti.com/lit/ds/symlink/sn74ahct1g125.pdf>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};