var e=`---
family: Electrolytic and tantalum capacitors
part_count: 2
categories:
  - Tantalum Capacitors
  - Aluminium electrolytic (site table)
kind: passive
catalog_snapshot: 2026-07-24
summary: Bulk capacitance where ceramics run out — and the two failure modes you need to respect.
---

# Electrolytic and tantalum capacitors

## What they are

When you need tens or hundreds of microfarads, ceramic capacitors become
impractically large and their capacitance collapses under DC bias. Electrolytic
and tantalum capacitors provide bulk capacitance in a reasonable size, by using
a chemically-formed oxide layer as the dielectric. [1]

This catalog is thin here: two tantalum parts in the qualifying index — a 10 µF
16 V in an A case and a 100 µF 6.3 V in a B case, both Kyocera AVX TAJ-series —
plus a small electrolytic table on the site built from a handful of case
sizes. [1] [2] That reflects JLCPCB's Basic and Preferred selection rather than
any judgement about the parts.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Capacitance** | Nominal value. Electrolytics have wide tolerances by ceramic standards. |
| **Voltage rating** | The maximum DC working voltage. Derating matters enormously here — see below. |
| **ESR (equivalent series resistance)** | Internal resistance. Sets ripple heating and how well the part responds to fast current steps. |
| **Tolerance** | e.g. ±10 % or ±20 %. |
| **Operating temperature** | Aluminium electrolytics age much faster hot; tantalums are less temperature-sensitive but more voltage-sensitive. |
| **Case size** | For tantalums, the standard A/B/C/D case codes; for electrolytics, diameter and height. |

## What actually matters in practice

**Tantalum capacitors fail short, and they can fail on fire.** This is the
single most important fact about them. A tantalum that is over-voltaged, hit by
an inrush surge, or subjected to reverse polarity can short and burn. The
long-standing engineering practice is to **derate the voltage rating by at least
half** — a 16 V tantalum on a 5 V rail, not on a 12 V one. That is why the
catalog's 10 µF part is rated 16 V. [1]

**The manufacturer derates them too, and publishes the numbers.** Kyocera AVX
gives each TAJ part two voltages: a rated voltage up to 85 °C and a lower
*category* voltage up to 125 °C. The catalog's 16 V part is a 10 V part at
125 °C; its 6.3 V part is a 4 V part. That derating is before the halving rule,
not instead of it — so the 100 µF 6.3 V device is really a 3 V-rail part at room
temperature and less than that when hot. [3]

**AVX's reliability figure assumes a resistor you probably have not fitted.** The
TAJ datasheet quotes 1 % failures per 1,000 hours at 85 °C and rated voltage
"with 0.1 Ω/V series impedance". On a 5 V rail that is half an ohm in series with
the capacitor. Tantalums fail when a low-impedance source can dump current into a
flaw in the oxide faster than it can heal; the series impedance is what limits
that. Straight across the output of a stiff regulator, with no resistance in the
path, you are outside the condition the reliability number was measured
under. [3]

**Aluminium electrolytics dry out, and heat is what does it.** Their lifetime is
usually specified as a number of hours at a temperature — commonly 1,000 or
2,000 hours at 105 °C — and roughly doubles for every 10 °C cooler. A capacitor
running 20 °C cooler lasts four times as long. Keep them away from regulators and
power transistors.

**ESR is not a defect; sometimes it is a requirement.** Old linear regulators
depended on the output capacitor's ESR for loop stability, and replacing an
electrolytic with a low-ESR ceramic can make them oscillate. Modern parts usually
specify a capacitor type explicitly.

**Both types are polarised.** Reversed, an aluminium electrolytic vents and a
tantalum may catch fire. The marking convention differs between the two —
electrolytics mark the *negative* terminal, tantalums mark the *positive* — which
is a genuinely dangerous inconsistency to get wrong.

**Ripple current heats them, and the rating falls with temperature.** In a power
supply the capacitor sees a large AC current, and I² × ESR turns into heat inside
a part whose lifetime is governed by temperature. Check the ripple-current
rating, not just the capacitance. AVX rates the catalog's 10 µF part at 158 mA
RMS at 25 °C, 142 mA at 85 °C and 63 mA at 125 °C, all at 100 kHz — so the
headroom you have at room temperature is not the headroom you have inside a warm
enclosure. Its maximum ESR is the 3 Ω the catalog records; the 100 µF part is
1.7 Ω and 224 mA at 25 °C. [1] [3]

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Capacitance\` | Nominal value, e.g. \`10uF\`. |
| \`Voltage Rating\` | DC working voltage. **Derate.** |
| \`Equivalent Series Resistance(ESR)\` | With its test frequency, e.g. \`3Ω@100kHz\`. |
| \`Tolerance\` | e.g. \`±10%\`. |
| \`Operating Temperature\` | e.g. \`-55℃~+125℃\`. |

The site's electrolytic table is organised by capacitance and voltage against the
standard tantalum-style case codes (A = 3216, B = 3528, C = 6032, D = 7343). [2]

## Watch out for

- **Derate tantalum voltage by at least half.** This is a safety practice, not a
  reliability nicety.
- **Check the polarity marking convention** — it differs between electrolytic and
  tantalum parts.
- **Keep electrolytics away from heat.** Lifetime halves for every 10 °C.
- **Check the ripple-current rating** in any power application.
- **Do not assume ceramic is a drop-in replacement.** ESR may be part of the
  circuit.
- **Check the category voltage, not just the rated voltage**, if the part will
  ever be hot: both catalog tantalums lose about a third of their rating by
  125 °C.

## Sources

1. JLCPCB / LCSC catalog records for the Tantalum Capacitors category, snapshot
   2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`).
2. \`src/data/electrolytic-capacitors.json\`, the site's electrolytic capacitor
   table, snapshot 2026-07-24, for the case-code column definitions.
3. Kyocera AVX, *TAJ Series — Standard and Low Profile Tantalum Capacitors*.
   Ratings table (rated and category voltage and temperature, surge voltage,
   reliability condition) and the per-part rows for \`TAJA106*016#NJ\` and
   \`TAJB107*006#NJ\` giving leakage, dissipation factor, maximum ESR at 100 kHz
   and RMS ripple current at 25 °C, 85 °C and 125 °C.
   <https://datasheets.kyocera-avx.com/TAJ.pdf>
`;export{e as default};