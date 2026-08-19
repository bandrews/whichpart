var e=`---
part: C7426
mpn: NE5532DR
manufacturer: Texas Instruments
category: Operational Amplifier
kind: analog
package: SOIC-8
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: NE5532, NE5532A, SA5532, SA5532A — Dual Low-Noise Operational Amplifiers
  publisher: Texas Instruments
  document: SLOS075K
  revised: 2025-12
  url: https://www.ti.com/lit/ds/symlink/ne5532.pdf
summary: The audio designer's default dual op-amp — 5 nV/√Hz of noise and enough output current to drive headphones.
---

# NE5532DR

## What it is

The NE5532 is the op-amp that audio circuits have defaulted to for forty years.
Two amplifiers in an 8-pin package, with two properties that matter for audio:
very low input noise (5 nV/√Hz at 1 kHz) and an output stage that can drive
600 Ω loads without complaint. [1]

It is a bipolar part on split supplies, so it is not the choice for a
single-3.3 V design. Where it excels is line-level audio, mixing consoles,
microphone preamplifiers, and active filters — anywhere you want a quiet,
well-behaved amplifier and have ±15 V available. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Dual low-noise operational amplifier, internally compensated for unity gain, with input-protection diodes and output short-circuit protection [1] | Two channels suits stereo or a two-stage filter. No external compensation needed. |
| Supply voltage | ±5 V to ±15 V recommended; absolute maximum ±18 V [1] | A split-supply part. There is no single-supply mode in the recommended conditions. |
| Input offset voltage | 0.5 mV typical, 4 mV maximum at 25 °C (5 mV over the full range) [1] | Fine for AC-coupled audio; too loose for precision DC work. |
| Gain bandwidth | 12 MHz typical unity-gain bandwidth in the electrical characteristics table [1] | Plenty for audio with headroom for feedback. See the note below about the datasheet's inconsistency here. |
| Output swing | Common-mode input range ±12 V minimum on ±15 V supplies; output short-circuit current 38 mA typical [1] | The output-drive capability is the reason it works into 600 Ω and headphone loads. |
| Supply current | 6 mA typical, 16 mA maximum, total for both amplifiers, no load [1] | Around 3 mA per amplifier — this is a performance part, not a low-power one. |
| Operating temperature | 0 °C to +70 °C for the NE5532 [1] | **Commercial grade.** The SA5532 covers −40 °C to +85 °C in the same package. |

## What the datasheet actually says

**The datasheet contradicts itself on bandwidth and slew rate.** The electrical
characteristics table gives a 12 MHz typical unity-gain bandwidth and the
operating characteristics table gives a 5 V/µs slew rate. The prose in
Sections 6.3.1 and 6.3.3 of the same document says 10 MHz and "9V/ms". The
features list says 12 MHz and 5 V/µs. We have quoted the specification tables,
which are the normative part of a TI datasheet, and recorded the discrepancy in
\`ISSUES.md\`. [1]

**Noise is specified at two frequencies:** 8 nV/√Hz at 30 Hz and 5 nV/√Hz at
1 kHz for equivalent input noise voltage, with input noise current of 2.7 pA/√Hz
and 0.7 pA/√Hz at the same points. Low-noise op-amps are usually quoted at 1 kHz
only, so having the 30 Hz figure is genuinely useful for phono and microphone
work. [1]

**Input bias current is 200 nA typical, 800 nA maximum.** That is high — it is a
bipolar input stage — so keep source impedances low and match the impedance seen
by each input if DC accuracy matters. [1]

**Excessive current flows if the differential input exceeds about 0.6 V** unless
you add a limiting resistor. The datasheet says so explicitly. This matters in
comparator-style misuse or during fast slewing. [1]

## Watch out for

- **0 °C to +70 °C.** Order the SA5532 instead if the product will see cold.
- **Split supplies expected.** Single-supply operation is outside the
  recommended conditions.
- **200 nA input bias current** will develop an offset across any large source
  resistance — 1 MΩ turns into 200 mV of error.
- **Don't use it as a comparator.** The differential input limit and the
  input-protection diodes make that a poor idea here.

## In this catalog

Basic part in SOIC-8, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 92,651 in stock, $0.11 at quantity 1, falling to $0.064 at 5,000. The
catalog attributes record 500 µV offset, 5 nV/√Hz noise at 1 kHz, 100 dB CMRR,
16 mA quiescent current, 38 mA output current, ±15 V supply and 0 °C to +70 °C,
all matching the datasheet. Its 10 MHz gain-bandwidth and 9 V/µs slew-rate
entries match TI's descriptive text but not TI's specification tables — see
\`ISSUES.md\`. [2]

## Sources

1. Texas Instruments, *NE5532, NE5532A, SA5532, SA5532A — Dual Low-Noise
   Operational Amplifiers*, SLOS075K, November 1979, revised December 2025.
   Section 1 (Features), Section 5.1 (Absolute Maximum Ratings), Section 5.3
   (Recommended Operating Conditions), Section 5.5 (Electrical Characteristics),
   Section 5.6 (Operating Characteristics), Sections 6.3.1 and 6.3.3.
   <https://www.ti.com/lit/ds/symlink/ne5532.pdf>
2. JLCPCB / LCSC catalog record for C7426, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/operational-amplifier_texas-instruments-ne5532dr_C7426.html>
`;export{e as default};