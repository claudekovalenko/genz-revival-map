import { Link, useParams } from "react-router-dom";
import { eventsByStateCode } from "../data/utils";

export default function StatePage() {
  const { code = "" } = useParams();
  const events = eventsByStateCode(code.toUpperCase());
  const stateName = events[0]?.state ?? code.toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <Link to="/" className="text-sm underline text-black/60 dark:text-white/50">
          ← Back to map
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">{stateName}</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1">
          {events.length} documented event{events.length === 1 ? "" : "s"}
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-black/60 dark:text-white/50">No documented events found for this state yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {events
            .sort((a, b) => a.year - b.year)
            .map((e) => (
              <Link
                key={e.id}
                to={`/event/${e.id}`}
                className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold">{e.name}</div>
                    <div className="text-sm text-black/60 dark:text-white/50">
                      {e.city}, {e.stateCode} · {e.year}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      className={`text-xs uppercase tracking-wide rounded-full px-2 py-0.5 ${
                        e.origin === "organic"
                          ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          : "bg-sky-500/15 text-sky-700 dark:text-sky-400"
                      }`}
                    >
                      {e.origin}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-black/40 dark:text-white/40">
                      {e.category.replace("-", " ")}
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-2 text-black/70 dark:text-white/60 line-clamp-2">{e.summary}</p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
