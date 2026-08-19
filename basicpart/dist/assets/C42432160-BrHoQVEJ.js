var e=`---
part: C42432160
mpn: IS281B-N-AXW
manufacturer: ISOMICRON
category: Transistor, Photovoltaic Output Optoisolators
kind: isolation
package: SSOP-4
tier: preferred
catalog_snapshot: 2026-07-24
summary: A tighter-tolerance optocoupler — 130–260 % current transfer ratio instead of the usual 12:1 spread.
---

# IS281B-N-AXW

> **Note on sources.** ISOMICRON's datasheet for this part is served through
> LCSC, which blocks automated retrieval. Every figure below comes from the
> JLCPCB/LCSC catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

Another single-channel LED-and-phototransistor optocoupler, in the small SSOP-4
package. What distinguishes it from the Lite-On parts is its current transfer
ratio: 130 % to 260 %, a 2:1 spread rather than the LTV-817's 12:1. The \`B\`
suffix is the CTR bin. [1]

That matters whenever the circuit's behaviour depends on how much output current
you get for a given input — which is most circuits that are not simply
saturating the output transistor. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel optocoupler, LED input, phototransistor output [1] | One signal, one direction. |
| Isolation rating | 3.75 kV RMS [1] | Standard for a four-pin optocoupler. |
| Channel count and direction | 1 channel, input to output only [1] | — |
| Maximum data rate | Not specified as a data rate; rise time 3 µs, fall time 4 µs [1] | Microsecond switching — a control-signal part, not a data-link part. |
| Supply voltage | LED forward voltage 1.4 V, forward current up to 60 mA; output load voltage up to 80 V, output current up to 50 mA [1] | 80 V of load voltage is the highest of the four optocouplers in this catalog. |
| Operating temperature | −40 °C to +110 °C [1] | — |

## What the specification implies

**A 130–260 % CTR bin is the reason to pay for this part.** With the LTV-817's
50–600 % range you must size the LED current for the worst case, which means most
units run the output far harder than necessary — wasting LED current and
accelerating ageing. A 2:1 bin lets you design much closer to the actual
operating point.

**80 V load voltage** suits switching higher-voltage rails directly, where the
LTV-817's 35 V would not reach.

**Saturation voltage is 100 mV at 1 mA output and 10 mA input**, which is a
low-drop output for an optocoupler. [1]

**CTR still degrades with age.** Binning improves your starting point; it does
not stop the LED dimming over years of operation.

## Watch out for

- **Stock was 4 units at the snapshot date.** That is effectively unavailable —
  check before designing it in. See \`ISSUES.md\`.
- **The CTR bin is part of the part number.** An \`IS281\` without the \`B\` may be a
  different bin entirely.
- **Microsecond switching**, as with all phototransistor optocouplers.
- **Maintain creepage and clearance under the package.**

## In this catalog

Preferred Extended part in SSOP-4. At the 2026-07-24 snapshot: **4 in stock**,
$0.042 at quantity 1, falling to $0.040 at 1,000. The price is barely half the
LTV-817's, but with four units on the shelf that is academic. [1]

## Sources

1. JLCPCB / LCSC catalog record for C42432160, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/transistor-photovoltaic-output-optoisolators_isomicron-is281b-n-axw_C42432160.html>
`;export{e as default};