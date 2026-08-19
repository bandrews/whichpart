var e=`---
part: C42432283
mpn: ICPL-356-50CEAXW
manufacturer: ISOMICRON
category: Transistor, Photovoltaic Output Optoisolators
kind: isolation
package: SOP-4
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: ICPL-356 silicon planar phototransistor
  publisher: ISOMICRON
  revised: 2023-07-23
  url: https://datasheet.lcsc.com/datasheet/pdf/c46af7ff312be366f2d1aa118c0aa2ac.pdf
summary: A high-gain optocoupler in SOP-4 whose order code names its 200–400 % gain grade — and the grade letter is printed on the part.
---

# ICPL-356-50CEAXW

## What it is

An optocoupler is an infrared LED and a phototransistor sealed facing each other
inside one package, with no electrical connection between them. Light carries the
signal across; current cannot follow. That is how you pass a control signal
between two circuits that do not share a ground, or between a microcontroller and
something at mains potential. [1]

The ICPL-356 pairs an aluminium gallium arsenide infrared emitting diode with a
silicon planar phototransistor in a plastic four-pin SOP body, held apart by
what ISOMICRON calls a coplanar double-mould structure. It is aimed at feedback
inside switch-mode power supplies, programmable controllers, household
appliances and office equipment. [1]

Its distinguishing feature is gain sorting. The datasheet splits the family into
three current transfer ratio grades and ties each to a letter in the order code;
this part is the \`C\`, the highest of the three. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel optocoupler: infrared LED input, phototransistor output [1] | One signal per package, one direction only. |
| Isolation rating | 3,750 V RMS, applied as AC for one minute at 40–60 % relative humidity. Isolation resistance 10¹² Ω minimum and 10¹⁴ Ω typical at 500 V DC; input-to-output capacitance 0.4 pF typical, 1 pF maximum. Regulatory approvals named as UL 1577, VDE EN 60747-5-5 (VDE 0884-5) and CQC GB 4943.1 [1] | This is a one-minute withstand test, not a voltage you can sit at continuously. The approvals are listed without file numbers, so ask for the certificates if a compliance file needs them. |
| Channel count and direction | 1 channel, input to output only [1] | Two devices are needed for signalling in both directions. |
| Maximum data rate | Not specified as a data rate. Rise time 3 µs typical and fall time 4 µs typical, both 18 µs maximum, at V<sub>CE</sub> = 2 V, I<sub>C</sub> = 2 mA, R<sub>L</sub> = 100 Ω; cut-off frequency 80 kHz typical at the −3 dB point under the same conditions [1] | Microsecond edges and an 80 kHz bandwidth put this in the tens of kilobits per second. It suits a control line or a feedback loop; for a megabit data link use a digital isolator such as the ADuM1201 (C9669). |
| Supply voltage | None: an optocoupler has no supply pin of its own. Input side: forward voltage 1.24 V typical and 1.4 V maximum at 10 mA, forward current up to 60 mA continuous (1 A peak for 100 µs pulses at 100 Hz), reverse voltage 6 V, 100 mW. Output side: collector-emitter voltage up to 80 V, collector current up to 50 mA, 150 mW; 200 mW for the package as a whole [1] | The input is a plain diode and needs a series resistor. The output is an open-collector transistor and needs a pull-up to define the high level. |
| Operating temperature | −40 °C to +110 °C; storage −55 °C to +125 °C [1] | Matches the catalog attribute. [2] |

## What the datasheet actually says

**The order code names the gain grade, and so does the marking on the part.**
Current transfer ratio (CTR) is the collector current out divided by the LED
current in, as a percentage. The electrical table gives three bands — A is
80–160 %, B is 130–260 %, C is 200–400 % — and the ordering section decodes
\`ICPL-356-50CE\` as part 356, lead form 5 (surface mount, low profile),
performance 0 (normal rather than enhanced), CTR rank \`C\`, and \`E\` for
halogen-free and lead-free. The same rank letter is printed on the package, in
the \`356X\` field of the \`ICPL 356X /YYWW A\` marking, so the grade can be
confirmed by looking at the device. That makes the 200–400 % band the
datasheet's own figure for this order code, and the catalog agrees. [1][2]

**That band is specified at one operating point only.** The CTR figures hold at
5 mA into the LED with 5 V across the output transistor, at 25 °C. Gain falls
away at low forward currents and shifts with temperature — the datasheet shows
both as normalised curves (Figures 7 and 8) — and its disclaimer states that the
characteristic curves represent typical performance and are not guaranteed. If
your circuit runs the LED at 1 mA rather than 5 mA, the guaranteed 200 % no
longer applies. [1]

**The saturation voltage is measured at a heavy LED drive and a light load.**
The output transistor drops 0.06 V typical and 0.2 V maximum with 20 mA into the
LED and just 1 mA of collector current. The catalog quotes 200 mV at 10 mA and
1 mA, which is not the condition the datasheet uses. Either way, the "low" level
is a saturated transistor, not ground, and the drop rises as you take more
current. Leakage with the LED off is up to 100 nA at 20 V. [1][2]

**The typical switching times are not the guaranteed ones.** Rise and fall of
3 µs and 4 µs are typical; the guaranteed maximum for both is 18 µs. Timing
margin has to be built against 18 µs, not against 3. [1]

## Watch out for

- **Design for the bottom of the gain band, then leave room for ageing.** An
  optocoupler's LED dims over years of operation, so a circuit that only just
  works when new can fail later. This datasheet publishes no degradation curve
  and no lifetime figure; the only statement it makes on the subject is the
  disclaimer that performance may vary over time. [1]
- **Check what happens at the top of the band too.** 200–400 % still doubles
  across the range, so verify the circuit behaves at 400 % as well as 200 %. [1]
- **Do not read across from the catalog's saturation-voltage condition.** The
  datasheet's 0.2 V maximum is at 20 mA in and 1 mA out; the catalog attribute
  says 10 mA. [1][2]
- **The \`-AXW\` on the end is not the manufacturer's.** ISOMICRON's ordering
  table lists this device as \`ICPL-356-50CE\` on 13-inch reels of 3,000; the
  trailing letters are the distributor's packing code. [1][2]
- **The isolation rating belongs to the package, not the board.** The copper
  either side needs the same separation across the board surface (creepage) and
  through the air (clearance); the datasheet specifies neither. [1]
- **Check the land pattern.** The drawing gives a 4.40 × 3.60 mm body on 2.54 mm
  lead pitch, a 7.00 mm lead span and a 2.10 mm typical height, with a 7.40 mm
  recommended pad span. That is full 2.54 mm pitch; other four-pin optocouplers
  use 1.27 mm half pitch in the same 7.00 mm lead span, so pin count alone does
  not tell you the land pattern. [1]

## In this catalog

Preferred Extended part in SOP-4. At the 2026-07-24 snapshot: 12,000 in stock,
$0.066 at quantity 1, falling to $0.053 at 100, $0.046 at 300, $0.041 at 3,000
and $0.036 at 9,000. Of the four optocouplers in the snapshot it is the only one
that combines a gain band its own datasheet names for the exact order code with
stock in quantity. The catalog attributes agree with the datasheet on isolation
(3.75 kV), CTR (200 % to
400 %), forward voltage (1.24 V typical), 60 mA forward and 50 mA collector
current, 6 V reverse, 80 V load voltage, 200 mW total dissipation, −40 °C to
+110 °C, and the 3 µs/4 µs switching times at 2 mA into 100 Ω. The one attribute
that does not match is the saturation-voltage condition: the catalog's
"200mV@10mA,1mA" against the datasheet's 0.2 V maximum at 20 mA in and 1 mA
out. [2]

## Sources

1. ISOMICRON, *ICPL-356 silicon planar phototransistor*, Rev. V01, release date
   2023-07-23. Features and Regulatory Approvals, Absolute Maximum Ratings,
   Electrical Optical Characteristics, Characteristic Curves, Package
   Dimensions, Ordering and Marking Information, Disclaimer.
   <https://datasheet.lcsc.com/datasheet/pdf/c46af7ff312be366f2d1aa118c0aa2ac.pdf>
2. JLCPCB / LCSC catalog record for C42432283, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/transistor-photovoltaic-output-optoisolators_isomicron-icpl-356-50ceaxw_C42432283.html>
`;export{e as default};