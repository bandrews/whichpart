var e=`---
family: Schottky, fast-recovery, switching and general-purpose diodes
part_count: 311
categories:
  - Schottky Diodes
  - Fast Recovery / High Efficiency Diodes
  - Switching Diodes
  - Diodes - General Purpose
kind: discrete-diode
catalog_snapshot: 2026-07-24
summary: Four diode families that differ in one trade-off — forward drop against reverse voltage and leakage.
---

# Schottky, fast-recovery, switching and general-purpose diodes

## What they are

A diode conducts one way and blocks the other. The catalog splits them into four
categories — 202 Schottky, 55 fast-recovery, 27 switching and 27 general-purpose
— and the split is not arbitrary: each family sits at a different point on the
same set of trade-offs. [1]

| Family | Forward drop | Reverse voltage | Leakage | Recovery | Typical job |
|---|---|---|---|---|---|
| **Schottky** | Lowest (~0.3–0.6 V) | Lowest (20–100 V) | Highest | Essentially none | Buck-converter catch diode, OR-ing, low-drop rectification |
| **Fast recovery** | Higher (~1–1.7 V) | Highest (to 1,000 V) | Very low | Tens to hundreds of ns | Offline supplies, snubbers, flyback |
| **Switching** | Moderate (~0.7–1.2 V) | Moderate (75–100 V) | Very low | Very fast (~4 ns) | Signal steering, clamping, logic |
| **General purpose** | ~1.1 V | High (to 1,000 V) | Very low | Slow (µs) | Mains rectification, reverse-polarity blocking |

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Repetitive peak reverse voltage (V<sub>R</sub>)** | The most it will block. Exceed it and it conducts backwards, usually destructively. |
| **Average rectified current (I<sub>F</sub>)** | The continuous forward current, assuming a specified thermal environment. |
| **Forward voltage (V<sub>F</sub>)** | The drop when conducting, always quoted at a stated current. Multiply by current to get heat. |
| **Non-repetitive peak surge current** | What it survives once — the inrush when a capacitor charges. |
| **Reverse leakage (I<sub>R</sub>)** | Current when blocking. Schottky parts leak orders of magnitude more than silicon. |
| **Reverse recovery time (t<sub>rr</sub>)** | How long it keeps conducting after the current reverses. Critical in switching circuits, irrelevant at 50 Hz. |

## What actually matters in practice

**Forward voltage is heat.** A 1 A diode at 1.1 V dissipates 1.1 W; the same
current through a 0.55 V Schottky dissipates half that. In a switching converter
running continuously, that difference is the efficiency figure.

**Reverse leakage is the Schottky tax.** The catalog's SS14 leaks 200 µA at 40 V;
a silicon US1M leaks 5 µA at 1,000 V. [1] For a converter's catch diode, leakage
is irrelevant. For battery isolation or a high-impedance node, 200 µA is a real
and continuous drain — and it rises steeply with temperature, which can run away.

**Recovery time only matters when the current reverses quickly.** At 50 Hz a
microsecond of recovery is nothing. At 100 kHz it is a tenth of the cycle, and
during that time the diode is a short circuit across your switch — heat and EMI.
That is why a converter needs a Schottky or a fast-recovery part and a 1N4007
will not do.

**Voltage rating needs headroom, not just margin.** In a buck converter the
switch node swings from about −0.7 V to the input voltage, and it rings above
that. A 40 V Schottky on a 24 V converter is marginal. Rule of thumb: at least
twice the maximum steady-state reverse voltage.

**Package and copper set the real current rating.** An SMA diode rated 1 A
assumes a specified pad area. Halve the copper and you halve what it can carry.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| \`Voltage - DC Reverse(Vr)\` | Maximum blocking voltage. |
| \`Current - Rectified\` | Average forward current rating. |
| \`Voltage - Forward(Vf@If)\` | Forward drop, with the current it was measured at. |
| \`Non-Repetitive Peak Forward Surge Current\` | One-shot surge rating. |
| \`Reverse Leakage Current (Ir)\` | Blocking-state leakage, with the voltage it was measured at. |
| \`Reverse Recovery Time (trr)\` | On fast-recovery and switching parts. |
| \`Diode Configuration\` | \`Independent\` for a single diode; \`1 Pair Series Connection\` and similar for duals. |
| \`Operating Junction Temperature Range\` | Usually \`-55℃~+150℃\`. |

## Watch out for

- **Match the family to the job** before comparing individual parts.
- **Compute V<sub>F</sub> × I** and check it against the package.
- **Schottky leakage matters in battery circuits** and worsens with temperature.
- **Double your reverse-voltage requirement** to allow for switching ringing.
- **Most of these parts are house-brand** and their LCSC-hosted datasheets are not
  reachable to automated fetching — the catalog attributes are the specification
  of record. See \`ISSUES.md\`.

## Individual notes in this collection

Four parts from these families have their own files: \`C7420316\` (SS14 Schottky),
\`C412437\` (US1M fast recovery), \`C7502727\` (BAV99W switching) and \`C37704\`
(BAT54C dual Schottky).

## Sources

1. JLCPCB / LCSC catalog records for the Schottky Diodes, Fast Recovery / High
   Efficiency Diodes, Switching Diodes and Diodes – General Purpose categories,
   snapshot 2026-07-24 (\`raw-data/jlcpcb-basic-parts-2026-07-24.json\` and
   \`src/data/parts-index.json\`). All voltage, current, forward-drop, leakage and
   recovery figures are the attribute values recorded there.
`;export{e as default};