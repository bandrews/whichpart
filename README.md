# whichpart / basicp.art

This repository builds [basicp.art](https://basicp.art/), a searchable guide to
JLCPCB Basic and Preferred Extended assembly parts, plus a curated “Our Picks”
page that may also recommend clearly marked ordinary Extended parts.

The application, data pipeline, generated catalog snapshots, and maintenance
documentation live in [`basicpart/`](basicpart/README.md).

Quick start:

```sh
cd basicpart
npm install
npm run dev
```

Refresh the JLCPCB data and production build:

```sh
cd basicpart
npm run refresh
```

The deployable static site is generated in `basicpart/dist/`.
