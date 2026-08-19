var e=`---
part: C42432160
mpn: IS281B-N-AXW
manufacturer: ISOMICRON
category: Transistor, Photovoltaic Output Optoisolators
kind: isolation
package: SSOP-4
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: IS281X-N High Isolation Photo Coupler
  publisher: ISOMICRON
  revised: 2023-07-27
  url: https://datasheet.lcsc.com/datasheet/pdf/15bccda90490db9859724aab46f62c6f.pdf
summary: A tighter-tolerance optocoupler — its datasheet puts the "B" grade's current transfer ratio in a 2:1 band, 130–260 %.
---

# IS281B-N-AXW

## What it is

An optocoupler is an infrared LED and a phototransistor sealed facing each other
inside one package, with no electrical connection between them. Light crosses
the gap; current does not. That gives you a signal path across an isolation
barrier — what you need when two parts of a system sit at different ground
potentials, or when one side is at mains voltage. [1]

The IS281X-N is ISOMICRON's four-pin device of that kind: an aluminium gallium
arsenide infrared emitting diode coupled to a silicon planar phototransistor in
a low-profile plastic SSOP4 body, held apart by what the company calls a
coplanar double-mould structure. It is aimed at switch-mode power supply
feedback, programmable controllers, household appliances and office
equipment. [1]

What makes the \`B\` in the part number worth paying attention to is gain sorting:
the datasheet publishes a separate current transfer ratio band for each of the
four grades, and quotes the \`281B-N\` band by name. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel optocoupler: infrared LED input, phototransistor output [1] | One signal per package, one direction only. |
| Isolation rating | 3,750 V RMS, applied as AC for one minute at 40–60 % relative humidity. Isolation resistance 10¹² Ω minimum and 10¹⁴ Ω typical at 500 V DC; input-to-output capacitance 0.4 pF typical, 1 pF maximum. Regulatory approvals named as UL 1577, VDE EN 60747-5-5 (VDE 0884-5) and CQC GB 4943.1 [1] | A one-minute type test, not a continuous working voltage. The approvals are named but no agency file numbers are given, so ask for the certificates if you need them for compliance. |
| Channel count and direction | 1 channel, input to output only [1] | For signalling in both directions you need two devices. |
| Maximum data rate | Not specified as a data rate. Rise time 3 µs typical and fall time 4 µs typical, both 18 µs maximum, at V<sub>CE</sub> = 2 V, I<sub>C</sub> = 2 mA, R<sub>L</sub> = 100 Ω; cut-off frequency 80 kHz typical at the −3 dB point under the same conditions [1] | Those edges and that bandwidth put it in the tens of kilobits per second — fine for a control line or a feedback loop, far too slow for a serial data link. For megabit isolation, use a digital isolator such as the ADuM1201 (C9669). |
| Supply voltage | None: an optocoupler has no supply pin of its own. Input side: forward voltage 1.4 V maximum at 10 mA, forward current up to 60 mA continuous (1 A peak for 100 µs pulses at 100 Hz), reverse voltage 6 V, 100 mW. Output side: collector-emitter voltage up to 80 V, collector current up to 50 mA, 150 mW; 200 mW for the package as a whole [1] | The input is just a diode, so it needs a series resistor sized for your drive voltage. The output is an open-collector transistor, so it needs a pull-up to define the high level. |
| Operating temperature | −40 °C to +110 °C; storage −55 °C to +125 °C [1] | Matches the catalog attribute. [2] |

## What the datasheet actually says

**The gain grade is spelled out, not inferred.** Current transfer ratio (CTR) is
the collector current you get out divided by the LED current you put in,
expressed as a percentage, measured here at 5 mA into the LED with 5 V across
the output transistor. The electrical table gives a separate row for each grade
— 281A-N is 80–160 %, 281B-N is 130–260 %, 281C-N is 200–400 % and 281D-N is
300–600 % — and the ordering section confirms that the letter after \`281\` is the
CTR rank. This part is the \`B\`, so 130–260 % is the datasheet's own figure for
this exact order code, and the catalog agrees. [1][2]

**A 2:1 gain band is the reason to choose a graded part.** Taken together the
four grades cover 80 % to 600 %, and if you buy a part whose grade is not
specified you have to size the LED current for the bottom of that whole range —
after which every better-than-worst part runs its LED harder than it needs to,
wasting current and ageing the LED faster. Knowing the gain to within 2:1 lets
you design close to the real operating point. [1]

**The typical switching times are not the guaranteed ones.** Rise and fall are
3 µs and 4 µs typical but 18 µs maximum — four to six times slower — and the
datasheet's disclaimer states plainly that the characteristic curves represent
typical performance and are not guaranteed. Timing margin has to be built
against 18 µs. [1]

**The saturation voltage is quoted at a modest load.** The output transistor
drops 0.1 V typical and 0.2 V maximum with 10 mA into the LED and only 1 mA of
collector current. Draw more current than that and the drop grows, so the "low"
level is never quite ground. Collector leakage with the LED off is up to
100 nA at 20 V. [1]

## Watch out for

- **Stock was 4 units at the snapshot date.** That is effectively unavailable —
  check before designing it in. See \`ISSUES.md\`. [2]
- **The grade letter is part of the order code.** An \`IS281\` without the \`B\` is
  a different gain band, and the \`N\` after it means the enhanced-performance
  version rather than the normal one. [1]
- **The \`-AXW\` on the end is not the manufacturer's.** ISOMICRON's ordering
  table lists this device as \`IS281B-N\` on 13-inch reels of 3,000; the trailing
  letters come from the distributor's packing code, not from the datasheet. [1][2]
- **Design for the minimum CTR, then leave room for ageing.** An optocoupler's
  LED dims over years of operation, so a circuit that only just works when new
  can fail later. This datasheet publishes no degradation curve or lifetime
  figure; its only statement on the subject is the disclaimer that performance
  may vary over time. [1]
- **The isolation rating belongs to the package, not the board.** The copper
  either side needs the same separation across the board surface (creepage) and
  through the air (clearance); the datasheet gives neither figure. [1]
- **Check the footprint before substituting.** The drawing gives a
  4.40 × 2.70 mm body on 1.27 mm lead pitch, a 7.00 mm lead span and a 2.10 mm
  typical height, with a 7.40 mm land pattern. Four-pin optocouplers are sold on
  both 1.27 mm and 2.54 mm pitch, so a part with the same pin count is not
  automatically the same footprint. [1]

## In this catalog

Preferred Extended part in SSOP-4. At the 2026-07-24 snapshot: **4 in stock**,
$0.042 at quantity 1, falling to $0.041 at 100, $0.040 at 300 and $0.0395 at
1,000. Every catalog attribute checks out against the datasheet — 3.75 kV
isolation, 130 % to 260 % CTR, 1.4 V forward voltage (which is the maximum; the
datasheet gives no typical), 60 mA forward and 50 mA collector current, 6 V
reverse, 80 V load voltage, 200 mW total dissipation, 100 mV saturation at 1 mA
out and 10 mA in, 3 µs and 4 µs switching, and −40 °C to +110 °C. The one thing
the attributes do not convey is that the switching times are typical values with
an 18 µs maximum behind them. [2]

## Sources

1. ISOMICRON, *IS281X-N High Isolation Photo Coupler*, Rev. V01, release date
   2023-07-27. Features and Regulatory Approvals, Absolute Maximum Ratings,
   Electrical Optical Characteristics, Package Dimensions, Ordering and Marking
   Information, Disclaimer.
   <https://datasheet.lcsc.com/datasheet/pdf/15bccda90490db9859724aab46f62c6f.pdf>
2. JLCPCB / LCSC catalog record for C42432160, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/transistor-photovoltaic-output-optoisolators_isomicron-is281b-n-axw_C42432160.html>
`;export{e as default};