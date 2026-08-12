# Component spec notes

This folder holds short, plain-English spec summaries for the parts that
basicp.art covers. Each file explains what a part actually is, pulls out the
handful of numbers that decide whether it will work in your design, and says
what the datasheet warns you about.

Nothing in these files is invented. Every number is taken from a manufacturer
datasheet or from the JLCPCB/LCSC catalog record, and every file ends with a
numbered source list so you can check any figure yourself.

**This is content only.** Nothing in the site's UI reads it yet.

## Layout

```
content/
├── README.md      # this file
├── FORMAT.md      # the file format, so a future UI can parse it
├── ISSUES.md      # problems found in the repository's own data while writing these
├── index.json     # machine-readable index of every file, for the UI to load
├── components/    # 99 files, one per individually notable part, named by C-number
│   └── C7593.md
└── families/      # 14 files, one per commodity family
    └── chip-resistors.md
```

## Coverage

Every one of the 1,586 parts in the `2026-07-24` catalog snapshot is covered,
either by its own file or by its family's file. That was checked
programmatically; there are no gaps.

The split is deliberate. The catalog contains 1,586 qualifying parts, but they
are not 1,586 *different* things. Most belong to a family: 293 chip resistors
that differ only in resistance and tolerance, 324 TVS/ESD parts, 254 Zener
diodes. Those share a datasheet structure, and the useful knowledge is "how do I
read this family's specs", not 293 near-identical pages.

So:

- **`components/`** — parts that are individually notable and have their own
  distinct datasheet: microcontrollers, regulators, interface and logic ICs,
  memories, sensors, crystals, connectors, and the specific discretes the site
  recommends by name. One file per part, keyed by its LCSC C-number. This is
  every part in the curated "Our Picks" list plus every non-commodity part in
  the qualifying index — 99 in total.
- **`families/`** — the commodity groups. One file per family covering what the
  specs in that family mean, which ones actually bite you, and how to read the
  catalog attributes shown in the site's tables. 14 files covering 19 catalog
  categories and the remaining 1,487 parts. (The `part_count` fields in the
  family files describe each category's size in the catalog, so they overlap
  slightly where a part also has its own component file.)

## Source policy

1. **Manufacturer datasheet first.** Where a manufacturer datasheet could be
   retrieved, the electrical figures come from it, and the file records the
   document number and revision so a future reader can tell whether the summary
   has gone stale. 63 of the 99 component files have a manufacturer datasheet
   recorded in their front matter.
2. **Catalog record second.** Package, price, stock, JLCPCB tier, and the
   attribute strings shown in the site's tables come from the JLCPCB/LCSC
   catalog snapshot in `raw-data/`, and are cited as such.
3. **Nothing else.** Where a datasheet could not be reached — which is the case
   for every part whose only datasheet link is LCSC-hosted, since that host
   blocks automated retrieval — the file says so at the top, in a blockquote,
   and cites the catalog record for every figure. It does not fill the gap with
   plausible-sounding numbers.

Where the catalog record and the datasheet disagree, the file says so and
`ISSUES.md` records it.

## Known problems found while writing these

See [`ISSUES.md`](ISSUES.md). It lists twelve findings — mismatches between the
site's data and manufacturer datasheets, claims that could not be verified,
parts whose datasheets are marked obsolete, and parts listed as available that
have no stock. Two are worth acting on regardless of anything else: the
ADuM1201's data rate is understated by 25× (issue 6), and the HT7533/HT7550
input-voltage figure exceeds the datasheet's absolute maximum (issue 7).

## For whoever builds the UI

`index.json` carries the front matter of every file plus its path, so a page can
be rendered without parsing Markdown front matter at runtime. `FORMAT.md`
defines the section order and the per-`kind` specification rows, which are
consistent across parts of the same kind — so parts of one kind can be rendered
into a shared comparison table.

Regenerating `index.json` after editing files is a short Node script; the front
matter is the only input it needs.

## A note on dates

These summaries were written against the `2026-07-24` catalog snapshot. Prices,
stock and tier change constantly; the electrical specifications generally do not,
but datasheet revisions do happen. Each file records both the snapshot date and,
where one was available, the datasheet revision it was written from.
