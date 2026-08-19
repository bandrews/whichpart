---
family: Crystals
part_count: 7
categories:
  - Crystals
kind: clock
catalog_snapshot: 2026-07-24
summary: Quartz resonators — the reason your USB enumerates and your clock does not drift.
---

# Crystals

## What they are

A quartz crystal vibrates mechanically at a very precise frequency when a voltage
is applied across it, and that precision — parts per million rather than the
percent-level accuracy of an RC oscillator — is why they are still in every
design that talks to something else. The catalog holds seven, from YXC and Seiko
Epson. [1]

They fall into two quite different groups. **Megahertz crystals** — 8 MHz,
11.0592 MHz, 12 MHz, 16 MHz and 25 MHz here — drive a microcontroller's main
oscillator. **32.768 kHz crystals** are tuning-fork resonators for real-time
clocks, and behave differently in almost every respect. [1]

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Frequency** | The nominal value. |
| **Frequency tolerance** | How far off it is at room temperature when new, in ppm. |
| **Frequency stability** | Additional drift over the operating temperature range, in ppm. **Adds to the tolerance.** |
| **Load capacitance (C<sub>L</sub>)** | What the crystal expects to see. Your capacitors must make this up. **The most commonly mishandled specification.** |
| **Equivalent series resistance (ESR)** | How hard the oscillator must work to keep it going. |
| **Operating temperature** | Range over which the stability figure applies. |

## What actually matters in practice

**The load capacitance differs from part to part, even within this small
group.** The six megahertz crystals here specify 9 pF, 12 pF or 20 pF, so the
capacitors that suit one are wrong for another. YXC's series datasheet is no help
on its own: it lists the options the series offers and leaves the frequency,
tolerance and load capacitance to the order code, so the catalog record is the
only place the actual value appears. [1] [3] Swapping a 20 pF-load crystal for
a 9 pF-load one without changing the capacitors will shift the frequency by tens
of parts per million. [1]

**Load capacitance is not the capacitor value.** The rule is
C<sub>L</sub> = (C1 × C2)/(C1 + C2) + C<sub>stray</sub>, where C1 and C2 are the
two capacitors to ground and C<sub>stray</sub> is typically a few picofarads of
pin and trace capacitance. For matched capacitors that means each one is roughly
2 × (C<sub>L</sub> − C<sub>stray</sub>). Fitting the load-capacitance value
directly as each capacitor makes the crystal run slow, and it is probably the
single most common crystal mistake.

**Tolerance and stability add.** A ±10 ppm crystal with ±20 ppm stability is
±30 ppm worst case — about 2.6 seconds a day. For a UART at 115,200 baud that is
irrelevant (UARTs tolerate a percent or two); for a clock, or for USB, it is not.

**ESR determines whether it starts at all.** A microcontroller's oscillator
supplies a limited amount of negative resistance; the usual design rule is that
it should exceed the crystal's ESR several times over. Megahertz crystals here
are 50–80 Ω; the 32.768 kHz part is 70 kΩ. [1] Those are different worlds, and a
32 kHz crystal on a megahertz oscillator pin will not run.

**Drive level matters, especially at 32.768 kHz.** Tuning-fork crystals are
driven with microwatts and can be permanently damaged by over-driving. Epson
rates the catalog's 32.768 kHz part for 0.5 µW of drive, with 1.0 µW as the
maximum, and measures its ±20 ppm tolerance at 0.1 µW. Those are microwatts — an
oscillator designed for a megahertz crystal will happily exceed them. That is why
RTC oscillator circuits include a series resistor and why you
should not transplant component values between the two crystal types. [2]

**The 32.768 kHz part's drift is parabolic, not linear.** Epson specifies a
turnover temperature of +25 °C ±5 °C and a parabolic coefficient of
−0.04 × 10⁻⁶/°C², which means the frequency falls away from its peak in both
directions: about −4 ppm at 15 °C from turnover, −36 ppm at 30 °C away, −100 ppm
at 50 °C away. A clock that keeps good time on a bench can lose several minutes a
month in a cold room, and no amount of initial trimming fixes that. [2]

**Some chips have integrated load capacitors.** The PCF8563 RTC in this catalog
does; the DS1302 does not. Adding external capacitors to a chip that already has
them pulls the frequency low. Check the driving chip's datasheet before adding
anything.

**Layout is not optional.** A crystal is a high-impedance, high-Q node. Keep the
traces short, keep them away from switching signals, and surround them with
ground. Many microcontroller datasheets — the RP2040's among them — name a
specific recommended crystal, and following that recommendation is cheaper than
debugging a marginal oscillator.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Frequency` | Nominal, e.g. `12MHz` or `32.768kHz`. |
| `Normal temperature Frequency Tolerance` | Room-temperature accuracy, e.g. `±10ppm`. |
| `Frequency Stability` | Additional drift over temperature, e.g. `±20ppm`. |
| `Load Capacitance` | What the crystal expects, e.g. `20pF`. |
| `Equivalent Series Resistance(ESR)` | e.g. `80Ω` (MHz) or `70kΩ` (32.768 kHz). |
| `Operating Temperature` | Range for the stability figure. |

## Watch out for

- **Calculate the load capacitors; never fit C<sub>L</sub> directly.**
- **Tolerance and stability add.**
- **Check whether your chip has integrated load capacitance.**
- **Megahertz and 32.768 kHz crystals need different circuits.**
- **Follow the microcontroller vendor's recommended crystal** where one is named.
- **Check the temperature range as well as the ppm figure.** Five of these parts
  are specified over −40 °C to +85 °C, but the 8 MHz HC-49S part is only
  specified from −20 °C to +70 °C. [1]

## Individual notes in this collection

All four crystals in the curated picks have their own files: `C9002` (12 MHz),
`C13738` (16 MHz), `C9006` (25 MHz) and `C32346` (32.768 kHz).

## Sources

1. JLCPCB / LCSC catalog records for the Crystals category, snapshot 2026-07-24
   (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Frequency, tolerance, stability, load
   capacitance and ESR figures are the attribute values recorded there.
2. Seiko Epson Corporation, *FC-135R / FC-135 / FC-135 TYPE — kHz Range Crystal
   Unit*, for the 32.768 kHz part in this family (C32346): the specifications
   table giving frequency tolerance and its drive-level condition, turnover
   temperature, parabolic coefficient, load capacitance and motional resistance.
   <https://download.epsondevice.com/td/pdf/brief/FC-135_en.pdf>
3. YXC, *Crystal Unit YSX321SL*, the series datasheet behind the megahertz
   crystals in this family (C9002, C9006, C13738). A single undated page with no
   document number; it gives the series' frequency range, tolerance and stability
   options, load-capacitance options and the equivalent-series-resistance table by
   frequency band, and leaves the exact frequency, tolerance and load capacitance
   to the order code.
   <https://datasheet.lcsc.com/datasheet/pdf/a84bd8d530dd46e4b0f6d0ee59d8a89c.pdf>
