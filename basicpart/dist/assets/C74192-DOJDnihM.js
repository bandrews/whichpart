var e=`---
part: C74192
mpn: XL1509-ADJE1
manufacturer: XLSEMI
category: DC-DC Converters
kind: power-switching
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
summary: The adjustable version of the XL1509 — same 2 A buck converter, but you pick the output voltage.
---

# XL1509-ADJE1

> **Note on sources.** XLSEMI's datasheet for this part is served through pages
> that did not respond to automated fetching. Every figure below comes from the
> JLCPCB/LCSC catalog record and is cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

The adjustable member of the XL1509 family: the same 2 A step-down switching
regulator as the fixed 5 V version, but with the feedback pin brought out so two
resistors set the output anywhere from 1.23 V to 37 V. [1]

Choose it over the fixed version when you need a voltage the family does not
offer — 3.3 V, 9 V, or a rail you are matching to something else — or when you
want one part number to cover several designs. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable, 1.23 V to 37 V [1] | Two resistors set it; 1.23 V is the internal reference. |
| Output current | 2 A [1] | Twice what a typical linear regulator in this package could dream of. |
| Input voltage range | 4.5 V to 40 V [1] | Wide. Covers 12 V and 24 V industrial rails, and survives an automotive 12 V system's normal range. |
| Switching frequency | 127 kHz to 173 kHz [1] | The catalog gives a range rather than a single figure for this variant — design the inductor for the low end. |
| Efficiency | Not recorded in the catalog; quiescent current 2 mA [1] | Far better than linear regulation across the useful range, but this is a non-synchronous design with an external diode. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the specification implies

**It is non-synchronous**, so you must supply an external catch diode — a
Schottky such as the SS14 (C7420316) in this catalog. Its forward drop is where a
noticeable share of the losses go.

**Around 150 kHz means a big inductor.** At this frequency you need tens of
microhenries rated for well over 2 A. Compared with the 500 kHz TPS5430 or the
570 kHz TPS54331, the magnetics are substantially larger — that is the trade for
the lower price. The catalog's 127–173 kHz spread is worth designing around: size
the inductor for the *lowest* frequency, where ripple current is highest.

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
- **4.5 V minimum input**, and you still need headroom above your chosen output.
- **Get the feedback divider right.** Unlike the fixed version, a wrong resistor
  here puts the wrong voltage on your whole board.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 129,419 in stock,
$0.27 at quantity 1, falling to $0.124 at 4,000 — about four cents more than the
fixed 5 V version, for the flexibility. [1]

## Sources

1. JLCPCB / LCSC catalog record for C74192, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/dc-dc-converters_xlsemi-xl1509-5-0e1_C74192.html>
`;export{e as default};