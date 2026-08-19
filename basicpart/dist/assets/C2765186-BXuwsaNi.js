var e=`---
part: C2765186
mpn: TYPE-C 16PIN 2MD(073)
manufacturer: SHOU HAN
category: Connectors
kind: connector
package: SMD
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: TYPE-C 16PIN 2MD(073) — Specification for Approval
  publisher: Shenzhen ShouHan Technology Co., Ltd.
  revised: Rev. A
  url: https://datasheet.lcsc.com/datasheet/pdf/2d53d8d8199c9dd6666d9bc9ac7c3a1e.pdf
summary: A board-edge 16-contact USB Type-C receptacle rated 3 A at 5 V, with over a million in stock — and not a six-pin power-only part.
---

# TYPE-C 16PIN 2MD(073)

## What it is

A USB Type-C receptacle from SHOU HAN (Shenzhen ShouHan Technology). It lies
flat on the board with its opening facing outwards, so the cable enters
horizontally — the style usually listed as right-angle or board-edge, rather than
a vertical receptacle whose opening points away from the board. The drawing gives
the body as 8.94 mm wide, 7.35 mm deep and 3.16 mm tall. [1]

The manufacturer's pin-assignment table settles the question the curated record
raises: this really is a 16-contact connector, not one of the six-pin power-only
Type-C sockets that look similar and cost less. All sixteen USB 2.0 positions are
there — power, ground, both configuration-channel (CC) pins, both sideband (SBU)
pins and both D+/D− pairs — and none of the eight SuperSpeed pins are, so it
carries USB 2.0 and power only. [1] [3]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Contact count | 16 of the 24 Type-C positions — A1, A4–A9, A12 and B1, B4–B9, B12 — landing on twelve pads (eight 0.30 mm wide, four 0.60 mm wide) [1] | Both CC pins and both SBU pins are present, so the port is fully reversible. The four wide pads each serve two commoned positions: the ground and VBUS pairs. |
| Current rating | 3.0 A [1] | The manufacturer's own figure. The live LCSC listing claims 5 A; the drawing does not support it. |
| Voltage rating | 5.0 V [1] | The standard USB bus voltage, and the only one the drawing rates. Nothing here backs the 9 V, 15 V or 20 V Power Delivery rails. |
| Mating cycles | 10,000 [1] | Verified without load and at rated load, at 10–25 cycles per minute. |
| Mounting | Horizontal board-edge; twelve surface-mount pads, four plated oval holes for the shell legs and two Ø0.65 mm holes for the Ø0.50 mm locating posts. The recommended land pattern is drawn for a 0.80 mm board [1] | Listed as SMD, but the footprint needs six drilled holes. The 0.80 mm board thickness on the layout is worth confirming if your stack-up is the usual 1.6 mm. |
| Operating temperature | −25 °C to +85 °C [1] | The −25 °C floor is narrower than most parts in this catalog; the cold-storage test is run at exactly −25 °C. |

## What the datasheet actually says

**3 A, not 5 A.** The drawing's electrical performance note gives a current
rating of 3.0 A and a voltage rating of 5.0 V. The live LCSC listing says 5 A,
which the manufacturer's own document contradicts; the site's curated
description already said 3 A and was right. Design to 3 A. [1] [2] [3]

**40 mΩ is the number when new.** The headline low-level contact resistance is
40 mΩ per pin maximum (50 mΩ on the shield), with the change over the life of any
pin held to 10 mΩ. But the durability test in the specification allows contact
resistance up to 0.1 Ω — 100 mΩ — after 10,000 mating cycles. That is the figure
to design a power path against if the port will see heavy use. [1]

**The gold thickness is not in this document.** The plating note says the
contacts get a minimum 50 micro-inch nickel underplate overall and gold on the
functional contact area, but that "gold plating thickness follow the P/N" — the
part number decides, and this drawing does not decode it. If contact life
matters to you, that is a question for the supplier. The housing is a
high-temperature plastic rated UL94 V-0, the contacts copper alloy, and the front
shell and mid-plate stainless steel. [1]

**Read the Chinese column on the force figures.** The specification mixes units:
insertion force is 0.5–2.0 kgf and removal force 0.8–2.0 kgf on the drawing,
while the test tables give 3–20 N after temperature cycling, and the life test's
English text says the removal force shall be "0.8 to 2.0 N" where the Chinese
alongside it says kgf — about a tenfold difference. The kgf figures are the
consistent ones. [1]

## Watch out for

- **The 5 A figure on the LCSC listing is wrong.** The manufacturer rates the
  part 3.0 A at 5.0 V.
- **The footprint is not pure SMD.** Four plated oval holes for the shell legs
  and two Ø0.65 mm holes for the locating posts, plus twelve pads. Copy the
  recommended layout from the drawing.
- **The recommended layout is drawn for a 0.80 mm board.** Check leg and post
  lengths with the supplier before using it on a 1.6 mm board.
- **Two 5.1 kΩ CC pull-downs**, one on CC1 (A5) and one on CC2 (B5). A single
  shared resistor does not work.
- **Tie the two data pairs together.** A6/A7 and B6/B7 are the same signal in the
  two plug orientations; a USB 2.0 device joins them on the board.
- **Mechanical retention matters** on a board-edge part, where a tugged cable
  levers on the joints — which is what the four through-hole shell legs are for.
- **−25 °C cold limit**, narrower than most of the catalog.
- **Extended-tier assembly costs more** and may be restricted for connectors.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, described
there as a 16-contact 3 A right-angle USB Type-C receptacle in an SMD package —
a description the manufacturer's drawing confirms. It does not appear in the
qualifying catalog snapshot, so \`parts-index.json\` holds nothing for it; the
price and stock figures come from the live LCSC product page checked on
2026-08-19 — 1,104,280 in stock at about $0.07, making this by far the cheaper
and more available of the two Type-C receptacles in the picks. [2] [3]

## Sources

1. Shenzhen ShouHan Technology Co., Ltd. (SHOU HAN), *TYPE-C 16PIN 2MD(073) —
   Specification for Approval*, drawing rev. A, undated. Sheet 1 (notes 1–6:
   material, plating, mechanical, electrical and environmental performance; pin
   assignments; dimensioned views; recommended PCB layout) and the specification
   tables for mechanical, electrical and durability performance, including the
   life test at 10,000 cycles.
   <https://datasheet.lcsc.com/datasheet/pdf/2d53d8d8199c9dd6666d9bc9ac7c3a1e.pdf>
2. LCSC product page for C2765186 (SHOU HAN TYPE-C 16PIN 2MD(073)), retrieved
   2026-08-19. <https://www.lcsc.com/product-detail/C2765186.html>
3. basicp.art curated recommendations, \`src/data/other-components.json\`, catalog
   snapshot 2026-07-24, including its note that this is a 16-contact connector
   rather than a six-pin power-only receptacle and that the footprint and pin
   map should be verified.
`;export{e as default};