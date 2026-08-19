var e=`---
part: C7502727
mpn: BAV99W
manufacturer: hongjiacheng
category: Switching Diodes
kind: discrete-diode
package: SOT-323
tier: preferred
catalog_snapshot: 2026-07-24
summary: Two fast silicon switching diodes in series in a tiny package — for clamping, steering and protection.
---

# BAV99W

> **Note on sources.** This catalog entry is a \`hongjiacheng\`-branded part, and
> that manufacturer's own datasheet is served only through LCSC, which blocks
> automated retrieval. BAV99W is an industry-standard type made by many
> manufacturers, so this note quotes the JLCPCB/LCSC catalog record as \`[1]\` for
> the part actually being supplied, and cites Nexperia's BAV99W datasheet as
> \`[2]\` for context on the type — explicitly flagging where the two differ. See
> \`ISSUES.md\`.

## What it is

BAV99 is one of the most common small-signal diode types in electronics: two fast
silicon switching diodes connected in series inside one package, with the
junction between them brought out to the middle pin. That arrangement gives you a
clamp to two rails, a pair of independent diodes, or a series pair, depending on
how you wire it. The \`W\` suffix denotes the very small SOT-323 (SC-70)
package. [1] [2]

Typical uses: clamping an input pin to the supply rails, steering a signal,
protecting a MOSFET gate, or building a small logic OR. [2]

## Key specifications

| Specification | Value | Why it matters |
|---|---|---|
| Function | Two high-speed silicon switching diodes in series, common connection brought out [1] | One package covers several circuit patterns. |
| Repetitive peak reverse voltage | 75 V [1] | Note: Nexperia's BAV99W is rated 100 V. The part in this catalog is specified at 75 V, so design to 75 V. [1] [2] |
| Average forward current | 150 mA rectified; 2 A non-repetitive peak surge; 200 mW power dissipation [1] | The 200 mW figure is the practical limit in SOT-323. |
| Forward voltage | 1.25 V at 150 mA [1] | Higher than a Schottky, which is the normal trade for far lower leakage. |
| Recovery or capacitance | Reverse recovery time 4 ns; reverse leakage 2.5 µA [1] | 4 ns is genuinely fast — this is why BAV99 is used for signal work rather than a 1N4148-class part. |
| Operating temperature | Junction −55 °C to +150 °C [1] | Wide. |

## What the datasheet actually says

Nexperia's datasheet for the same industry type gives some useful context on what
a BAV99W is designed to do. It specifies a switching speed of t<sub>rr</sub> ≤ 4 ns,
diode capacitance C<sub>d</sub> ≤ 1.5 pF, and lists high-speed switching, reverse
polarity protection and general-purpose switching as the applications. Its forward
current rating distinguishes 150 mA with a single diode loaded from 130 mA with
both loaded — a distinction worth knowing whichever manufacturer's part you
have. [2]

**Nexperia rates its BAV99W at 100 V reverse; the catalog part is rated 75 V.**
Both are legitimate — BAV99 is a type, not a single design — but it means you
cannot simply read a Nexperia datasheet and apply every number to this part. [1] [2]

## Watch out for

- **Design to 75 V**, not the 100 V you may find on other manufacturers'
  BAV99W datasheets.
- **The middle pin is the common connection.** Check the pinout against your
  intended circuit; series, common-anode and common-cathode variants of this
  family exist.
- **200 mW dissipation** in SOT-323 is the real limit.
- **1.25 V of forward drop at 150 mA** makes it unsuitable as a power rectifier.

## In this catalog

Preferred Extended part in SOT-323. At the 2026-07-24 snapshot: 39,158 in stock,
$0.013 at quantity 1, falling to $0.0098 at 21,000. [1]

## Sources

1. JLCPCB / LCSC catalog record for C7502727, snapshot 2026-07-24
   (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`). This is the source for every
   figure in the specification table above.
   <https://www.lcsc.com/product-detail/switching-diodes_hongjiacheng-bav99w_C7502727.html>
2. Nexperia, *BAV99W — High-speed switching diode*, Product data sheet,
   1 July 2022. Cited for context on the BAV99W industry type only; the part in
   this catalog is from a different manufacturer and differs in reverse-voltage
   rating. <https://assets.nexperia.com/documents/data-sheet/BAV99W.pdf>
`;export{e as default};