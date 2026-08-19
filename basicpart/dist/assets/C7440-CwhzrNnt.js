var e=`---
part: C7440
mpn: PCF8563T/5,518
manufacturer: NXP Semicon
category: Real Time Clocks
kind: interface
package: SO-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: PCF8563 — Real-Time Clock/Calendar
  publisher: NXP Semiconductors
  document: Rev. 11.1
  revised: 2026-01-19
  url: https://www.nxp.com/docs/en/data-sheet/PCF8563.pdf
summary: A low-power I²C real-time clock with alarm, timer and a programmable clock output — 0.25 µA on backup.
---

# PCF8563T/5,518

## What it is

The PCF8563 keeps the date and time when the rest of your system is off. It gives
you year, month, day, weekday, hours, minutes and seconds from a 32.768 kHz
crystal, plus an alarm, a countdown timer, and a programmable clock output you
can use to drive other parts of the circuit. [1]

It talks I²C, which makes it easier to use than the three-wire DS1302, and it
draws a quarter of a microamp on backup power. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | CMOS real-time clock and calendar with alarm, countdown timer, programmable clock output, voltage-low detector and open-drain interrupt [1] | The voltage-low detector tells you the backup cell is failing before the time is lost. |
| Signalling standard | Two-wire I²C-bus, target address A2h write / A3h read, with auto-incrementing register address [1] | The fixed address means only one PCF8563 per bus. |
| Maximum data rate | 400 kbit/s I²C, at V<sub>DD</sub> = 1.8 V to 5.5 V [1] | Fast-mode I²C; speed is never the constraint for a clock. |
| Supply voltage | Clock operates from 1.0 V to 5.5 V at room temperature; the I²C interface requires 1.8 V to 5.5 V [1] | Two different numbers for two different functions. The clock keeps running on a nearly flat backup cell where the bus would not work. |
| Isolation or protection | Internal power-on reset; open-drain interrupt output [1] | Open drain lets you wire-OR the interrupt with other sources. |
| Operating temperature | −40 °C to +85 °C per the catalog record [2] | Industrial range. |

## What the datasheet actually says

**Backup current is 0.25 µA typical** at V<sub>DD</sub> = 3.0 V and 25 °C. A
CR2032 has around 220 mAh, so on paper that is decades — in practice the cell's
own self-discharge will end it first. [1]

**The oscillator capacitor is integrated.** You supply the 32.768 kHz crystal but
not its load capacitors, which is two fewer parts and two fewer things to get
wrong. Note this constrains which crystal you should use — the integrated
capacitance is designed for a particular load. [1]

**The programmable clock output gives four frequencies:** 32.768 kHz, 1.024 kHz,
32 Hz and 1 Hz. The 1 Hz output is a free heartbeat for driving a display or
waking a microcontroller once a second. [1]

**There is a century flag**, so the calendar handles the 2000/2100 rollover. [1]

**Sixteen 8-bit registers with auto-increment**: two for control and status, seven
counters from seconds to years, four alarm registers, and the rest for the timer
and clock output. Reading the whole time in one burst is a single I²C
transaction. [1]

## Watch out for

- **The I²C address is fixed.** You cannot put two on one bus.
- **Accuracy is your crystal's accuracy.** There is no temperature compensation.
  A ±20 ppm crystal is about ±10 minutes a year.
- **Match the crystal to the integrated load capacitance.** Using a crystal
  specified for a different load will pull the frequency.
- **Read the time atomically.** Use the auto-increment burst read so the seconds
  cannot roll over between two separate reads.

## In this catalog

Preferred Extended part in SO-8. At the 2026-07-24 snapshot: 177,561 in stock,
$0.60 at quantity 1, falling to $0.354 at 25,000 — about half the DS1302's price.
The catalog attributes record 1 V–5.5 V supply, an external crystal, I²C, alarm
output, programmable clock output, countdown timer, battery low-voltage
detection, 800 µA supply current, 0.25 µA quiescent current and −40 °C to +85 °C,
all matching the datasheet. [2]

## Sources

1. NXP Semiconductors, *PCF8563 — Real-Time Clock/Calendar*, Rev. 11.1,
   19 January 2026. Section 1 (General description), Section 2 (Features and
   benefits), Section 3 (Applications), register map description.
   <https://www.nxp.com/docs/en/data-sheet/PCF8563.pdf>
2. JLCPCB / LCSC catalog record for C7440, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/real-time-clocks_nxp-semicon-pcf8563t-5-518_C7440.html>
`;export{e as default};