var e=`---
part: C72041
mpn: 19-217/BHC-ZL1M2RY/3T
manufacturer: EVERLIGHT
category: LEDs
kind: led
package: "0603"
tier: extended
catalog_snapshot: 2026-07-24
summary: The blue 0603 indicator in the curated picks — an Everlight part, currently listed as unavailable at LCSC.
---

# Blue LED (C72041)

> **Note on sources.** This part is an ordinary Extended part, so it is not in
> the qualifying catalog snapshot and \`parts-index.json\` holds nothing for it.
> The figures below were retrieved from the live LCSC product page for C72041 on
> 2026-08-19 — a different, later source than the 2026-07-24 snapshot the rest
> of these notes use — and are cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A blue indicator LED in the 0603 package: Everlight's 19-217/BHC-ZL1M2RY/3T,
blue with a water-clear lens. Blue is the colour the human eye is *least*
sensitive to among the common indicator colours, so a blue LED needs more
measured intensity than a green one to look equally bright — and blue indicators
have a reputation for being dazzling at night because designers
overcompensate. [1]

Blue LEDs are indium gallium nitride parts, which puts the forward voltage in
the 3 V region rather than the 2 V of a red LED — the same supply-headroom
constraint described in the note for the white LED (C2290). [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Blue, wavelength 465–475 nm, peak 468 nm, water-clear lens [1] | Standard indicator blue. |
| Forward voltage | 2.8 V [1] | Leaves only half a volt across the resistor on a 3.3 V rail — workable but with wide unit-to-unit brightness spread. 5 V drive is far more predictable. |
| Forward current | 5 mA rated [1] | A low rating, like the white LED's — and 5 mA is already plenty for a blue indicator. |
| Luminous intensity | 24.5–28.5 mcd at the rated current [1] | Sounds dim next to the red LED's 300 mcd, but the intensity bin is specified at 5 mA rather than 20 mA. |
| Viewing angle | 120° [1] | Wide, as usual for an 0603 indicator. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the listing actually says

**The LCSC listing shows "not available now."** As of 2026-08-19 the part is
marked unavailable, with a 20-piece minimum order when it is stocked. Combined
with its ordinary-Extended assembly status, this is a recommendation that may
not be orderable at all — see \`ISSUES.md\`. [1]

**The intensity bin is tight (24.5–28.5 mcd)**, which is actually a virtue: two
of these next to each other will match far better than two LEDs with a
wide-open intensity specification. [1]

## Watch out for

- **Check availability before designing it in** — the listing was marked
  unavailable when checked.
- **Marginal on 3.3 V.** 2.8 V nominal forward voltage leaves little headroom;
  drive from 5 V for predictable brightness.
- **Run it dimmer than you think.** Blue indicators at full brightness are
  unpleasant in a dark room.
- **Extended-tier assembly costs more** than the Basic-tier red (C2286) and
  white (C2290) LEDs beside it in the picks list.
- **Always fit a series resistor**, and check the cathode marking against
  Everlight's drawing — 0603 polarity marks are not standardised.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in the 0603
package. It does not appear in the qualifying catalog snapshot; the
specifications above come from the live LCSC product page, not from the
snapshot. [1] [2]

## Sources

1. LCSC product page for C72041 (EVERLIGHT 19-217/BHC-ZL1M2RY/3T), retrieved
   2026-08-19. <https://www.lcsc.com/product-detail/C72041.html>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};