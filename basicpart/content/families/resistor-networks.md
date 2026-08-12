---
family: Resistor networks and arrays
part_count: 5
categories:
  - Resistor Networks, Arrays
kind: passive
catalog_snapshot: 2026-07-24
summary: Four resistors of the same value in one body — for pull-ups and series termination on a bus.
---

# Resistor networks and arrays

## What they are

A resistor array is several identical resistors in a single package. The catalog
holds five, all UNI-ROYAL parts in `0603x4` or `0402x4` form — four resistors in
the footprint of one 1206. [1]

They exist for one reason: when you need the same value many times in one place,
an array saves board area, placement cost and assembly time. Pull-ups on an
eight-bit bus, series termination on a set of parallel lines, current-limiting
for a row of LEDs.

## The specs that matter

| Specification | What it tells you |
|---|---|
| **Resistance** | The value — the same for every element in the package. |
| **Number of resistors** | Usually four in this catalog. |
| **Number of pins** | Eight for four isolated resistors; fewer if the elements share a common terminal. |
| **Power rating** | **Per element**, and usually with a lower *package* total. See below. |
| **Tolerance** | e.g. ±5 %. |
| **Temperature coefficient** | e.g. ±200 ppm/°C — often looser than a discrete chip resistor's. |

## What actually matters in practice

**Power is rated twice, and the package total is the binding one.** The catalog
lists 62.5 mW for these arrays, matching a single 0603 resistor. [1] But four
elements in one body share a thermal path: dissipating 62.5 mW in *each* of four
elements simultaneously is generally not permitted. If all four elements will
carry current at once, check the package total in the manufacturer's datasheet.

**Isolated or common?** An eight-pin, four-resistor array has four independent
resistors. Some arrays instead bring one end of every resistor to a shared pin,
which is convenient for pull-ups to a single rail and useless for series
termination. The `Number of Pins` attribute distinguishes them.

**Matching is the underrated benefit.** All four elements come from the same
substrate and the same firing, so their values track each other far better than
four separate resistors would — and they track each other over temperature too.
For a divider network or a ladder, that matching is worth more than absolute
accuracy.

**They are harder to rework.** One damaged element means replacing all four, and
the fine pitch is less forgiving than four discrete parts.

**±200 ppm/°C is loose.** The discrete 1 % resistors in this catalog are
±100 ppm/°C. [1] If absolute stability matters, use discretes; if *matching*
matters, the array is better despite the looser absolute figure.

## How to read the catalog attributes

| Attribute | Meaning |
|---|---|
| `Resistance` | Value of each element, e.g. `4.7kΩ`. |
| `Number of Resistors` | Elements in the package, e.g. `4`. |
| `Number of Pins` | `8` means four isolated resistors. |
| `Power(Watts)` | Per element. Check the package total separately. |
| `Tolerance` | e.g. `±5%`. |
| `Temperature Coefficient` | e.g. `±200ppm/℃`. |

The part number encodes the arrangement: in `4D03WGJ0472T5E`, `4D` is a
four-element array, `03` the 0603 element size, `J` the ±5 % tolerance, and `0472`
the value code (47 followed by two zeros = 4,700 Ω).

## Watch out for

- **Check the package power total**, not just the per-element rating.
- **Confirm isolated versus common-terminal** before designing the footprint.
- **Looser temperature coefficient** than discrete parts.
- **Only five parts in this catalog**, so the available values are limited.

## Sources

1. JLCPCB / LCSC catalog records for the Resistor Networks, Arrays category,
   snapshot 2026-07-24 (`raw-data/jlcpcb-basic-parts-2026-07-24.json` and
   `src/data/parts-index.json`). Resistance, count, power, tolerance and
   temperature-coefficient figures are the attribute values recorded there.
