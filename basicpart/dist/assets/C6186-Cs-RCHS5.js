var e=`---
part: C6186
mpn: AMS1117-3.3
manufacturer: Advanced Monolithic Systems
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: SOT-223
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: AMS1117 — 1A Adjustable/Fixed Low Dropout Linear Regulator
  publisher: Advanced Monolithic Systems
  document: AMS1117_20120314
  revised: 2012-03-14
  url: http://www.ams-semitech.com/attachments/File/AMS1117_20120314.pdf
summary: The 3.3 V rail on countless dev boards — 1 A, cheap, and with over a million in stock here.
---

# AMS1117-3.3

## What it is

If a development board has a 3.3 V rail derived from 5 V, there is a good chance
this is the part doing it. The AMS1117-3.3 is a three-terminal fixed 3.3 V
regulator rated for 1 A, in a SOT-223 package with a large tab for heat. [1]

It is often described as an LDO, and it is — but "low dropout" here means about
1.1 V, not the 100 mV of a modern CMOS LDO. That is fine for 5 V-to-3.3 V, which
is exactly the job it is usually given. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 3.3 V, specified as 3.234 V to 3.366 V (±2 %) for 4.8 V ≤ V<sub>IN</sub> ≤ 10.3 V and 10 mA ≤ I<sub>OUT</sub> ≤ 1 A [1] | The datasheet ties accuracy to a specific input range — that is where the ±2 % is guaranteed. |
| Output current | 1 A; current limit 1.1 A minimum, 1.5 A typical at V<sub>IN</sub> − V<sub>OUT</sub> = 2 V [1] | The 1 A is real, but see the thermal note below. |
| Input voltage range | 4.8 V to 10.3 V for guaranteed 3.3 V regulation; the catalog records a 15 V supply figure [1] [2] | The 4.8 V floor comes from the dropout — you cannot make 3.3 V from 4 V with this part. |
| Dropout voltage | 1.1 V typical, 1.25 V maximum at 1 A [1] | This is high. It is the single most important number about the part. |
| Quiescent current | 5 mA typical, 13 mA maximum, measured at V<sub>IN</sub> = V<sub>OUT</sub> + 1.25 V. Adjust-pin current 50 µA typical, 120 µA maximum [1] | The catalog's 5 mA is the typical figure; the guaranteed maximum is nearly three times that. AMS notes that unlike a PNP regulator, this current flows into the load rather than being wasted — but it is still 5 mA you cannot switch off, so this is not a battery part. [1][2] |
| Output accuracy | ±2 %; load regulation 0.2 % typical, 1 % maximum over 10 mA to 1 A at V<sub>IN</sub> − V<sub>OUT</sub> = 2 V [1] | Good enough for logic, adequate for many ADC references. |
| Operating temperature | Operating junction temperature −20 °C to +125 °C [1] | Note the −20 °C floor, not −40 °C — see \`ISSUES.md\`. |

## What the datasheet actually says

**Heat is the whole story at 1 A.** Dropping 5 V to 3.3 V at 1 A dissipates 1.7 W
in a SOT-223. Without a substantial copper pour the part will hit its thermal
limit and fold back long before it fails — on-chip thermal limiting protects it,
but your 3.3 V rail stops being 3.3 V. Treat 1 A as a figure that needs a heatsink
of copper, not a promise.

**There is a layout instruction on the front page.** AMS states: "The distance
between Vout pin and Capacitor should not exceed 4cm for excellent performance."
That is unusually specific and worth honouring — this regulator's stability
depends on its output capacitor. [1]

**Minimum load applies to the adjustable version.** The fixed 3.3 V part does not
have that constraint, but the ADJ variant does. [1]

**On-chip thermal limiting** protects against any combination of overload and
ambient temperature. [1]

## Watch out for

- **1.1 V of dropout.** You cannot run this from a discharging lithium cell to
  make 3.3 V. Use a CMOS LDO such as the XC6206 or HT7533 for that.
- **The tab is a heatsink.** Give it copper.
- **Counterfeits and relabels are widespread** on this part number. Buying it as
  a JLCPCB Basic part with a traceable LCSC record is a meaningful protection.
- **Keep the output capacitor within 4 cm.** The datasheet says so explicitly.

## In this catalog

Basic part in SOT-223, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 1,388,193 in stock — by a wide margin the deepest stock of any part in
this catalog — at $0.20 in ones, falling to $0.104 at 5,000. The catalog
attributes record fixed 3.3 V, 1 A, 1.1 V dropout at 800 mA, 5 mA standby current,
72 dB PSRR at 120 Hz and thermal/short-circuit protection. Two entries need care:
the catalog's −40 °C to +125 °C operating range against the datasheet's −20 °C to
+125 °C junction range, and its 15 V supply figure against the datasheet's
10.3 V upper limit for guaranteed 3.3 V regulation. See \`ISSUES.md\`. [2]

## Sources

1. Advanced Monolithic Systems, *AMS1117 — 1A Adjustable/Fixed Low Dropout Linear
   Regulator*, AMS1117_20120314, 14 March 2012. Key Features, General
   Description, Typical Application note, Absolute Maximum Ratings, Electrical
   Characteristics. <http://www.ams-semitech.com/attachments/File/AMS1117_20120314.pdf>
2. JLCPCB / LCSC catalog record for C6186, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/voltage-regulators-linear-low-drop-out-ldo-regulators_advanced-monolithic-systems-ams1117-3-3_C6186.html>
`;export{e as default};