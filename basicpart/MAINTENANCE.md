# Catalog refresh operations

Run weekly from a clean checkout of `main`. This document describes the run;
scheduling is managed separately. Use Node 22+ and the committed lockfile.
No JLCPCB account, paid API, or new credential is needed to read the catalog.
An existing GitHub connection with repository write permission is needed to
publish the reviewed result.

## Collect and review

1. Run `npm ci` (use a writable `--cache` directory if necessary).
2. Run `JLCPCB_SCRAPER_TRANSPORT=http npm run scrape`. Browser mode remains
   available via `npm run scrape` if Playwright Chromium is installed.
3. Run `npm run diff`. Check additions, removals, tier changes, price movements,
   and `specificationChanges`, including renamed or changed electrical ratings.
   Recheck unusually large price moves against the public API before publishing.
4. Review additions and removals against `tasks/descriptions-*.json`. Every
   qualifying C-number needs a source-backed, nonempty description; remove stale
   task entries. Never invent a description just to pass coverage validation.
5. Review changed specifications against friendly descriptions, `content/`, and
   `src/data/other-components.json`. Manufacturer datasheets take precedence over
   distributor prose. When sources disagree, avoid the disputed numeric claim
   and record the discrepancy for review; do not silently choose a rating.
6. Qualifying curated picks must match current package and tier. Do not mark a
   missing pick Extended without checking its current status. Preserve ordinary
   Extended warnings. Only advance `curatedReviewedDate` after actual editorial
   review; catalog collection does not constitute a fresh datasheet review.
   Keep content-note snapshot dates truthful rather than bulk-advancing them.
7. Update the curated data's `catalogSnapshotDate` to the newly collected source
   date, then run `npm run refresh:from-raw`.

## Publication gates

- Stop on a failed scrape, changed API schema, incomplete/duplicate pages,
  missing tier, or unexpected total. Never weaken checks to make a run pass.
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
