# Component spec notes

This folder holds short, plain-English spec summaries for the parts that
basicp.art covers. Each file explains what a part actually is, pulls out the
handful of numbers that decide whether it will work in your design, and says
what the datasheet warns you about.

Nothing in these files is invented. Every number is taken from a manufacturer
datasheet or from the JLCPCB/LCSC catalog record, and every file ends with a
numbered source list so you can check any figure yourself.

**Now surfaced in the UI.** Part detail pages (`/part/:id`) display the
matching note — the part's own file when one exists, otherwise its family's
file — inside a clearly marked "AI GENERATED — MAY CONTAIN ERRORS" block. No
other page reads this content.

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
   has gone stale. 65 of the 99 component files have a manufacturer datasheet
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
have no stock — plus a status review (2026-08-19) recording which were since
resolved, which were retracted, and which remain open.

Two findings have been retracted after re-reading the primary sources, and both
retractions point the same way: the catalog was right and this repository was
wrong. Issue 7 (HT7533/HT7550) fell to a current Holtek datasheet that confirmed
the catalog's figures. Issue 6 (ADuM1201 data rate) fell to a full read of the
Analog Devices datasheet, which publishes separate switching specifications for
the `AR`, `BR` and `CR` speed grades — 1 Mbps, 10 Mbps and 25 Mbps. The part in
this catalog is the `AR` grade, so the catalog's 1 Mbps was correct and the
component note's 25 Mbps was not. The confirmed data error that remains is the
MCP6002's temperature grade (issue 10).

## How the UI reads this content

Three files in `src/` do the work:

- `src/utils/specNotes.js` — maps a part number (or its catalog category) to a
  note via `index.json`, and lazy-loads the Markdown with `import.meta.glob`,
  so each note ships as its own small chunk fetched only when its page is
  visited.
- `src/utils/renderSpecNote.js` — a deliberately minimal renderer for exactly
  the constructs `FORMAT.md` allows (escaping everything else). If new
  Markdown constructs are introduced into these files, extend the renderer
  first.
- `src/components/SpecNotes.jsx` — the "AI GENERATED — MAY CONTAIN ERRORS"
  block on the part detail page. It renders nothing when no note matches.

After editing note files, regenerate `index.json` (a short Node script over the
front matter) and run `npm run build`. `FORMAT.md` still defines the per-`kind`
specification rows, so a future comparison table remains possible.

## A note on dates

These summaries were written against the `2026-07-24` catalog snapshot. Prices,
stock and tier change constantly; the electrical specifications generally do not,
but datasheet revisions do happen. Each file records both the snapshot date and,
where one was available, the datasheet revision it was written from.
