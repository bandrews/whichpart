var e=`---
part: C7512
mpn: ULN2003ADR
manufacturer: Texas Instruments
category: Darlington Transistor Arrays
kind: logic
package: SOIC-16
tier: basic
catalog_snapshot: 2026-07-24
datasheet:
  title: ULN200x, ULQ200x — High-Voltage, High-Current Darlington Transistor Arrays
  publisher: Texas Instruments
  document: SLRS027T
  revised: 2025-03
  url: https://www.ti.com/lit/ds/symlink/uln2003a.pdf
summary: Seven low-side switches in one chip, each good for 500 mA at up to 50 V, with built-in flyback diodes.
---

# ULN2003ADR

## What it is

The ULN2003A is seven transistor switches in a single 16-pin package. Each
channel takes a logic-level input and pulls its output down to ground, sinking
up to 500 mA from a load connected to a higher supply. It is the standard answer
to "my microcontroller pin cannot drive this relay / solenoid / stepper motor /
LED bar". [1]

Two details make it more than seven transistors. The inputs have a 2.7 kΩ series
base resistor built in, so you can drive them directly from 5 V logic with no
extra parts. And there is a common-cathode clamp diode on every output, which
absorbs the inductive kick when you switch off a relay or motor coil. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Seven NPN Darlington pairs, open-collector outputs, with common-cathode clamp diodes [1] | Low-side switching only — the load goes between the positive supply and the output pin. |
| Logic family | Not a logic family; inputs have a 2.7 kΩ series base resistor for direct TTL or 5 V CMOS drive [1] | The 2.7 kΩ resistor is why this variant, not the ULN2004A, is the one for 5 V logic. |
| Supply voltage | Collector-emitter voltage 0 V to 50 V [1] | The load supply, not a logic supply — this chip has no V<sub>CC</sub> pin of its own. |
| Output drive | 500 mA peak per channel; channels may be paralleled for more, and TI shows a separate derating curve for two Darlingtons in parallel. Collector-emitter saturation voltage 0.9 V typical and 1.1 V maximum at 100 mA, 1.0/1.3 V at 200 mA and 1.2/1.6 V at 350 mA [1] | 500 mA is the rating for a *single* output; driving all seven at once is limited by package power dissipation, not by this number. That saturation voltage is the real cost of a Darlington — at 350 mA you lose 1.6 V and dissipate over half a watt inside the chip. |
| Propagation delay | 0.25 µs typical and 1 µs maximum at 25 °C, both low-to-high and high-to-low [1] | Microseconds, not nanoseconds — a Darlington is slow. Fine for relays and solenoids; a real constraint if you are driving a stepper at speed or dimming an LED with PWM, where a 1 µs edge starts to distort short pulses. |
| Operating temperature | Junction temperature −40 °C to +125 °C in the recommended operating conditions; TI's absolute-maximum table separately caps free-air temperature at +70 °C for the plain ULN200xA parts, against +105 °C for the \`AI\` versions [1] | The junction figure is really a power-dissipation budget, but the 70 °C ambient ceiling is a hard one for this order code — worth checking against a warm enclosure. |

## What the datasheet actually says

**A Darlington does not saturate like a single transistor.** The V<sub>CE(sat)</sub>
figures — 0.9 V typical at 100 mA rising to 1.2 V typical at 350 mA — are the
number to design around. Seven channels at 200 mA each is 7 × 200 mA × 1 V ≈
1.4 W in a SOIC-16, which is more than the package will take. The 500 mA rating
is per channel and not simultaneous across all seven. [1]

**The clamp diodes need a connection.** They are common-cathode, brought out to
the COM pin. That pin must be tied to your load's positive supply for the diodes
to do anything. Leaving it floating is a common and expensive mistake. [1]

**Input current is about 0.93 mA at 3.85 V input.** That is what your driving
pin has to supply per channel. [1]

**The ULN2004A is not a drop-in for 5 V logic.** It has a 10.5 kΩ base resistor
intended for 6 V to 15 V CMOS. TI documents both in the same datasheet, so read
the column headings carefully. [1]

## Watch out for

- **Low-side only.** You cannot use this to switch the positive side of a load.
- **Tie COM to the load supply** or the flyback diodes are inert.
- **Package power, not channel current, is usually the limit.** Work out total
  dissipation before assuming seven-channel operation at full current.
- **1.6 V of drop at 350 mA** makes this a poor choice for driving LEDs from a
  low supply, where that drop is a large fraction of the headroom.

## In this catalog

Basic part in SOIC-16, so no assembly surcharge at JLCPCB. At the 2026-07-24
snapshot: 422,247 in stock, $0.17 at quantity 1, falling to $0.093 at 5,000. The
catalog attributes record 50 V V<sub>CEO</sub>, 500 mA collector current, seven
channels, 1.7 V clamp forward voltage, 50 µA leakage and 15 pF input capacitance
— all matching the datasheet. [2]

## Sources

1. Texas Instruments, *ULN200x, ULQ200x — High-Voltage, High-Current Darlington
   Transistor Arrays*, SLRS027T, December 1976, revised March 2025. Section 1
   (Features), Section 3 (Description), Section 5.3 (Recommended Operating
   Conditions), Section 5.6 (Electrical Characteristics: ULN2003A and ULN2004A).
   <https://www.ti.com/lit/ds/symlink/uln2003a.pdf>
2. JLCPCB / LCSC catalog record for C7512, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/darlington-transistor-arrays_texas-instruments-uln2003adr_C7512.html>
`;export{e as default};