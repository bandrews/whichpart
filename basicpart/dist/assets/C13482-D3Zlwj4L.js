var e=`---
part: C13482
mpn: SP3232EEY-L/TR
manufacturer: MaxLinear
category: RS232 ICs
kind: interface
package: TSSOP-16
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: SP3222E / SP3232E — True 3.0V to 5.5V RS-232 Transceivers
  publisher: MaxLinear
  document: REV 1.0.3
  url: https://www.maxlinear.com/ds/sp3222e_sp3232e.pdf
summary: A MAX232 that works from 3.3 V as well as 5 V, with ±15 kV ESD protection and smaller capacitors.
---

# SP3232EEY-L/TR

## What it is

The SP3232E is the modern equivalent of the MAX232: two RS-232 drivers and two
receivers with an on-chip charge pump that manufactures the ±5 V-plus swing that
RS-232 requires. The difference is the supply range — it works from anywhere
between 3.0 V and 5.5 V, so a 3.3 V system does not need a 5 V rail just for the
serial port. [1]

It also adds ±15 kV ESD protection, and needs only 0.1 µF charge-pump capacitors
in 3.3 V operation instead of the MAX232's 1.0 µF. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Two RS-232 drivers and two receivers with a high-efficiency charge-pump supply [1] | Same channel count as the MAX232, so it substitutes functionally. |
| Signalling standard | Meets true EIA/TIA-232-F from a 3.0 V to 5.5 V supply; interoperable with RS-232 down to a 2.7 V source [1] | "True" means it produces the real voltage swing, not a reduced-level approximation. |
| Maximum data rate | 120 kbps minimum, 235 kbps typical, into a 3 kΩ and 1,000 pF load with one driver switching [1] | Comfortably covers 115,200 baud, which is where most RS-232 links sit. The guaranteed figure is the one to design to; the typical is what a lightly loaded cable will actually manage. |
| Supply voltage | 3.0 V to 5.5 V [1] | The headline feature. Runs on 3.3 V or 5 V without changing anything. |
| Isolation or protection | ±15 kV Human Body Model, ±15 kV IEC 61000-4-2 air discharge, ±8 kV IEC 61000-4-2 contact discharge; RxIN pins tolerate ±25 V [1] | The ±25 V receiver input rating means a legacy ±12 V port cannot damage it. |
| Operating temperature | −40 °C to +85 °C, the range listed against this order code in the datasheet's ordering table [1] | Industrial range. |

## What the datasheet actually says

**The shutdown mode belongs to the SP3222E, not this part.** MaxLinear's datasheet
covers both; the 1 µA low-power shutdown with receivers still active is listed
for the SP3222E. The SP3232E has no shutdown pin. [1]

**0.1 µF capacitors are enough at 3.3 V.** The charge pump is efficient enough
that you can use small ceramics rather than the MAX232's bulky 1 µF parts — a
real board-area saving on a small design. [1]

**Absolute maximum V<sub>CC</sub> or ground current is ±100 mA**, and the
transmitter inputs and enable pins are limited to −0.3 V to V<sub>CC</sub> + 0.3 V.
The receiver inputs, by contrast, take ±25 V — the asymmetry reflects which side
faces the cable. [1]

**MaxLinear positions it for portable equipment**, which is the honest framing:
it exists because battery-powered devices could not spare a 5 V rail. [1]

## Watch out for

- **The catalog's 235 kbps figure is above the datasheet's stated minimum of
  120 kbps.** Both may be true — one is a guaranteed minimum, the other a typical
  — but design to 120 kbps.
- **Capacitor values depend on supply voltage.** 0.1 µF works at 3.3 V; check the
  datasheet's table for 5 V operation.
- **Two channels only.** Full hardware handshaking needs more.
- **Read the right column.** The SP3222E and SP3232E differ in shutdown
  capability.

## In this catalog

Basic part in TSSOP-16, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 166,222 in stock, $0.34 at quantity 1, falling to $0.181 at 5,000 —
about a fifth of the MAX232ESE's price, for a more capable part. The catalog
attributes record two drivers, two receivers, a charge pump, 3 V–5.5 V supply,
±15 kV ESD protection, 235 kbps and −40 °C to +85 °C. [2]

## Sources

1. MaxLinear, *SP3222E / SP3232E — True 3.0V to 5.5V RS-232 Transceivers*,
   REV 1.0.3. Features and Description page 1, Absolute Maximum Ratings.
   <https://www.maxlinear.com/ds/sp3222e_sp3232e.pdf>
2. JLCPCB / LCSC catalog record for C13482, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/rs232-ics_maxlinear-sp3232eey-l-tr_C13482.html>
`;export{e as default};