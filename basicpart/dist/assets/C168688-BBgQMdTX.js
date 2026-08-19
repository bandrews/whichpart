var e=`---
part: C168688
mpn: 918-418K2024S40000
manufacturer: Jing Extension of the Electronic Co.
category: Connectors
kind: connector
package: SMD
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: Product drawing — TYPE-C 3.1 receptacle, single-row SMT, 16 pin / 3 A
  publisher: Shenzhen Jing Tuo Jin Electronics Co., Ltd.
  revised: Ver. A0, 2020-05-22
  url: https://datasheet.lcsc.com/datasheet/pdf/c26680a47779df2150f1403f3fec276a.pdf
summary: A 16-contact USB Type-C receptacle, USB 2.0 only, rated 3 A — but the drawing on file carries a different part number.
---

# 918-418K2024S40000

> **Note on the datasheet.** This is the drawing LCSC serves for C168688, and it
> is the only manufacturer document available for the part. Its PRODUCT PART NO.
> field reads \`918-418K2023S40033\`, while the catalog sells the part as
> \`918-418K2024S40000\`. Those are not the same string. The drawing is a genuine
> Jing Tuo Jin document for a 16-pin, 3 A Type-C receptacle of the same
> family, but before you commit a footprint you should ask the supplier to
> confirm that it describes the part you are buying. [1] [2]

## What it is

A USB Type-C receptacle — the socket itself, with no electronics inside. It sits
flat on the board with its opening facing outwards, so the cable goes in
horizontally; this is the style usually listed as right-angle or board-edge, as
opposed to a vertical receptacle that points its opening at the sky. The drawing
gives the body as 11.15 mm wide, 3.16 mm tall and 7.2 mm deep, with four metal
shell legs that drop through the board. [1]

Sixteen of the twenty-four Type-C contact positions are populated. What is
present is everything USB 2.0 needs — power, ground, both configuration-channel
(CC) pins, both sideband (SBU) pins and both D+/D− data pairs. What is absent is
the whole SuperSpeed set, so the part cannot carry USB 3 or a display alternate
mode however the listing labels it. For a microcontroller board that only wants
5 V and USB 2.0, that is exactly the right trade. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Contact count | 16 of the 24 Type-C positions — A1, A4–A9, A12 and B1, B4–B9, B12 — brought out on twelve solder tails [1] | Both CC pins and both SBU pins are there, so the port is fully reversible for USB 2.0. None of the eight SuperSpeed pins (A2/A3/A10/A11, B2/B3/B10/B11) exist. |
| Current rating | 3 A, with VBUS limited to 1.5 A per pin, ground to 1.25 A per pin, and 0.25 A per pin on every other contact [1] | The headline 3 A is a budget shared across pins, not a figure any one pad can carry. See below. |
| Voltage rating | Not specified [1] | The drawing states no working voltage — only a 100 V AC minimum dielectric withstand and insulation resistance measured at 250 V DC. Ordinary 5 V USB is comfortably inside that; higher Power Delivery rails are simply not addressed. |
| Mating cycles | 10,000 [1] | Backed by an unmating force that must still be 6–20 N after the 10,000 cycles, and a contact resistance limit of 40 mΩ when new, 50 mΩ afterwards. |
| Mounting | Horizontal board-edge, surface-mount signal tails plus four plated oval holes (1.40 × 1.70 mm, on an 11.08 mm × 4.00 mm rectangle) for the shell legs [1] | Listed as SMD, but the land pattern is not pure surface-mount — your board needs four drilled, plated holes as well as the twelve pads. |
| Operating temperature | −40 °C to +80 °C [1] | Unusually good at the cold end for a connector, and 5 °C short of the more common +85 °C at the top. |

## What the datasheet actually says

**The 3 A rating is a per-pin budget.** The drawing spells it out: 3 A overall,
but no more than 1.5 A through any VBUS pin and 1.25 A through any ground pin.
The four VBUS positions and four ground positions are commoned inside the
connector and come out as two VBUS tails and two ground tails, so you only reach
the rated current if every one of those pads is soldered and routed with copper
that can carry its share. A layout that connects one VBUS pad and leaves the
other floating is not the connector the drawing rated. The same note caps every
remaining contact at 0.25 A, which is ample for CC pull-downs and USB 2.0 data
but rules out borrowing SBU or data pins as an extra power path. [1]

**Ten thousand mating cycles, on one micro-inch of gold.** TABLE 1 on the drawing
specifies the terminals as C2680 brass 0.15 mm thick with \`Au:1u″\` plating — one
micro-inch, roughly 0.025 µm. That is a gold flash rather than a gold plating,
and it is worth weighing against the 10,000-cycle durability claim if the port
will be plugged and unplugged daily for years. The shell and mid-plate are
SUS304 stainless steel, the shell nickel-plated, and the housing is LCP. [1]

**The land pattern is twelve pads, not sixteen.** Sixteen contacts, twelve solder
tails: the four ground positions share two tails and the four VBUS positions
share two more. The drawing's own pad callout reads "16−0.30" while the pattern
drawn beneath it has twelve pads, so build the footprint from the dimensioned
spans (6.70, 6.10, 5.10, 4.50, 3.50, 2.50 mm) rather than from the count. [1]

## Watch out for

- **The part number on the drawing is not the catalog's part number**
  (\`918-418K2023S40033\` versus \`918-418K2024S40000\`). The drawing is also
  internally inconsistent about the housing — its product name says blue plastic
  while TABLE 1 says white — which is a further hint that it may describe a
  sibling variant. Confirm with the supplier before ordering. [1] [2]
- **Verify the footprint against the drawing**, not against another board's
  library, and remember it needs four plated holes for the shell legs.
- **Fit two 5.1 kΩ CC pull-down resistors** — one on CC1 (A5), one on CC2 (B5).
  A single shared resistor does not work, and no connector does this for you.
- **Tie the two data pairs together.** A6/A7 and B6/B7 are the same signal seen
  in the two plug orientations; a USB 2.0 device joins them on the board.
- **USB 2.0 only.** Ignore the "USB 3.1" in the listing and in the drawing's own
  product name — sixteen contacts cannot carry SuperSpeed.
- **Thin stock (577 at last check).** The other Type-C pick (C2765186) had over a
  million units, and is the same mounting style.
- **Extended-tier assembly costs more** and may be restricted for connectors.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in an SMD
package. It does not appear in the qualifying catalog snapshot, so
\`parts-index.json\` holds nothing for it; the price and stock figures come from
the live LCSC product page checked on 2026-08-19 — 577 in stock at $0.61 in
ones. The curated record's note reads: "Ordinary Extended part; verify its exact
footprint and JLCPCB assembly restrictions before use." [2] [3]

## Sources

1. Shenzhen Jing Tuo Jin Electronics Co., Ltd., product drawing (产品图) for
   "TYPE-C3.1母座7.35四脚1.0MD*3单排SMT有柱蓝胶298C 16PIN/3A", PRODUCT PART NO.
   918-418K2023S40033, version A0, dated 2020-05-22. Note 3 (electrical), note 4
   (mechanical characteristics), TABLE 1 (materials and plating), the signal-name
   table, and the dimensioned views and recommended land pattern.
   <https://datasheet.lcsc.com/datasheet/pdf/c26680a47779df2150f1403f3fec276a.pdf>
2. LCSC product page for C168688 (Jing Extension of the Electronic Co.
   918-418K2024S40000), retrieved 2026-08-19.
   <https://www.lcsc.com/product-detail/C168688.html>
3. basicp.art curated recommendations, \`src/data/other-components.json\`, catalog
   snapshot 2026-07-24, including its note to verify the exact footprint and
   JLCPCB assembly restrictions before use.
`;export{e as default};