var e=`---
part: C7420372
mpn: H5VL10B
manufacturer: hongjiacheng
category: ESD and Surge Protection (TVS/ESD)
kind: protection
package: DFN1006-2L
tier: preferred
catalog_snapshot: 2026-07-24
summary: A tiny bidirectional 5 V ESD clamp for slower signal lines — too much capacitance for USB data.
---

# H5VL10B

> **Note on sources.** This is a \`hongjiacheng\`-branded part whose datasheet is
> served only through LCSC, which blocks automated retrieval. The figures below
> come from the JLCPCB/LCSC catalog record and are cited as \`[1]\`. See
> \`ISSUES.md\`.

## What it is

An ESD protection diode: a device that sits across a signal line doing nothing at
all until a static discharge arrives, at which point it conducts and shunts the
energy to ground before it can reach whatever you are protecting. This one is
bidirectional, so it handles discharges of either polarity, and it is designed
for 5 V signals. [1]

The DFN1006 package is 1.0 × 0.6 mm — small enough to place right at a connector
pin, which is where ESD protection has to be to work. [1]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Single-channel bidirectional ESD protection diode [1] | One line protected per package; bidirectional suits AC-coupled or bipolar signals. |
| Working voltage | 5 V reverse standoff (V<sub>RWM</sub>); 5.6 V breakdown [1] | The signal must stay below 5 V, or the protector conducts during normal operation. |
| Clamping | 10 V clamping voltage at 5 A peak pulse current [1] | Whatever you are protecting must survive 10 V for the duration of the pulse. |
| Capacitance | 15 pF junction capacitance [1] | **This is the number that decides where you can use it.** 15 pF is fine for buttons, I²C and low-speed lines; it will visibly degrade USB 2.0 or any signal above a few tens of megahertz. |
| Peak pulse rating | 50 W peak pulse power dissipation; 5 A peak pulse current; rated to IEC 61000-4-2 and IEC 61000-4-5 [1] | The IEC 61000-4-2 rating is the one that corresponds to a human touching the connector. |
| Operating temperature | −55 °C to +125 °C [1] | Wide. |

## What the specification implies

**15 pF is a lot for a data line.** A USB 2.0 high-speed pair wants protection
under about 1 pF; a USB full-speed or I²C line tolerates rather more. The
repository's own curated note on this part says exactly this, and it is correct.
For USB data, use a low-capacitance protector such as the SRV05-4 (C85364), which
is 3.5 pF. [1] [2]

**Bidirectional means it clamps both polarities symmetrically**, which is right
for a signal that swings either side of ground and unnecessary for a
ground-referenced digital line — where a unidirectional part clamps harder.

**Placement matters more than the part.** ESD protection works only if it is the
first thing the discharge meets. Put it at the connector, with a short, direct
path to a solid ground.

## Watch out for

- **Not for USB data or other high-speed lines.** 15 pF is too much.
- **5 V standoff means the signal must stay below 5 V**, including any overshoot.
- **Place it at the connector**, not next to the chip you are protecting.
- **Ground return matters.** A long, thin ground trace from the protector defeats
  it.

## In this catalog

Preferred Extended part in DFN1006-2L. At the 2026-07-24 snapshot: 9,851,038 in
stock — by far the largest stock figure in the catalog — at $0.0067 at quantity 1,
falling to $0.0038 at 50,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C7420372, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/esd-and-surge-protection-tvs-esd_hongjiacheng-h5vl10b_C7420372.html>
2. basicp.art curated recommendations, \`src/data/other-components.json\`, which
   already carries the note that this part's capacitance is unsuitable for
   high-speed USB data lines.
`;export{e as default};