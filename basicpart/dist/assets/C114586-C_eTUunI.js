var e=`---
part: C114586
mpn: WS2812B-B/W
manufacturer: Worldsemi
category: RGB LEDs(Built-in IC)
kind: led
package: SMD5050-4P
tier: extended
catalog_snapshot: 2026-10-29
datasheet:
  title: WS2812B — Intelligent control LED integrated light source
  publisher: Worldsemi
  document: V5
  url: https://www.lcsc.com/datasheet/lcsc_datasheet_2412041609_Worldsemi-WS2812B-B-W_C114586.pdf
summary: An addressable RGB pixel; this exact JLCPCB listing uses the V5 datasheet and requires Standard PCBA.
---

# WS2812B-B/W

## What it is

C114586 is Worldsemi's WS2812B-B/W addressable RGB LED. It combines the red,
green, and blue emitters with a controller in a four-pin 5050 package. Each
pixel consumes its first 24 bits of colour data and reshapes the remaining
stream for the next pixel. Data is sent in GRB order, most-significant bit
first, at 800 kbit/s. [1] [2]

JLCPCB links the **WS2812B V5** manufacturer datasheet for this exact C-number.
Older generic WS2812B sheets specify different timings and input thresholds;
do not transfer those figures to this listing without checking the revision.
JLCPCB currently identifies it as **Standard Only** for assembly. [1] [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Red 620–630 nm, green 515–525 nm, blue 465–475 nm, measured at 12 mA [1] | These are the V5 optical ranges. |
| Forward voltage | Individual LED forward voltages are not specified. The absolute-maximum table lists the device supply as 3.7–5.3 V; electrical characteristics are specified at 5 V and 25 °C [1] | The controller drives the internal emitters. Do not confuse device supply voltage with an LED die's forward voltage. |
| Forward current | Optical characteristics use a 12 mA working-current condition; quiescent current is listed as 0.6 mA. A guaranteed total full-white supply current is not stated [1] | Measure or obtain a guaranteed current budget for this revision; do not assume the older 60 mA-per-pixel rule applies. |
| Luminous intensity | At 12 mA: red 300–500 mcd (310 typical), green 600–1,000 mcd (780 typical), blue 200–300 mcd (215 typical) [1] | These are test-condition values, not a guarantee of neutral white balance. |
| Viewing angle | Not specified in the linked V5 sheet [1] | Check the optical requirements of the enclosure. |
| Operating temperature | JLCPCB lists −40 °C to +65 °C; the linked V5 sheet does not state an operating-temperature range and specifies electrical characteristics at 25 °C [1] [2] | The catalog temperature range is not independently guaranteed by the retrieved sheet. |

## What the datasheet actually says

**V5 needs a reset low period longer than 280 µs.** Its timing table specifies
T0H = 220–380 ns, T1H = 580 ns–1 µs, and both T0L and T1L = 580 ns–1 µs. Use
firmware timings for this revision; an older 50 µs reset is insufficient for the
stated V5 requirement. The internal PWM refresh rate is 2 kHz. [1]

**The V5 high-input threshold is 2.7 V at the stated 5 V test supply.** The
low-input maximum is 0.7 V. A 3.3 V logic source can meet that high threshold if
its guaranteed output level, ground offset, and wiring losses leave enough
margin; the older 0.7 × VDD threshold is not the number in this sheet. [1]

**Some limits remain incomplete or inconsistent.** The absolute logical-input
voltage row conflicts with the logic-level table, and no guaranteed total
full-white current or operating-temperature range is provided. Do not infer
missing absolute input limits, temperature guarantees, or reverse-supply
protection from an older WS2812B revision. [1]

## Watch out for

- **Standard PCBA only.** The October 29, 2026 JLCPCB page does not offer
  Economic PCBA for this exact part. It is an ordinary Extended selection. [2]
- **Check the revision and pinout.** V5 lists pin 1 VDD, pin 2 DOUT, pin 3 VSS,
  and pin 4 DIN. Match the package drawing and board orientation. [1]
- **Budget power from verified current.** Size the supply and distribution for
  the actual LED revision and intended brightness; a generic strip-current
  estimate is not a part specification.
- **Check moisture and reflow requirements.** JLCPCB lists MSL 5a, and the V5
  sheet provides handling and reflow instructions. [1] [2]
- **Use the V5 reset timing.** Libraries configured for earlier revisions may
  need a longer frame-reset interval. [1]

## In this catalog

C114586 remains an existing human-selected Our Picks entry. JLCPCB identifies
it as WS2812B-B/W, SMD5050-4P, Extended, and Standard Only for PCBA. It is outside
the qualifying Basic/Preferred snapshot. The public exact-search endpoint did
not return it on October 29, while its product page confirmed the listing and
stock; a search miss is not proof of discontinuance. [2]

## Sources

1. Worldsemi, *WS2812B — Intelligent control LED integrated light source*,
   V5, the eight-page manufacturer sheet linked from the C114586 JLCPCB listing
   and retrieved on 2026-10-29. Pages 1–4: features, pinout, electrical and
   optical tables, timing, and GRB format; pages 5–8: handling, reflow, revisions.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2412041609_Worldsemi-WS2812B-B-W_C114586.pdf>
2. JLCPCB, *WS2812B-B/W — C114586*, product page checked 2026-10-29. Source for
   exact identity, package, catalog temperature, MSL, and Standard Only service.
   <https://jlcpcb.com/partdetail/C114586>
`;export{e as default};