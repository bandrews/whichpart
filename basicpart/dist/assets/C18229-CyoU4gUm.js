var e=`---
part: C18229
mpn: LM2904DR2G
manufacturer: onsemi
category: Operational Amplifier
kind: analog
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: LM258, LM358, LM358A, LM358E, LM2904, LM2904A, LM2904E, LM2904V, NCV2904 — Single Supply Dual Operational Amplifiers
  publisher: onsemi
  document: LM358/D Rev. 36
  revised: 2024-09
  url: https://www.onsemi.com/pdf/datasheet/lm358-d.pdf
summary: The industrial-temperature LM358 — same silicon, −40 °C to +105 °C, for a fraction of a cent more.
---

# LM2904DR2G

## What it is

The LM2904 is the LM358 specified over a wider temperature range. Same datasheet,
same package, same architecture: two general-purpose single-supply op-amps with
an input range that extends to the negative rail. The difference is the screening
— −40 °C to +105 °C instead of 0 °C to +70 °C. [1]

At $0.067 against the LM358's $0.057 in ones, the industrial version costs about
a cent more. For anything that will leave a heated room, that is a cheap
upgrade. [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Two independent operational amplifiers, internally compensated, with short-circuit protected outputs and ESD clamps on the inputs [1] | Identical to the LM358. |
| Supply voltage | 3.0 V to 32 V single supply, or ±1.0 V to ±16 V split (absolute maximum ±16 V or 32 V) [1] | Wide single-supply range. |
| Input offset voltage | 2.0 mV typical and 7.0 mV maximum at 25 °C, over V<sub>CC</sub> = 5 V to 30 V, widening to 10 mV maximum at either end of the temperature range. Drift 7.0 µV/°C typical [1] | The catalog quotes the 2 mV typical figure where it quotes 7 mV maximum for the LM358 — the same silicon, differently reported. |
| Gain bandwidth | Not specified. onsemi's datasheet gives no gain-bandwidth product or slew rate for this part. What it does specify is large-signal open-loop voltage gain: 25 V/mV minimum, 100 V/mV typical into 2 kΩ at 15 V [1] | Slow, like the LM358 — but neither the datasheet nor the catalog puts a number on it. If bandwidth matters, choose a part that specifies it. |
| Output swing | Output voltage range includes the negative supply; output current 40 mA per the catalog record [1] [2] | Reaches ground, not the positive rail. |
| Supply current | 0.7 mA typical, 1.2 mA maximum at V<sub>CC</sub> = 5 V; 1.5 mA typical at 30 V [1] | Low power. |
| Operating temperature | −40 °C to +105 °C [1] | **The reason to choose this part over the LM358.** |

## What the datasheet actually says

Everything in the LM358 note applies here — the two parts share a document. The
substantive differences are in the temperature-graded columns of the
specification tables:

**The LM2904 is specified from −40 °C to +105 °C**, against 0 °C to +70 °C for the
LM358 and −40 °C to +125 °C for the automotive NCV2904. The \`V\` and \`E\` suffix
variants differ again. Read the column heading, not just the row. [1]

**The NCV prefix denotes automotive qualification** — AEC-Q100 qualified and PPAP
capable — which is a different part number and a different price. [1]

## Watch out for

- **Same limitations as the LM358.** Output does not reach the positive rail;
  crossover distortion near zero output; not a precision or audio part.
- **Check which column you are reading.** Nine part numbers share this datasheet.
- **The industrial grade is not automotive grade.** For AEC-Q100 you need the
  NCV2904.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 536,059 in stock,
$0.067 at quantity 1, falling to $0.033 at 10,000. The catalog attributes record
2 mV offset, 45 nA bias current, 50 nA offset current, 7 µV/°C drift, 70 dB CMRR,
1.5 mA quiescent current, 40 mA output current, 3 V–32 V single supply, ±16 V
dual and −40 °C to +105 °C, all consistent with the datasheet. [2]

## Sources

1. onsemi, *LM258, LM358, LM358A, LM358E, LM2904, LM2904A, LM2904E, LM2904V,
   NCV2904 — Single Supply Dual Operational Amplifiers*, LM358/D Rev. 36,
   September 2024. Description and Features page 1, Maximum Ratings, Electrical
   Characteristics. <https://www.onsemi.com/pdf/datasheet/lm358-d.pdf>
2. JLCPCB / LCSC catalog record for C18229, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/operational-amplifier_onsemi-lm2904dr2g_C18229.html>
`;export{e as default};