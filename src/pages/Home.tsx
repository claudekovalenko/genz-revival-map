import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USMap from "../components/USMap";
import YearSlider from "../components/YearSlider";
import OriginFilter, { type OriginFilterValue } from "../components/OriginFilter";
import NplFilter from "../components/NplFilter";
import { revivals } from "../data/revivals";
import { filterByYear, maxYear, minYear, totalDocumentedBaptisms, type YearMode } from "../data/utils";
import {
  activityTrend,
  baptismsByOrigin,
  momentumByState,
  organicToOrganizedPipeline,
  repeatSites,
  seasonality,
  tagShare,
} from "../data/analysis";
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
  const season = useMemo(() => seasonality(filtered), [filtered]);
  const pipeline = useMemo(() => organicToOrganizedPipeline(filtered), [filtered]);
  const uniteShare = useMemo(() => tagShare(filtered, "unite-us"), [filtered]);
  const baptismSplit = useMemo(() => baptismsByOrigin(filtered), [filtered]);

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

      <div>
        <h2 className="text-lg font-semibold tracking-tight">The pattern behind the map</h2>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          Three structural findings that hold across the whole dataset — the parts that are actually repeatable,
          rather than one-off stories.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-semibold">1. This runs on the academic calendar, not the church calendar.</h3>
          </div>
          <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed mt-1">
            Activity concentrates hard in the opening weeks of the two semesters — February and September carry
            the load, with January close behind. Summer is nearly empty.
          </p>
          <Seasonality data={season} />
          <p className="text-sm leading-relaxed border-l-2 border-amber-500/50 pl-3 mt-3">
            <strong>So what:</strong> there are two windows a year when students are reachable and something can
            actually catch. Anything aimed at campuses should be built and staffed to land in those windows —
            planning on a fiscal-year or church-calendar rhythm will miss them.
          </p>
        </div>

        {pipeline.length > 0 && (
          <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
            <h3 className="font-semibold">
              2. There's a repeatable sequence: spontaneous outbreak first, organized event ~6 months later.
            </h3>
            <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed mt-1">
              At {pipeline.length} separate locations, in {new Set(pipeline.map((p) => p.stateCode)).size} different
              states and {new Set(pipeline.map((p) => p.organicYear)).size} different years, the same order of
              operations shows up: something unplanned happens, then a touring ministry arrives at that same
              campus roughly half a year later and scales it.
            </p>
            <div className="flex flex-col gap-2 mt-3">
              {pipeline.map((p) => (
                <div
                  key={`${p.city}-${p.stateCode}`}
                  className="flex items-center gap-2 text-sm flex-wrap bg-black/[0.03] dark:bg-white/[0.03] rounded-lg px-3 py-2"
                >
                  <span className="font-medium min-w-[9rem]">
                    {p.city}, {p.stateCode}
                  </span>
                  <Link to={`/event/${p.organicId}`} className="text-amber-700 dark:text-amber-500 underline underline-offset-2">
                    organic {p.organicYear}
                  </Link>
                  <span className="text-black/40 dark:text-white/30">→ {p.monthsBetween} mo →</span>
                  <Link to={`/event/${p.organizedId}`} className="text-sky-700 dark:text-sky-400 underline underline-offset-2">
                    organized {p.organizedYear}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed border-l-2 border-amber-500/50 pl-3 mt-3">
              <strong>So what:</strong> an unplanned outbreak is an early signal, not just a nice story. The
              consistent ~6-month lag is a window to move into — the places where something spontaneous just
              happened are the highest-probability sites for the next organized push. Watching for those signals
              is a cheaper targeting strategy than picking campuses cold.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
          <h3 className="font-semibold">3. Scale is concentrated — a few operators carry most of it.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-2xl font-semibold">{uniteShare.pct}%</div>
              <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed mt-0.5">
                of all events currently shown carry the Unite US tag ({uniteShare.count} of {filtered.length}) —
                a single organization accounting for the largest share of documented activity.
              </p>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {baptismSplit.organic + baptismSplit.organized > 0
                  ? Math.round(
                      (baptismSplit.organized / (baptismSplit.organic + baptismSplit.organized)) * 100
                    )
                  : 0}
                %
              </div>
              <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed mt-0.5">
                of documented baptisms come from organized events, not spontaneous ones (
                {baptismSplit.organized.toLocaleString()} vs. {baptismSplit.organic.toLocaleString()}).
                Spontaneity starts things; production is what scales them.
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed border-l-2 border-amber-500/50 pl-3 mt-3">
            <strong>So what:</strong> partnering with the handful of groups already operating at scale gets
            further, faster, than standing up something parallel. But it's also a concentration risk — if the
            documented picture depends this heavily on one operator's touring schedule, the map partly tracks
            that organization's calendar rather than the country's spiritual condition.
          </p>
        </div>
      </div>
    </div>
  );
}

function Seasonality({ data }: { data: { month: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-1 h-24 mt-1">
      {data.map((d) => {
        const peak = d.count >= max * 0.6;
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1" title={`${d.month}: ${d.count}`}>
            <span className="text-[10px] tabular-nums text-black/40 dark:text-white/30">{d.count || ""}</span>
            <div
              className={`w-full rounded-t ${peak ? "bg-red-700" : "bg-black/20 dark:bg-white/20"}`}
              style={{ height: `${Math.max(2, (d.count / max) * 100)}%` }}
            />
            <span
              className={`text-[10px] ${
                peak ? "font-semibold text-red-700 dark:text-red-500" : "text-black/40 dark:text-white/30"
              }`}
            >
              {d.month}
            </span>
          </div>
        );
      })}
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
