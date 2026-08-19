var e=`---
part: C2286
mpn: KT-0603R
manufacturer: Hubei KENTO Elec
category: LED Indication - Discrete
kind: led
package: "0603"
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: Specification for Approval — 0603-0.6 Red Light SMD LED
  publisher: Hubei KENTO Elec
  revised: 2018-12
  url: https://datasheet.lcsc.com/datasheet/pdf/011ec3e8cb1e825f6961d29bc4db4c7a.pdf
summary: A plain red 0603 indicator LED — the cheapest way to tell a user something is happening.
---

# KT-0603R

## What it is

A red surface-mount LED in the 0603 package. The datasheet's outline drawing
gives it as 1.6 × 0.8 × 0.6 mm with a flat, water-clear lens — about the size of
a grain of coarse salt. It is the standard "power on" or "activity" indicator,
and at well under a cent each there is no reason to be sparing with them. [1][2]

Red is the easiest colour to drive. KENTO measures everything at 20 mA, where
the forward voltage is somewhere between 1.8 V and 2.4 V, so even a 3.3 V rail
leaves plenty of room for the series resistor that sets the current. [1]

One thing to know before you read any figure below: the document KENTO supplies
for this part is a *Specification for Approval* headed only "0603-0.6 red
light". It never prints the part number KT-0603R. It describes this package in
this colour, and LCSC serves it as the datasheet for C2286. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Red. Dominant wavelength 615–630 nm, peak wavelength 625–645 nm, spectral half-width typically 20 nm, all measured at 20 mA. Water-clear flat lens [1] | The dominant wavelength is the pure colour your eye matches it to; the peak is where the chip emits most strongly. 615–630 nm is a slightly orange red. |
| Forward voltage | 1.8 V to 2.4 V at 20 mA and 25 °C. No typical value is published [1] | Subtract this from your supply and divide by the current you want to get the series resistor — but size the resistor for the whole 600 mV spread, not a midpoint. |
| Forward current | Optical figures are all specified at 20 mA. Absolute maxima are 25 mA continuous, 60 mA pulsed (0.1 ms pulse, 1/10 duty cycle) and 40 mW dissipation, all at 25 °C ambient [1] | 20 mA is the measurement condition, not a target. The continuous rating falls steeply above 25 °C — see below. |
| Luminous intensity | Minimum 145 mcd, maximum 300 mcd, at 20 mA and 25 °C. No typical value is published [1] | The catalog's headline 300 mcd is the *top* of that span. The only figure KENTO guarantees is 145 mcd, less than half of it. |
| Viewing angle | 120° typical at 20 mA, measured as the full angle within which intensity stays above half its on-axis value [1] | Wide. Good for a panel indicator seen from an angle; poor for anything that needs to throw light in one direction. |
| Operating temperature | −40 °C to +85 °C, storage the same [1] | Industrial range on paper, but the usable current at the top of it is a fraction of the 25 °C rating. |

## What the datasheet actually says

**300 mcd is the brightest bin, not the brightness you will get.** KENTO sorts
production into intensity bins P22 (145–175 mcd), P23 (175–210 mcd), a bin
labelled P23 again (210–250 mcd — the datasheet repeats the label, which looks
like a typographical error) and P24 (250–300 mcd), each with a ±10 % measurement
tolerance. Forward voltage is binned too, into six 100 mV bands VE to VJ across
1.8–2.4 V, and dominant wavelength into five 3 nm bands R1 to R5 across
615–630 nm. Nothing in the ordering code KT-0603R selects any of them, so a reel
can contain any bin, and the guaranteed floor for a part you actually receive is
the 145 mcd minimum. KENTO's own cautions section says plainly that LEDs from
different bins should not be used in the same product, because the colour
difference is visible. If matched brightness across a row of indicators matters
to you, that is a conversation to have with your supplier before you order. [1]

**The current rating collapses as things warm up.** The derating curve holds
25 mA only up to 25 °C ambient. Past that knee it falls at roughly 0.3 mA per
°C: about 15 mA at 60 °C, about 7 mA just short of 85 °C, and zero at 85 °C
itself. Brightness sags along with it — KENTO's intensity-versus-temperature
curve drops from about 1.1× at −40 °C to about 0.85× at +85 °C, so an indicator
that looks right on the bench will look about 15 % dimmer in a hot enclosure. [1]

**The absolute maximum ratings do not agree with each other.** Power dissipation
is capped at 40 mW, but 25 mA continuous at this part's forward voltage is
45 mW at best (1.8 V) and 60 mW at worst (2.4 V). Even the 20 mA test condition
reaches 48 mW on a top-bin VJ part. Read the 40 mW figure as the real ceiling and
the 25 mA as optimistic: 40 mW buys you 16.7 mA at 2.4 V, or 22 mA at 1.8 V.
In practice this is unlikely to bite: the intensity curve shows 5 mA still
delivers about 28 % of the 20 mA output, which is 40 mcd even from the weakest
bin. But it is a good reason not to design to the current rating. [1]

**Brightness tracks current almost proportionally.** Below the 20 mA reference
point KENTO's curve is close to a straight line: about 0.55× at 10 mA and about
0.28× at 5 mA. So a quarter of the current really does buy roughly a quarter of
the light, and dimming by resistor value behaves predictably. [1]

## Watch out for

- **Always fit a series resistor.** An LED has no internal current limit, and
  KENTO's cautions say so explicitly: without one, a small change in voltage
  makes a large change in current and destroys the part. Forward voltage also
  falls as the LED warms, so current, not voltage, is what you control. [1]
- **You almost certainly do not want 20 mA.** A few milliamps is plenty for an
  indicator, saves power, keeps you inside the 40 mW ceiling and extends life.
- **Reverse voltage is only 5 V.** That is the whole absolute maximum, and the
  cautions repeat it: above 5 V across the LED backwards, it is easily damaged.
  Anti-parallel LED pairs and AC drive need external protection. [1]
- **No ESD rating is given.** The absolute maximum table has a row for
  electrostatic discharge with a unit but no number in it. Treat the part as
  ESD-sensitive and handle it accordingly; the datasheet's own advice is wrist
  straps, grounded equipment and antistatic gloves. [1]
- **Polarity.** The package drawing numbers the terminals 1 and 2, marks
  terminal 1 as the anode (+) and terminal 2 as the cathode, and puts the
  chamfered corner mark at the cathode end. Check that against your footprint —
  0603 LED cathode markings are not standardised across vendors. [1]
- **Assembly constraints are tighter than for a passive.** Reflow is 260 °C for
  at most 10 s and at most two passes; hand soldering is 300 °C for 3 s, once
  only, with a soldering iron of no more than 25 W. No ultrasonic cleaning. The
  part is moisture-sensitive: once the foil bag is open it should be used within
  seven days at 30 °C and 60 % relative humidity or re-baked. [1]

## In this catalog

Basic part in 0603, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 7,095,056 in stock — the second-largest stock figure in the catalog —
at $0.0073 at quantity 1, falling to $0.0034 at 100,000. [2] The price break at
4,000 is worth noticing: that is exactly one reel, which is how KENTO ships
them. [1]

## Sources

1. Hubei KENTO Elec, *Specification for Approval — 0603-0.6 Red Light SMD LED*,
   Revision A.0, issued 6 December 2018. Section 2 (Package Profile & Soldering
   PAD Suggested), Section 3 (Soldering Profile Suggested), Section 4 (Absolute
   Maximum Ratings), Section 5 (Electrical Optical Characteristics), Section 6
   (BIN specifications), Section 7 (Typical Electrical-Optical Characteristics
   Curves), Section 8 (Reel and Tape Dimensions), Section 11 (Cautions). The
   document carries no document number and does not print the part number
   KT-0603R; LCSC publishes it as the datasheet for C2286.
   <https://datasheet.lcsc.com/datasheet/pdf/011ec3e8cb1e825f6961d29bc4db4c7a.pdf>
2. JLCPCB / LCSC catalog record for C2286, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price and stock.
   <https://www.lcsc.com/product-detail/led-indication-discrete_hubei-kento-elec-kt-0603r_C2286.html>
`;export{e as default};