# WhichPart

A component discovery tool for JLCPCB's basic and preferred parts catalog. Helps electronics engineers quickly find the right resistors, capacitors, diodes, and other components available through JLCPCB's assembly service.

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
├── scrape-basic-parts.js    # Scrapes JLCPCB website (requires Playwright)
├── transform-data.js        # Transforms raw data into site format
├── generate-parts-index.js  # Generates master parts lookup
├── audit-data.js            # Validates data integrity
└── validate-data.js         # Basic format validation

src/data/                    # Transformed data used by the site
├── parts-index.json         # Master lookup (all 1500+ parts with full details)
├── resistors.json           # Resistor table (value × package)
├── ceramic-capacitors.json  # Capacitor table (value × voltage × dielectric × package)
├── diodes.json              # Diode table (model × package)
└── friendly-descriptions.json

src/assets/                  # Legacy/manual data (some still referenced)
├── resistors.json           # Old manual resistor data (may be stale)

dist/                        # Built site (THIS IS WHAT GETS DEPLOYED)
├── index.html
└── assets/
    └── index-*.js           # Bundled app with embedded data
```

### Data Flow for Component Tables

1. **Raw scrape** (`raw-data/jlcpcb-basic-parts-*.json`) contains all parts with full metadata
2. **Transform** (`scripts/transform-data.js`) filters and organizes into category-specific tables
3. **Site data** (`src/data/*.json`) is imported by React components
4. **Build** (`npm run build`) bundles everything into `dist/`

## Common Tasks

### Updating Part Data

```bash
# 1. Scrape fresh data from JLCPCB (creates new file in raw-data/)
npm run scrape

# 2. Transform raw data into site format
node scripts/transform-data.js

# 3. Regenerate parts index
node scripts/generate-parts-index.js

# 4. Validate data integrity
node scripts/audit-data.js

# 5. IMPORTANT: Rebuild the site
npm run build
```

### Validating Data Quality

```bash
# Cross-reference all transformed data against parts-index.json
node scripts/audit-data.js
```

This checks for:
- **Category mismatches** (e.g., resistor networks in resistor table)
- **Package mismatches** (e.g., 0402x4 listed as 0402)
- **Missing parts** in the index

### Debugging Data Issues

If a part number appears wrong on the site:

1. **Check the source data**: `grep "CXXXXX" src/data/resistors.json`
2. **Verify in parts-index**: `grep "CXXXXX" src/data/parts-index.json` (shows full part details)
3. **Check the built bundle**: `grep "CXXXXX" dist/assets/index-*.js`
4. **If source is correct but bundle is wrong**: Run `npm run build`

## Known Pitfalls

### 1. Forgetting to rebuild after data changes

The site serves from `dist/`, not `src/`. Always run `npm run build` after changing data files.

### 2. Resistor networks vs individual resistors

Resistor networks (e.g., 0402x4, 0603x4) have "resistor" in their category name but are NOT individual resistors. The transform script filters these out by checking for "network" or "array" in the category.

### 3. Voltage parsing for capacitors

Capacitor voltages can be in V or kV. The `parseVoltage()` function handles both (e.g., "50V", "2kV").

### 4. Package variants for diodes

SOD-123FL is a "flat lead" variant of SOD-123. They're pin-compatible but technically different packages. The audit script flags these but they may be acceptable.

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
    "tier": "basic"                     // "basic" (no fee) or "preferred" (low fee)
  }
}
```

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
