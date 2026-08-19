var e=`---
part: C72043
mpn: 19-217/GHC-YR1S2/3T
manufacturer: EVERLIGHT
category: LEDs
kind: led
package: "0603"
tier: extended
catalog_snapshot: 2026-07-24
summary: The green 0603 indicator in the curated picks — an Everlight part, currently listed as unavailable at LCSC.
---

# Green LED (C72043)

> **Note on sources.** This part is an ordinary Extended part, so it is not in
> the qualifying catalog snapshot and \`parts-index.json\` holds nothing for it.
> The figures below were retrieved from the live LCSC product page for C72043 on
> 2026-08-19 — a different, later source than the 2026-07-24 snapshot the rest
> of these notes use — and are cited as \`[1]\`. See \`ISSUES.md\`.

## What it is

A green indicator LED in the 0603 package: Everlight's 19-217/GHC-YR1S2/3T,
emerald green with a water-clear lens. Green is the colour the human eye is most
sensitive to, so a green indicator looks brighter than a red or blue one of the
same measured intensity. [1]

Like most modern green LEDs it is an indium gallium nitride part, which puts its
forward voltage in the 3 V region rather than the 2 V of a red LED — the same
supply-headroom constraint described in the note for the white LED (C2290). [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Emerald green, dominant wavelength 520–535 nm, peak 518 nm, water-clear lens [1] | The "pure green" region — noticeably bluer and more vivid than the yellowish-green of older LED chemistry. |
| Forward voltage | 3.3 V [1] | **Higher than a 3.3 V rail can drive.** This LED effectively requires a 5 V supply or a constant-current driver. |
| Forward current | 20 mA rated [1] | The rating, not a target — a few milliamps is plenty for an indicator. |
| Luminous intensity | 199 mcd at the rated current [1] | Combined with the eye's green sensitivity, bright for a panel light. |
| Viewing angle | 120° [1] | Wide, as usual for an 0603 indicator. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the listing actually says

**The LCSC listing shows "not available now."** As of 2026-08-19 the part is
marked unavailable, with a 50-piece minimum order when it is stocked. Combined
with its ordinary-Extended assembly status, this is a recommendation that may not
be orderable at all — see \`ISSUES.md\`. [1]

**A 3.3 V forward voltage on a 3.3 V rail leaves nothing for the resistor.**
This is the same trap as the white LED, but worse: the nominal figure equals the
common logic rail exactly. Drive it from 5 V.

## Watch out for

- **Check availability before designing it in** — the listing was marked
  unavailable when checked.
- **Not drivable from 3.3 V.** Plan for 5 V or a current source.
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

1. LCSC product page for C72043 (EVERLIGHT 19-217/GHC-YR1S2/3T), retrieved
   2026-08-19. <https://www.lcsc.com/product-detail/C72043.html>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};