import { Link } from "react-router-dom";

type Finding = {
  claim: string;
  evidence: string;
  soWhat: string;
};

const findings: Finding[] = [
  {
    claim: "It runs on the academic calendar — two windows a year.",
    evidence: "February, September and January hold 45 of 73 events. June and August have one each. December has none.",
    soWhat: "Budget and staff to land in late January and early September. A fiscal-year rhythm arrives too late.",
  },
  {
    claim: "Spontaneous outbreaks get followed up — sometimes in months, sometimes in years.",
    evidence:
      "Five campuses had an unplanned outbreak and later a produced event. Three clustered tightly at six to seven months: College Station (Feb→Sep 2023), Columbus (Aug 2024→Feb 2025), Pittsburgh (Sep 2025→Mar 2026). Two took about three years: Samford and Baylor, both Feb 2023 outbreaks with Unite US stops in April 2026.",
    soWhat: "An outbreak reliably marks a campus worth returning to, but the lead time is not fixed — the tight six-month cases may reflect an organizer already watching, not a natural clock. Treat it as a shortlist, not a countdown."
  },
  {
    claim: "Organized events happen every year. Organic outbreaks almost never do.",
    evidence:
      "A produced event appears in nearly every year from 2012 on. Unplanned outbreaks are near-absent until February 2023, then spike and taper.",
    soWhat: "A steady circuit of big events produces a steady circuit of big events. What's scarce is the conditions that let an unplanned moment run long.",
  },
  {
    claim: "Every organic outbreak had a specific trigger — not general \"hunger.\"",
    evidence:
      "Two kinds only: an unscripted service given permission to keep going (Asbury and the campuses that followed within weeks), or a shared national shock (Charlie Kirk's assassination).",
    soWhat: "You can't schedule one, but you can be ready: chaplains free to let a service overrun, and response networks that can move within hours.",
  },
  {
    claim: "Once a ministry finds a receptive campus, growth compounds fast.",
    evidence:
      "Texas A&M: spontaneous gathering (Feb 2023) → 124 baptisms at an organized stop (Sep 2023) → 10,000 students one year later. Roughly 10x in twelve months.",
    soWhat: "Notice where something already caught and reinvest there, rather than spreading thin across new campuses.",
  },
  {
    claim: "Almost nobody measures what happens after the altar call.",
    evidence:
      "Every event reports attendance and often baptisms. Not one has an independent study of how many decisions became sustained practice a year later.",
    soWhat: "The biggest gap in the space, so the biggest opening. Whoever measures one-year retention first will know something no one else does.",
  },
  {
    claim: "Coverage follows existing infrastructure — including in the Northeast.",
    evidence:
      "Events cluster in the evangelical-college corridor (TX, GA, AL, MS, TN, OH, FL). The exception: Christian Union runs weekly Bible courses across eight Ivy campuses, reaching ~10% of Princeton undergrads.",
    soWhat: "The Northeast isn't empty — it has a quieter, weekly-program model rather than arena nights. The West Coast and big secular publics remain genuinely untested.",
  },
  {
    claim: "The one survey-confirmed trend is narrower than \"Gen Z revival\": young men.",
    evidence:
      "Barna 2025: Gen Z/Millennial men now out-attend women weekly for the first time in 25 years (46% vs. 44%). Gen Z women show no such reversal.",
    soWhat: "What's working is working for young men. Plan for that specifically, and ask what a comparable on-ramp for young women looks like.",
  },
  {
    claim: "Baptism became a scheduled program — and the denominational data backs the surge.",
    evidence:
      "Pirate's Cove (4,166) scaled into Baptize California (12,216 in a day) and Baptize America (26,657 across 50 states). Southern Baptist records show four straight years of growth to 250,643 in 2024.",
    soWhat: "The surge is real in the most conservative source available. But these are all-ages events, and SBC membership kept falling — conversions aren't yet becoming retained members.",
  },
  {
    claim: "No Place Left's footprint barely overlaps with where revival actually broke out.",
    evidence:
      "Six NPL entries (AL, TX×3, FL×2). Organic outbreaks happened in KY, OH, AL, TN, TX, LA, VA, IN, UT. Kentucky has the densest cluster and zero NPL chapters. No source links any NPL entry to any outbreak.",
    soWhat: "Two parallel tracks, not one causal chain: steady disciple-making infrastructure in one set of places, unplanned spikes in another.",
  },
  {
    claim: "People are opening the Bible more — and trusting it less.",
    evidence:
      "Weekly Bible reading is at a decade high, led by young men. But only 36% of adults strongly agree it's totally accurate, down from 43% in 2000. Barna's summary: \"engagement is outpacing conviction.\"",
    soWhat: "Getting people to open it is already happening. The work is what comes after — teaching and community that turn a reading streak into conviction.",
  },
  {
    claim: "\"Fourth generation\" is the technical bar for a movement — nothing here meets it.",
    evidence:
      "Disciple-making networks define a movement as 100+ churches multiplied to a fourth generation. Everything on this map reports attendance and baptisms at generation zero.",
    soWhat: "If that's the goal, the metric isn't crowd size — it's whether one person discipled someone, who discipled someone, who discipled someone. Pick one campus and start tracking it.",
  },
  {
    claim: "A few repeat organizers account for most of the organized events.",
    evidence:
      "Lou Engle's network produced The Call, Azusa Now and The Send. Jennie Allen's IF:Gathering connects to her co-hosting Texas A&M a decade later. Unite US alone carries 30% of all events here.",
    soWhat: "Scale runs through a handful of long-running relationships. That's the fast path — and a concentration risk if the picture depends on one operator's calendar.",
  },
  {
    claim: "Credible researchers say the national claim is overstated.",
    evidence:
      "Ryan Burge sees nothing at the scale of a sustained national revival; Pew finds no clear evidence of a nationwide resurgence. The measured read: decline slowed, and those who remain are more committed.",
    soWhat: "Both can be true — these events happened and are documented, and the national trend line hasn't clearly moved. Hold every claim here at that altitude.",
  },
  {
    claim: "And there's a serious case for hope, from people close to it.",
    evidence:
      "Kirk Cameron, ahead of America's 250th, argues the country is positioned for genuine awakening — noting that past awakenings arrived precisely during periods of decline and strain.",
    soWhat: "Skepticism and hope answer different questions: one is about aggregate statistics, the other about what this moment could become. The real baptisms and full arenas make the hope non-trivial.",
  },
];

export default function Findings() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-5 sm:py-8 flex flex-col gap-5 sm:gap-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">Findings</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1">
          What the evidence supports, each with its basis and what to do about it.{" "}
          <Link to="/insights" className="underline">
            Charts
          </Link>{" "}
          ·{" "}
          <Link to="/about" className="underline">
            Caveats
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {findings.map((f, i) => (
          <div
            key={i}
            className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 sm:p-5"
          >
            <div className="flex gap-3">
              <span className="text-xs font-semibold text-black/25 dark:text-white/25 mt-1 tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5 min-w-0">
                <h2 className="font-semibold leading-snug">{f.claim}</h2>
                <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed">{f.evidence}</p>
                <p className="text-sm leading-relaxed border-l-2 border-amber-500/60 pl-3">{f.soWhat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-4 sm:p-5">
        <h2 className="font-semibold mb-1.5">The honest limit</h2>
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/60">
          73 press-covered events and a handful of national surveys — not a controlled study. It shows what got
          covered and the patterns inside that coverage. Nobody is counting the events that never got press.
        </p>
      </div>
    </div>
  );
}
