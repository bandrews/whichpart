# Catalog refresh operations

Run weekly from a clean checkout of `main`. This document describes the run;
scheduling is managed separately. Use Node 22+ and the committed lockfile.
No JLCPCB account, paid API, or new credential is needed to read the catalog.
An existing GitHub connection with repository write permission is needed to
publish the reviewed result.

## Human selection of Our Picks

Only a human may select additions to Our Picks. Never promote a catalog arrival
or an agent suggestion into `src/data/other-components.json` during a refresh
or a general fix request. Preserve the membership in
`src/data/our-picks-selection.json`; update that list only for specific changes
selected by a human. Existing descriptions, identities, tiers, packages, and
assembly restrictions may be corrected during authorized maintenance. The
strict curated audit rejects membership changes and package mismatches.

## Collect and review

1. Run `npm ci` (use a writable `--cache` directory if necessary).
2. Run `JLCPCB_SCRAPER_TRANSPORT=http npm run scrape`. Browser mode remains
   available via `npm run scrape` if Playwright Chromium is installed.
3. Run `npm run diff`. Check additions, removals, tier changes, price movements,
   and `specificationChanges`, including renamed or changed electrical ratings.
   Run `npm run verify:catalog` to independently check every curated pick outside
   the qualifying snapshot, removed catalog parts, and the three largest price
   increases/decreases. Append exact C-numbers to check additional parts, e.g.
   `npm run verify:catalog -- C2040`. The dated `raw-data/jlcpcb-part-checks-*.json`
   report preserves current identities, tier flags, stock, and all price breaks.
   A failed lookup is unresolved, not proof of a new tier or discontinuance.
   For an existing Extended pick omitted by search, a strict product-page
   fallback verifies its exact SKU/MPN/package only when the page explicitly
   says both Extended and Standard Only. It records that method separately,
   leaves the unavailable API flag/price/stock unset, and fails on conflicting
   or missing evidence. A generic Extended badge alone is insufficient.
   Resolve `review-required` and `unresolved` checks before publication; a local
   review build may still be generated while editorial proposals are pending.
   Quote ticks can change between collection and verification; investigate large
   differences rather than overwriting the original collected evidence.
4. Review additions and removals against `tasks/descriptions-*.json`. Every
   qualifying C-number needs a source-backed, nonempty description; remove stale
   task entries. Never invent a description just to pass coverage validation.
5. Review changed specifications against friendly descriptions, `content/`, and
   `src/data/other-components.json`. Manufacturer datasheets take precedence over
   distributor prose. When sources disagree, avoid the disputed numeric claim
   and record the discrepancy for review; do not silently choose a rating.
   Manufacturer-backed display corrections and test-condition clarifications
   live in `src/data/specification-reviews.json`. The index generator checks
   exact MPN/package and expected source values before applying them, preserving
   original attributes/description in `catalogOriginal`. If source values
   change, re-review the correction instead of bypassing its guard.
6. Qualifying curated picks must match current package and tier. Do not mark a
   missing pick Extended without checking its current status. Preserve ordinary
   Extended warnings. Only advance `curatedReviewedDate` after actual editorial
   review; catalog collection does not constitute a fresh datasheet review.
   Keep content-note snapshot dates truthful rather than bulk-advancing them.
7. Update the curated data's `catalogSnapshotDate` to the newly collected source
   date. Add a newest-first entry in `src/data/changelog.json` for the actual
   refresh date (amend the existing entry for another refresh on the same day).
   Include verified changes, the catalog snapshot date, the unchanged or newly
   reviewed Our Picks date, caveats, and durable source links. Link a dated
   review record or prior immutable evidence; do not invent historical entries
   or advance editorial dates without review. A refresh with no catalog changes
   should say so. This log is served at `/changelog` from the footer date.
8. Run `npm run refresh:from-raw`; changelog tests require its newest entry to
   match the current snapshot and curated-review dates. After publication, test
   the footer link, direct `/changelog` load, and browser Back/Forward.

## Publication gates

- Stop on a failed scrape, changed API schema, incomplete/duplicate pages,
  missing tier, or unexpected total. Never weaken checks to make a run pass.
- Tier classification uses both `componentLibraryType` and
  `preferredComponentFlag`: `base` is Basic; `expand` plus `true` is Preferred;
  `expand` plus `false` is ordinary Extended and must not enter the qualifying
  snapshot. A generic “Extended” label on a public detail page does not by itself
  contradict a true preferred flag. New snapshots retain both source fields.
- All regression tests, schema/description coverage, transformed-data audits,
  strict curated audit, content index/format validation, and production build
  must pass. Review warnings as well as errors.
- Review the final diff. Include the new raw snapshot, catalog/audit manifests,
  affected sources and generated tables, and the complete rebuilt `dist/`.
- Start from the current remote `main`; if it advances, rebase/reconcile and
  rerun checks. Publish one atomic fast-forward commit, never force-push.
  GitHub blob/tree/commit/ref APIs can publish through an existing authenticated
  connection when local Git has no credentials.
- Verify the remote branch points to the intended commit. Inspect any checks
  available for that commit, but absence of checks is not a successful check.
- Verify `https://basicp.art/` references the new `dist/index.html` asset path;
  download that exact JS asset and compare its SHA-256 to the built local asset.
  Confirm the catalog date in the bundle and a representative part/price. The
  host may cache HTML; a stale response means deployment is not yet verified.
- If deployment fails, investigate or restore a previously validated revision
  only within existing authorization. Report blockers with the source date,
  affected part IDs, failed gate, and last verified deployment.

Keep the last known-good live build when any gate fails. Do not promise a fresh
site merely because collection or commit succeeded.
