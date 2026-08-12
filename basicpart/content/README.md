# Component spec notes

This folder holds short, plain-English spec summaries for the parts that
basicp.art covers. Each file explains what a part actually is, pulls out the
handful of numbers that decide whether it will work in your design, and says
what the datasheet warns you about.

Nothing in these files is invented. Every number is taken from a manufacturer
datasheet or from the JLCPCB/LCSC catalog record, and every file ends with a
numbered source list so you can check any figure yourself.

## Layout

```
content/
├── README.md              # this file
├── FORMAT.md              # the file format, so a future UI can parse it
├── components/            # one file per individually notable part, named by C-number
│   └── C7593.md
└── families/              # one file per commodity family (resistors, MLCCs, …)
    └── chip-resistors.md
```

## Why two kinds of file

The catalog snapshot behind this site contains 1,586 qualifying parts, but they
are not 1,586 *different* things. Most of them are members of a family: 293 chip
resistors that differ only in resistance and tolerance, 324 TVS/ESD parts, 254
Zener diodes, and so on. Those share a datasheet structure, and the useful
knowledge is "how do I read this family's specs", not 293 near-identical pages.

So the notes are split:

- **`components/`** — parts that are individually notable and have their own
  distinct datasheet: microcontrollers, regulators, interface and logic ICs,
  memories, sensors, crystals, connectors, and the specific discretes that the
  site recommends by name. One file per part, keyed by its LCSC C-number.
- **`families/`** — the commodity groups. One file per family covering what the
  specs in that family mean, which ones actually bite you, and how to read the
  catalog attributes shown in the tables.

Between them, every part in the catalog is covered by either its own file or its
family's file.

## Source policy

1. **Manufacturer datasheet first.** Where a manufacturer datasheet is publicly
   available, the electrical figures come from it, and the file records the
   document number and revision so a future reader can tell whether the summary
   has gone stale.
2. **Catalog record second.** Package, price, stock, JLCPCB tier, and the
   attribute strings shown in the site's tables come from the JLCPCB/LCSC
   catalog snapshot in `raw-data/`, and are cited as such.
3. **Nothing else.** If a figure could not be confirmed from either, the file
   says so in plain words rather than guessing.

Where the catalog record and the datasheet disagree, the file says so and
`ISSUES.md` records it.

## Known problems found while writing these

See [`ISSUES.md`](ISSUES.md). It lists the mismatches, stale records, and
description errors that turned up while checking parts against their datasheets.

## A note on dates

These summaries were written against the `2026-07-24` catalog snapshot. Prices,
stock, and tier can change at any time; the electrical specifications generally
do not, but datasheet revisions do happen. Each file records both the snapshot
date and the datasheet revision it was written from.
