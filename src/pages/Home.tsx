import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USMap from "../components/USMap";
import YearSlider from "../components/YearSlider";
import OriginFilter, { type OriginFilterValue } from "../components/OriginFilter";
import NplFilter from "../components/NplFilter";
import { revivals } from "../data/revivals";
import { filterByYear, maxYear, minYear, totalDocumentedBaptisms, type YearMode } from "../data/utils";
import { activityTrend, momentumByState, repeatSites } from "../data/analysis";
import { stateNameToCode } from "../data/statePolitics";

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

  // Derived signals — computed live from whatever is currently filtered on the map.
  const topMomentum = useMemo(
    () =>
      Array.from(momentumByState(filtered).values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 5),
    [filtered]
  );
  const proven = useMemo(() => repeatSites(filtered).slice(0, 5), [filtered]);
  const trend = useMemo(() => activityTrend(filtered), [filtered]);
  const untested = useMemo(() => {
    const active = new Set(filtered.map((e) => e.stateCode));
    return Object.values(stateNameToCode).filter((c) => c !== "DC" && !active.has(c));
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <YearSlider year={year} minYear={minYear} maxYear={maxYear} mode={mode} onYearChange={setYear} onModeChange={setMode} />
        <OriginFilter value={origin} onChange={setOrigin} />
        <NplFilter value={npl} onChange={setNpl} />
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

      <div>
        <h2 className="text-lg font-semibold tracking-tight">What this map is telling you</h2>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          Computed live from the {filtered.length} events currently shown — change the filters above and these
          update with them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DerivedCard
          title="Where it's building"
          subtitle="Highest momentum — recent, organic, and repeating"
        >
          {topMomentum.length === 0 ? (
            <Empty />
          ) : (
            <ol className="flex flex-col gap-2">
              {topMomentum.map((m) => (
                <li key={m.stateCode} className="flex items-center gap-2 text-sm">
                  <Link to={`/state/${m.stateCode}`} className="font-medium underline underline-offset-2">
                    {m.stateName}
                  </Link>
                  <span className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <span className="block h-full bg-red-700" style={{ width: `${m.score}%` }} />
                  </span>
                  <span className="tabular-nums text-xs text-black/50 dark:text-white/40">{m.score}</span>
                </li>
              ))}
            </ol>
          )}
          <p className="text-xs text-black/50 dark:text-white/40 mt-3 leading-relaxed">
            Where to put the next dollar and the next staffer — these states have activity that is recent and
            still moving, not just a big historical total.
          </p>
        </DerivedCard>

        <DerivedCard title="Proven ground" subtitle="Places that hosted activity in 2+ separate years">
          {proven.length === 0 ? (
            <Empty />
          ) : (
            <ul className="flex flex-col gap-2">
              {proven.map((s) => (
                <li key={`${s.city}-${s.stateCode}`} className="text-sm">
                  <span className="font-medium">
                    {s.city}, {s.stateCode}
                  </span>
                  <span className="text-black/50 dark:text-white/40">
                    {" "}
                    — {s.events.length} events, {s.firstYear}–{s.latestYear}
                    {s.escalated && <span className="text-green-700 dark:text-green-500"> · grew</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-black/50 dark:text-white/40 mt-3 leading-relaxed">
            Something already caught here and came back. Doubling down where a relationship exists has a better
            track record on this map than opening a brand-new market.
          </p>
        </DerivedCard>

        <DerivedCard title="Untested ground" subtitle={`${untested.length} states with nothing documented`}>
          <p className="text-sm leading-relaxed">
            {untested.length === 0 ? (
              <Empty />
            ) : (
              <span className="text-black/70 dark:text-white/60">{untested.join(" · ")}</span>
            )}
          </p>
          <p className="text-xs text-black/50 dark:text-white/40 mt-3 leading-relaxed">
            No documented activity is not proof of no activity — it may just mean no one covered it. Treat these
            as unmeasured, and the cheapest place to learn something new.
          </p>
        </DerivedCard>
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
        <h3 className="font-semibold mb-1">
          Direction of travel:{" "}
          <span
            className={
              trend.direction === "accelerating"
                ? "text-green-700 dark:text-green-500"
                : trend.direction === "cooling"
                ? "text-amber-700 dark:text-amber-500"
                : "text-black/60 dark:text-white/50"
            }
          >
            {trend.direction}
          </span>
        </h3>
        <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
          {trend.recentCount} documented events in the most recent three years, versus {trend.priorCount} in the
          three years before that. Read this as a measure of what's being <em>documented and covered</em>, which
          moves with press attention as well as with real activity — a rise here means the story is getting more
          attention, which is related to but not the same as more happening.
        </p>
      </div>
    </div>
  );
}

function DerivedCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5 flex flex-col">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-black/50 dark:text-white/40 mb-3">{subtitle}</p>
      {children}
    </div>
  );
}

function Empty() {
  return <span className="text-sm text-black/40 dark:text-white/30">Nothing in the current filter.</span>;
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4">
      <div className="text-xs text-black/50 dark:text-white/40">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
