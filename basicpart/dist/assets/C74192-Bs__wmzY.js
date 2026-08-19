var e=`---
part: C74192
mpn: XL1509-ADJE1
manufacturer: XLSEMI
category: DC-DC Converters
kind: power-switching
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: XL1509 — 2A 150KHz 40V Buck DC to DC Converter
  publisher: XLSEMI (Shanghai Xinlong Semiconductor)
  document: Rev 2.6
  url: http://www.xlsemi.com/datasheet/XL1509-EN.pdf
summary: The adjustable XL1509 — 1.23 V to 37 V at 2 A, with the same active-low enable pin as the fixed versions.
---

# XL1509-ADJE1

## What it is

The adjustable member of the XL1509 family: the same 2 A step-down switching
regulator as the fixed 5 V version, but with the feedback pin brought out so two
resistors set the output anywhere from 1.23 V to 37 V. [1]

Choose it over a fixed version when you need a voltage the family does not offer
— 9 V, or a rail you are matching to something else — or when you want one part
number to cover several designs. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Adjustable from 1.23 V to 37 V, set by two resistors. Feedback reference 1.23 V, guaranteed 1.193 V to 1.267 V (±3 %) from 0.2 A to 2 A [1] | 1.23 V is the internal reference and the lowest output you can set. The reference tolerance propagates straight into your output. |
| Output current | 2 A continuous. Internal switch current limit 4 A typical [1] | Twice what a linear regulator in this package could dream of, with real headroom above the rating. |
| Input voltage range | 4.5 V to 40 V, and unlike the fixed 5 V version this is the figure the datasheet specifies for the adjustable part itself. Absolute maximum 45 V [1] | Wide enough for 12 V and 24 V industrial rails. You still need 1.5 V of dropout above your chosen output. |
| Switching frequency | 150 kHz nominal, guaranteed 127 kHz to 173 kHz [1] | Design the inductor for the low end, where ripple current is highest. |
| Efficiency | 74 % typical at 12 V in, 3 V out, 2 A [1] | Lower than the 5 V version's 82 % because the catch diode's fixed forward drop is a larger share of a smaller output voltage. The catalog records no efficiency figure. [2] |
| Operating temperature | Junction temperature −40 °C to +125 °C. Thermal resistance 100 °C/W in SOP-8 with no heatsink [1] | The catalog's −40 °C to +85 °C is an ambient figure; at 100 °C/W the junction runs well above ambient, so check your dissipation. [2] |

## What the datasheet actually says

**The enable pin is active low.** As on the rest of the family, XLSEMI's pin
table states it plainly: drive EN low to turn the device *on*, high to turn it
*off*, and a floating pin defaults low — that is, running. The thresholds are
0.8 V maximum for on and 1.4 V minimum for off. Anyone who wires EN like a
conventional active-high enable will build a converter that is off when they
expect it on. [1]

**Low outputs cost efficiency.** The datasheet's own figures make the point: the
same silicon manages 90 % at 12 V out, 82 % at 5 V out and 74 % at 3 V out. The
catch diode drops roughly the same voltage regardless, so the lower your output,
the larger a share of the power it takes. Below about 3 V, consider a synchronous
converter instead. [1]

**There is a second current limit that changes the frequency.** When it trips,
the operating frequency drops from 150 kHz to 50 kHz, which reduces the energy
delivered per fault cycle. An unexpected 50 kHz on the switch node means the part
is in trouble. [1]

**The ground pins have a layout requirement.** Pins 5 through 8 are all ground,
and the datasheet asks that they sit *outside* the current path running from the
Schottky diode to the output capacitor, so switching spikes are not injected into
the chip's own ground reference. [1]

**Watch the feedback pin's absolute maximum.** On the adjustable, 3.3 V and 5 V
versions the FB pin is rated −0.3 V to 7 V — not to V<sub>in</sub>. A divider
fault that puts the full output on FB can exceed it. [1]

## Watch out for

- **EN is active low, and floats on.** [1]
- **Get the feedback divider right.** Unlike a fixed version, a wrong resistor
  here puts the wrong voltage on your whole board — and can exceed the FB pin's
  7 V rating. [1]
- **Add the catch diode.** This is a non-synchronous converter; omitting it, or
  using a slow silicon diode, ruins efficiency or destroys the part. A Schottky
  such as the SS14 (C7420316) in this catalog is the usual choice.
- **150 kHz means a big inductor** — tens of microhenries rated well over 2 A.
  Size it for 127 kHz, the guaranteed low end. [1]
- **Layout matters.** Keep the input capacitor, the switch node and the diode in
  the smallest loop you can, route feedback away from the switch node, and place
  the ground pins as the datasheet asks. [1]
- **SOIC-8 without an exposed pad** means the thermal path is through the pins,
  at 100 °C/W. Check dissipation before assuming a full 2 A. [1]

## In this catalog

Preferred Extended part in SOIC-8, so no feeder-loading fee for Economic PCBA at
JLCPCB. At the 2026-07-24 snapshot: 129,419 in stock, $0.272 at quantity 1,
falling to $0.216 at 50, $0.165 at 500 and $0.124 at 4,000 — about a cent more
than the fixed 5 V version at volume, for the flexibility. The catalog attributes
record a 1.23 V–37 V adjustable output, 2 A, 127–173 kHz, 2 mA quiescent, a
built-in switch and a 4.5 V–40 V input range, all of which the datasheet
confirms. [2]

## Sources

1. XLSEMI, *XL1509 — 2A 150KHz 40V Buck DC to DC Converter*, Rev 2.6. Features;
   Pin Description (Table 1); Ordering Information; Absolute Maximum Ratings;
   XL1509-ADJ Electrical Characteristics; Electrical Characteristics (DC
   Parameters); Test Circuit and Layout Guidelines.
   <http://www.xlsemi.com/datasheet/XL1509-EN.pdf>
2. JLCPCB / LCSC catalog record for C74192, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/C74192.html>
`;export{e as default};