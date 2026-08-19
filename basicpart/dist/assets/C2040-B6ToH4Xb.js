var e=`---
part: C2040
mpn: RP2040
manufacturer: Raspberry Pi
category: Microcontrollers (MCU/MPU/SOC)
kind: microcontroller
package: LQFN-56(7x7)
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: RP2040 Datasheet — A microcontroller by Raspberry Pi
  publisher: Raspberry Pi Ltd
  document: build-version 3184e62-clean
  revised: 2025-02-20
  url: https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf
summary: Dual-core 133 MHz Cortex-M0+ with 264 kB RAM and no internal flash — you add your own QSPI flash chip.
---

# RP2040

## What it is

The RP2040 is Raspberry Pi's own microcontroller, and the chip inside the
Raspberry Pi Pico. It pairs two Arm Cortex-M0+ cores running at up to 133 MHz
with an unusually generous 264 kB of on-chip SRAM. The catch, and it is the
single most important thing to know about this part, is that it has no internal
program flash: your code lives in a separate QSPI flash chip on your board, and
the RP2040 executes it in place through a small cache. [1]

Its other distinguishing feature is the PIO block — eight small programmable
state machines that can be taught to speak interfaces the chip has no dedicated
hardware for. That is how RP2040 boards drive WS2812 LED strips, VGA, or DPI
displays without bit-banging on the CPU. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Core and maximum clock | Two Arm Cortex-M0+ cores, up to 133 MHz (up to 200 MHz at a raised 1.15 V core supply) [1] | Two cores at this price is rare; the second core is genuinely usable for real work, not just an accelerator. |
| Flash | None on-chip. Supports up to 16 MB of external QSPI flash with execute-in-place [1] | You must budget board space, a part, and routing for a flash chip. It also means you choose how much storage you pay for. |
| RAM | 264 kB SRAM, in six independently accessible banks [1] | Far more RAM than most MCUs in this class, which is why MicroPython and framebuffer-based graphics are comfortable here. |
| Supply voltage | I/O supply (IOVDD) 1.8 V to 3.3 V, absolute maximum 3.63 V; digital core nominally 1.1 V from the on-chip regulator [1] | A single 3.3 V rail is enough — the chip makes its own core voltage. Nothing on it is 5 V tolerant. |
| GPIO count | 30 multifunction GPIO, four of which can also be analogue inputs, plus six dedicated QSPI flash pins [1] | Six of the 56 pins are effectively spoken for by the flash interface, so plan around 30 usable I/O. |
| Notable peripherals | 2 UART, 2 SPI, 2 I²C, 16 PWM channels, USB 1.1 with on-chip PHY supporting both host and device, 4-channel 12-bit ADC at 500 ksps with internal temperature sensor, DMA, 8 PIO state machines [1] | The USB PHY is built in, so a USB device needs only the connector and two 27 Ω series resistors. |
| Operating temperature | Case temperature −40 °C to +85 °C [1] | Standard commercial range. Note the datasheet specifies *case* temperature, not ambient. |

## What the datasheet actually says

The 133 MHz headline figure is the guaranteed system clock at the default 1.1 V
core voltage. The datasheet separately notes 200 MHz is reachable at 1.15 V — an
overclock the manufacturer documents rather than one you have to discover. [1]

The USB bootloader specifically requires a 12 MHz crystal or a 12 MHz clock
driven into XIN. This is not a free choice: if you want the standard
drag-and-drop UF2 bootloader to work, 12 MHz is the number. [1]

Raspberry Pi names a specific crystal, the Abracon ABM8-272-T3 (12 MHz,
fundamental AT cut, 10 pF load, 50 Ω maximum ESR, ±30 ppm), and warns that the
recommended damping resistor is tuned for 3.3 V operation and that a
substitute crystal should be tested over temperature. [1]

## Watch out for

- **You need an external flash chip.** Nothing runs without it. Budget the part,
  the six QSPI pins, and the layout.
- **USB needs a 27 Ω series resistor on each of USB_DM and USB_DP.** The
  pull-ups and pull-downs are internal, but those two resistors are not. [1]
- **No 5 V tolerance.** The absolute maximum on any I/O pin is IOVDD + 0.5 V,
  with IOVDD itself capped at 3.63 V. [1]
- **TESTEN must be tied to ground.** It is a factory test pin, and leaving it
  floating is not an option. [1]
- **This is an ordinary Extended part at JLCPCB.** Confirm the assembly
  surcharge and feeder availability before you commit a design to it.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in the
LQFN-56 (7×7 mm) package. Because it is Extended rather than Basic or Preferred,
it does not appear in the qualifying catalog snapshot, so no price or stock
figures are recorded here. [2]

## Sources

1. Raspberry Pi Ltd, *RP2040 Datasheet — A microcontroller by Raspberry Pi*,
   build-version 3184e62-clean, build-date 2025-02-20. Sections 1.2 (Summary),
   1.4.2 (Pin Descriptions), 2.9 (Power Supplies), 2.16.1.1 (Recommended
   Crystals), 5.5.3 (Pin Specifications).
   <https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf>
2. basicp.art curated recommendations, \`src/data/other-components.json\`,
   catalog snapshot 2026-07-24.
`;export{e as default};