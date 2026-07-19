# Gen Z Revival Map

An interactive map tracking publicly reported Protestant revival activity linked to Gen Z in the United States (roughly 2010–present) — campus outpourings, organized ministry tours, and national moments — with sources, follow-through notes, and aggregate patterns.

- **Map** — hover a state or event dot for a quick read, click to drill in. A year slider toggles between cumulative and single-year views.
- **State / event pages** — attendance and baptism figures as reported, "lasting fruit" notes, demographics, and linked articles.
- **Insights** — aggregate charts (events per year, top states, national survey trends on church attendance and Bible sales).
- **About** — methodology, inclusion criteria, and the skeptical case (this is a contested topic — see in-app caveats before treating anything here as settled).

## Stack

Vite + React + TypeScript, React Router, [react-simple-maps](https://www.react-simple-maps.io/) (geography bundled locally from the `us-atlas` npm package, no external CDN dependency), Recharts, Tailwind CSS.

## Running locally

```bash
npm install
npm run dev
```

## Editing the data

Everything is driven by two files:

- `src/data/revivals.ts` — one object per event (location, dates, attendance/baptism figures, follow-through, demographics note, tags, cited articles).
- `src/data/trends.ts` — national survey series (church attendance by gender, Bible sales) shown on the Insights page.

Add or edit an entry and it flows automatically into the map, state pages, event pages, and Insights charts. Every figure should carry a cited source — see `/about` in the running app for the sourcing standard this project holds itself to.
