import { Link, useParams } from "react-router-dom";
import { eventById } from "../data/utils";

export default function EventPage() {
  const { id = "" } = useParams();
  const event = eventById(id);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="text-sm underline">
          ← Back to map
        </Link>
        <p className="mt-4">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <Link to={`/state/${event.stateCode}`} className="text-sm underline text-black/60 dark:text-white/50">
          ← Back to {event.state}
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs uppercase tracking-wide bg-black/5 dark:bg-white/10 rounded-full px-2.5 py-1">
            {event.category.replace("-", " ")}
          </span>
          <span
            className={`text-xs uppercase tracking-wide rounded-full px-2.5 py-1 ${
              event.origin === "organic"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                : "bg-sky-500/15 text-sky-700 dark:text-sky-400"
            }`}
          >
            {event.origin}
          </span>
          <span className="text-xs text-black/40 dark:text-white/40">{event.denominationTradition}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">{event.name}</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1">
          {event.city}, {event.state} · {formatRange(event.startDate, event.endDate)}
        </p>
      </div>

      <p className="leading-relaxed">{event.summary}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {event.estimatedAttendance && <Stat label="Estimated attendance" value={event.estimatedAttendance} />}
        {event.reportedBaptisms && <Stat label="Reported baptisms / professions" value={event.reportedBaptisms} />}
      </div>

      <Section title="Lasting fruit / follow-through">
        <p className="leading-relaxed">{event.followThrough}</p>
      </Section>

      <Section title="Demographics">
        <p className="leading-relaxed text-black/70 dark:text-white/60">{event.demographicsNote}</p>
      </Section>

      <Section title="Articles & sources">
        <ul className="flex flex-col gap-2">
          {event.articles.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="underline font-medium"
              >
                {a.title}
              </a>
              <span className="text-sm text-black/50 dark:text-white/40"> — {a.source}, {a.date}</span>
            </li>
          ))}
        </ul>
      </Section>

      {event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span key={t} className="text-xs bg-black/5 dark:bg-white/10 rounded-full px-2.5 py-1">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4">
      <div className="text-xs text-black/50 dark:text-white/40">{label}</div>
      <div className="text-base font-medium mt-1">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-black/50 dark:text-white/40 mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function formatRange(start: string, end?: string) {
  const s = new Date(start).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  if (!end) return s;
  const e = new Date(end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${s} – ${e}`;
}
