var e=`---
part: C5613
mpn: 74HC165D,653
manufacturer: Nexperia
category: Shift Registers
kind: logic
package: SOIC-16
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: 74HC165; 74HCT165 — 8-bit parallel-in/serial out shift register
  publisher: Nexperia
  document: Rev. 8
  revised: 2025-05-09
  url: https://assets.nexperia.com/documents/data-sheet/74HC_HCT165.pdf
summary: The input counterpart of the 74HC595 — reads eight switches or signals back through three pins.
---

# 74HC165D,653

## What it is

Where the 74HC595 expands outputs, the 74HC165 expands inputs. Pull the parallel
load pin low and it captures the state of eight input pins at once; then clock
them out one at a time on a serial line. Three microcontroller pins read eight
inputs, and the chips chain so that three pins can read as many as you need. [1]

It is the standard part behind button matrices, DIP-switch banks, and reading
back the state of a machine's limit switches. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | 8-bit parallel-in / serial-out shift register with a serial data input for cascading, complementary serial outputs, asynchronous parallel load, and a clock enable [1] | The complementary outputs (Q7 and inverted Q7) save an inverter in some designs. |
| Logic family | 74HC — CMOS input levels. The 74HCT165 variant has TTL levels; this order code is the HC version [1] | Check levels if your microcontroller is 3.3 V and the register runs at 5 V. |
| Supply voltage | 2.0 V to 6.0 V [1] | Runs on 3.3 V or 5 V. |
| Output drive | Absolute maximum ±25 mA per output and 50 mA total supply current; total power dissipation 500 mW [1] | The outputs feed a microcontroller pin, so drive is rarely the constraint. |
| Propagation delay | Clock or enable to the serial output, 50 pF load: 18 ns typical and 33 ns maximum at V<sub>CC</sub> = 4.5 V and 25 °C. The parallel-load path (D7 to Q7) is faster at 13 ns typical. Maximum clock frequency 30 MHz guaranteed and 51 MHz typical at 4.5 V, rising to 35 MHz guaranteed and 61 MHz typical at 6 V [1] | Fast enough that the microcontroller's software loop is always the bottleneck. Note the catalog's 35 MHz is the 6 V guaranteed minimum, not a 5 V figure. [2] |
| Operating temperature | Specified from −40 °C to +85 °C and from −40 °C to +125 °C; the \`D\` (SO16) order code is the −40 °C to +125 °C grade [1] | Wide industrial range. |

## What the datasheet actually says

**Inputs are overvoltage tolerant to 15 V.** Nexperia calls this out as a
feature, and says it enables the device to be used for HIGH-to-LOW level
shifting. That is genuinely useful: you can read 12 V industrial signals into a
5 V register directly. [1]

**Parallel load is asynchronous.** Pulling PL low captures the inputs
immediately, with no clock needed. This is what lets you sample all eight signals
at exactly the same instant. [1]

**Clock enable is active low.** With CE high the clock input is disabled, so you
can leave a shared clock running and gate individual registers. [1]

## Watch out for

- **The load pin is active low**, and holding it low means the register keeps
  tracking the inputs rather than holding a snapshot.
- **Add pull-up or pull-down resistors on unused inputs.** An unconnected input
  reads as noise.
- **HC is not HCT.** Check levels for mixed-voltage designs.
- **Debounce in software.** The register captures whatever is on the pin,
  bounce included.

## In this catalog

Preferred Extended part in SOIC-16. At the 2026-07-24 snapshot: 28,398 in stock,
$0.14 at quantity 1, falling to $0.075 at 5,000. The catalog attributes record
2 V–6 V supply, 8 bits, 35 MHz clock frequency, 28 ns at 6 V with a 50 pF load,
25 mA output current, 500 mW dissipation and −40 °C to +125 °C. [2]

## Sources

1. Nexperia, *74HC165; 74HCT165 — 8-bit parallel-in/serial out shift register*,
   Rev. 8, 9 May 2025. Section 1 (General description), Section 2 (Features and
   benefits), Section 4 (Ordering information), Section 8 (Limiting values),
   Section 9 (Recommended operating conditions), Section 11 (Dynamic
   characteristics). <https://assets.nexperia.com/documents/data-sheet/74HC_HCT165.pdf>
2. JLCPCB / LCSC catalog record for C5613, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/shift-registers_nexperia-74hc165d-653_C5613.html>
`;export{e as default};