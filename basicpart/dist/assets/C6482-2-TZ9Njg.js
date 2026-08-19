var e=`---
part: C6482
mpn: AT24C256C-SSHL-T
manufacturer: Microchip Tech
category: EEPROM
kind: memory
package: SOIC-8
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: AT24C256C — I2C-Compatible (2-Wire) Serial EEPROM, 256-Kbit (32,768 x 8)
  publisher: Atmel (now Microchip)
  document: Atmel-8568F-SEEPROM-AT24C256C-Datasheet_012015
  revised: 2015-01
  url: https://ww1.microchip.com/downloads/en/devicedoc/atmel-8568-seeprom-at24c256c-datasheet.pdf
summary: 32 kilobytes of I²C EEPROM, addressable eight to a bus, running from anything between 1.7 V and 5.5 V.
---

# AT24C256C-SSHL-T

## What it is

A 256 kilobit (32 kilobyte) I²C EEPROM in an 8-pin SOIC. Four times the capacity
of the M24C64 in the same package, and with two properties that distinguish it:
a supply range starting at 1.7 V, and three address pins so you can put eight of
them on one bus. [1]

Use it for configuration, calibration tables, logging, or anywhere you need
non-volatile storage that survives power loss and does not wear out the way flash
does. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Capacity | 256 Kbit (32 Kbyte), organised as 32,768 × 8, with a 64-byte page size and partial page writes allowed [1] | The 64-byte page is twice the M24C64's, so bulk writes are twice as efficient. |
| Interface | I²C-compatible two-wire serial, with Schmitt-trigger filtered inputs for noise suppression; cascadable up to eight devices on one bus [1] | Eight devices means 256 kB of EEPROM on two wires. The M24C64 family cannot do that. |
| Maximum clock | 1 MHz at 2.5 V, 2.7 V and 5.0 V; 400 kHz at 1.7 V [1] | Fast-mode Plus at normal supplies, dropping to Fast mode at the bottom of the range. |
| Supply voltage | 1.7 V to 5.5 V [1] | Very wide. It works on a 1.8 V rail, a 3.3 V rail, or 5 V logic without changing part. |
| Endurance and retention | 1,000,000 write cycles; 40 years' data retention [1] | One million cycles is fewer than the ST M24C series quotes, but the retention figures differ too; both are far beyond microcontroller flash. |
| Operating temperature | −40 °C to +85 °C per the catalog record [2] | Industrial range. |

## What the datasheet actually says

**Schmitt-trigger filtered inputs.** Atmel calls this out in the feature list, and
it matters on a long or noisy I²C bus — the inputs will not chatter on a slow or
ringing edge. [1]

**Self-timed write cycle, 5 ms maximum.** The same figure as the ST parts. Use
acknowledge polling rather than a fixed 5 ms delay if throughput matters. [1]

**Partial page writes are allowed.** You do not have to write a full 64-byte page
— but the write still consumes a full write cycle and, internally, wears a full
page. Group your writes. [1]

**Cascading up to eight devices** uses three address pins. Note this is the
\`AT24C256C\` specifically; the older AT24C128/256 datasheet allows only four
devices with two address pins. Check which part you actually have. [1]

**The write-protect pin is hardware only** on this device — pull it high and the
array cannot be written regardless of software. [1]

## Watch out for

- **Kilobits, not kilobytes.** 256 Kbit is 32 kB.
- **64-byte page boundaries.** A write that crosses one wraps within the page.
- **1 MHz needs 2.5 V or more.** At 1.7 V the bus is limited to 400 kHz.
- **Do not confuse the \`C\` variant with the older AT24C128/256.** The supply
  range, the maximum clock and the number of cascadable devices all differ.

## In this catalog

Preferred Extended part in SOIC-8. At the 2026-07-24 snapshot: 98,599 in stock,
$0.38 at quantity 1, falling to $0.21 at 4,000 — noticeably more expensive per
package than the ST M24C64, though far cheaper per byte. The catalog attributes
record 256 Kbit, I²C at 1 MHz, 1.7 V–5.5 V, 1,000,000 write cycles, 40-year
retention, 5 ms write cycle, 6 µA standby current and −40 °C to +85 °C, all
matching the datasheet. [2]

## Sources

1. Atmel (now Microchip), *AT24C256C — I2C-Compatible (2-Wire) Serial EEPROM,
   256-Kbit (32,768 x 8)*, Atmel-8568F-SEEPROM-AT24C256C-Datasheet_012015,
   January 2015. Features and Description page 1.
   <https://ww1.microchip.com/downloads/en/devicedoc/atmel-8568-seeprom-at24c256c-datasheet.pdf>
2. JLCPCB / LCSC catalog record for C6482, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/eeprom_microchip-tech-at24c256c-sshl-t_C6482.html>
`;export{e as default};