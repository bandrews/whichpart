var e=`---
family: Inductors and ferrite beads
part_count: 17
categories:
  - Inductors (SMD)
  - Ferrite Beads
kind: passive
catalog_snapshot: 2026-07-24
summary: Two parts that look identical and do opposite jobs — one stores energy, the other deliberately wastes it.
---

# Inductors and ferrite beads

## What they are

An inductor stores energy in a magnetic field and resists changes in current.
A ferrite bead looks like a tiny inductor and is specified completely
differently, because its job is to *absorb* high-frequency energy rather than
store it. The catalog holds 13 SMD inductors (mostly Sunlord and Fenghua) and 4
ferrite beads. [1]

Confusing the two is a common and consequential mistake. A ferrite bead in a
switching converter's output filter will get hot and do nothing useful; an
inductor where a bead belongs will resonate with the decoupling capacitors and
make noise worse.

## The specs that matter

### Inductors

| Specification | What it tells you |
|---|---|
| **Inductance** | The nominal value, at a stated frequency. |
| **Tolerance** | How far it may be from nominal. |
| **Saturation current (I<sub>sat</sub>)** | The current at which the core saturates and the inductance collapses. **The one that matters in a converter.** |
| **Current rating** | Usually a thermal limit — the current that causes a specified temperature rise. |
| **DC resistance (DCR)** | Copper loss. Directly costs efficiency. |
| **Self-resonant frequency (SRF)** | Above this the part behaves as a capacitor, not an inductor. |
| **Q at frequency** | Quality factor — matters in tuned circuits, not in power. |

### Ferrite beads

| Specification | What it tells you |
|---|---|
| **Impedance @ frequency** | The whole point of the part, e.g. \`600Ω@100MHz\`. Beads are specified as an impedance at a frequency, not as an inductance. |
| **DC resistance (DCR)** | The drop the bead adds at DC, e.g. \`450mΩ\`. |
| **Current rating** | Maximum DC current before the ferrite saturates and the impedance disappears. |
| **Tolerance** | On the impedance figure. |

## What actually matters in practice

**Saturation current, not current rating, sizes a converter's inductor.** The two
figures mean different things: current rating is usually a thermal limit, and
saturation current is where the magnetics stop working. In a buck converter the
peak inductor current is higher than the average output current by half the
ripple, and it is that peak that must stay below I<sub>sat</sub>. A saturated
inductor lets current rise almost without limit for the rest of the switching
cycle — which is how converters destroy themselves.

**DC resistance is efficiency.** At 2 A through a 2.1 Ω inductor you lose 8.4 W —
absurd. The catalog's 4.7 µH 0603 part has 2.1 Ω of DCR and a 15 mA current
rating; it is a signal inductor, not a power one. [1] Read the DCR and the
current rating together to see what a part is really for.

**Beads saturate too, and quietly.** A bead rated 200 mA that carries 200 mA has
almost none of its rated impedance left. On a supply rail this is easy to get
wrong: the bead does nothing, and the only symptom is that the noise you were
trying to filter is still there.

**A bead is a resistor at high frequency, and that is the point.** Below its
rated frequency it behaves inductively; near it, resistively — turning
high-frequency energy into a little heat instead of reflecting it somewhere else.
An LC filter, by contrast, moves the energy around and can resonate.

**Do not put a bead in a power path unless you have checked the DC drop.**
450 mΩ at 200 mA is 90 mV, which may or may not matter.

## How to read the catalog attributes

Inductors:

| Attribute | Meaning |
|---|---|
| \`Inductance\` | Nominal value, e.g. \`4.7uH\`. |
| \`Tolerance\` | e.g. \`±10%\`. |
| \`Current - Saturation (Isat)\` | Where the core saturates. |
| \`Current Rating\` | Usually a thermal limit. |
| \`DC Resistance(DCR)\` | Copper loss. |
| \`Frequency - Self Resonant\` | Upper useful frequency. |
| \`Q @ Frequency\` | Quality factor, for tuned circuits. |

Ferrite beads:

| Attribute | Meaning |
|---|---|
| \`Impedance @ Frequency\` | The defining specification, e.g. \`600Ω@100MHz\`. |
| \`DC Resistance(DCR)\` | DC drop the bead adds. |
| \`Current Rating\` | Where saturation begins. |
| \`Number of Circuits\` | 1 for a single bead; arrays exist. |

## Watch out for

- **Never confuse the two.** A bead is not a small inductor.
- **Size a converter inductor on peak current against I<sub>sat</sub>.**
- **Check DCR against your current** — it is pure loss.
- **A bead carrying its rated current has lost most of its impedance.**
- **Beads and bulk capacitors can resonate.** A bead plus a large capacitor forms
  a resonant circuit that can amplify noise at its resonant frequency; damping
  matters.

## Sources

1. JLCPCB / LCSC catalog records for the Inductors (SMD) and Ferrite Beads
   categories, snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\`
   and \`src/data/parts-index.json\`). Inductance, saturation, resistance and
   impedance figures are the attribute values recorded there.
`;export{e as default};