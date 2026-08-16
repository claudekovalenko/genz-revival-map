import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USMap from "../components/USMap";
import YearSlider from "../components/YearSlider";
import OriginFilter, { type OriginFilterValue } from "../components/OriginFilter";
import NplFilter from "../components/NplFilter";
import { revivals } from "../data/revivals";
import { filterByYear, maxYear, minYear, totalDocumentedBaptisms, type YearMode } from "../data/utils";
import { activityTrend, momentumByState } from "../data/analysis";

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

  const topStates = useMemo(
    () =>
      Array.from(momentumByState(filtered).values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
    [filtered]
  );
  const trend = useMemo(() => activityTrend(filtered), [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 sm:py-8 flex flex-col gap-4 sm:gap-6">
      <div className="order-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
          Where has Gen Z revival activity spiked?
        </h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          Publicly reported Protestant revival activity in the U.S., every entry sourced. Tap for a quick read,
          then go deeper.
        </p>
      </div>

      {/* Map first on phones — it's the point of the page. Filters lead on wider screens. */}
      <div className="order-2 sm:order-1 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <YearSlider
          year={year}
          minYear={minYear}
          maxYear={maxYear}
          mode={mode}
          onYearChange={setYear}
          onModeChange={setMode}
        />
        <OriginFilter value={origin} onChange={setOrigin} />
        <NplFilter value={npl} onChange={setNpl} />
      </div>

      <div className="order-1 sm:order-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-3">
        <USMap events={filtered} />
      </div>

      <div className="order-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Events" value={filtered.length.toString()} />
        <Stat label="States" value={new Set(filtered.map((e) => e.stateCode)).size.toString()} />
        <Stat
          label="Baptisms documented"
          value={
            totalDocumentedBaptisms(filtered) > 0
              ? `${totalDocumentedBaptisms(filtered).toLocaleString()}+`
              : "—"
          }
        />
        <Stat
          label="Organic / organized"
          value={`${filtered.filter((e) => e.origin === "organic").length} / ${
            filtered.filter((e) => e.origin === "organized").length
          }`}
        />
      </div>

      <div className="order-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
          <h2 className="font-semibold">The three things this map shows</h2>
          <Link to="/insights" className="text-sm underline text-black/60 dark:text-white/50">
            See the analysis →
          </Link>
        </div>
        <ol className="flex flex-col gap-2.5 text-sm">
          <Point n="1" label="Building fastest">
            {topStates.map((s) => s.stateName).join(", ")} — ranked by recent, grassroots, and repeat activity.
          </Point>
          <Point n="2" label="Two windows a year">
            Documented activity clusters in February and September — when students are gathered.
          </Point>
          <Point n="3" label="Direction">
            {trend.direction === "accelerating"
              ? `Accelerating — ${trend.recentCount} events recently vs. ${trend.priorCount} before.`
              : trend.direction === "cooling"
              ? `Cooling — ${trend.recentCount} events recently vs. ${trend.priorCount} before.`
              : `Steady — ${trend.recentCount} events recently vs. ${trend.priorCount} before.`}
          </Point>
        </ol>
      </div>

      <p className="order-5 text-xs text-black/50 dark:text-white/40 leading-relaxed">
        A curated sample, not a census — it reflects what got covered. Baptism totals are a floor, since most
        events report only "hundreds." Read the{" "}
        <Link to="/about" className="underline">
          methodology
        </Link>{" "}
        before drawing conclusions.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3">
      <div className="text-xl font-semibold tabular-nums">{value}</div>
      <div className="text-xs text-black/50 dark:text-white/40 mt-0.5">{label}</div>
    </div>
  );
}

function Point({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 w-5 h-5 rounded-full bg-black/10 dark:bg-white/15 text-[11px] font-semibold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span>
        <strong className="font-semibold">{label}.</strong>{" "}
        <span className="text-black/70 dark:text-white/60">{children}</span>
      </span>
    </li>
  );
}
