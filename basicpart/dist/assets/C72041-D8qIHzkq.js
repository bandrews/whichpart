var e=`---
part: C72041
mpn: 19-217/BHC-ZL1M2RY/3T
manufacturer: EVERLIGHT
category: LED Indication - Discrete
kind: led
package: "0603"
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: SMD B — 19-217/BHC-ZL1M2RY/3T
  publisher: Everlight Electronics Co., Ltd
  document: DSE-0009312
  revised: 2017-06
  url: https://evelta.com/content/datasheets/012-19-217-BHC-ZL1M2RY-3T.pdf
summary: The blue 0603 indicator in the curated picks — and its absolute maximum forward current is only 10 mA.
---

# 19-217/BHC-ZL1M2RY/3T

## What it is

A blue indicator LED in the 0603 package — 1.6 × 0.8 mm, the size of a grain of
coarse salt. Everlight's chip is indium gallium nitride behind a water-clear
lens, so the part looks colourless when off and vivid blue when on. Blue is the
colour the human eye is *least* sensitive to among the common indicator colours,
which is why blue indicators are so often specified too bright: designers
compensate for the poor eye response and end up with something dazzling in a
dark room. [1]

The two numbers that separate this part from the red LED beside it in the picks
list are the forward voltage and the current limit. A red LED drops about 2 V and
will take 20 mA; this one drops 2.5–3.1 V and its absolute maximum continuous
forward current is **10 mA**, less than half what most designers assume for an
indicator. Size the series resistor from that, not from habit. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Blue. Dominant wavelength 465.0–475.0 nm, peak wavelength 468 nm typical, spectral bandwidth 25 nm typical, all measured at 5 mA. Water-clear lens [1] | Standard indicator blue. The dominant wavelength is the pure colour your eye matches it to; the peak is where the chip emits most strongly. |
| Forward voltage | 2.50 V to 3.10 V at 5 mA and 25 °C, ±0.1 V measurement tolerance, sorted into three bins: 2.50–2.70 V, 2.70–2.90 V and 2.90–3.10 V. No typical value is published [1] | Subtract this from your supply and divide by the current you want to get the series resistor — but the 600 mV spread is real, and on a 3.3 V rail it dominates the answer. |
| Forward current | **10 mA continuous absolute maximum**, 100 mA peak at 1/10 duty and 1 kHz, 40 mW dissipation, all at 25 °C ambient. Everything optical is specified at 5 mA [1] | The lowest current rating of any LED in the picks list, and less than half the green 19-217's 25 mA. A resistor sized for 20 mA would run this part at twice its absolute maximum. |
| Luminous intensity | 11.5 mcd minimum to 28.5 mcd maximum at 5 mA, with a ±11 % measurement tolerance. No typical value is published [1] | A 2.5:1 span, and the order code does not narrow it. The only figure Everlight guarantees for a part you receive is the 11.5 mcd floor. |
| Viewing angle | 120° typical, measured as the full angle within which intensity stays above half its on-axis value [1] | Wide. Good for a panel indicator seen from an angle; poor for anything that needs to throw light in one direction. |
| Operating temperature | −40 °C to +85 °C, storage −40 °C to +90 °C [1] | Industrial range on paper, but the usable current at the top of it is a quarter of the 25 °C rating. |

## What the datasheet actually says

**10 mA is the ceiling, not 20 mA.** This is the specification most likely to
catch someone out, because the reflex when sizing an LED resistor is to aim for
10–20 mA. Everlight rates this part at 10 mA continuous and 40 mW, and specifies
every optical figure at 5 mA, which is the current it is really meant to run at.
Reusing a resistor value from a red LED design would put it at or past its
absolute maximum. [1]

**Forward voltage is binned, and the bins decide what a 3.3 V rail does.** The
three bins are 2.50–2.70 V, 2.70–2.90 V and 2.90–3.10 V, and nothing in the
order code picks one. From 3.3 V that leaves anywhere between 0.8 V and 0.2 V
across your series resistor depending on which bin arrives — a four-to-one swing
in current for one fixed resistor value, and a visible difference in brightness
between two LEDs on the same board. This is the practical reason blue and green
indicators behave so differently from red ones: red leaves well over a volt of
headroom on the same rail, so the resistor, not the LED, sets the current. Drive
this part from 5 V, or from a constant-current source, if matched brightness
matters. [1]

**The order code spans the whole intensity range.** \`L1M2\` in
\`19-217/BHC-ZL1M2RY/3T\` names the lowest and highest of the four luminous
intensity bins: L1 is 11.5–14.5 mcd, L2 is 14.5–18.0, M1 is 18.0–22.5 and M2 is
22.5–28.5. Dominant wavelength is binned too, X at 465.0–470.0 nm and Y at
470.0–475.0 nm. Everlight prints the bin a reel actually contains on its label as
\`CAT\` (intensity), \`HUE\` (wavelength) and \`REF\` (forward voltage), so you can
find out what you received — you just cannot ask for it up front. [1]

**Brightness and current rating both fade with heat.** The derating curve holds
10 mA only to about 25 °C ambient, then falls roughly linearly to about 2.5 mA
at 85 °C. Relative intensity slides gently from about 110 % at −40 °C to about
80 % at +85 °C. Neither is dramatic at the 1–2 mA an indicator needs, but the
current rating in a hot enclosure is a quarter of the headline number. [1]

**The ESD rating is only 150 V, human body model.** Very low by modern standards
— many components in this catalog withstand 2,000 V. Treat these as
static-sensitive on the bench and in assembly. [1]

## Watch out for

- **10 mA absolute maximum.** Do not reuse a 20 mA resistor value from a red LED
  design. [1]
- **Marginal on 3.3 V**, and the forward-voltage bins make it unpredictable
  there. Drive from 5 V or a current source. [1]
- **Always fit a series resistor.** Everlight's own precautions put this first:
  without one, a small shift in voltage causes a large change in current and the
  LED burns out. [1]
- **Reverse voltage is only 5 V**, and that is an absolute maximum, not a rating
  for continuous reverse operation. [1]
- **Comparisons with the green LED (C72043) need care.** Its intensity is
  specified at 20 mA, this one's at 5 mA. The bare numbers — 285 against
  28.5 mcd — are not measured under the same conditions. [1]
- **Extended-tier assembly costs more** than the Basic-tier red (C2286) and
  white (C2290) LEDs sitting beside it in the same recommendation group. [3]
- **Polarity.** Check the cathode mark on Everlight's package drawing against
  your footprint — 0603 LED polarity marks are not standardised across vendors. [1]
- **Assembly constraints.** Reflow at 260 °C for at most 10 s and no more than
  two passes; hand soldering at 350 °C for 3 s with an iron of 25 W or less. The
  part is moisture-sensitive, with a one-year floor life once the foil bag is
  opened. [1]

## In this catalog

This part is not in \`parts-index.json\`. It is an ordinary Extended part, so it
falls outside the qualifying snapshot, and the repository's only record of it is
the curated recommendation list in \`src/data/other-components.json\`. That entry
carries five fields and no electrical data at all: the name "Blue LED", the
description "0603 indicator LED", the package \`0603\`, the part number \`C72041\`
and the tier \`extended\`. Everything in the table above therefore comes from the
datasheet rather than from a catalog attribute string. [3]

For price and stock there is no snapshot value to quote, so here is a live
reading of the LCSC product page taken on 2026-08-19, which is not a snapshot
figure and will have moved since: **out of stock**, minimum order 20 pieces in
multiples of 20, one full reel being 3,000. Prices ran $0.0206 at 20 pieces,
$0.0161 at 200, $0.0136 at 600, $0.0121 at 3,000, $0.0108 at 9,000 and $0.0101
at 21,000 — several times the unit price of the Basic-tier red LED in the same
group, before the Extended assembly surcharge is counted at all. A recommended
part that is both surcharged and unstocked is worth a second look; see
\`ISSUES.md\`. [2][3]

## Sources

1. Everlight Electronics Co., Ltd, *Datasheet — SMD B, 19-217/BHC-ZL1M2RY/3T*,
   Issue No. DSE-0009312, Rev. 4, release date 7 June 2017. Device Selection
   Guide; Absolute Maximum Ratings; Electro-Optical Characteristics; Bin Range
   of Luminous Intensity; Bin Range Of Dom. Wavelength; Bin Range Of Forward
   Voltage; Typical Electro-Optical Characteristics Curves; Carrier Tape
   Dimensions; Precautions For Use. This is the source for every figure in the
   specification table above. Everlight's own site currently serves an older
   Rev. 2 of this document (June 2013) at
   \`en.everlight.com/wp-content/plugins/ItemRelationship/product_files/pdf/19-217-BHC-ZL1M2RY-3T.pdf\`;
   its electrical figures are identical to Rev. 4's.
   <https://evelta.com/content/datasheets/012-19-217-BHC-ZL1M2RY-3T.pdf>
2. LCSC product page for C72041, read live on 2026-08-19 — source for the price
   ladder, stock and minimum order quantity only. These are live figures, not
   catalog-snapshot values.
   <https://www.lcsc.com/product-detail/C72041.html>
3. basicp.art curated recommendations, \`src/data/other-components.json\`, LEDs
   group, catalog snapshot 2026-07-24.
`;export{e as default};