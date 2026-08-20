var e=`---
part: C84681
mpn: CH340C
manufacturer: WCH (Nanjing Qinheng Microelectronics)
category: Interfaces & Isolation
kind: interface
package: SOP-16
tier: extended
catalog_snapshot: 2026-07-24
datasheet:
  title: CH340 — USB bus convert chip (CH340DS1)
  publisher: Nanjing Qinheng Microelectronics (WCH)
  document: CH340DS1
  url: https://cdn.sparkfun.com/datasheets/Dev/Arduino/Other/CH340DS1.PDF
summary: The cheap USB-to-serial bridge — the alternative to a CP2102 when cost matters more than driver support.
---

# CH340C

> **Note on sources.** The WCH datasheet obtained (CH340DS1) covers the CH340
> family but does not name the \`C\` variant, and WCH's own download pages returned
> JavaScript rather than the PDF. Family-level facts are cited as \`[1]\` from that
> datasheet; anything specific to this order code comes from the repository's
> curated record, cited as \`[2]\`. Where a widely-repeated claim about the \`C\`
> variant could not be confirmed, this note says so. See \`ISSUES.md\`.

## What it is

The CH340 is WCH's USB-to-serial bridge: plug it into a computer and it appears
as a COM port, while speaking ordinary asynchronous serial to your
microcontroller. It does the same job as the CP2102 (C6568) in this catalog, at a
fraction of the price. [1]

That price is why it appears on most inexpensive development boards. The
trade-offs are driver support — historically less smooth than Silicon Labs' —
and, for this particular order code, an uncertain supply position. [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | USB-to-serial bridge; the family also supports USB-to-printer and USB-to-infrared modes [1] | The serial mode is what everyone uses it for. |
| Signalling standard | Full-speed USB device, conforming to USB Specification 2.0; hardware full-duplex serial with transmit and receive buffers and common modem handshake signals [1] | Full modem control, like the CP2102. |
| Maximum data rate | 50 bps to 2 Mbps [1] | Higher than the CP2102's 1 Mbps ceiling. |
| Supply voltage | 4.5 V to 5.3 V with V3 decoupled by a 4,700 pF or 0.01 µF capacitor, or 3.3 V to 3.8 V with V3 tied to V<sub>CC</sub> and every other connected circuit kept at or below 3.3 V. Absolute maximum 6.5 V. Supply current 12 mA typical, 30 mA maximum [1] | The V3 pin arrangement is a real wiring difference between the two modes, and easy to get wrong. WCH notes that the current figures are for 5 V operation and should be multiplied by 40 % at 3.3 V. |
| Isolation or protection | None [1] | No galvanic isolation. |
| Operating temperature | −40 °C to +85 °C ambient, in WCH's absolute maximum ratings table; storage −55 °C to +125 °C [1] | Industrial range. Note it is stated as an absolute maximum rather than a range over which the electrical parameters are specified — those are quoted at 25 °C. |

## What the datasheet actually says

**The family datasheet requires an external 12 MHz crystal.** WCH describes the
clock as generated "by inverter in CH340 through oscillating of crystal", with a
12 MHz crystal between XI and XO and a capacitor from each to ground — 22 pF for
a quartz crystal, or about 47 pF for a low-cost ceramic resonator. [1]

**The \`C\` variant's defining difference is an integrated clock — no external
crystal.** The family datasheet obtained does not cover the \`C\` variant, but the
LCSC listing for this exact part confirms an "integrated clock generator" with
"no external crystal" required (checked 2026-08-19). That is the main reason to
choose the \`C\` over the crystal-requiring \`G\`. [3]

**Layout guidance is unusually specific.** WCH asks for the decoupling capacitors
close to the pins, D+ and D− routed in parallel with ground poured beside them,
and the XI/XO traces kept as short as possible. Those are sensible rules for any
USB device and worth following. [1]

**A pull-up on D+ is internal**, so no external USB pull-up resistor is
needed. [1]

## Watch out for

- **Lifecycle status is murky.** The repository's curated record carried a
  "no longer manufactured" flag, but the live JLCPCB and LCSC listings checked
  on 2026-08-19 show no such marking and around 69,000 units in stock at $0.59.
  Verify before designing it in. [2] [3]
- **Get the V3 pin right** for your supply voltage — it is wired differently at
  5 V and 3.3 V.
- **Driver experience varies.** Modern Linux and macOS include a CH340 driver;
  Windows generally needs WCH's, and there is a long history of counterfeit-chip
  detection causing trouble.
- **The CP2102 (C6568) is the Preferred-tier alternative** in this catalog, at
  roughly ten times the price but with better driver support and no supply
  question.

## In this catalog

Listed as an ordinary Extended part in the curated recommendations, in SOP-16.
Because it is Extended rather than Basic or Preferred, it does not appear in the
qualifying catalog snapshot. The live LCSC listing (2026-08-19) showed 69,076 in
stock at $0.59 in ones, falling to $0.36 at 1,000, with a −20 °C to +70 °C
operating range — a commercial-grade limit worth noting. [2] [3]

## Sources

1. Nanjing Qinheng Microelectronics (WCH), *CH340 — USB bus convert chip*,
   CH340DS1. Section 2 (Features), pin description, Section on clock and power
   arrangements, application circuit notes. This document covers the CH340
   family but does not name the \`C\` variant.
   <https://cdn.sparkfun.com/datasheets/Dev/Arduino/Other/CH340DS1.PDF>
2. basicp.art curated recommendations, \`src/data/other-components.json\`, catalog
   snapshot 2026-07-24.
3. LCSC product page for C84681 (WCH CH340C), retrieved 2026-08-19 — source for
   the integrated-clock confirmation, stock, price and temperature range.
   <https://www.lcsc.com/product-detail/C84681.html>
`;export{e as default};