import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleLinear, scaleSqrt } from "d3-scale";
import type { RevivalEvent } from "../data/types";
import { aggregateByState } from "../data/utils";
import { partyColor, stateNameToCode, statePresidentialWinner2024 } from "../data/statePolitics";
import { estimatedSize, momentumByState, repeatSiteKeys, type MomentumTier } from "../data/analysis";
import statesTopology from "../geo/states-10m.json";

const originColor: Record<RevivalEvent["origin"], string> = {
  organic: "#d97706",
  organized: "#0284c7",
};

const nplColor = "#db2777";

const categoryLabel: Record<RevivalEvent["category"], string> = {
  campus: "Campus gathering",
  "national-moment": "National moment",
  movement: "Movement / trend",
};

type Tooltip = {
  x: number;
  y: number;
  title: string;
  body: string;
} | null;

type Props = {
  events: RevivalEvent[];
};

type ShadeMode = "momentum" | "events" | "politics";

const momentumColor: Record<MomentumTier, string> = {
  high: "#b91c1c",
  building: "#ea580c",
  emerging: "#fbbf24",
  none: "#efeae2",
};

export default function USMap({ events }: Props) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const [shadeMode, setShadeMode] = useState<ShadeMode>("momentum");

  const momentum = useMemo(() => momentumByState(events), [events]);
  const repeatKeys = useMemo(() => repeatSiteKeys(events), [events]);

  const aggregates = useMemo(() => aggregateByState(events), [events]);
  const maxCount = useMemo(
    () => Math.max(1, ...Array.from(aggregates.values()).map((a) => a.count)),
    [aggregates]
  );

  const maxSize = useMemo(
    () => Math.max(1, ...events.map(estimatedSize)),
    [events]
  );
  const markerRadiusScale = useMemo(
    () => scaleSqrt().domain([0, maxSize]).range([4, 13]),
    [maxSize]
  );

  const colorScale = useMemo(
    () => scaleLinear<string>().domain([0, maxCount]).range(["#efeae2", "#7c3aed"]),
    [maxCount]
  );

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-xs sm:text-sm font-semibold w-full sm:w-auto">Shade states by:</span>
        {(
          [
            { value: "momentum", label: "Momentum (where it's building)", swatch: momentumColor.high },
            { value: "events", label: "Event density", swatch: "#7c3aed" },
            { value: "politics", label: "2024 presidential vote (red/blue)", swatch: partyColor.R },
          ] as { value: ShadeMode; label: string; swatch: string }[]
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setShadeMode(opt.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs sm:text-sm border-2 transition-colors ${
              shadeMode === opt.value
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: opt.swatch }} />
            {opt.label}
          </button>
        ))}
      </div>
      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
        <Geographies geography={statesTopology}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.name;
              const agg = aggregates.get(name);
              const count = agg?.count ?? 0;
              const code = stateNameToCode[name];
              const winner = code ? statePresidentialWinner2024[code] : undefined;
              const mo = momentum.get(name);
              const fill =
                shadeMode === "politics"
                  ? winner
                    ? partyColor[winner]
                    : "#efeae2"
                  : shadeMode === "momentum"
                  ? momentumColor[mo?.tier ?? "none"]
                  : count > 0
                  ? colorScale(count)
                  : "#efeae2";
              const eventSummary = count > 0 ? `${count} documented event${count === 1 ? "" : "s"}` : "No documented events";
              const tooltipBody =
                shadeMode === "politics"
                  ? `${winner === "R" ? "Trump" : winner === "D" ? "Harris" : "No data"} won in 2024 · ${eventSummary}`
                  : shadeMode === "momentum"
                  ? mo
                    ? `Momentum ${mo.score}/100 · ${mo.recentEvents} recent, ${mo.organicEvents} organic${
                        mo.repeatSites > 0 ? `, ${mo.repeatSites} repeat site${mo.repeatSites === 1 ? "" : "s"}` : ""
                      }`
                    : "No documented activity — untested ground"
                  : eventSummary;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  fillOpacity={1}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  onMouseEnter={(evt) => {
                    setTooltip({
                      x: evt.clientX,
                      y: evt.clientY,
                      title: name,
                      body: tooltipBody,
                    });
                  }}
                  onMouseMove={(evt) => {
                    setTooltip((t) => (t ? { ...t, x: evt.clientX, y: evt.clientY } : t));
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => {
                    if (agg) navigate(`/state/${agg.stateCode}`);
                  }}
                  style={{
                    default: { outline: "none", cursor: agg ? "pointer" : "default" },
                    hover: { outline: "none", filter: agg ? "brightness(1.1)" : "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
        {events.map((e) => (
          <Marker
            key={e.id}
            coordinates={[e.lon, e.lat]}
            onMouseEnter={(evt) =>
              setTooltip({
                x: evt.clientX,
                y: evt.clientY,
                title: e.name,
                body: `${e.city}, ${e.stateCode} · ${e.year} · ${categoryLabel[e.category]} · ${e.origin}`,
              })
            }
            onMouseMove={(evt) => setTooltip((t) => (t ? { ...t, x: evt.clientX, y: evt.clientY } : t))}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => navigate(`/event/${e.id}`)}
          >
            {repeatKeys.has(`${e.city}|${e.stateCode}`) && (
              <circle
                r={markerRadiusScale(estimatedSize(e)) + 4}
                fill="none"
                stroke="#16a34a"
                strokeWidth={2}
                style={{ pointerEvents: "none" }}
              />
            )}
            <circle
              r={markerRadiusScale(estimatedSize(e))}
              fill={e.tags.includes("npl") ? nplColor : originColor[e.origin]}
              stroke="#fff"
              strokeWidth={1.5}
              style={{ cursor: "pointer" }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {tooltip && (
        <div
          className="fixed z-30 pointer-events-none bg-black text-white text-xs rounded-md px-3 py-2 shadow-lg max-w-[220px]"
          style={{ left: tooltip.x + 12, top: tooltip.y + 12 }}
        >
          <div className="font-semibold">{tooltip.title}</div>
          <div className="opacity-80">{tooltip.body}</div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-3 text-xs text-black/60 dark:text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: originColor.organic }} />
          Organic (unplanned / grassroots)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: originColor.organized }} />
          Organized (touring ministry)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: nplColor }} />
          No Place Left (disciple-making network)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" />
            <span className="inline-block w-3 h-3 rounded-full bg-black/40 dark:bg-white/40" />
          </span>
          Dot size = reported attendance or baptisms (where known)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border-2" style={{ borderColor: "#16a34a" }} />
          Green ring = repeat site (activity in 2+ years)
        </span>
        {shadeMode === "momentum" && (
          <>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: momentumColor.high }} />
              High momentum
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: momentumColor.building }} />
              Building
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: momentumColor.emerging }} />
              Emerging
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: momentumColor.none }} />
              No documented activity
            </span>
          </>
        )}
        {shadeMode === "events" && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: "#7c3aed" }} />
            State shading = number of documented events
          </span>
        )}
        {shadeMode === "politics" && (
          <>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: partyColor.R }} />
              Trump won state, 2024
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: partyColor.D }} />
              Harris won state, 2024
            </span>
          </>
        )}
      </div>
      {shadeMode === "momentum" && (
        <p className="text-xs text-black/40 dark:text-white/35 mt-2 max-w-2xl">
          Weighted for recency, grassroots origin, and repeat activity — so it shows where things are{" "}
          <em>building</em>, not lifetime totals. Pale = undocumented, not inactive.{" "}
          <Link to="/about" className="underline">Methodology</Link>.
        </p>
      )}
      {shadeMode === "politics" && (
        <p className="text-xs text-black/40 dark:text-white/35 mt-2 max-w-2xl">
          Shown for descriptive comparison only — winner-only, not vote margin, per state's 2024 presidential
          result. This is not a claim that political lean causes or predicts revival activity; see{" "}
          <Link to="/about" className="underline">methodology</Link> before drawing conclusions from the overlay.
        </p>
      )}
    </div>
  );
}
