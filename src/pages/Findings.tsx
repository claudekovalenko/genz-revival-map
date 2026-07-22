import { Link } from "react-router-dom";

type Finding = {
  claim: string;
  evidence: string;
  soWhat: string;
};

const findings: Finding[] = [
  {
    claim: "\"Fourth generation\" isn't a vague aspiration — it's the actual technical bar disciple-making practitioners use to call something a movement.",
    evidence:
      "The No Place Left / Disciple-Making Movement (DMM) network — a decentralized coalition training people to disciple others who disciple others, tracked as \"generations\" — explicitly defines a movement as at least 100 churches that have multiplied to a fourth generation or beyond. Almost nothing on this map is tracked that way: events here report attendance and baptisms at generation zero (the event itself), not whether any disciple chain reached a second, third, or fourth generation afterward.",
    soWhat:
      "If the goal really is a fourth-generation movement, the metric to start tracking isn't attendance or baptism counts at all — it's whether any single person from any of these events went on to disciple someone, who discipled someone, who discipled someone. Nothing in this dataset currently measures that chain. That's a concrete, buildable next step: pick one campus with strong momentum (Texas A&M is the obvious candidate given its escalation pattern) and start tracking disciple-generations specifically, the way DMM practitioners already do elsewhere.",
  },
  {
    claim: "Organized mega-events happen almost every year. Organic outbreaks almost never do.",
    evidence:
      "An organized, professionally-produced event (The Call, Passion, Azusa Now, IF:Gathering, The Send, Unite US) appears in nearly every year from 2012 to 2022. Unplanned, grassroots \"organic\" outbreaks are almost entirely absent until February 2023, then spike hard and taper.",
    soWhat:
      "A steady circuit of big, well-run events does not, by itself, produce a revival — it produces a steady circuit of big, well-run events. If the goal is a genuine next-generation movement rather than another well-attended conference, the leverage isn't more programming, it's building the conditions that let an unplanned moment run long instead of getting cut off at the scheduled end time.",
  },
  {
    claim: "Every real organic outbreak has a specific trigger — not a general \"hunger.\"",
    evidence:
      "The organic entries cluster around exactly two kinds of moments: an unscripted worship service given permission to keep going (Asbury, and the 8 campuses that mirrored it within weeks), and a shared national shock (a campus team's own initiative at Ohio State; Charlie Kirk's assassination). No organic entry in this dataset happened in a vacuum.",
    soWhat:
      "You can't schedule a revival, but you can prepare for the moment one might start: chaplains and campus ministers with standing permission to let a service run past its slot, and existing prayer/response networks ready to catch a national shock within hours rather than improvising one from scratch.",
  },
  {
    claim: "Once a touring ministry finds a receptive campus, growth compounds fast.",
    evidence:
      "Texas A&M went from a spontaneous outdoor gathering (Feb 2023) to an organized Unite US stop with 124 baptisms (Sept 2023) to a 10,000-student arena event one year later (Sept 2024) — same campus, same ministry relationship, roughly 10x in twelve months.",
    soWhat:
      "The highest-leverage move isn't spreading a ministry thin across many new campuses at once — it's noticing where something already caught, and doubling down there with real follow-up investment before moving on.",
  },
  {
    claim: "Almost nobody is measuring what happens after the altar call.",
    evidence:
      "Every single event in this dataset reports attendance and, often, baptism or \"decision\" counts. Not one has an independent, long-term study of how many of those decisions became a sustained faith practice a year later. \"Follow-through\" fields on event pages are mostly organizer anecdotes, not research.",
    soWhat:
      "This is the biggest gap in the entire space, which makes it the biggest opportunity: whoever builds the actual discipleship/follow-up infrastructure — small groups, local church handoffs, mentorship — and measures it, will know something real about whether any of this lasts, while everyone else is still guessing from vibes.",
  },
  {
    claim: "Coverage concentrates in places that already had campus ministry infrastructure.",
    evidence:
      "Events cluster in the evangelical-college corridor (TX, GA, AL, MS, TN, OH, FL) and thin out almost everywhere else. That's consistent with where established chaplaincy and campus-ministry networks already operate, not necessarily with where Gen Z spiritual openness is highest.",
    soWhat:
      "The Northeast, West Coast, and big secular public universities outside the South are comparatively untested, not necessarily unreceptive. Bringing the same touring-ministry and campus-chaplaincy model into those regions is a real, largely unexplored opportunity rather than a dead end.",
  },
  {
    claim: "The one hard, survey-confirmed trend is narrower than \"Gen Z revival\": it's specifically about young men.",
    evidence:
      "Barna's 2025 data shows Gen Z/Millennial men now out-attending women weekly for the first time in 25 years of tracking (46% vs. 44% past-week attendance; 45% vs. 36% weekly overall). Gen Z women don't show the same reversal, and whole-population church membership (Gallup) and Gen Z's own Scripture engagement score (American Bible Society) both stayed flat-to-declining through the same years.",
    soWhat:
      "Whatever is working right now appears to be working specifically for young men. A strategy that assumes a broad-based Gen Z awakening will misallocate effort; a strategy that asks \"what is actually reaching young men, and how do we build something comparable for young women\" is working from what the data actually shows.",
  },
  {
    claim: "Baptism has shifted from revival's outcome to its organized program — and hard denominational data confirms the surge is real.",
    evidence:
      "Pirate's Cove (4,166 baptized, Pentecost 2023) scaled into Baptize California (12,216 in one day across 300 churches, 2024) and Baptize America (26,657 across 1,080 events in all 50 states, June 2025) — an annual, repeatable mass-baptism program. Independently, Southern Baptist Annual Church Profile counts — actual denominational records, not organizer estimates — show baptisms rising four straight years to 250,643 in 2024, the most since 2017, even while total SBC membership kept declining.",
    soWhat:
      "Two things follow. First, the baptism surge is not just hype — it shows up in the most conservative data source available. Second, the mass-baptism model proves large-scale public commitment can be organized on a calendar (Pentecost Sunday, every year) rather than waiting for spontaneous moments — but note these are all-ages events; connecting them specifically to Gen Z discipleship is the unproven step, and the falling-membership backdrop says conversions aren't yet translating into retained members.",
  },
  {
    claim: "No Place Left overlaps with the 2023 campus wave in one place — geography, not time or documented cause.",
    evidence:
      "The only No Place Left entry on this map is the MetaCamp training hub, founded in Dadeville, AL in March 2012. Eleven years later, Alabama is also home to two of the largest 2023 organic/organized campus entries: the Samford University Chapel Revival and Unite Auburn. No article in either entry's sources mentions No Place Left, MetaCamp, or DMM/CPM methodology, and NPL's own framing (fourth-generation church multiplication) has no reporting equivalent for either Alabama campus event.",
    soWhat:
      "A shared state eleven years apart is not a documented link — it's the kind of coincidence that's easy to over-read on a map. Treat this as a specific, testable question rather than a finding: did any Alabama-trained NPL disciple-maker touch the Samford or Auburn networks? Nothing sourced here says yes. Someone closer to Alabama campus ministry could actually check; until then this is an open question, not a claim.",
  },
  {
    claim: "A small number of repeat organizers account for a large share of the organized events.",
    evidence:
      "Lou Engle's network produced The Call (2012), Azusa Now (2016), and The Send (2019) — three of the largest organized entries in this dataset, spanning seven years. Jennie Allen's IF:Gathering (2014) connects directly to her co-hosting the Texas A&M Unite US event a decade later (2024).",
    soWhat:
      "Durable relationships with a small number of connected ministry networks are a more reliable path to scale than waiting for another spontaneous Asbury. The organized side of this dataset is really a story about a handful of long-running relationships, not a series of independent events.",
  },
];

export default function Findings() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Findings</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1 max-w-2xl">
          What the map and the survey data actually support, condensed into claims you can act on — each paired
          with its evidence and what it means for building something that lasts, not just documenting what
          already happened. See <Link to="/insights" className="underline">Insights</Link> for the underlying
          charts and <Link to="/about" className="underline">About</Link> for the caveats these all inherit.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {findings.map((f, i) => (
          <div
            key={i}
            className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5"
          >
            <div className="flex gap-3">
              <span className="text-xs font-semibold text-black/30 dark:text-white/30 mt-0.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-snug">{f.claim}</h2>
                <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed">{f.evidence}</p>
                <p className="text-sm leading-relaxed border-l-2 border-amber-500/50 pl-3 mt-1">{f.soWhat}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-5">
        <h2 className="font-semibold mb-2">The honest limit on all of this</h2>
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/60">
          This is 30 curated, press-covered events and a handful of national surveys — not a controlled study.
          It can tell you what got covered and what patterns show up inside that coverage; it can't tell you the
          true rate of organic revival versus organized events nationwide, because no one is counting the events
          that never got press. Treat every "so what" above as the strongest read of the evidence gathered here,
          worth testing against reality — not a settled conclusion.
        </p>
      </div>
    </div>
  );
}
