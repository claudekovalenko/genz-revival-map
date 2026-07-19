import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import type { RevivalEvent } from "../data/types";
import { aggregateByState } from "../data/utils";
import statesTopology from "../geo/states-10m.json";

const originColor: Record<RevivalEvent["origin"], string> = {
  organic: "#d97706",
  organized: "#0284c7",
};

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

export default function USMap({ events }: Props) {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<Tooltip>(null);

  const aggregates = useMemo(() => aggregateByState(events), [events]);
  const maxCount = useMemo(
    () => Math.max(1, ...Array.from(aggregates.values()).map((a) => a.count)),
    [aggregates]
  );

  const colorScale = useMemo(
    () => scaleLinear<string>().domain([0, maxCount]).range(["#efeae2", "#7c3aed"]),
    [maxCount]
  );

  return (
    <div className="relative">
      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
        <Geographies geography={statesTopology}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties.name;
              const agg = aggregates.get(name);
              const count = agg?.count ?? 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={count > 0 ? colorScale(count) : "#efeae2"}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  onMouseEnter={(evt) => {
                    setTooltip({
                      x: evt.clientX,
                      y: evt.clientY,
                      title: name,
                      body: count > 0 ? `${count} documented event${count === 1 ? "" : "s"}` : "No documented events",
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
            <circle
              r={5}
              fill={originColor[e.origin]}
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
          <span className="inline-block w-2.5 h-2.5 rounded" style={{ background: "#7c3aed" }} />
          State shading = number of documented events
        </span>
      </div>
    </div>
  );
}
