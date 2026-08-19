var e=`---
part: C14289
mpn: HT7533-1
manufacturer: Holtek Semicon
category: Voltage Regulators - Linear, Low Drop Out (LDO) Regulators
kind: power-linear
package: SOT-89-3
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: HT75xx-1 — 30V, 100mA Low Power LDO
  publisher: Holtek Semiconductor
  document: Rev. 2.81
  revised: 2025-12-03
  url: https://www.holtek.com/webapi/116711/HT75xx-1v281.pdf
summary: A genuine low-dropout 3.3 V regulator drawing 2.5 µA, from inputs up to 30 V — for battery designs where a 7805 would be absurd.
---

# HT7533-1

## What it is

A three-terminal 3.3 V regulator built in CMOS rather than bipolar. That choice
is what makes it a *genuine* low-dropout part: at light load it loses tens of
millivolts instead of the 2 V a classic 78xx needs, and it draws 2.5 µA of
quiescent current instead of milliamps. [1]

Use it where a battery has to last: a sensor node, a remote logger, anything that
spends most of its life asleep. The 30 V input rating in the current datasheet
revision also makes it usable directly from a 12 V or 24 V supply — within the
package's thermal limits. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 3.3 V, ±3 % (3.201 V to 3.399 V at 10 mA) [1] | Two significant figures of accuracy is fine for digital loads, marginal for an ADC reference. |
| Output current | 70 mA minimum, 100 mA typical [1] | The "100mA" in the datasheet title is the *typical* figure; the guaranteed minimum for the 3.3 V part is 70 mA. Design to 70 mA. |
| Input voltage range | Up to 30 V; absolute maximum 33 V [1] | Wide enough to regulate straight from a 12 V or 24 V rail — but see the dissipation warning below. |
| Dropout voltage | 25 mV typical, 55 mV maximum at 1 mA (defined as the input-output difference producing a 2 % output change) [1] | Excellent at light load. At tens of milliamps the drop is higher — Holtek specifies only the 1 mA point. |
| Quiescent current | 2.5 µA typical, 4.0 µA maximum, no load [1] | This is the number that matters for battery life — 2,400× better than the L78M05's 6 mA. |
| Output accuracy | ±3 % tolerance; load regulation 25 mV typical, 60 mV maximum from 1 mA to 50 mA; line regulation 0.2 %/V maximum; temperature coefficient 100 ppm/°C typical over −40 °C to +85 °C [1] | Load regulation of 60 mV worst case is about 1.8 % — visible if the load current swings a lot. |
| Operating temperature | −40 °C to +85 °C [1] | Industrial range. |

## What the datasheet actually says

**The ratings improved between revisions, and older copies of this datasheet
are still circulating.** Holtek's Rev 1.50 (2006) specified 24 V maximum input
and a 100 mV typical dropout; the current Rev 2.81 (December 2025) specifies
30 V and 25 mV. If you find a copy quoting the lower figures, it is stale — but
a very old physical part might also predate the improvement, so for a
safety-critical margin check which era your stock is from. [1]

**Power dissipation is the real limit, and it differs by package.** Holtek gives
0.50 W for SOT-89 (this part) and 0.20 W for SOT23-5, both at 25 °C with no
airflow and no heatsink, with θ<sub>JA</sub> of 200 °C/W and 500 °C/W
respectively. Regulating 24 V down to 3.3 V at just 24 mA is already 0.5 W. The
30 V input rating is real, but at high input voltages only a few milliamps of
load are thermally sustainable. [1]

**Dropout is defined unusually.** Holtek's definition is the input-output
difference at which the output falls 2 % from its value at
V<sub>IN</sub> = V<sub>OUT</sub> + 2 V. That is a looser definition than some
vendors use, so compare dropout figures across brands with care. [1]

**These are fixed regulators that can be used with external components to obtain
variable voltages**, Holtek notes — the usual divider trick, at the cost of the
quiescent-current advantage. [1]

## Watch out for

- **Thermal dissipation, not the 30 V rating, sets the usable input voltage.**
  Compute (V<sub>in</sub> − 3.3 V) × I<sub>out</sub> against 0.5 W.
- **Design to the 70 mA guaranteed minimum**, not the 100 mA typical.
- **Dropout is specified at 1 mA only.** Expect more drop at tens of milliamps.
- **CMOS LDOs are fussy about output capacitors.** Follow the datasheet's
  application circuit rather than substituting whatever is on the reel.

## In this catalog

Basic part in SOT-89-3, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 228,906 in stock, $0.14 at quantity 1, falling to $0.087 at 5,000. The
catalog attributes record fixed 3.3 V, 100 mA, 30 V supply, 25 mV dropout at
1 mA, 2.5 µA standby current and −40 °C to +85 °C — all matching the current
Rev 2.81 datasheet. (An earlier draft of these notes, written from a stale 2006
revision, wrongly flagged the 30 V and 25 mV figures as errors; the catalog was
correct. See \`ISSUES.md\`.) [1] [2]

## Sources

1. Holtek Semiconductor, *HT75xx-1 — 30V, 100mA Low Power LDO*, Rev. 2.81,
   3 December 2025. Features, General Description, Absolute Maximum Ratings,
   Thermal Information, HT7533-1 +3.3V Output Type electrical characteristics.
   <https://www.holtek.com/webapi/116711/HT75xx-1v281.pdf>
2. JLCPCB / LCSC catalog record for C14289, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/low-dropout-regulators-ldo_ht7533-1_C14289.html>
`;export{e as default};