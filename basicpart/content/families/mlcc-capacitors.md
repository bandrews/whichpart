---
family: Multilayer ceramic capacitors (MLCC)
part_count: 136
categories:
  - Multilayer Ceramic Capacitors MLCC - SMD/SMT
kind: passive
catalog_snapshot: 2026-07-24
summary: The decoupling capacitor you place hundreds of — and the one whose real capacitance is often half what the label says.
---

# Multilayer ceramic capacitors (MLCC)

## What they are

A ceramic capacitor stores charge between interleaved metal plates separated by a
ceramic dielectric. In surface-mount form they are the workhorses of every board:
decoupling each IC's supply pin, filtering, timing, and coupling signals. There
are 136 in this catalog, mostly from Samsung Electro-Mechanics and Fenghua,
across 0402 to 1206. [1]

The important thing about MLCCs is not on the front of the datasheet. It is that
the capacitance you get depends on the voltage across the part, the temperature,
and how old it is — and for the popular high-capacitance dielectrics, those
effects are large.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Capacitance** | The nominal value, measured under specified conditions with almost no voltage applied. |
| **Voltage rating** | The maximum DC working voltage. Not a hard cliff, but exceeding it degrades the part. |
| **Tolerance** | How far the value may be from nominal *at the test condition*, e.g. ±10 %. Says nothing about behaviour in your circuit. |
| **Temperature coefficient (dielectric)** | The single most important field. C0G/NP0, X7R and Y5V behave completely differently. |
| **Package** | Sets the maximum practical capacitance and the mechanical behaviour. |

## What actually matters in practice

**The dielectric code tells you almost everything.**

- **C0G (also written NP0)** is a "class 1" dielectric: 0 ±30 ppm/°C over
  −55 °C to +125 °C, stable with voltage, no ageing, very low loss. Its drawback
  is capacitance density — you will not find microfarads in C0G. Use it for
  timing, filters, oscillator load capacitors, and anywhere the *value*
  matters. [2]
- **X7R** is "class 2": far more capacitance in the same package, ±15 % over
  −55 °C to +125 °C, but its capacitance falls as DC voltage is applied and it
  ages slowly. Use it for decoupling and bulk, where "enough" matters more than
  "exactly". [2]
- **X5R** is X7R's shorter-range sibling: the same ±15 % window, but only over
  −55 °C to **+85 °C**. It dominates the high-capacitance end of this catalog —
  of the 22 parts above 1 µF, 19 are X5R, and every part above 4.7 µF is. If your
  design goes above 85 °C — inside a sealed enclosure, next to a regulator, or in
  a car — check this field rather than assuming X7R. [1] [2]
- **Y5V** is class 2 taken to an extreme: +22 % to **−82 %** over a −30 °C to
  +85 °C range, before any DC bias effect. Enormous capacitance for the size, and
  a value you cannot rely on. There are two in this catalog; avoid them unless
  you know precisely why you want one. [1] [2]

**DC bias is the trap.** A small, high-value class 2 capacitor — say the 10 µF
X5R in an 0603 rated 10 V that this catalog stocks — can deliver well under half
its nominal capacitance once your working voltage is across it. The ±10 %
tolerance is measured near zero volts. This is not a defect and it is not
hidden — every manufacturer publishes DC-bias curves for these parts — but it is
invisible if you read only the headline number, and the effect is worse the
smaller the package and the closer the working voltage is to the rating. **If a
design needs a known capacitance under bias, use a physically larger package, a
higher voltage rating, or a C0G part.**

**Derate the voltage rating generously.** Running a 16 V X7R at 16 V is legal and
unwise: capacitance collapses and lifetime shortens. A common working rule is to
use no more than half the rated voltage.

**Ceramics are microphonic and piezoelectric.** Class 2 dielectrics physically
deform with applied voltage. In a switching converter that turns into audible
whine; conversely, board vibration turns into electrical noise. C0G does not do
this.

**Cracking is the commonest MLCC failure.** Ceramic is brittle, and board flex —
from depanelling, from a connector being levered, from a screw being
overtightened — cracks it. A cracked MLCC can short. Keep large packages away
from board edges and flex points.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Capacitance` | Nominal value, e.g. `1nF`. |
| `Voltage Rating` | DC working voltage, e.g. `50V`. |
| `Tolerance` | e.g. `±10%`, measured at the standard test condition. |
| `Temperature Coefficient` | The dielectric class, e.g. `X7R` or `C0G`. **Read this first.** |

The part number usually encodes the same information, in one of two schemes.

Fenghua parts read left to right: in `0402B102K500NT`, `0402` is the package, `B`
is the dielectric code, `102` is the capacitance code (10 followed by 2 zeros =
1,000 pF = 1 nF), `K` is ±10 % tolerance, and `500` is the 50 V rating.

Samsung's `CL` series packs the same facts differently. In `CL10A106KP8NNNC`:
`CL` is the series, `10` is the *size* code (0603 — note that `05` is 0402, `21`
is 0805 and `31` is 1206, so the number is not the imperial size), `A` is the
dielectric (`A` = X5R, `B` = X7R, `C` = C0G, `F` = Y5V), `106` is 10 µF, `K` is
±10 %, and `P` is the voltage code (`Q` = 6.3 V, `P` = 10 V, `O` = 16 V, `A` =
25 V, `B` = 50 V). The remaining characters are thickness, plating and packaging.
Two Samsung part numbers can therefore differ only in a letter and be a 6.3 V
part and a 50 V part. [2]

## Watch out for

- **Check the dielectric before the capacitance.** X7R and C0G are different
  components that happen to share a package.
- **Assume DC bias will cost you capacitance** on any class 2 part.
- **Derate voltage by at least half** for class 2 dielectrics.
- **Keep large packages away from board flex.**
- **The tolerance figure describes the test condition, not your circuit.**
- **X5R stops at 85 °C**, and it is what nearly every part above 1 µF here uses.

## Sources

1. JLCPCB / LCSC catalog records for the Multilayer Ceramic Capacitors MLCC –
   SMD/SMT category, snapshot 2026-07-24
   (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Manufacturer, package, capacitance, voltage,
   tolerance and dielectric figures are the attribute values recorded there.
2. Samsung Electro-Mechanics, *Multilayer Ceramic Capacitors (MLCC)* product
   catalog, November 2015. Part Numbering System (size, dielectric, capacitance,
   tolerance and rated-voltage codes) and the Class I / Class II dielectric
   tables giving each EIA code's operating temperature range and capacitance
   change. Retrieved via the LCSC datasheet link for C13585.
   <https://www.lcsc.com/datasheet/lcsc_datasheet_2304140030_Samsung-Electro-Mechanics-CL31A106KBHNNNE_C13585.pdf>
