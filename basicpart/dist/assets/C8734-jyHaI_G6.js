var e=`---
part: C8734
mpn: STM32F103C8T6
manufacturer: STMicroelectronics
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: LQFP-48(7x7)
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: STM32F103x8 / STM32F103xB — Medium-density performance line Arm-based 32-bit MCU
  publisher: STMicroelectronics
  document: DS5319 Rev 20
  revised: 2025-07
  url: https://www.st.com/resource/en/datasheet/stm32f103c8.pdf
summary: The "Blue Pill" chip — 72 MHz Cortex-M3 with USB and CAN, 64 kB flash and 20 kB RAM in LQFP-48.
---

# STM32F103C8T6

## What it is

This is the microcontroller at the heart of the ubiquitous "Blue Pill" board, and
probably the most widely copied STM32 there is. It is a 72 MHz Cortex-M3 with
64 kB of flash, 20 kB of RAM, and a peripheral set that punches above its price:
USB full-speed, CAN, two SPIs, two I²Cs, three USARTs and two 12-bit ADCs. [1]

It is an old design by modern standards — the part dates from the late 2000s —
but that age is also its strength. Example code, board files, and tutorials for
it are everywhere, and ST still lists it as in full production. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | Arm Cortex-M3 at up to 72 MHz, 1.25 DMIPS/MHz at zero wait states [1] | Comfortably faster than the Cortex-M0 value parts, with single-cycle multiply and hardware divide. |
| Flash | 64 kB [1] | Enough for a substantial application, though a USB stack plus a display library will start to feel it. |
| RAM | 20 kB [1] | Generous relative to the flash; the usual limit you hit first is flash, not RAM. |
| Supply voltage | 2.0 V to 3.6 V for both core and I/O [1] | Runs directly from a 3.3 V rail or a pair of alkaline cells; it is not a 5 V part. |
| GPIO count | 37 in the 48-pin package, most of them 5 V tolerant, all mappable to 16 external interrupt vectors [1] | The 5 V tolerance is the reason this chip survives so much hobbyist abuse — but it is conditional, and analog and a few supply-adjacent pins are not tolerant at all. Check the pin table, and see below. |
| Notable peripherals | USB 2.0 full-speed device, CAN 2.0B active, 2× SPI (18 Mbit/s), 2× I²C, 3× USART, 2× 12-bit 1 µs ADC with 10 channels, 7 timers including a motor-control PWM timer, 7-channel DMA, SWD and JTAG [1] | Both USB and CAN on a sub-$2 part is unusual, and the motor-control timer with dead-time generation is a genuine bonus. |
| Operating temperature | −40 °C to +85 °C ambient for the \`6\` order-code suffix, which is what the \`6\` in \`C8T6\` denotes, with a junction range of −40 °C to +105 °C [1] | The \`7\` suffix version is the one rated to +105 °C ambient and +125 °C junction, and it is a different part number. ST does allow the \`6\` part up to 105 °C ambient under its "low-power dissipation" condition — a lightly loaded chip, not one running flat out. |

## What the datasheet actually says

**USB needs a crystal.** The USB peripheral's 48 MHz clock is generated from the
main PLL, and the datasheet states plainly that the clock source must be an HSE
crystal oscillator. There is no crystal-less USB on this chip, so a USB design
needs the 8 MHz crystal and its two load capacitors. [1]

**The ADC's "1 µs" is a conversion time, not a sample rate you get for free.**
The two 12-bit ADCs share 10 external channels in this package and convert over
a 0 to 3.6 V range, with a dual sample-and-hold capability if you want two
channels simultaneously. [1]

**Five-volt tolerance comes with two conditions.** ST's absolute maximum for a
tolerant pin is V<sub>DD</sub> + 4.0 V, so the tolerance is relative to a supply
that is actually present — driving 5 V into a pin on an unpowered board is
outside the rating. And a footnote adds that to sustain anything above
V<sub>DD</sub> + 0.3 V, the internal pull-up and pull-down resistors on that pin
must be disabled. Both catch people out with I²C level-shifting and with 5 V
sensor outputs. [1]

**Thermal headroom in LQFP-48 is 363 mW** at 85 °C ambient. That is generous for
a microcontroller running at 3.3 V, but it is the number to check if you are also
sinking current into LEDs from the GPIO pins. [1]

**Naming decoder.** In \`STM32F103C8T6\`: \`C\` is the 48-pin package family, \`8\` is
64 kB of flash, \`T\` is LQFP, and \`6\` is the −40 °C to +85 °C temperature
range. [1]

## Watch out for

- **Counterfeits and remarks are common on this part**, precisely because it is
  so popular. Buying it as a JLCPCB Preferred part with a traceable LCSC record
  is one of the better ways to avoid that problem.
- **Only 64 kB of flash.** If you are porting something that assumed a
  128 kB "CB" variant, it will not fit.
- **No internal 48 MHz oscillator for USB.** Budget the crystal.
- **Debug pins are shared.** The JTAG pins double as GPIO; remapping them away
  without leaving SWD available is a well-known way to lock yourself out.

## In this catalog

Preferred Extended part in LQFP-48 (7×7 mm). At the 2026-07-24 snapshot: 149,814
in stock, $1.99 at quantity 1, falling to $1.29 at 1,000. The catalog attributes
record 72 MHz, 64 kB flash, 20 kB RAM, 37 I/O, 12-bit ADC, 2 V–3.6 V supply and
−40 °C to +85 °C — all of which match the datasheet. [2]

## Sources

1. STMicroelectronics, *STM32F103x8, STM32F103xB — Medium-density performance
   line Arm®-based 32-bit MCU with 64 or 128 KB Flash, USB, CAN, 7 timers,
   2 ADCs, 9 com. interfaces*, DS5319 Rev 20, July 2025. Features page 1,
   Table 2 (device features and peripheral counts), Section 2.3.20 (USB),
   Table 6 (Voltage characteristics), Table 8 (Thermal characteristics),
   Section 7 (ordering information scheme).
   <https://www.st.com/resource/en/datasheet/stm32f103c8.pdf>
2. JLCPCB / LCSC catalog record for C8734, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/microcontrollers-mcu-mpu-soc_stmicroelectronics-stm32f103c8t6_C8734.html>
`;export{e as default};