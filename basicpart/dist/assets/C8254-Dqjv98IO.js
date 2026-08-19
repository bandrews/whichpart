var e=`---
part: C8254
mpn: STM8S105K6T6C
manufacturer: STMicroelectronics
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: LQFP-32(7x7)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: STM8S105C4/6, STM8S105K4/6, STM8S105S4/6 — Access line, 16 MHz STM8S 8-bit MCU
  publisher: STMicroelectronics
  document: DS5855 Rev 16
  revised: 2024-09
  url: https://www.st.com/resource/en/datasheet/stm8s105k6.pdf
summary: The bigger STM8 — 32 kB flash, 2 kB RAM and a full 1 kB of EEPROM, still running from 5 V.
---

# STM8S105K6T6C

## What it is

The STM8S105 is the "access line" step up from ST's cheapest STM8 parts: same
16 MHz 8-bit core, but four times the flash, twice the RAM, and a full kilobyte
of EEPROM instead of 128 bytes. This particular part is the 32-pin LQFP version
with 32 kB of flash. [1]

It suits designs that need real persistent storage — calibration tables, user
settings, run-hour counters — without adding an external EEPROM chip, and that
want to run directly from 5 V. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | STM8 8-bit core, Harvard architecture, 3-stage pipeline, 16 MHz [1] | Identical core to the cheaper STM8S003, so code and tooling carry across directly. |
| Flash | 32 kB, 20 years' retention at 55 °C after 10,000 cycles [1] | Four times the value line, which is the difference between "a small program" and "a real application". |
| RAM | 2 kB [1] | Doubled from the value line. Still small in absolute terms. |
| Supply voltage | 2.95 V to 5.5 V [1] | The same 2.95 V floor as the value line — comfortable at 3.3 V and 5 V, marginal below 3 V. |
| GPIO count | 25 in the 32-pin package, 12 of them high-sink; 23 external interrupt pins [1] | High-sink outputs drive LEDs and small loads without extra transistors. |
| Notable peripherals | 1 kB true data EEPROM rated to 300,000 write/erase cycles, advanced-control timer (TIM1) with dead-time insertion, two general-purpose 16-bit timers, 8-bit basic timer, auto-wakeup timer, window and independent watchdogs, UART, SPI to 8 Mbit/s, I²C to 400 kbit/s, 10-bit ADC with 7 channels and analog watchdog, 96-bit unique device ID [1] | 300,000 EEPROM cycles is a strong figure — three times the value line's — and enough for genuinely frequent logging. |
| Operating temperature | −40 °C to +85 °C (the \`6\` in the \`T6\` suffix) [1] | A \`3\` suffix version runs to +125 °C, but that is a different order code. |

## What the datasheet actually says

**The EEPROM endurance jump is the real upgrade.** The value-line STM8S003 gives
100,000 cycles on 128 bytes; this part gives 300,000 cycles on 1,024 bytes. If
you are writing settings frequently, that difference matters more than the extra
flash. [1]

**The flash endurance figure is quoted differently from the value line.** Here it
is "20 years at 55 °C after 10 kcycle" — that is, retention *after* ten thousand
erase cycles. Retention and endurance are two separate promises and the datasheet
states them together. [1]

**There is a 96-bit unique key per device**, which the value line does not
advertise. Useful for serialisation or as a cheap identity for pairing. [1]

**Order-code decoder:** in \`STM8S105K6T6C\`, \`K\` is 32 pins, \`6\` is 32 kB of
flash, \`T\` is LQFP, \`6\` is the −40 °C to +85 °C range, and the trailing \`C\` is
the 0.8 mm package pitch. [1]

## Watch out for

- **2.95 V minimum supply**, same as the rest of the STM8S line. Not a
  low-voltage battery part.
- **SWIM debug only.** You need an ST-LINK; generic Arm probes do not work.
- **Stock is thin.** The 2026-07-24 snapshot shows only 539 units — the lowest
  of any MCU in this catalog. Check availability before designing it in.
- **The datasheet covers six part numbers.** Every "up to 32 Kbyte" figure is a
  family maximum; use the Table 1 column for \`STM8S105K6\` specifically.

## In this catalog

Preferred Extended part in LQFP-32 (7×7 mm). At the 2026-07-24 snapshot: 539 in
stock, $1.83 at quantity 1, falling to $1.01 at 1,000. The catalog attributes
record 16 MHz, 32 kB flash, 2 kB RAM, 1 kB EEPROM, 25 I/O, 10-bit ADC,
2.95 V–5.5 V and −40 °C to +85 °C, all matching the datasheet. [2]

## Sources

1. STMicroelectronics, *STM8S105C4/6 STM8S105K4/6 STM8S105S4/6 — Access line,
   16 MHz STM8S 8-bit MCU, up to 32 Kbyte Flash, integrated EEPROM, 10-bit ADC,
   timers, UART, SPI, I²C*, DS5855 Rev 16, September 2024. Features page 1,
   Table 1 (access line features), ordering information section.
   <https://www.st.com/resource/en/datasheet/stm8s105k6.pdf>
2. JLCPCB / LCSC catalog record for C8254, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/microcontrollers-mcu-mpu-soc_stmicroelectronics-stm8s105k6t6c_C8254.html>
`;export{e as default};