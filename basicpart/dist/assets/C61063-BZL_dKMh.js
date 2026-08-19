var e=`---
part: C61063
mpn: XL1509-5.0E1
manufacturer: XLSEMI
category: DC-DC Converters
kind: power-switching
package: SOIC-8
tier: basic
catalog_snapshot: 2026-07-24
summary: A fixed 5 V, 2 A buck converter in a plain SOIC-8 — the cheap way off a 12 V or 24 V rail.
---

# XL1509-5.0E1

> **Note on sources.** XLSEMI's datasheet for this part is served through pages
> that did not respond to automated fetching. Every figure below comes from the
> JLCPCB/LCSC catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A step-down switching regulator with the switch built in, delivering a fixed 5 V
at up to 2 A from anything between 4.5 V and 40 V. It is functionally the same
kind of part as TI's LM2596, in a smaller and much cheaper package. [1]

Its natural use is getting 5 V from a 12 V or 24 V supply without the heat a
linear regulator would produce. A 78L05 dropping 24 V to 5 V at 100 mA wastes
1.9 W; this converter wastes a fraction of that at twenty times the current. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 5 V [1] | No feedback divider to size or get wrong. |
| Output current | 2 A [1] | Twice what a typical linear regulator in this package could dream of. |
| Input voltage range | 4.5 V to 40 V [1] | Wide. Covers 12 V and 24 V industrial rails, and survives an automotive 12 V system's normal range. |
| Switching frequency | 150 kHz [1] | The same as the LM2596, and the same consequence: a physically large inductor. |
| Efficiency | Not recorded in the catalog; quiescent current 2 mA [1] | Far better than linear regulation across the useful range, but this is a non-synchronous design with an external diode. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**It is non-synchronous**, so you must supply an external catch diode — a
Schottky such as the SS14 (C7420316) in this catalog. Its forward drop is where a
noticeable share of the losses go.

**150 kHz means a big inductor.** At this frequency you need tens of microhenries
rated for well over 2 A. Compared with the 500 kHz TPS5430 or the 570 kHz
TPS54331, the magnetics are substantially larger — that is the trade for the
lower price.

**2 mA quiescent current** is fine for a mains- or vehicle-powered device and
poor for a battery one.

**SOIC-8 without an exposed pad** means the thermal path is through the pins.
Check the dissipation at your operating point before assuming 2 A.

## Watch out for

- **Add the catch diode.** Omitting it, or using a slow silicon diode, ruins
  efficiency or destroys the part.
- **The inductor is a real design choice**, not an afterthought: value, saturation
  current and resistance all matter.
- **Layout matters.** Keep the input capacitor, the switch node and the diode in
  the smallest loop you can, and route feedback away from the switch node.
- **4.5 V minimum input.** It cannot make 5 V from 5 V.

## In this catalog

Basic part in SOIC-8, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 238,840 in stock, $0.23 at quantity 1, falling to $0.111 at 4,000 —
about a sixth the price of the LM2596 for the same job at two thirds the
current. [1]

## Sources

1. JLCPCB / LCSC catalog record for C61063, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/dc-dc-converters_xlsemi-xl1509-5-0e1_C61063.html>
`;export{e as default};