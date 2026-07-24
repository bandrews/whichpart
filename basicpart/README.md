# WhichPart

A component discovery tool for JLCPCB’s Basic and Preferred Extended parts
catalog. The table pages cover the complete qualifying snapshot. “Our Picks”
is a separately curated list and may also include useful ordinary Extended
parts, which are explicitly labeled and highlighted in orange.

## Getting Started

```bash
npm install
npm run dev      # Dev server at http://localhost:5173/
npm run build    # Production build to dist/
npm run preview  # Preview production build at http://localhost:4173/
```

## Project Architecture

### Data Pipeline

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   JLCPCB Site   │────▶│    raw-data/    │────▶│   src/data/     │────▶│     dist/       │
│   (scraped)     │     │  (JSON scrape)  │     │  (transformed)  │     │  (built site)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
     scrape              transform               npm run build
```

**Important:** The site serves from `dist/`. After changing any data in `src/data/`, you MUST run `npm run build` for changes to appear on the live site.

### Key Directories

```
raw-data/                    # Scraped JSON from JLCPCB (source of truth)
├── jlcpcb-basic-parts-*.json

scripts/                     # Data processing scripts
├── scrape-jlcpcb.js         # Fetches the site catalog (requires Playwright)
├── catalog-diff.js          # Reports additions, removals, tier, and price changes
├── transform-data.js        # Transforms raw data into site format
├── generate-parts-index.js  # Generates master parts lookup
├── merge-descriptions.js    # Rebuilds friendly descriptions from tasks/
├── audit-data.js            # Validates data integrity
├── audit-curated-picks.js   # Strictly checks qualifying and Extended picks
└── validate-data.js         # Schema, coverage, tier, package, and task validation

src/data/                    # Transformed data used by the site
├── parts-index.json         # Master lookup (all 1500+ parts with full details)
├── resistors.json           # Resistor table (value × package)
├── ceramic-capacitors.json  # Capacitor table (value × voltage × dielectric × package)
├── diodes.json              # Diode table (model × package)
├── friendly-descriptions.json
└── other-components.json    # Hand-curated Our Picks list

tasks/                       # Source files for friendly descriptions
└── descriptions-*.json

src/assets/                  # Legacy/manual data (some still referenced)
├── resistors.json           # Old manual resistor data (may be stale)

dist/                        # Built site (THIS IS WHAT GETS DEPLOYED)
├── index.html
└── assets/
    └── index-*.js           # Bundled app with embedded data
```

### Data Flow for Component Tables

1. **Raw snapshot** (`raw-data/jlcpcb-basic-parts-*.json`) contains every
   qualifying part and its full metadata.
2. **Diff** compares the two newest complete snapshots.
3. **Transform and index** organize the snapshot into site tables and the
   complete part lookup.
4. **Descriptions** rebuilds `friendly-descriptions.json` from `tasks/`.
5. **Validation and audits** enforce catalog completeness, description
   coverage, package/tier identity, and curated-pick policy.
6. **Build** bundles the validated data into `dist/`.

## Common Tasks

### Updating Part Data

```bash
# Full update: snapshot, diff, transform, descriptions, strict audits, and build
npm run refresh

# Repeat the pipeline from an already-collected raw snapshot
npm run refresh:from-raw
```

The refresh refuses to write an incomplete snapshot or build with missing
descriptions, stale qualifying picks, tier mismatches, or package mismatches.
It writes:

- `catalog-change-manifest.json` for catalog and pricing changes.
- `data-audit-manifest.json` for transformed-data checks.
- `curated-picks-audit.json` for the hand-maintained recommendations.
- `dist/`, which is the deployable site.

### Manual review after every snapshot

The automated pipeline is deliberately strict, but editorial judgment remains
necessary:

1. Review `catalog-change-manifest.json`, especially additions, removals, tier
   changes, and unusually large price movements.
2. Add a source-backed description for every new C-number to the appropriate
   `tasks/descriptions-*.json` file.
3. Review `src/data/other-components.json`. Qualifying recommendations must
   match the current index. Ordinary Extended recommendations must use
   `"tier": "extended"` so the UI displays the orange warning.
4. Update `catalogSnapshotDate` and `curatedReviewedDate` when the corresponding
   source or editorial review actually changes.
5. Run `npm run refresh:from-raw`. Do not publish unless the strict curated
   audit and full description coverage pass.

### Validating Data Quality

```bash
# Full validation and transformed-data audit
npm run validate
npm run audit

# Enforce the curated recommendation policy
npm run audit:curated:strict
```

This checks for:

- **Snapshot/index schema and tier errors**
- **Complete task and friendly-description coverage**
- **Category mismatches** such as resistor networks in resistor tables
- **Exact package mismatches**, including suffix-bearing packages
- **Every nested transformed-data cell**, not just the display columns
- **Missing and duplicate curated picks**
- **Basic/Preferred tier identity**
- **Explicit labeling of ordinary Extended recommendations**

### Debugging Data Issues

If a part number appears wrong on the site:

1. **Check the source data**: `rg "CXXXXX" src/data/resistors.json`
2. **Verify in parts-index**: `rg "CXXXXX" src/data/parts-index.json`
3. **Check the built bundle**: `rg "CXXXXX" dist/assets/index-*.js`
4. **If source is correct but bundle is wrong**: Run `npm run build`

## Known Pitfalls

### 1. Forgetting to rebuild after data changes

The site serves from `dist/`, not `src/`. Always run `npm run build` after changing data files.

### 2. Resistor networks vs individual resistors

Resistor networks (e.g., 0402x4, 0603x4) have "resistor" in their category name but are NOT individual resistors. The transform script filters these out by checking for "network" or "array" in the category.

### 3. Voltage parsing for capacitors

Capacitor voltages can be in V or kV. The `parseVoltage()` function handles both (e.g., "50V", "2kV").

### 4. Package variants for diodes

SOD-123FL is a flat-lead package variant with a different mechanical profile
and land-pattern requirements from SOD-123. Do not treat the two as drop-in
package replacements; verify the manufacturer footprint, pad geometry, thermal
requirements, and polarity before substituting one for the other.

### 5. Basic, Preferred Extended, and Extended are different

- `basic` and `preferred` come from the complete qualifying snapshot and have
  local detail pages.
- `extended` is permitted only in the hand-curated “Our Picks” data. It is
  highlighted in orange and links directly to JLCPCB because it is outside the
  local qualifying index.
- Preferred Extended parts have no feeder-loading fee for Economic PCBA.
  Assembly pricing rules differ by service, so user-facing copy must not make
  unconditional fee promises.

## Data Schema

### parts-index.json

```json
{
  "C25744": {
    "mpn": "0402WGF1002TCE",           // Manufacturer part number
    "mfr": "UNI-ROYAL(Uniroyal Elec)", // Manufacturer
    "cat": "Chip Resistor - Surface Mount", // Category
    "pkg": "0402",                      // Package
    "desc": "10kΩ 50V 62.5mW...",       // Description
    "attrs": { "Resistance": "10kΩ", ...}, // Parsed attributes
    "stock": 17142348,
    "prices": [{"qty": 1, "price": 0.0006}, ...],
    "tier": "basic"                     // "basic" or "preferred" (Preferred Extended)
  }
}
```

### other-components.json

```json
{
  "name": "RP2040",
  "description": "Dual-core 133MHz Arm Cortex-M0+ MCU",
  "package": "LQFN-56(7x7)",
  "part": "C2040",
  "tier": "extended"
}
```

Allowed tiers are `basic`, `preferred`, and `extended`. Basic and Preferred
entries must match `parts-index.json` exactly. Extended entries are expected to
be absent from that index and receive the orange warning treatment.

### resistors.json

```json
{
  "meta": { "type": "resistor", "columns": ["0402", "0603", "0805", "1206"] },
  "data": {
    "10000": {                          // Key is resistance in ohms
      "display": "10k",                 // Friendly display value
      "0402": { "part": "C25744", "tier": "basic" },
      "0603": { "part": "C25804", "tier": "basic" }
    }
  }
}
```

## Tech Stack

- **Framework**: Preact + Vite
- **Routing**: preact-iso
- **Scraping**: Playwright (for data updates)
- **Hosting**: Static files (dist/ folder)
