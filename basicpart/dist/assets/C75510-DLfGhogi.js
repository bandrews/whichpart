var e=`---
part: C75510
mpn: LM317AG-TN3-R
manufacturer: UTC(Unisonic Tech)
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: TO-252-2(DPAK)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: LM317A — Medium Current 1.2V to 37V Adjustable Voltage Regulator
  publisher: Unisonic Technologies Co., Ltd (UTC)
  document: QW-R101-026.N
  revised: 2026
  url: https://www.unisonic.com.tw/uploadfiles/836/part_no_pdf/LM317A.pdf
summary: The classic adjustable regulator — 1.2 V to 37 V from two resistors, with a 1.5 A rating that depends on the voltage you are dropping.
---

# LM317AG-TN3-R

## What it is

The LM317 is the adjustable counterpart to the fixed 78xx regulators, and it is
just as old and just as widely used. It has three terminals — input, output and
adjust — and holds a constant reference voltage of about 1.25 V between output
and adjust. Put a resistor divider there and you set any output from roughly
1.2 V up to 37 V, following the datasheet's own formula:
V<sub>OUT</sub> = 1.25 V × (1 + R2/R1) + I<sub>ADJ</sub> × R2. [1]

Because it regulates a *voltage across a resistor*, it also makes a simple
constant-current source: one resistor from output to adjust, and the current is
1.25 V divided by that resistance. That trick is why LM317s still appear in LED
drivers and battery chargers. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable from 1.2 V to 37 V, set by two resistors. Internal reference 1.25 V typical, guaranteed 1.20 V to 1.30 V [1] | The reference tolerance is ±4 %, and it propagates directly into your output. For a precise rail, use 1 % divider resistors and expect the reference to dominate the error anyway. |
| Output current | In excess of 1.5 A — but that figure is specified at a 15 V input-output difference. At a 40 V difference the guaranteed maximum falls to 0.3 A [1] | **The most important conditional number on the part.** The 1.5 A headline is not available at every operating point; the internal safe-area protection folds it back as the voltage across the device rises. |
| Input voltage range | 40 V absolute maximum, and separately a 40 V absolute maximum on the input-to-output difference. Regulation is specified for a difference of 3 V to 40 V [1] | The limit that matters is the *difference*, not the input alone. A 40 V input with the output shorted sits right at the edge. |
| Dropout voltage | Not specified as such. The datasheet guarantees regulation down to a 3 V input-output difference, and quotes all its characteristics at 5 V [1] | The catalog's "5 V at 500 mA" appears to be a transcription of the datasheet's *test condition* rather than a dropout specification. Treat 3 V as the real minimum headroom. [2] |
| Quiescent current | No ground pin, so no conventional quiescent current. Adjust-pin current is 50 µA typical, 100 µA maximum; a minimum load of 4.5 mA is needed to maintain regulation [1] | The catalog records this as "–". Two practical consequences: keep the lower divider resistor small enough that 50 µA does not shift your output, and give a lightly loaded rail a bleeder resistor. |
| Output accuracy | Line regulation 0.01 %/V typical; load regulation 0.1 % typical from 10 mA to 1.5 A for outputs above 5 V; temperature stability 0.7 % of V<sub>OUT</sub>; RMS noise 0.003 % of V<sub>OUT</sub> over 10 Hz–10 kHz [1] | Genuinely good regulation, and the low noise is why LM317s persist in analogue supplies. |
| Operating temperature | −40 °C to +125 °C [1] | Wider than the −40 °C to +85 °C the catalog shows. [2] |

## What the datasheet actually says

**The catalog's 80 dB of ripple rejection requires a capacitor the listing does
not mention.** UTC specifies ripple rejection at a 10 V output and 120 Hz two
ways: with the adjust pin bare, 65 dB typical; with a 10 µF capacitor from adjust
to ground, 66 dB minimum and 80 dB typical. The catalog reports the 80 dB figure
without its condition. If you want that performance, fit the capacitor. [1][2]

**The 1.5 A rating is conditional on the voltage you are dropping.** At a 15 V
input-output difference the datasheet guarantees 1.5 A (2.2 A typical). At a 40 V
difference it guarantees only 0.3 A (0.4 A typical). The part protects its own
output transistor's safe operating area, and it does so by limiting current. [1]

**Heat is the design, not an afterthought.** In TO-252 the junction-to-ambient
thermal resistance is 103 °C/W, falling to 12 °C/W junction-to-case if the tab is
soldered to a real copper pour. Dropping 24 V to 5 V at 500 mA dissipates 9.5 W;
at 103 °C/W that is nearly 1,000 °C of rise, so the part will simply shut down
thermally. Work out (V<sub>in</sub> − V<sub>out</sub>) × I first, always. [1]

**Protection is comprehensive.** Internal thermal overload protection, internal
short-circuit current limiting, and output transistor safe-area compensation are
all listed as headline features. [1]

## Watch out for

- **Check the current you actually get at your operating point**, not the 1.5 A
  on the front page. [1]
- **Fit a 10 µF capacitor on the adjust pin** if ripple rejection matters. [1]
- **3 V of minimum headroom.** Budget it; this is not a low-dropout regulator.
- **The adjust pin needs a defined path to ground.** An open lower resistor sends
  the output towards the input voltage, which usually destroys whatever it feeds.
- **Give a lightly loaded rail a bleeder.** Below about 4.5 mA the part may not
  regulate. [1]
- **Add the recommended protection diodes** in high-voltage or
  high-capacitance designs, so a discharging output capacitor cannot back-feed
  the regulator. The datasheet's application circuits show a 1N4002 doing exactly
  this. [1]
- **For large input-output differences use a switching converter** — the
  XL1509-ADJ (C74192) in this catalog covers the same output range at 2 A
  without the heat.

## In this catalog

Preferred Extended part in TO-252-2 (DPAK), so no feeder-loading fee for Economic
PCBA at JLCPCB. At the 2026-07-24 snapshot: 10,012 in stock, $0.228 at quantity 1,
falling to $0.182 at 50, $0.138 at 500 and $0.117 at 5,000. The \`TN3\` in the order
code is UTC's designation for TO-252, and the pin order is adjust–output–input. [1][2]

## Sources

1. Unisonic Technologies Co., Ltd, *LM317A — Medium Current 1.2V to 37V
   Adjustable Voltage Regulator*, document QW-R101-026.N, © 2026. Ordering
   Information; Absolute Maximum Ratings; Thermal Data; Electrical
   Characteristics; Application Circuits.
   <https://www.unisonic.com.tw/uploadfiles/836/part_no_pdf/LM317A.pdf>
2. JLCPCB / LCSC catalog record for C75510, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/C75510.html>
`;export{e as default};