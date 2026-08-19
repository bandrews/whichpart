var e=`---
part: C7562
mpn: M24C02-WMN6TP
manufacturer: STMicroelectronics
category: EEPROM
kind: memory
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: M24C01, M24C02 — 1-Kbit and 2-Kbit serial I²C bus EEPROM
  publisher: STMicroelectronics
  document: see datasheet cover
  url: https://www.st.com/resource/en/datasheet/m24c02-r.pdf
summary: 256 bytes of non-volatile storage on two I²C wires — for serial numbers, calibration, and settings.
---

# M24C02-WMN6TP

## What it is

A small I²C EEPROM: 2 kilo*bits*, which is 256 bytes, in an 8-pin SOIC. It keeps
its contents with the power off, and you read and write it over the same two-wire
I²C bus your sensors probably already use. [1]

256 bytes sounds tiny, and it is — but it is exactly right for the things it is
usually asked to hold: a serial number, a MAC address, a handful of calibration
constants, a configuration record. If your microcontroller has no internal EEPROM
(most Arm ones do not), this is the cheap way to add some. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Capacity | 2 Kbit (256 bytes), organised in 16-byte pages [1] | The page size matters: a write that crosses a page boundary wraps around within the page rather than continuing, which is a classic source of corrupted data. |
| Interface | I²C, compatible with 100 kHz standard mode and 400 kHz fast mode [1] | Two wires shared with everything else on the bus. |
| Maximum clock | 400 kHz [1] | Fast enough that reads are effectively instant at this size. |
| Supply voltage | 2.5 V to 5.5 V for the \`-W\` variant, which is this part. (The \`-R\` variant covers 1.8 V to 5.5 V and the \`-F\` covers 1.7 V to 5.5 V) [1] | The letter in the order code *is* the voltage range. Check it against your rail. |
| Endurance and retention | More than 4 million write cycles, more than 200 years' data retention [1] | Far beyond microcontroller flash. You can rewrite this on every power cycle for the life of the product. |
| Operating temperature | −40 °C to +85 °C [1] | Standard industrial range. |

## What the datasheet actually says

**Write cycle time is up to 5 ms, for a byte or a whole page.** This is the number
that governs how fast you can log. Writing 256 bytes one at a time takes over a
second; writing sixteen 16-byte pages takes 80 ms. Use page writes. [1]

**Hardware write protection covers the whole array.** A dedicated pin, not a
register bit — pull it high and nothing can be written, regardless of software
bugs. For safety-relevant configuration data this is worth wiring up. [1]

**Random and sequential read modes** are both supported, so reading a block is a
single transaction rather than one per byte. [1]

**The device address is partly set by pins**, which is how you put more than one
EEPROM on the same bus.

## Watch out for

- **Kilobits, not kilobytes.** 2 Kbit is 256 bytes. This trips people up
  constantly.
- **Page-boundary wraparound.** A 16-byte page write starting mid-page wraps to
  the start of that page. Align your writes.
- **You must wait out the 5 ms write cycle** — or poll the device with an
  acknowledge-polling loop, which the datasheet describes.
- **Check the voltage suffix.** \`-W\` is 2.5 V minimum; if you need 1.8 V
  operation you want the \`-R\`.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 556,038 in stock —
one of the deepest stock positions in the whole catalog — at $0.13 in ones,
falling to $0.077 at 5,000. The catalog attributes record 2 Kbit, I²C at 400 kHz,
2.5 V–5.5 V, 4,000,000 write cycles, 200-year retention, 5 ms write cycle, 900 ns
access time, 3 µA standby current and −40 °C to +85 °C, all matching the
datasheet. [2]

## Sources

1. STMicroelectronics, *M24C01, M24C02 — 1-Kbit and 2-Kbit serial I²C bus
   EEPROM*. Features page 1 (interface, memory, supply voltage, temperature,
   write cycle time, performance, advanced features).
   <https://www.st.com/resource/en/datasheet/m24c02-r.pdf>
2. JLCPCB / LCSC catalog record for C7562, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/eeprom_stmicroelectronics-m24c02-wmn6tp_C7562.html>
`;export{e as default};