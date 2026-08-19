var e=`---
part: C114586
mpn: WS2812B
manufacturer: Worldsemi
category: LEDs
kind: led
package: "5050"
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: WS2812B — Intelligent control LED integrated light source
  publisher: Worldsemi
  document: see datasheet cover
  url: https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf
summary: An RGB LED with its own controller inside — chain hundreds of them and drive the whole string from one pin.
---

# WS2812B

## What it is

The WS2812B is what most people mean by "addressable LED" or "NeoPixel". Inside a
5×5 mm package there is a red, a green and a blue LED, plus a small controller
chip. You send it 24 bits of colour data on a single wire; it keeps the first 24
bits for itself and passes the rest out of its data-out pin to the next one in
the chain. [1]

That is the whole trick, and it is why a single microcontroller pin can drive a
strip of hundreds. Each LED gets 8 bits per colour, so 256 levels each and
16,777,216 colours in total. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Colour | Red at 620–625 nm, green at 522–525 nm, blue at 465–467 nm [1] | Standard RGB primaries. |
| Forward voltage | Red 2.0–2.2 V, green 3.0–3.4 V, blue 3.0–3.4 V [1] | Internal to the package — you supply 5 V and the chip handles the rest. |
| Forward current | Not specified as a per-die figure; the device includes a programmable constant-current control section [1] | The datasheet does not give a per-LED current, which is why strip current is usually quoted as roughly 60 mA per pixel at full white. |
| Luminous intensity | Red 390–420 mcd, green 660–720 mcd, blue 180–200 mcd [1] | Green dominates, blue is dimmest — which is why "white" needs software correction to look neutral. |
| Viewing angle | Not stated in this datasheet [1] | The 5050 package is a wide-angle top emitter. |
| Operating temperature | Junction −25 °C to +80 °C absolute maximum; electrical characteristics specified over −20 °C to +70 °C [1] | Narrower than most parts here. Long strips run warm on their own. |

## What the datasheet actually says

**Supply voltage is 3.5 V to 5.3 V absolute maximum, with characteristics
specified at 4.5 V to 5.5 V.** So a nominal 5 V rail is right, and the margin
above it is small — 5.3 V is the ceiling. [1]

**The data protocol is timing-critical.** A zero is 0.4 µs high then 0.85 µs low;
a one is 0.8 µs high then 0.45 µs low, each ±150 ns, with a total bit time of
1.25 µs ±600 ns. A reset is a low period above 50 µs. Those tolerances are why
WS2812B libraries disable interrupts or use hardware peripherals (DMA, PIO, SPI)
rather than simple bit-banging. [1]

**Input logic thresholds scale with the supply.** V<sub>IH</sub> is 0.7 × V<sub>DD</sub>,
which at 5 V is 3.5 V — *above* what a 3.3 V microcontroller pin can produce.
This is exactly why the standard advice is to put a 74AHCT1G125 buffer between a
3.3 V board and a 5 V strip. [1]

**Signal reshaping is built in.** Each pixel regenerates the waveform before
passing it on, so distortion does not accumulate down a long chain. The datasheet
claims over 5 m between any two points without extra circuitry, and at least
1,024 cascaded pixels at a 30 fps refresh rate. [1]

**Reverse-connection protection is built in** — connecting the supply backwards
does not damage the IC. [1]

## Watch out for

- **3.3 V data will not reliably drive a 5 V strip.** V<sub>IH</sub> is 3.5 V at
  a 5 V supply. Use a level shifter such as the SN74AHCT1G125 (C7484).
- **Power the strip, not just the first LED.** At roughly 60 mA per pixel at full
  white, 100 pixels is 6 A. Inject power at both ends of a long strip.
- **Fit a large capacitor across the supply** at the strip input, and a series
  resistor of a few hundred ohms on the data line — both are standard practice
  for surviving hot-plugging.
- **This is an ordinary Extended part at JLCPCB.** Check the assembly surcharge
  and whether the reflow profile suits an LED with a plastic lens.
- **The timing tolerance is tight.** Use a library that drives it from hardware.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in the 5050
package. Because it is Extended rather than Basic or Preferred, it does not
appear in the qualifying catalog snapshot, so no price or stock figures are
recorded here. [2]

## Sources

1. Worldsemi, *WS2812B — Intelligent control LED integrated light source*.
   Features and Benefits, General description, PIN function, Absolute Maximum
   Ratings, Electrical Characteristics, Switching characteristics, RGB IC
   characteristic parameter, Data transfer time.
   <https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};