---
family: TVS and ESD protection
part_count: 324
categories:
  - ESD and Surge Protection (TVS/ESD)
kind: protection
catalog_snapshot: 2026-07-24
summary: The largest family in the catalog — clamps that do nothing until a surge arrives, then conduct hard.
---

# TVS and ESD protection

## What they are

A transient voltage suppressor is a diode built to survive being driven into
breakdown by a very large, very short pulse. It sits across a line doing nothing,
and when a surge arrives it conducts and clamps the voltage before the surge can
reach whatever you are protecting. There are 324 of them in this catalog — the
largest single family — mostly hongjiacheng-branded parts across a wide range of
packages. [1]

The distinction people miss is between *ESD* protection and *surge* protection.
Both live in this category and they solve different problems.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Reverse standoff voltage (V<sub>RWM</sub>)** | The highest normal operating voltage. Above this the part starts conducting during ordinary use. |
| **Breakdown voltage (V<sub>BR</sub>)** | Where it actually begins to conduct, measured at a small test current. |
| **Clamping voltage (V<sub>C</sub>)** | What the protected circuit sees during the surge, at the rated peak current. **This is the number that decides whether protection works.** |
| **Junction capacitance** | How much it loads the line. The single most important figure for a data line. |
| **Peak pulse power / current** | How big a surge it survives, always with a waveform, e.g. `8/20µs`. |
| **Polarity** | Unidirectional clamps one way, bidirectional both. |
| **Level of protection** | Which IEC tests it is rated against. |

## What actually matters in practice

**Capacitance decides where you can use it.** A 100 pF TVS on a USB 2.0
high-speed pair will destroy the signal; on a button input it is irrelevant. The
catalog's range runs from about 3.5 pF (the SRV05-4, C85364) to tens of
picofarads. **Match the capacitance to the signal's speed first, then worry about
everything else.**

**Standoff voltage must be above your normal operating voltage, with margin.** A
5 V standoff part on a 5 V rail is marginal: rail tolerance and ripple can push
it into conduction, where it draws current continuously and heats up.

**Clamping voltage is what your chip sees.** A part that clamps a 15 kV strike to
12 V protects a 3.3 V input; one that clamps to 40 V may not. Compare clamping
voltages, not standoff voltages.

**ESD and surge are different tests.** IEC 61000-4-2 is electrostatic discharge:
kilovolts, nanoseconds, tiny energy — what happens when a person touches a
connector. IEC 61000-4-5 is surge: hundreds of volts, microseconds, enormous
energy — what happens when lightning strikes nearby. A part rated for one is not
necessarily adequate for the other, and the energy involved differs by orders of
magnitude.

**Placement beats specification.** A TVS works only if it is the first thing the
surge meets and has a short, low-inductance path to ground. Put it at the
connector, with a wide ground connection. A perfect part 50 mm downstream of a
thin trace protects the trace.

**Bidirectional for AC or bipolar signals; unidirectional for ground-referenced
digital.** A unidirectional part clamps harder in the forward direction because
it conducts as an ordinary diode.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Reverse Stand-Off Voltage (Vrwm)` | Maximum normal operating voltage. |
| `Voltage - Breakdown` | Where conduction begins, at the test current. |
| `Clamping Voltage` | Voltage during the surge, at the rated peak current. |
| `Junction Capacitance` | Loading on the protected line. **Check first for data lines.** |
| `Peak Pulse Power Dissipation (Ppp)` | e.g. `100W@8/20us` — always read the waveform. |
| `Peak Pulse Current (Ipp)` | e.g. `8A@8/20us`. |
| `Polarity` | `Unidirectional` or `Bidirectional`. |
| `Number of Channels` | How many lines one package protects. |
| `level of protection` | The IEC standards it is rated against. |
| `Reverse Leakage Current (Ir)` | Current drawn during normal operation. |

## Watch out for

- **Capacitance first for any data line.**
- **Standoff voltage above your rail, with margin.**
- **Compare clamping voltages, not standoff voltages.**
- **Place at the connector**, with a short ground path.
- **ESD-rated is not surge-rated.** Check which IEC test you need.
- **Most parts in this family are from one manufacturer** and their LCSC-hosted
  datasheets are not reachable to automated fetching — the catalog attributes are
  the specification of record. See `ISSUES.md`.

## Sources

1. JLCPCB / LCSC catalog records for the ESD and Surge Protection (TVS/ESD)
   category, snapshot 2026-07-24 (`raw-data/jlcpcb-basic-parts-2026-07-24.json`
   and `src/data/parts-index.json`). Standoff, breakdown, clamping, capacitance
   and pulse figures are the attribute values recorded there.
