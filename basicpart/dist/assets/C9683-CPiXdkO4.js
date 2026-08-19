var e=`---
part: C9683
mpn: ULN2803ADWR
manufacturer: Texas Instruments
category: Darlington Transistor Arrays
kind: logic
package: SOIC-18-300mil
tier: preferred
catalog_snapshot: 2026-07-24
datasheet:
  title: ULN2803A Darlington Transistor Arrays
  publisher: Texas Instruments
  document: SLRS049H
  revised: 2017-02
  url: https://electronperdido.com/wp-content/uploads/2018/10/ULN2803-datasheet.pdf
summary: Eight low-side switches instead of the ULN2003A's seven — same ratings, one more channel, and a much higher price here.
---

# ULN2803ADWR

> **Note on sources.** TI's own hosting of this datasheet (SLRS049H) returned
> HTTP 404 on every \`ti.com/lit/\` path tried during this work; the figures below
> were verified against a third-party mirror of the genuine document, whose
> identity (SLRS049H – February 1997 – Revised February 2017) is printed on
> every page. See \`ISSUES.md\`.

## What it is

The ULN2803A is the eight-channel version of the ULN2003A: eight transistor
switches in one package, each taking a logic-level input and pulling its output
down to ground to drive a load connected to a higher supply. Like its
seven-channel sibling it has a 2.7 kΩ series base resistor on each input for
direct TTL or 5 V CMOS drive, and common-cathode clamp diodes for inductive
loads. [1]

The extra channel matters when you are driving an eight-bit display, an
eight-relay board, or two four-phase stepper motors. Everything else about it —
the ratings, the caveats, the way you use it — is the same as the ULN2003A. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Eight NPN Darlington pairs, open-collector outputs, with common-cathode clamp diodes [1] | Low-side switching only; the load sits between the positive supply and the output pin. |
| Logic family | Not a logic family; 2.7 kΩ series base resistor per channel for direct TTL or 5 V CMOS drive. Input current 0.93 mA typical at V<sub>I</sub> = 3.85 V; off-state input current 65 µA maximum at 70 °C [1] | The same input arrangement as the ULN2003A, so it drives directly from a microcontroller pin. |
| Supply voltage | Collector-emitter voltage 0 V to 50 V; absolute maximum input voltage 30 V [1] | The load supply. There is no separate logic supply pin. |
| Output drive | 500 mA rated collector current per channel; pairs may be paralleled for more [1] | Per channel, not simultaneous across all eight — package dissipation is the real limit. |
| Propagation delay | Not a switching-speed part; collector-emitter saturation voltage 1.1 V maximum at 100 mA, 1.3 V at 200 mA, 1.6 V at 350 mA [1] | 1.3–1.6 V of drop at rated current is the cost of the Darlington structure. |
| Operating temperature | −40 °C to +85 °C ambient (recommended operating conditions) [1] | An ambient rating, unlike the ULN2003A's junction-referenced figure in the catalog. |

## What the datasheet actually says

**TI's own document confirms the 18-pin package.** The device information table
gives one package for the ULN2803A: \`ULN2803ADW\`, SOIC (18), 11.55 mm × 7.50 mm
body — matching this catalog's \`SOIC-18-300mil\`. TI's newer ULN2803C (SLRS076B)
is a **20-pin** SOIC, so despite the near-identical name it is *not* a drop-in
replacement for this part. [1] [3]

**The saturation figures match the seven-channel part exactly**: 0.9 V typical /
1.1 V maximum at 100 mA with 250 µA of base drive, 1.0 V / 1.3 V at 200 mA, and
1.3 V typical / 1.6 V maximum at 350 mA. As with the ULN2003A, seven or eight
channels at high current simultaneously will exceed the package's dissipation
long before the per-channel rating. [1]

**The clamp diodes are specified at 1.7 V typical, 2 V maximum at 350 mA**, with
50 µA of reverse leakage at 50 V — and they only work if the COM pin is tied to
the load's positive supply. [1]

**On-state input voltage is 2.4 V at 200 mA output, 3 V at 300 mA.** A 3.3 V
logic high drives a channel to 200 mA comfortably; at 300 mA you are at the edge
of the specification. 5 V drive has full margin. [1]

## Watch out for

- **It costs $6.22 in ones here, against $0.17 for the ULN2003A** — thirty-six
  times the price for one extra channel. Unless you genuinely need eight
  channels in one package, two ULN2003As are dramatically cheaper.
- **Stock is thin.** 2,405 units at the snapshot date.
- **Tie COM to the load supply** or the clamp diodes do nothing.
- **Low-side only**, and package power dissipation — not the 500 mA figure —
  governs how many channels you can run hard at once.
- **3.3 V drive is marginal above about 200 mA per channel.** Check the on-state
  input voltage row against your logic level.

## In this catalog

Preferred Extended part in SOIC-18 (300 mil). At the 2026-07-24 snapshot: 2,405
in stock, $6.22 at quantity 1, falling to $4.52 at 100. The price break table
flattens at 100 pieces, which suggests limited depth. The catalog attributes —
50 V, 500 mA, 8 channels, 30 V maximum input, 1.6 V V<sub>CE(sat)</sub>, 0.93 mA
on-state input current, 65 µA off-state, 1.7 V clamp forward voltage, 15 pF input
capacitance, −40 °C to +85 °C — all match SLRS049H. [1] [2]

## Sources

1. Texas Instruments, *ULN2803A Darlington Transistor Arrays*, SLRS049H,
   February 1997, revised February 2017. Features, Description and Device
   Information page 1, Section 6.1 (Absolute Maximum Ratings), Section 6.3
   (Recommended Operating Conditions), Section 6.5 (Electrical Characteristics).
   Retrieved from a third-party mirror
   (<https://electronperdido.com/wp-content/uploads/2018/10/ULN2803-datasheet.pdf>)
   because TI's own \`ti.com/lit/\` hosting of SLRS049 returned HTTP 404; the
   document number and revision are printed on every page of the mirror copy.
2. JLCPCB / LCSC catalog record for C9683, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`).
   <https://www.lcsc.com/product-detail/darlington-transistor-arrays_texas-instruments-uln2803adwr_C9683.html>
3. Texas Instruments, *ULN2803C Darlington Transistor Array*, SLRS076B, August
   2022, revised September 2024. Cited only for the package-count comparison.
   <https://www.ti.com/lit/ds/symlink/uln2803c.pdf>
`;export{e as default};