var e=`---
part: C2765186
mpn: TYPE-C 16PIN 2MD(073)
manufacturer: SHOU HAN
category: Connectors
kind: connector
package: SMD
tier: extended
catalog_snapshot: 2026-07-24
summary: A right-angle 16-contact USB Type-C receptacle with over a million in stock — and definitely not a six-pin power-only part.
---

# TYPE-C 16PIN 2MD(073)

> **Note on sources.** This part is an ordinary Extended part, so it is not in
> the qualifying catalog snapshot and \`parts-index.json\` holds nothing for it.
> The figures below were retrieved from the live LCSC product page for C2765186
> on 2026-08-19 — a different, later source than the 2026-07-24 snapshot — and
> are cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A right-angle USB Type-C receptacle with 16 contacts, made by SHOU HAN. Like the
other Type-C part in the curated picks it omits the high-speed pairs, keeping
power, USB 2.0 data, the CC pins and sideband. The right-angle body is the usual
choice for a board edge, where the cable enters horizontally. [1]

The curated record carries a specific warning worth repeating: this *is* a
16-contact connector, not one of the six-pin power-only Type-C receptacles that
look superficially similar and are much cheaper. The two have entirely
different footprints. [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Contact count | 16 [1] | Not the six-pin power-only variant, and not the full 24-pin USB 3 one. |
| Current rating | 5 A per the live LCSC listing; the curated description says 3 A [1] [2] | The two sources disagree — see below. Design to the lower figure unless the manufacturer's drawing says otherwise. |
| Voltage rating | 5 V per the listing [1] | Enough for standard USB. Higher Power Delivery voltages would need the manufacturer's own rating confirmed. |
| Mating cycles | Not stated on the listing [1] | — |
| Mounting | Surface-mount, right-angle [1] | Right-angle parts lever on the solder joints when the cable is pulled; retention matters more here than on a vertical part. |
| Operating temperature | −25 °C to +85 °C [1] | Note the −25 °C floor — narrower than most parts in this catalog. |

## What the listing actually says

**Stock is deep: 1,104,280 units at about $0.07** when checked. Of the two
Type-C receptacles in the curated picks, this is overwhelmingly the more
available and the cheaper one. [1]

**The current rating is inconsistent between sources.** The live LCSC listing
says 5 A; the site's curated description says 3 A. 5 A on a Type-C receptacle
corresponds to the 100 W Power Delivery profile and is a common listing claim;
3 A is the conservative standard figure. Without the manufacturer's drawing,
design to 3 A. [1] [2]

**3 A (or more) needs the CC circuitry to be right.** A device drawing high
current from a Type-C source must negotiate for it — at minimum correct 5.1 kΩ
pull-downs on CC1 and CC2, and a Power Delivery controller for anything above
5 V.

## Watch out for

- **Verify pin count and footprint** against the manufacturer's drawing — this
  is the part the curated note explicitly warns is confused with six-pin
  power-only receptacles.
- **Two 5.1 kΩ CC pull-downs**, one on each CC pin.
- **Mechanical retention matters** on a right-angle part.
- **−25 °C cold limit**, narrower than most of the catalog.
- **Extended-tier assembly costs more** and may be restricted for connectors.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, described
there as a 16-contact 3 A right-angle USB Type-C receptacle in an SMD package.
It does not appear in the qualifying catalog snapshot; the specifications above
come from the live LCSC product page, not from the snapshot. [1] [2]

## Sources

1. LCSC product page for C2765186 (SHOU HAN TYPE-C 16PIN 2MD(073)), retrieved
   2026-08-19. <https://www.lcsc.com/product-detail/C2765186.html>
2. basicp.art curated recommendations, \`src/data/other-components.json\`, catalog
   snapshot 2026-07-24, including its note that this is a 16-contact connector
   rather than a six-pin power-only receptacle and that the footprint and pin
   map should be verified.
`;export{e as default};