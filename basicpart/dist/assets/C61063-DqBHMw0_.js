var e=`---
part: C61063
mpn: XL1509-5.0E1
manufacturer: XLSEMI
category: DC-DC Converters
kind: power-switching
package: SOIC-8
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: XL1509 — 2A 150KHz 40V Buck DC to DC Converter
  publisher: XLSEMI (Shanghai Xinlong Semiconductor)
  document: Rev 2.6
  url: http://www.xlsemi.com/datasheet/XL1509-EN.pdf
summary: A fixed 5 V, 2 A buck converter from up to 40 V — with an enable pin that is active low, not high.
---

# XL1509-5.0E1

## What it is

A step-down switching regulator with the power switch built in, delivering a
fixed 5 V at up to 2 A. It is functionally the same kind of part as TI's LM2596,
in a smaller and much cheaper package, and it needs only an inductor, a catch
diode and two capacitors around it. [1]

Its natural use is getting 5 V from a 12 V or 24 V supply without the heat a
linear regulator would produce. A 78L05 dropping 24 V to 5 V at 100 mA wastes
1.9 W; this converter does the same job at twenty times the current and a
fraction of the loss. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Output voltage | Fixed 5 V, guaranteed 4.8 V to 5.2 V (±4 %) from 0.2 A to 2 A [1] | No feedback divider to size or get wrong. ±4 % is loose by modern standards but fine for a 5 V logic rail. |
| Output current | 2 A continuous. Internal switch current limit 4 A typical [1] | Twice what a linear regulator in this package could dream of, with real headroom above the rating. |
| Input voltage range | 4.5 V to 40 V for the family, but the 5 V version's output is specified only from **7 V** to 40 V. Absolute maximum 45 V [1] | **The catalog's 4.5 V is the family minimum, not this part's.** Minimum dropout is 1.5 V, so 7 V in is what the datasheet actually guarantees 5 V out from. [2] |
| Switching frequency | 150 kHz nominal, guaranteed 127 kHz to 173 kHz [1] | The same as the LM2596, and the same consequence: a physically large inductor. |
| Efficiency | 82 % typical at 12 V in, 5 V out, 2 A [1] | Good for a non-synchronous design — the catch diode's forward drop is where most of the remaining loss goes. The catalog records no efficiency figure at all. [2] |
| Operating temperature | Junction temperature −40 °C to +125 °C. Thermal resistance 100 °C/W in SOP-8 with no heatsink [1] | The catalog's −40 °C to +85 °C is an ambient figure; at 100 °C/W the junction runs well above ambient, so check your dissipation. [2] |

## What the datasheet actually says

**The enable pin is active low.** This is the trap on this part. XLSEMI's pin
table states it plainly: drive EN low to turn the device *on*, high to turn it
*off*, and a floating pin defaults low — that is, running. The thresholds are
0.8 V maximum for on and 1.4 V minimum for off. Anyone who wires EN like a
conventional active-high enable will build a converter that is off when they
expect it on. [1]

**7 V is the real minimum input for the 5 V version.** The datasheet specifies
each output voltage separately: the 3.3 V part from 4.75 V, the adjustable part
from 4.5 V, and this 5 V part from 7 V. With a stated minimum dropout of 1.5 V
that makes sense — you cannot make a regulated 5 V from 5 V. [1]

**There is a second current limit that changes the frequency.** When it trips,
the operating frequency drops from 150 kHz to 50 kHz, which reduces the energy
delivered per fault cycle. If you ever measure an unexpected 50 kHz on the switch
node, the part is telling you it is in trouble. [1]

**The ground pins have a layout requirement.** Pins 5 through 8 are all ground,
and the datasheet asks that they sit *outside* the current path running from the
Schottky diode to the output capacitor, so switching spikes are not injected into
the chip's own ground reference. [1]

**Shutdown current is genuinely low, running current is not.** Held off, the part
draws 80 µA typical (200 µA maximum). Running, quiescent supply current is 2 mA
typical and up to 10 mA. [1]

## Watch out for

- **EN is active low, and floats on.** [1]
- **Feed it at least 7 V** if you want a guaranteed 5 V out. [1]
- **Add the catch diode.** This is a non-synchronous converter; omitting the
  diode, or using a slow silicon one, ruins efficiency or destroys the part. A
  Schottky such as the SS14 (C7420316) in this catalog is the usual choice.
- **150 kHz means a big inductor** — tens of microhenries rated well over 2 A.
  Compared with the 500 kHz TPS5430 or the 570 kHz TPS54331, the magnetics are
  substantially larger. That is the trade for the price.
- **Layout matters.** Keep the input capacitor, the switch node and the diode in
  the smallest loop you can, route feedback away from the switch node, and place
  the ground pins as the datasheet asks. [1]
- **SOIC-8 without an exposed pad** means the thermal path is through the pins,
  at 100 °C/W. Check dissipation before assuming a full 2 A. [1]

## In this catalog

Basic part in SOIC-8, so no feeder-loading fee for Economic PCBA at JLCPCB. At
the 2026-07-24 snapshot: 238,840 in stock, $0.232 at quantity 1, falling to
$0.180 at 50, $0.132 at 500 and $0.111 at 4,000 — about a sixth the price of the
LM2596 for the same job at two thirds the current. The catalog attributes record
5 V fixed output, 2 A, 150 kHz, 2 mA quiescent, a built-in switch and a
4.5 V–40 V input range; that last figure is the family's, not this variant's. [2]

## Sources

1. XLSEMI, *XL1509 — 2A 150KHz 40V Buck DC to DC Converter*, Rev 2.6. Features;
   Pin Description (Table 1); Ordering Information; Absolute Maximum Ratings;
   XL1509-5.0 Electrical Characteristics; Electrical Characteristics (DC
   Parameters); Test Circuit and Layout Guidelines.
   <http://www.xlsemi.com/datasheet/XL1509-EN.pdf>
2. JLCPCB / LCSC catalog record for C61063, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). Source for package, tier,
   price, stock and the catalog attribute strings.
   <https://www.lcsc.com/product-detail/dc-dc-converters_xlsemi-xl1509-5-0e1_C61063.html>
`;export{e as default};