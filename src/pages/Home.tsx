import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USMap from "../components/USMap";
import YearSlider from "../components/YearSlider";
import OriginFilter, { type OriginFilterValue } from "../components/OriginFilter";
import { revivals } from "../data/revivals";
import { filterByYear, maxYear, minYear, totalDocumentedBaptisms, type YearMode } from "../data/utils";

export default function Home() {
  const [year, setYear] = useState(maxYear);
  const [mode, setMode] = useState<YearMode>("cumulative");
  const [origin, setOrigin] = useState<OriginFilterValue>("all");
  const [npl, setNpl] = useState(false);

  const filtered = useMemo(() => {
    const byYear = filterByYear(revivals, year, mode);
    const byOrigin = origin === "all" ? byYear : byYear.filter((e) => e.origin === origin);
    return npl ? byOrigin.filter((e) => e.tags.includes("npl")) : byOrigin;
  }, [year, mode, origin, npl]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Where has Gen Z revival activity spiked?
          </h1>
          <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
            A hand-curated map of publicly reported Protestant revival activity linked to Gen Z in the U.S. —
            campus outpourings, national moments, and the movements that followed. Hover a state or dot for a
            quick read, click to go deeper. Every entry cites its sources.
          </p>
        </div>
        <button
          type="button"
          title="Show only No Place Left / e3 Partners disciple-making network entries"
          onClick={() => setNpl((v) => !v)}
          aria-pressed={npl}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            npl
              ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
              : "border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          }`}
        >
          NPL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <YearSlider year={year} minYear={minYear} maxYear={maxYear} mode={mode} onYearChange={setYear} onModeChange={setMode} />
        <OriginFilter value={origin} onChange={setOrigin} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-3">
          <USMap events={filtered} />
        </div>
        <div className="flex flex-col gap-3">
          <StatTile label="Documented events" value={filtered.length.toString()} />
          <StatTile
            label="States with activity"
            value={new Set(filtered.map((e) => e.stateCode)).size.toString()}
          />
          <StatTile
            label="Years covered"
            value={filtered.length ? `${Math.min(...filtered.map((e) => e.year))}–${Math.max(...filtered.map((e) => e.year))}` : "—"}
          />
          <StatTile
            label="Documented baptisms"
            value={totalDocumentedBaptisms(filtered) > 0 ? `${totalDocumentedBaptisms(filtered).toLocaleString()}+` : "—"}
          />
          <StatTile
            label="Organic vs. organized"
            value={`${filtered.filter((e) => e.origin === "organic").length} / ${filtered.filter((e) => e.origin === "organized").length}`}
          />
          <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">
            Baptism count is a floor, not a full tally — it only sums events where a source gave an exact
            figure; campus events mostly report "hundreds," which isn't counted. The total is dominated by
            all-ages mass-baptism events (Baptize America, Pirate's Cove), not campus gatherings — see each
            event page and <Link to="/insights" className="underline">Insights</Link> for the breakdown.
          </p>
          <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">
            This is a curated sample, not a census — it reflects what got covered, not everything that happened.
            Read the <Link to="/about" className="underline">methodology</Link> before drawing conclusions.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4">
      <div className="text-xs text-black/50 dark:text-white/40">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
