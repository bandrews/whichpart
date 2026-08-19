var e=`---
part: C9861
mpn: STM32L151C8T6
manufacturer: STMicroelectronics
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: LQFP-48(7x7)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: STM32L151x6/8/B, STM32L152x6/8/B — Ultra-low-power 32-bit MCU ARM-based Cortex-M3
  publisher: STMicroelectronics
  document: DocID17659 Rev 12
  revised: 2016-04
  url: https://www.st.com/resource/en/datasheet/stm32l151c8.pdf
summary: The battery-life specialist — 0.3 µA in standby, 4 kB of real EEPROM, and USB, in the familiar LQFP-48 outline.
---

# STM32L151C8T6

## What it is

The STM32L1 is ST's ultra-low-power line, and this part is its LQFP-48 member
with 64 kB of flash. Its headline is not speed — the core tops out at 32 MHz —
but current draw: 0.3 µA in standby, 0.9 µA in standby with the real-time clock
still running, and 214 µA/MHz in run mode. [1]

It also carries 4 kB of true EEPROM with error correction, which is unusual on an
Arm microcontroller and saves an external memory chip for calibration data or
settings. This is the part to choose when a design has to run for months or
years from a coin cell or a small lithium cell. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | Arm Cortex-M3, 32 kHz up to 32 MHz, 1.25 DMIPS/MHz, with a memory protection unit [1] | Half the clock of an F103, but it can also run *down* at 32 kHz, which is where the power savings come from. |
| Flash | 64 kB, with ECC [1] | Error-corrected flash is a reliability feature you do not usually get at this price. |
| RAM | 10 kB [1] | Between the F030's 8 kB and the F103's 20 kB. |
| Supply voltage | 1.8 V to 3.6 V with the brownout reset enabled (down to 1.65 V at power-down), or 1.65 V to 3.6 V with BOR disabled [1] | The two figures are a real design choice: disabling BOR buys you another 150 mV of battery life at the cost of a safety net. |
| GPIO count | 37 in the 48-pin package, all mappable to 16 external interrupt vectors; across the family up to 73 of the I/Os are 5 V tolerant [1] | Same I/O count as the F103 in the same package. |
| Notable peripherals | 4 kB true EEPROM with ECC, 80-byte backup register, USB 2.0 with internal 48 MHz PLL, 3× USART, 2× SPI (16 Mbit/s), 2× I²C, 12-bit 1 Msps ADC with 14 channels, two 12-bit DACs with output buffers, 2 ultra-low-power comparators, 10 timers, 7-channel DMA, up to 13 capacitive sensing channels, 96-bit unique ID [1] | Two buffered DACs and two comparators make this a genuinely analogue-capable part, not just a low-power digital one. |
| Operating temperature | −40 °C to +85 °C ambient; junction −40 °C to +105 °C [1] | The features page also mentions a 105 °C ambient grade, which is a different order code. |

## What the datasheet actually says

**The low-power numbers come with named conditions.** 0.3 µA standby is with
three wakeup pins; 0.9 µA is standby plus RTC; 0.57 µA stop mode is with 16
wakeup lines; 1.2 µA is stop plus RTC; 9 µA is low-power run mode. These are
distinct modes with distinct wakeup behaviours, not one number you can quote
loosely. Wakeup is under 8 µs. [1]

**USB has an internal 48 MHz PLL**, so unlike the STM32F103 you are not
forced onto a crystal purely to satisfy the USB clock. [1]

**No LCD driver on the L151.** The datasheet covers both L151 and L152; the
segment LCD controller is an L152-only feature and every mention of it in the
document is footnoted as such. If you want the LCD driver, you want an L152. [1]

**The ADC is 1 Msps with 14 channels** in this package, and the analogue
peripherals are specified down to 1.8 V. [1]

## Watch out for

- **This is the most expensive part in the catalog's microcontroller list**, at
  $7.44 in ones. You are paying for microamps, not megahertz — if your design is
  mains-powered, this is the wrong choice.
- **Stock is thin.** 627 units at the 2026-07-24 snapshot, and the price break
  table flattens out at 100 pieces, which suggests limited depth.
- **32 MHz is the ceiling.** Do not port a 72 MHz F103 workload here and expect
  it to fit in the time budget.
- **The datasheet is from 2016.** It is still marked full production, but check
  ST's current lifecycle status before starting a new long-lived design.

## In this catalog

Preferred Extended part in LQFP-48 (7×7 mm). At the 2026-07-24 snapshot: 627 in
stock, $7.44 at quantity 1, falling to $5.46 at 100. The catalog attributes
record 32 MHz, 64 kB flash, 10 kB RAM, 4 kB EEPROM, 37 I/O, 12-bit ADC, 12-bit
DAC, 1.8 V–3.6 V and −40 °C to +85 °C. The 1.8 V figure corresponds to the
datasheet's BOR-enabled supply range; the datasheet also permits 1.65 V with BOR
disabled. [2]

## Sources

1. STMicroelectronics, *STM32L151x6/8/B, STM32L152x6/8/B — Ultra-low-power
   32-bit MCU ARM®-based Cortex®-M3, 128KB Flash, 16KB SRAM, 4KB EEPROM, LCD,
   USB, ADC, DAC*, DocID17659 Rev 12, April 2016. Features page 1, Section 2
   (Description), Table 2 (device features and peripheral counts).
   <https://www.st.com/resource/en/datasheet/stm32l151c8.pdf>
2. JLCPCB / LCSC catalog record for C9861, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/microcontrollers-mcu-mpu-soc_stmicroelectronics-stm32l151c8t6_C9861.html>
`;export{e as default};