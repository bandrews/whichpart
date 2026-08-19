var e=`---
part: C75501
mpn: 78L12G-AB3-R
manufacturer: UTC(Unisonic Tech)
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: SOT-89
tier: preferred
catalog_snapshot: 2026-07-24
summary: The 12 V member of the 78L family — noisier than the 5 V version, and out of stock at the snapshot date.
---

# 78L12G-AB3-R

> **Note on sources.** UTC's datasheet for this part is served through LCSC,
> which blocks automated retrieval. Every figure below comes from the JLCPCB/LCSC
> catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

The 12 V version of the 78L family: a three-terminal fixed regulator rated for
100 mA, in a SOT-89. Everything in the 78L05 note applies — same architecture,
same robustness, same inefficiency — with the output at 12 V instead of 5 V. [1]

It is used where an analogue circuit, an op-amp on a split supply, or a relay
coil needs a clean 12 V from a higher, unregulated source. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 12 V [1] | No adjustment. |
| Output current | 100 mA [1] | Same as the 78L05. |
| Input voltage range | Up to 27 V [1] | Lower than the 78L05's 30 V, reflecting the higher output. |
| Dropout voltage | 1.7 V [1] | You need at least 13.7 V in. |
| Quiescent current | 2 mA [1] | As with the 78L05, continuous and significant. |
| Output accuracy | Power supply rejection 65 dB at 120 Hz; output noise 80 µV [1] | Both worse than the 78L05's 80 dB and 40 µV — the higher output voltage costs you noise performance. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**Rejection and noise are both worse than the 5 V part.** 65 dB against 80 dB,
and 80 µV against 40 µV. Roughly speaking, the internal reference is amplified
more to reach 12 V, and its noise is amplified with it. If this rail feeds
something noise-sensitive, filter it.

**Heat again.** From 24 V to 12 V at 100 mA is 1.2 W — far too much for a SOT-89.
The usable current falls steeply as the input-output difference grows.

**27 V maximum input** rather than the 78L05's 30 V.

## Watch out for

- **Stock was zero at the snapshot date.** Check availability before designing
  it in; see \`ISSUES.md\`.
- **1.7 V dropout, 2 mA quiescent** — the standard 78xx limitations.
- **Noise is twice the 78L05's.** Filter downstream if it matters.
- **Package dissipation is the real limit.**

## In this catalog

Preferred Extended part in SOT-89. At the 2026-07-24 snapshot: **0 in stock**,
with prices listed from $0.104 at quantity 1 down to $0.054 at 4,000. It is one
of 27 parts in the qualifying snapshot showing zero stock; most of the others are
individual resistor and capacitor values, but all three of the catalog's large
memory devices are in that list too. See \`ISSUES.md\`. [1]

## Sources

1. JLCPCB / LCSC catalog record for C75501, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/voltage-regulators-linear-low-drop-out-ldo-regulators_utc-unisonic-tech-78l12g-ab3-r_C75501.html>
`;export{e as default};