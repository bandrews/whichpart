var e=`---
part: C23922
mpn: STM32F030C8T6
manufacturer: STMicroelectronics
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: LQFP-48(7x7)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: STM32F030x4/x6/x8/xC — Value-line Arm-based 32-bit MCU
  publisher: STMicroelectronics
  document: DS9773 Rev 5
  revised: 2021-11
  url: https://www.st.com/resource/en/datasheet/stm32f030c8.pdf
summary: ST's value-line 48 MHz Cortex-M0 in the same LQFP-48 outline as the F103, at roughly two-thirds the price.
---

# STM32F030C8T6

## What it is

The STM32F030 is ST's deliberately stripped-down value line: a 48 MHz Cortex-M0
with the analogue and communication peripherals most designs actually use, and
none of the expensive extras. This particular part has 64 kB of flash and 8 kB of
RAM in the same 48-pin, 7×7 mm LQFP outline as the far more famous F103. [1]

Choose it when you want a modern, in-production STM32 for a simple job — sensor
polling, an LED driver, a small control loop — and you do not need USB, CAN, or
lots of RAM. It is meaningfully cheaper than the F103 for the same board
footprint. [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | Arm Cortex-M0 at up to 48 MHz [1] | The M0 lacks the M3's hardware divide and bit-banding; fine for control code, slower for maths-heavy work. |
| Flash | 64 kB [1] | Same flash as the F103C8, so a straightforward application ports across without a squeeze. |
| RAM | 8 kB, with hardware parity checking [1] | Less than half the F103's 20 kB. This, not flash, is usually what runs out first on this part. |
| Supply voltage | 2.4 V to 3.6 V (digital and I/O); analogue supply V<sub>DDA</sub> from V<sub>DD</sub> to 3.6 V [1] | Note the 2.4 V floor — higher than the F103's 2.0 V, so it is less happy on a discharging battery. |
| GPIO count | 39 in the 48-pin package, all mappable to external interrupt vectors, all with 5 V tolerant capability [1] | Slightly more usable I/O than the F103 in the same package, and full 5 V tolerance rather than "almost all". |
| Notable peripherals | 2× SPI (18 Mbit/s), 2× I²C with Fast Mode Plus at 1 Mbit/s and 20 mA sink, 2× USART, one 12-bit 1.0 µs ADC with 10 external channels, 11 timers including an advanced-control timer, calendar RTC, 5-channel DMA, CRC unit, SWD [1] | Fast Mode Plus I²C with 20 mA sink is a real convenience for driving longer or more heavily loaded I²C buses. |
| Operating temperature | −40 °C to +85 °C ambient; junction −40 °C to +105 °C [1] | Standard industrial range. |

## What the datasheet actually says

**No USB, no CAN, no DAC.** That is the whole point of the value line, and it is
the main thing to check before substituting this for an F103. The
STM32F030x8 also has no I²S. [1]

**Only one ADC, with 10 external channels in this package.** The F103 has two
independent ADCs; if your design relies on simultaneous dual-channel sampling,
this part cannot do it. [1]

**The clock options are a little unusual.** Alongside the usual 4–32 MHz crystal
oscillator and 32 kHz RTC oscillator, there is an internal 8 MHz RC with a ×6 PLL
option, which gets you to 48 MHz with no external crystal at all. Whether the RC
accuracy is good enough depends on what you are timing. [1]

## Watch out for

- **8 kB of RAM is the real constraint.** Graphics buffers, large protocol
  stacks, and printf-heavy debugging will not fit comfortably.
- **The 2.4 V minimum supply** rules this part out of designs meant to run down
  to 2 V on two alkaline cells.
- **Same footprint, different pinout.** It shares the LQFP-48 outline with the
  F103C8 but is not pin-compatible in every function; check the pin table before
  reusing a board.
- **The value line is not the mainstream line.** Peripheral registers differ
  enough from the F0x1/F0x2 families that HAL code does not always port
  unchanged.

## In this catalog

Preferred Extended part in LQFP-48 (7×7 mm). At the 2026-07-24 snapshot: 51,548
in stock, $1.37 at quantity 1, falling to $0.84 at 1,000. The catalog attributes
record 48 MHz, 64 kB flash, 8 kB RAM, 39 I/O, 12-bit ADC, 2.4 V–3.6 V supply and
−40 °C to +85 °C — all consistent with the datasheet. [2]

## Sources

1. STMicroelectronics, *STM32F030x4 STM32F030x6 STM32F030x8 STM32F030xC —
   Value-line Arm®-based 32-bit MCU with up to 256 KB Flash, timers, ADC,
   communication interfaces, 2.4-3.6 V operation*, DS9773 Rev 5, November 2021.
   Features page 1, Section 2 (Description), Table 2 (device features and
   peripheral counts). <https://www.st.com/resource/en/datasheet/stm32f030c8.pdf>
2. JLCPCB / LCSC catalog record for C23922, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/microcontrollers-mcu-mpu-soc_stmicroelectronics-stm32f030c8t6_C23922.html>
`;export{e as default};