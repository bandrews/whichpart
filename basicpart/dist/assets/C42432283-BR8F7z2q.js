var e=`---
part: C42432283
mpn: ICPL-356-50CEAXW
manufacturer: ISOMICRON
category: Transistor, Photovoltaic Output Optoisolators
kind: isolation
package: SOP-4
tier: preferred
catalog_snapshot: 2026-07-24
summary: A 200–400 % binned optocoupler in SOP-4 — the practical choice of the four here, with real stock behind it.
---

# ICPL-356-50CEAXW

> **Note on sources.** ISOMICRON's datasheet for this part is served through
> LCSC, which blocks automated retrieval. Every figure below comes from the
> JLCPCB/LCSC catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A single-channel phototransistor optocoupler in SOP-4, binned for a current
transfer ratio of 200 % to 400 %. Like the IS281B it trades the wide CTR spread
of a generic 817-type part for a predictable 2:1 range, and it does so at a
higher nominal gain — 200 % minimum rather than 130 %. [1]

Of the four optocouplers in this catalog it is the one with both a tight CTR bin
and real stock, which makes it the sensible default for a new design. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel optocoupler, LED input, phototransistor output [1] | One signal, one direction. |
| Isolation rating | 3.75 kV RMS [1] | Standard for the package. |
| Channel count and direction | 1 channel, input to output only [1] | — |
| Maximum data rate | Not specified as a data rate; rise time 3 µs at 2 mA into 100 Ω, fall time 4 µs [1] | Microsecond switching. |
| Supply voltage | LED forward voltage 1.24 V, forward current up to 60 mA; output load voltage up to 80 V, output current up to 50 mA; total dissipation 200 mW [1] | 80 V load voltage, as with the IS281B. |
| Operating temperature | −40 °C to +110 °C [1] | — |

## What the specification implies

**200 % minimum CTR means less LED current for the same output.** To get 2 mA of
collector current you need only 1 mA into the LED, against 4 mA for a 50 %-CTR
part. Less LED current means less power *and* slower ageing, because LED
degradation is driven by drive current.

**A 200–400 % bin still doubles across the range.** Design for the 200 % end;
verify nothing misbehaves at 400 %.

**Saturation voltage is 200 mV at 10 mA output and 1 mA input** — a slightly
higher drop than the IS281B, measured at ten times the output current. [1]

**200 mW total dissipation** covers LED and transistor together. [1]

## Watch out for

- **Design for 200 % CTR, then allow for ageing.**
- **Microsecond switching** — not a data-link part. For that, use a digital
  isolator such as the ADuM1201 (C9669).
- **Maintain creepage and clearance under the package**, or the board defeats the
  3.75 kV rating.
- **The bin code is part of the order code.** Substituting a differently-binned
  part changes the circuit's behaviour.

## In this catalog

Preferred Extended part in SOP-4. At the 2026-07-24 snapshot: 12,000 in stock,
$0.066 at quantity 1, falling to $0.036 at 9,000 — cheaper in volume than either
Lite-On part, with a much tighter CTR specification. [1]

## Sources

1. JLCPCB / LCSC catalog record for C42432283, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/transistor-photovoltaic-output-optoisolators_isomicron-icpl-356-50ceaxw_C42432283.html>
`;export{e as default};