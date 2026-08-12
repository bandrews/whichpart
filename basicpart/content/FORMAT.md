# File format

Every file in `components/` and `families/` follows the same shape, so a future
UI can parse them without special cases. The format is YAML front matter
followed by a fixed sequence of Markdown sections.

## Front matter

```yaml
---
part: C7593                       # LCSC C-number; matches the key in parts-index.json
mpn: NE555DR                      # manufacturer part number, as the catalog spells it
manufacturer: Texas Instruments
category: 555 Timers / Counters   # catalog category, verbatim
kind: analog-timing-logic         # one of the kinds listed below
package: SOIC-8
tier: preferred                   # basic | preferred | extended
catalog_snapshot: 2026-07-24
datasheet:
  title: xx555 Precision Timers
  publisher: Texas Instruments
  document: SLFS022L
  revised: 2023-01
  url: https://www.ti.com/lit/ds/symlink/ne555.pdf
summary: One sentence, under 140 characters, safe to use as a card subtitle.
---
```

Front matter rules:

- `part` is the primary key and must match the `.md` filename.
- `datasheet` is omitted only when no public manufacturer datasheet could be
  found; in that case the body says so explicitly.
- `document` and `revised` are copied from the datasheet's own cover or footer.
  If the document carries no revision marking, the field is omitted rather than
  guessed.
- `summary` is written for display, not for search. It never contains a figure
  that is not also in the body.

Family files use `family:` instead of `part:`/`mpn:`, add `part_count:` and
`categories:` (the catalog categories the family covers), and omit `package`
and `tier`.

## Body sections

The sections appear in this order and with these exact headings. A section is
omitted only when it would be empty, never reordered.

| Heading | Contents |
|---|---|
| `## What it is` | Two or three sentences of plain prose. What the part does, who it is for, and what a typical design uses it for. No tables, no abbreviations left unexplained. |
| `## Key specifications` | A three-column table: **Specification**, **Value**, **Why it matters**. The rows are fixed per `kind` (see below) so parts of the same kind line up. Every value carries a source marker. |
| `## What the datasheet actually says` | Prose. The two or three things in the datasheet that a datasheet skimmer would miss — conditions attached to headline numbers, derating, the difference between typical and guaranteed. |
| `## Watch out for` | A short bullet list of practical traps: layout requirements, missing protection, obsolescence, footprint ambiguity. Omitted if there is genuinely nothing to flag. |
| `## In this catalog` | Package, tier, price at the catalog's break points, and stock at the snapshot date, all from the catalog record. |
| `## Sources` | Numbered list. Every marker used in the body resolves here. |

## Source markers

Values in the specification table end with a bracketed marker that points at the
numbered source list:

- `[1]` — manufacturer datasheet
- `[2]` — JLCPCB/LCSC catalog record for this C-number
- `[3]`, `[4]`, … — any further document, named in full in the source list

A value with no marker is a mistake. A value whose source is the catalog rather
than the datasheet is always marked `[2]`, because catalog attribute strings are
transcriptions and can be wrong — several already are, and `ISSUES.md` lists
them.

## Kinds and their fixed specification rows

`kind` controls which rows the **Key specifications** table carries. Parts of the
same kind carry the same rows in the same order, so they can be compared
side by side or rendered into a common table.

| `kind` | Rows, in order |
|---|---|
| `microcontroller` | Core and maximum clock; Flash; RAM; Supply voltage; GPIO count; Notable peripherals; Operating temperature |
| `power-linear` | Output voltage; Output current; Input voltage range; Dropout voltage; Quiescent current; Output accuracy; Operating temperature |
| `power-switching` | Output voltage; Output current; Input voltage range; Switching frequency; Efficiency; Operating temperature |
| `battery-management` | Function; Charge voltage; Charge current; Input voltage range; Termination and status; Operating temperature |
| `interface` | Function; Signalling standard; Maximum data rate; Supply voltage; Isolation or protection; Operating temperature |
| `logic` | Function; Logic family; Supply voltage; Output drive; Propagation delay; Operating temperature |
| `analog` | Function; Supply voltage; Input offset voltage; Gain bandwidth; Output swing; Supply current; Operating temperature |
| `memory` | Capacity; Interface; Maximum clock; Supply voltage; Endurance and retention; Operating temperature |
| `clock` | Nominal frequency; Frequency tolerance; Load capacitance; Equivalent series resistance; Stability over temperature; Operating temperature |
| `discrete-mosfet` | Channel; Drain-source voltage; Continuous drain current; On-resistance at stated drive; Gate threshold; Operating temperature |
| `discrete-diode` | Function; Repetitive peak reverse voltage; Average forward current; Forward voltage; Recovery or capacitance; Operating temperature |
| `protection` | Function; Working voltage; Clamping; Capacitance; Peak pulse rating; Operating temperature |
| `led` | Colour; Forward voltage; Forward current; Luminous intensity; Viewing angle; Operating temperature |
| `sensor` | Measurand and ranges; Interface; Resolution; Supply voltage; Supply current; Operating temperature |
| `connector` | Contact count; Current rating; Voltage rating; Mating cycles; Mounting; Operating temperature |
| `isolation` | Function; Isolation rating; Channel count and direction; Maximum data rate; Supply voltage; Operating temperature |

A part that genuinely has no meaningful value for a row keeps the row and writes
`Not specified [1]` — an absent row would break alignment for the UI.

## Family files

Family files replace **Key specifications** with **The specs that matter**, a
two-column table of *Specification* and *What it tells you*, and add a section
**How to read the catalog attributes** that maps the attribute strings in
`parts-index.json` onto those specs. Everything else is the same.
