var e=`---
part: C71136
mpn: 78L05G-AB3-R
manufacturer: UTC(Unisonic Tech)
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: SOT-89-3
tier: basic
catalog_snapshot: 2026-07-24
summary: The small 5 V regulator — 100 mA, three terminals, and a design that has not changed since the 1970s.
---

# 78L05G-AB3-R

> **Note on sources.** UTC's datasheet for this part is served through LCSC,
> which blocks automated retrieval. Every figure below comes from the JLCPCB/LCSC
> catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

The 78L05 is the 100 mA member of the 78xx family — the three-terminal regulator
that has been the default answer to "I need 5 V" since the 1970s. Input, ground,
output; add two capacitors and you are done. [1]

It is not efficient and not low-dropout, but it is small, cheap, robust and
utterly predictable, and for a low-current 5 V rail from a 9 V or 12 V source it
is still hard to beat on total cost. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 5 V [1] | No adjustment, no divider. |
| Output current | 100 mA [1] | The \`L\` in \`78L05\` means the low-current version; the plain 7805 is 1 A. |
| Input voltage range | Up to 30 V [1] | Wide, but see the heat warning below. |
| Dropout voltage | 1.7 V at 40 mA [1] | You need at least 6.7 V in to get 5 V out. This is not a low-dropout regulator despite the catalog's category name. |
| Quiescent current | 2 mA [1] | Two thousand times the XC6206's. This is the number that rules the 78xx family out of battery designs. |
| Output accuracy | Power supply rejection 80 dB at 120 Hz; output noise 40 µV [1] | 80 dB of rejection is genuinely good — one reason linear regulators persist for analogue supplies. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**Heat is the constraint, not the current rating.** From 30 V down to 5 V at
100 mA, the regulator dissipates 2.5 W — impossible in a SOT-89. From 12 V at
50 mA it is 350 mW, which is more realistic. Compute
(V<sub>in</sub> − 5 V) × I<sub>out</sub> and check it against the package.

**2 mA of quiescent current is drawn continuously**, whatever the load. On a
battery product that alone is 17 mAh a day.

**80 dB PSRR and 40 µV of noise** are why you still see 78xx regulators feeding
analogue circuits downstream of a switching supply — the switcher does the heavy
lifting efficiently, and the linear regulator cleans up the result.

**Protection is comprehensive**: over-current, short-circuit and thermal
shutdown are all listed. Like the rest of the family, it is very hard to
destroy. [1]

## Watch out for

- **1.7 V dropout.** Not for battery-to-5 V conversion.
- **2 mA idle current.** Not for anything that sleeps.
- **Package dissipation governs everything.** SOT-89 is small.
- **Use a switching converter for big input-output differences.** The XL1509-5.0
  (C61063) in this catalog does the same job from 40 V at 2 A without the heat.

## In this catalog

Basic part in SOT-89-3, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 199,523 in stock, $0.099 at quantity 1, falling to $0.051 at 4,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C71136, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/voltage-regulators-linear-low-drop-out-ldo-regulators_utc-unisonic-tech-78l05g-ab3-r_C71136.html>
`;export{e as default};