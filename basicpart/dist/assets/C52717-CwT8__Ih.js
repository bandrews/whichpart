var e=`---
part: C52717
mpn: STM8S003F3P6TR
manufacturer: STMicroelectronics
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: TSSOP-20
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: STM8S003F3 / STM8S003K3 — Value line, 16-MHz STM8S 8-bit MCU
  publisher: STMicroelectronics
  document: DS7147 Rev 10
  revised: 2018-08
  url: https://www.st.com/resource/en/datasheet/stm8s003f3.pdf
summary: The cheapest microcontroller in the catalog — 16 MHz 8-bit, 5 V tolerant supply, 8 kB flash, in hand-solderable TSSOP-20.
---

# STM8S003F3P6TR

## What it is

The STM8S003F3 is ST's rock-bottom value-line 8-bit microcontroller, and at
roughly a third of a dollar it is the cheapest MCU in this catalog by a wide
margin. It gives you 16 MHz, 8 kB of flash, 1 kB of RAM and 128 bytes of true
EEPROM in a 20-pin TSSOP. [1] [2]

Use it where the job is small and the cost matters: a fan controller, a button
and LED front panel, a simple sensor-to-UART bridge. It runs from 2.95 V to
5.5 V, so it sits happily in a 5 V system with no level shifting. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | STM8 8-bit core, Harvard architecture, 3-stage pipeline, 16 MHz [1] | A capable 8-bit core, but a proprietary ST architecture — the toolchain is smaller than AVR's or Arm's. |
| Flash | 8 kB, 20 years' retention at 55 °C after 100 cycles [1] | Small. Fine for bare-metal C; there is no room for a heavy framework. |
| RAM | 1 kB [1] | Enough for a handful of buffers, and nothing more. |
| Supply voltage | 2.95 V to 5.5 V [1] | The 2.95 V floor is the thing to notice: this part will *not* run from a discharging lithium cell down to 3.0 V with margin. |
| GPIO count | 16 in the 20-pin package, of which 12 are high-sink outputs; 16 external interrupt pins [1] | High-sink pins can drive LEDs directly without a transistor. |
| Notable peripherals | 128 bytes true data EEPROM (100,000 write/erase cycles), 16-bit advanced-control timer with dead-time insertion, 16-bit general-purpose timer, 8-bit basic timer, auto-wakeup timer, window and independent watchdogs, UART (with SmartCard, IrDA, LIN master), SPI to 8 Mbit/s, I²C to 400 kbit/s, 10-bit ADC with 5 channels and analog watchdog, SWIM single-wire debug [1] | For the money, a real advanced-control timer with complementary outputs and dead-time is remarkable — this is a viable small motor-drive part. |
| Operating temperature | −40 °C to +85 °C (the \`6\` in the order code) [1] | Standard industrial range. |

## What the datasheet actually says

**The 20-pin part has more ADC channels than the 32-pin part.** The datasheet's
feature table gives the STM8S003F3 five A/D converter channels against the
STM8S003K3's four — an unusual inversion that comes from how the pin functions
are multiplexed. Do not assume the bigger package is a superset. [1]

**The EEPROM has no read-while-write capability.** The datasheet footnotes this
explicitly. You cannot execute from flash while an EEPROM write is in progress
without care. [1]

**Debugging uses SWIM, not SWD or JTAG.** It is a single-wire ST-proprietary
interface, so you need an ST-LINK; a generic Arm debug probe will not do. [1]

**Order-code decoder:** in \`STM8S003F3P6TR\`, \`F\` is the 20-pin package, \`3\` is
8 kB of flash, \`P\` is TSSOP, \`6\` is the −40 °C to +85 °C range, and \`TR\` is tape
and reel. [1]

## Watch out for

- **2.95 V minimum supply.** This is the most common way to get caught out — it
  looks like a 3.3 V part but has almost no margin below 3 V.
- **8 kB flash and 1 kB RAM** are hard limits. Check your build size before
  committing a design.
- **SWIM tooling.** Budget for an ST-LINK if you do not already have one.
- **The STM8 ecosystem is smaller** than AVR's or STM32's. SDCC and ST's own
  tools work well, but there are far fewer libraries to lean on.

## In this catalog

Preferred Extended part in TSSOP-20. At the 2026-07-24 snapshot: 55,421 in
stock, $0.55 at quantity 1, falling to $0.34 at 1,000. The catalog attributes
record 16 MHz, 8 kB flash, 1 kB RAM, 128 byte EEPROM, 16 I/O, 10-bit ADC,
2.95 V–5.5 V and −40 °C to +85 °C, all matching the datasheet. [2]

## Sources

1. STMicroelectronics, *STM8S003F3 STM8S003K3 — Value line, 16-MHz STM8S 8-bit
   MCU, 8-Kbyte Flash memory, 128-byte data EEPROM, 10-bit ADC, 3 timers, UART,
   SPI, I²C*, DS7147 Rev 10, August 2018. Features page 1, Table 1 (value line
   features), Section 10.4 (ordering information).
   <https://www.st.com/resource/en/datasheet/stm8s003f3.pdf>
2. JLCPCB / LCSC catalog record for C52717, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/microcontrollers-mcu-mpu-soc_stmicroelectronics-stm8s003f3p6tr_C52717.html>
`;export{e as default};