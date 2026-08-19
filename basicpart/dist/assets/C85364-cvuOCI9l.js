var e=`---
part: C85364
mpn: SRV05-4-P-T7
manufacturer: ProTek Devices
category: ESD and Surge Protection (TVS/ESD)
kind: protection
package: SOT-23-6
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: SRV05-4 — Ultra Low Capacitance Steering Diode / TVS Array
  publisher: ProTek Devices
  document: 05150.R19
  revised: 2020-12
  url: https://protekdevices.com/wp-content/uploads/datasheets/srv05_4.pdf
summary: Protects four fast data lines from static discharge without slowing them down — 3.5 pF, in a six-pin package.
---

# SRV05-4-P-T7

## What it is

The SRV05-4 protects four signal lines from electrostatic discharge. Inside are
eight small "steering" diodes and one TVS (transient voltage suppressor) diode.
When a discharge arrives on a protected line, the steering diodes route it either
up to the supply rail or down to ground, and the TVS across the rail absorbs it. [1]

The reason to choose this rather than a simpler clamp is capacitance: 3.5 pF
typical from I/O to ground. That is low enough not to distort USB 2.0, Ethernet
or other high-speed signals — which is exactly where ESD protection is most
needed, because those lines go to connectors people touch. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Steering-diode / TVS array protecting four data lines plus the power bus, in SOT-23-6 [1] | Four lines from one small package — enough for two differential pairs, or a full USB port plus spares. |
| Working voltage | 5.0 V rated standoff; 6.0 V minimum breakdown at 1 mA [1] | Suits 5 V and 3.3 V signalling. The signal must stay below 5 V in normal operation. |
| Clamping | 12.0 V maximum at 1 A peak, 15.0 V maximum at 5 A peak [1] | What the protected chip actually sees during a strike. Lower is better, and these are good figures. |
| Capacitance | 3.5 pF typical, 5.0 pF maximum, I/O to ground; 2.5 pF typical I/O to I/O [1] | The headline number, and the reason this part costs more than a plain 5 V clamp. |
| Peak pulse rating | 500 W peak pulse power per line (8/20 µs); 30 A peak pulse current across the TVS; compatible with IEC 61000-4-2 at 15 kV air / 8 kV contact, IEC 61000-4-4 at 40 A, and IEC 61000-4-5 at 24 A [1] | The IEC 61000-4-2 figures are the ones a product has to meet for CE marking. |
| Operating temperature | −55 °C to +150 °C [1] | Wide. |

## What the datasheet actually says

**ProTek's own headline is "ESD Protection > 25 kilovolts"**, while the IEC
61000-4-2 compliance figures are 15 kV air discharge and 8 kV contact discharge.
Those are different tests: the 25 kV figure is a Human Body Model-style rating,
the IEC ones are the standardised system-level tests your product will actually
be certified against. Quote the IEC numbers when it matters. [1]

**Leakage is 5 µA maximum at the working voltage.** Negligible for a data line. [1]

**The SOT-23-6 package is chosen for low lead inductance.** ProTek says this
explicitly — it "minimizes lead inductance to prevent overshoot voltages during
high ESD current events". During a nanosecond-scale strike, the inductance of the
package and the PCB trace matters as much as the diode. Short traces are not
optional. [1]

**The TVS is a 5 V reference across the rail.** Pin 5 (REF) must connect to your
supply and pin 2 to ground for the steering diodes to have anywhere to steer to.

## Watch out for

- **Place it at the connector.** ESD protection downstream of a long trace
  protects the trace, not the chip.
- **REF and GND must both be connected** — the part does nothing useful with REF
  floating.
- **5 V standoff.** Signals must stay below it in normal operation.
- **Four lines, one package** — but they share the TVS, so simultaneous strikes
  on multiple lines are not four times the rating.

## In this catalog

Preferred Extended part in SOT-23-6. At the 2026-07-24 snapshot: 27,764 in stock,
$0.30 at quantity 1, falling to $0.16 at 6,000 — about 45× the price of the
15 pF H5VL10B, which is what low capacitance costs. The catalog attributes record
four channels, 5 V standoff, 6 V breakdown, 12 V clamping, 3.5 pF capacitance,
500 W at 8/20 µs, 5 µA leakage and IEC 61000-4-2/-4-4/-4-5 compliance, all
matching the datasheet. [2]

## Sources

1. ProTek Devices, *SRV05-4 — Ultra Low Capacitance Steering Diode / TVS Array*,
   document 05150.R19, December 2020. Description, Features, Mechanical
   Characteristics, Pin Configuration, Maximum Ratings, Electrical
   Characteristics Per Line, capacitance table.
   <https://protekdevices.com/wp-content/uploads/datasheets/srv05_4.pdf>
2. JLCPCB / LCSC catalog record for C85364, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/esd-and-surge-protection-tvs-esd_protek-devices-srv05-4-p-t7_C85364.html>
`;export{e as default};