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
  the qualifying index — 99 in total. One of them, C168688, is a part the picks
  list dropped on 2026-08-19 when the USB-C recommendation narrowed to a single
  receptacle; its note is kept because the part detail page renders for any
  C-number.
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
   has gone stale. All 99 component files now have a manufacturer datasheet
   recorded in their front matter. Family files describe a category rather than
   one order code, so they carry no `datasheet:` field — but all fourteen now
   cite a representative manufacturer's document alongside the catalog record,
   for the figures a catalog attribute string cannot carry: derating curves,
   per-value temperature coefficients, part-numbering schemes, bin tables, and
   the conditions attached to a headline number.
2. **Catalog record second.** Package, price, stock, JLCPCB tier, and the
   attribute strings shown in the site's tables come from the JLCPCB/LCSC
   catalog snapshot in `raw-data/`, and are cited as such.
3. **Industry-type datasheet third, and clearly labelled.** Several parts here
   are house-brand versions of industry-standard types — `hongjiacheng`'s SS14
   and BSS138W, `MDD`'s US1M and MB10S. Each of those now has its own branded
   manufacturer's datasheet, which is the specification of record for it. Where
   another manufacturer's datasheet for the same *type* is still cited, it is a
   separate numbered source used only for contrast, and the file says where the
   two disagree. Sometimes that matters: hongjiacheng guarantees the SS14's
   reverse leakage at 0.5 mA where Vishay's SS14 is specified at 0.2 mA, and the
   MB10S turned out to be rated at the full 1 A its catalog entry claims, which
   the industry-type datasheets had cast doubt on.
4. **Nothing else.** Where no datasheet can be reached, the file says so at the
   top, in a blockquote, and cites the catalog record for every figure. It does
   not fill the gap with plausible-sounding numbers. No component file is in
   that position today: the 22 parts that were, all of them LCSC-hosted, were
   sourced on 2026-08-19 once a retrieval route was found (see `ISSUES.md`
   finding 18). Where a figure is still catalog-only inside an otherwise
   datasheet-backed file — an ordering option a series datasheet leaves open,
   such as a crystal's load capacitance — that row alone is marked `[2]` and the
   body says why.

Where the catalog record and the datasheet disagree, the file says so and
`ISSUES.md` records it.

## Known problems found while writing these

See [`ISSUES.md`](ISSUES.md). It lists forty-six findings — mismatches
between the site's data and manufacturer datasheets, claims that could not be
verified, parts whose datasheets are marked obsolete, and parts listed as
available that have no stock — plus a status review (2026-08-19) recording which
were since resolved, which were retracted, and which remain open. Findings 19 to
33 came from the pass, on the same day, that rewrote the last 22 catalog-only
notes against their manufacturers' documents. Findings 34 to 46 came from a
review pass that re-checked every note, component and family alike, against its
manufacturer's document; finding 43 is where the errors this repository had
introduced itself are collected.

The ones worth knowing about:

- **22 — the CJ431's accuracy.** The catalog advertises a ±0.5 % reference
  tolerance. Changjiang's datasheet does define a 0.5 % rank, but it guarantees
  ±1 % for the ungraded `CJ431` its ordering table sells, and its guaranteed
  drift over −25 °C to +85 °C is larger than the initial tolerance either way. A
  shunt reference is bought for its accuracy, so this is the attribute that
  matters on the part.
- **26 — the MT25QU512's standby current.** The catalog says 15 µA; Micron
  specifies 20 µA typical and 300 µA maximum for this order code's temperature
  grade. Twenty times, in the battery-powered designs that pick a 1.8 V flash.
- **33 — a connector rated 3 A, listed at 5 A.** SHOU HAN's own drawing for
  C2765186 says 3.0 A at 5.0 V; the LCSC listing says 5 A. This site's curated
  description already said 3 A.
- **19 — the SS14's leakage.** hongjiacheng guarantees 0.5 mA at 25 °C and 50 mA
  at 100 °C, against the catalog's 200 µA. Irrelevant in a buck converter,
  serious in a reverse-polarity blocking diode.

Five findings have now been retracted after re-reading the primary sources, and
they all point the same way: the catalog, or the manufacturer's current document,
was right and this repository was wrong.
Issue 7 (HT7533/HT7550) fell to a current Holtek datasheet. Issue 6 (ADuM1201
data rate) fell to the Analog Devices datasheet's per-grade switching tables.
Issue 13 — the MB10S's current rating, previously the most serious finding here
— fell to MDD's own datasheet, which rates the part at the full 1 A the catalog
implies, referenced to case temperature. Issue 15 (the KT-0603W's absurd colour
temperature) turned out to be transcribed faithfully from a manufacturer who
really does print it. And issue 5 — the L78M05's "obsolete" datasheet — fell to
ST's current DS0425 Rev 24, which carries no such watermark and lists the exact
order code; the watermarked document was the superseded one (finding 34).

The confirmed data errors that remain are the MCP6002's temperature grade
(issue 10), the LM324's offset grade and the LM393's bias current (findings 35
and 36), the two MOSFET attribute problems (38 and 39), the TP4056 and W25Q128JV
current figures (40 and 41), and the newer findings listed above.

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

After editing note files, regenerate `index.json` and check the result:

```sh
npm run content:index      # rewrite index.json from the front matter
npm run content:validate   # index.json is current, and every note matches FORMAT.md
npm run build              # bundle the site, which is what dist/ serves
```

`npm run content:validate` is part of `npm run refresh:from-raw`, so a data
refresh will now fail if a note drifts from the format: a missing specification
row for the file's `kind`, a value with no source marker, a marker that points at
no source, a third-section heading that disagrees with whether the front matter
names a datasheet, or Markdown that `renderSpecNote.js` cannot render.
`FORMAT.md` still defines the per-`kind` specification rows, so a future
comparison table remains possible.

## A note on dates

These summaries were written against the `2026-07-24` catalog snapshot. Prices,
stock and tier change constantly; the electrical specifications generally do not,
but datasheet revisions do happen. Each file records both the snapshot date and,
where one was available, the datasheet revision it was written from.
