import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { revivals } from "../data/revivals";
import { trends } from "../data/trends";
import {
  momentumByState,
  organicToOrganizedPipeline,
  repeatSites,
  seasonality,
} from "../data/analysis";
import { aggregateByState, baptismsPerYear, eventsPerYear, originByYear, totalDocumentedBaptisms } from "../data/utils";

const barColor = "#7c3aed";

export default function Insights() {
  const perYear = eventsPerYear(revivals);
  const originYear = originByYear(revivals);
  const organicTotal = revivals.filter((e) => e.origin === "organic").length;
  const organizedTotal = revivals.filter((e) => e.origin === "organized").length;
  const byState = Array.from(aggregateByState(revivals).values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((a) => ({ state: a.stateCode, count: a.count }));

  const women = trends.find((t) => t.id === "weekly-attendance-women")!;
  const men = trends.find((t) => t.id === "weekly-attendance-men")!;
  const genderGap = [
    ...women.points.map((p) => ({ year: `${p.year} women`, value: p.value })),
    ...men.points.map((p) => ({ year: `${p.year} men`, value: p.value })),
  ];

  const genzGender = trends.find((t) => t.id === "genz-attendance-by-gender")!;
  const bibleSales = trends.find((t) => t.id === "bible-sales-index")!;
  const baptisms = baptismsPerYear(revivals);
  const totalBaptisms = totalDocumentedBaptisms(revivals);

  const sbcBaptisms = trends.find((t) => t.id === "sbc-baptisms")!;
  const gallup = trends.find((t) => t.id === "gallup-church-membership")!;
  const pewNones = trends.find((t) => t.id === "pew-religious-nones")!;
  const nonesByGen = trends.find((t) => t.id === "nones-by-generation")!;
  const scriptureEngagement = trends.find((t) => t.id === "genz-scripture-engagement")!;
  const bibleAccuracy = trends.find((t) => t.id === "bible-total-accuracy-belief")!;
  const phoneVsScripture = trends.find((t) => t.id === "genz-phone-vs-scripture")!;
  const christianByGen = trends.find((t) => t.id === "christian-identification-by-generation")!;
  const mentalHealth = trends.find((t) => t.id === "genz-mental-health-vs-boomers")!;
  const religiousBreakdown = trends.find((t) => t.id === "genz-religious-affiliation-breakdown")!;
  const christianVsHighlyReligious = trends.find((t) => t.id === "christian-identity-vs-highly-religious")!;

  const topMomentum = Array.from(momentumByState(revivals).values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const provenSites = repeatSites(revivals);
  const untestedCount = 50 - new Set(revivals.map((e) => e.stateCode)).size;
  const season = seasonality(revivals);
  const pipeline = organicToOrganizedPipeline(revivals);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Patterns</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          What the events add up to, plus the national survey data cited alongside them. Directional signals,
          not proof of a nationwide revival — see <Link to="/about" className="underline">methodology</Link>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Finding title="Where it's building" lead={topMomentum.map((m) => m.stateCode).join(" · ")}>
          Ranked by recent, grassroots and repeating activity — not lifetime totals. {topMomentum[0]?.stateName}{" "}
          leads on both.
        </Finding>
        <Finding title="Proven ground" lead={`${provenSites.length} locations`}>
          Hosted activity in two or more separate years — where something already caught and came back.
        </Finding>
        <Finding title="Untested" lead={`${untestedCount} states`}>
          No documented activity. That means unmeasured, not inactive — and the cheapest place to learn
          something new.
        </Finding>
      </div>

      <ChartCard
        title="The fruit surfaces when students are gathered"
        subtitle="Every event by month — February and September carry the load; summer is nearly empty"
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={season}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {season.map((s) => (
                <Cell key={s.month} fill={s.count >= 12 ? "#b91c1c" : "#d4d4d4"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-black/50 dark:text-white/40 mt-2">
          This shows when students are present and reachable, not what moves them. Practically: be ready in
          those weeks rather than hearing about a moment afterwards.
        </p>
      </ChartCard>

      {pipeline.length > 0 && (
        <ChartCard
          title="Spontaneous outbreak first, produced event later"
          subtitle={`${pipeline.length} campuses where an unplanned outbreak was later followed by a touring stop — three cluster at 6-7 months, two took about three years`}
        >
          <div className="flex flex-col gap-2">
            {pipeline.map((p) => (
              <div
                key={`${p.city}-${p.stateCode}`}
                className="flex items-center gap-2 flex-wrap text-sm bg-black/[0.03] dark:bg-white/[0.04] rounded-lg px-3 py-2"
              >
                <span className="font-medium min-w-[8.5rem]">
                  {p.city}, {p.stateCode}
                </span>
                <Link to={`/event/${p.organicId}`} className="text-amber-700 dark:text-amber-500 underline">
                  organic {p.organicYear}
                </Link>
                <span className="text-black/40 dark:text-white/30">→ {p.monthsBetween} mo →</span>
                <Link to={`/event/${p.organizedId}`} className="text-sky-700 dark:text-sky-400 underline">
                  organized {p.organizedYear}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-black/50 dark:text-white/40 mt-2">
            An outbreak marks a campus worth returning to, but the lag varies a lot. The tight six-month cases
            may reflect an organizer already watching rather than a natural clock.
          </p>
        </ChartCard>
      )}

      <ChartCard title="Documented events per year" subtitle="Count of entries in this project's dataset, by year">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={perYear}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Organic vs. organized, by year"
        subtitle={`${organicTotal} organic (unplanned or grassroots) vs. ${organizedTotal} organized (produced by a touring ministry)`}
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={originYear}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="organic" name="Organic" stackId="origin" fill="#d97706" radius={[0, 0, 0, 0]} />
            <Bar dataKey="organized" name="Organized" stackId="origin" fill="#0284c7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-black/50 dark:text-white/40 mt-2">
          "Organic" means unplanned (Asbury-style) or grassroots/student-run with no professional ministry behind
          it. "Organized" means produced by a named touring ministry or parachurch org — Passion, Unite US, The
          Send, Azusa Now, IF:Gathering, The Call, Together, The Return. See each event page for which one it is.
        </p>
      </ChartCard>

      <ChartCard
        title="Documented baptisms by year"
        subtitle={`${totalBaptisms.toLocaleString()}+ total — floor only, from events with an exact reported figure`}
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={baptisms}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0891b2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-black/50 dark:text-white/40 mt-2">
          Most events only report "hundreds" baptized with no exact count — those aren't included here, so the
          real total is meaningfully higher than this chart shows. See each event page for the source.
        </p>
      </ChartCard>

      <ChartCard title="Top states by documented events" subtitle="Where the covered activity concentrated">
        <ResponsiveContainer width="100%" height={Math.max(280, byState.length * 34)}>
          <BarChart data={byState} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="state" width={40} interval={0} />
            <Tooltip />
            <Bar dataKey="count" fill={barColor} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Weekly church attendance, by gender"
        subtitle={`Source: ${women.source.source} / ${men.source.source} — sparse anchor years, see /about`}
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={genderGap}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {genderGap.map((entry, i) => (
                <Cell key={i} fill={entry.year.includes("women") ? "#dc2626" : "#7c3aed"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Gen Z attendance by gender (2025)" subtitle={`Source: ${genzGender.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genzGender.points.map((p) => ({ label: p.label, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="US Bible unit sales index" subtitle={`Source: ${bibleSales.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bibleSales.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {bibleSales.note && <p className="text-xs text-black/50 dark:text-white/40 mt-2">{bibleSales.note}</p>}
        </ChartCard>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">The wider backdrop</h2>
        <p className="text-sm text-black/60 dark:text-white/50 max-w-2xl mb-4">
          These aren't about any single event — they're the 15-year, whole-population trend the campus wave is
          happening inside. Read them against each other, not just on their own.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title={sbcBaptisms.title} subtitle={`Source: ${sbcBaptisms.source.source} — thousands per year`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sbcBaptisms.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0891b2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {sbcBaptisms.note && <p className="text-xs text-black/50 dark:text-white/40 mt-2">{sbcBaptisms.note}</p>}
        </ChartCard>

        <ChartCard title={gallup.title} subtitle={`Source: ${gallup.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gallup.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {gallup.note && <p className="text-xs text-black/50 dark:text-white/40 mt-2">{gallup.note}</p>}
        </ChartCard>

        <ChartCard title={pewNones.title} subtitle={`Source: ${pewNones.source.source}, citing Pew Research`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pewNones.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {pewNones.note && <p className="text-xs text-black/50 dark:text-white/40 mt-2">{pewNones.note}</p>}
        </ChartCard>

        <ChartCard title={nonesByGen.title} subtitle={`Source: ${nonesByGen.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={nonesByGen.points.map((p) => ({ label: p.label, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {nonesByGen.note && <p className="text-xs text-black/50 dark:text-white/40 mt-2">{nonesByGen.note}</p>}
        </ChartCard>

        <ChartCard title={scriptureEngagement.title} subtitle={`Source: ${scriptureEngagement.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scriptureEngagement.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {scriptureEngagement.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{scriptureEngagement.note}</p>
          )}
        </ChartCard>

        <ChartCard title={bibleAccuracy.title} subtitle={`Source: ${bibleAccuracy.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bibleAccuracy.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {bibleAccuracy.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{bibleAccuracy.note}</p>
          )}
        </ChartCard>

        <ChartCard title={phoneVsScripture.title} subtitle={`Source: ${phoneVsScripture.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={phoneVsScripture.points.map((p) => ({ year: p.year, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {phoneVsScripture.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{phoneVsScripture.note}</p>
          )}
        </ChartCard>

        <ChartCard title={christianByGen.title} subtitle={`Source: ${christianByGen.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={christianByGen.points.map((p) => ({ label: p.label, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {christianByGen.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{christianByGen.note}</p>
          )}
        </ChartCard>

        <ChartCard title={mentalHealth.title} subtitle={`Source: ${mentalHealth.source.source}`}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mentalHealth.points.map((p) => ({ label: p.label, value: p.value }))} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" unit="%" />
              <YAxis type="category" dataKey="label" width={160} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {mentalHealth.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{mentalHealth.note}</p>
          )}
        </ChartCard>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight">Who this is happening among</h2>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          The one demographic breakdown with real published numbers behind it: race/ethnicity crossed with
          religious tradition, alongside the gender split shown above.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title={religiousBreakdown.title} subtitle={`Source: ${religiousBreakdown.source.source}`}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={religiousBreakdown.points.map((p) => ({ label: p.label, value: p.value }))}
              layout="vertical"
              margin={{ left: 24 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" unit="%" />
              <YAxis type="category" dataKey="label" width={190} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {religiousBreakdown.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{religiousBreakdown.note}</p>
          )}
        </ChartCard>

        <ChartCard title={christianVsHighlyReligious.title} subtitle={`Source: ${christianVsHighlyReligious.source.source}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={christianVsHighlyReligious.points.map((p) => ({ label: p.label, value: p.value }))}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {christianVsHighlyReligious.note && (
            <p className="text-xs text-black/50 dark:text-white/40 mt-2">{christianVsHighlyReligious.note}</p>
          )}
        </ChartCard>
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
        <h2 className="font-semibold mb-2">What stands out</h2>
        <ul className="list-disc pl-5 flex flex-col gap-2 text-sm leading-relaxed text-black/70 dark:text-white/60">
          <li>
            <strong>The organic/organized split is the single clearest pattern in this dataset.</strong> Every
            year from 2012 to 2022 has an "organized" entry — a named touring ministry (Lou Engle's The Call and
            Azusa Now, Passion, IF:Gathering, The Send, Unite US) staging a produced mega-event. "Organic,"
            unplanned outbreaks are almost entirely confined to a few weeks in February 2023, plus two 2024-2025
            entries tied to specific shocks (a football team, a political assassination). Read plainly: touring
            ministries can reliably produce a big room full of young people pretty much any year; genuine
            spontaneous outbreaks are rare and cluster around a small number of specific triggers.
          </li>
          <li>
            Zooming out to 2012 changes the story a little: large-scale youth Christian gatherings (The Call,
            Passion, Azusa Now, Together 2016) predate Gen Z's college years entirely — Millennials filled those
            rooms. The genuinely Gen Z-majority material really starts around 2019-2020, and the Gen Z-driven
            organic wave starts in 2023.
          </li>
          <li>
            Two distinct triggers dominate the Gen Z-era spike: a spontaneous, unplanned outpouring (Asbury, Feb
            2023) and a politically-charged national trauma (Charlie Kirk's killing, Sept 2025). Both produced
            fast, visible spikes in youth religious activity within days.
          </li>
          <li>
            Track one campus closely and you can see the shift from grassroots to programmed directly: Texas A&M
            went from a spontaneous outdoor gathering (Feb 2023) to an organized Unite US stop with 124 baptisms
            (Sept 2023) to a 10,000-student arena event one year later (Sept 2024) — the same location, escalating
            fast once a touring ministry model took over.
          </li>
          <li>
            The {totalBaptisms.toLocaleString()}+ documented baptisms above are a hard floor, not a real total —
            most events report "hundreds" with no exact figure. Treat it as evidence baptisms are genuinely
            happening at scale, not as a complete count.
          </li>
          <li>
            Coverage clusters heavily in the South and evangelical-college belt (TX, MS, AL, TN, OH, FL) — this
            may reflect where revival-friendly campus ministries and press already existed, not necessarily where
            Gen Z faith activity is uniquely concentrated.
          </li>
          <li>
            The clearest hard trend in the underlying survey data is a <em>gender</em> reversal — Gen Z/Millennial
            men now report higher weekly attendance than women, a first in Barna's tracking. Racial demographic
            claims in event coverage are anecdotal and not backed by a comparable independent study.
          </li>
          <li>
            Mass baptism has become its own organized movement: Pirate's Cove (4,166 baptized, May 2023) grew
            into Baptize California (12,216 in one day, 2024) and then Baptize America (26,657 across all 50
            states, June 2025) — and denominational hard data backs the direction: Southern Baptist baptisms rose
            four consecutive years to 250,643 in 2024, the most since 2017. Baptism, historically the{" "}
            <em>outcome</em> of revival, is now being run as the program itself.
          </li>
          <li>
            The wider backdrop cuts against a clean "revival" story: whole-population church membership kept
            declining through the same years (61% in 2010 to 45% in 2024, Gallup), and Gen Z's own Scripture
            engagement score stayed flat-to-low (10-14%, American Bible Society) throughout the exact years the
            campus wave was making headlines. The spikes are real; a broad reversal is not yet visible in the
            slower-moving survey data.
          </li>
          <li>
            Not everyone agrees this adds up to a "revival": religion researchers like Ryan Burge argue the scale
            doesn't support that word yet — worth reading before treating any of this as settled.
          </li>
        </ul>
      </div>
    </div>
  );
}

function Finding({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4">
      <div className="text-xs font-medium text-black/50 dark:text-white/40">{title}</div>
      <div className="text-lg font-semibold mt-0.5">{lead}</div>
      <p className="text-xs text-black/60 dark:text-white/50 leading-relaxed mt-1.5">{children}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
      <h2 className="font-semibold">{title}</h2>
      {subtitle && <p className="text-xs text-black/50 dark:text-white/40 mb-2">{subtitle}</p>}
      {children}
    </div>
  );
}
