export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">About & methodology</h1>
        <p className="text-sm text-black/60 dark:text-white/50 mt-1">
          What this project is, how it was built, and why you should read the data skeptically.
        </p>
      </div>

      <Section title="What this is">
        <p>
          This site tracks publicly reported Protestant revival activity linked to Gen Z in the United States,
          spanning the past 15 years (2012-present). It focuses on events with real press or research coverage —
          spontaneous campus outpourings, organized campus ministry tours, and national moments (like the response
          to Charlie Kirk's assassination) that produced a documented spike in prayer, worship, baptisms, or
          professions of faith.
        </p>
      </Section>

      <Section title="On the 15-year window — and why the earliest entries aren't really 'Gen Z'">
        <p>
          Gen Z is generally defined as people born 1997-2012. That means the oldest Gen Zers only reached college
          age around 2015, and the cohort wasn't a majority of any college crowd until the back half of the 2010s.
          The earliest entries on this site — a 2012 Southern California student rally ("The Call"), Passion 2013,
          IF:Gathering's 2014 launch, Together 2016, and The Return in 2020 — predate or straddle that line.
          They're included deliberately, as historical context
          showing that large-scale youth Christian mobilization is a recurring pattern, not something that started
          with Asbury. Each is flagged in its own demographics note as Millennial-led, general-adult, or
          transitional — not a Gen Z data point. The Send (2019) and Passion 2022 are the first entries where the
          crowd was genuinely Gen Z-majority; the dataset's clearly Gen Z-driven material really takes off in 2023.
        </p>
        <p className="mt-2">
          Some years still show nothing, even after specifically researching them: 2015, 2017, 2018, and 2021 have
          no comparable press-covered event in this dataset. That's not for lack of trying — it may be a real
          quiet stretch, or it may just mean the event existed but never got picked up by press the way Asbury or
          the Unite US tour did. Treat those gaps as "not found," not "confirmed nothing happened."
        </p>
      </Section>

      <Section title="Inclusion criteria">
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Primarily Protestant / evangelical tradition (Wesleyan, Baptist, Pentecostal, non-denominational)</li>
          <li>United States, youth/young-adult linked (college campuses or youth/young-adult ministries) — with the pre-2020 entries kept for historical pattern context even though their crowds were mostly Millennial</li>
          <li>Reported in at least one identifiable news, ministry, or research source (cited on each event's page)</li>
        </ul>
      </Section>

      <Section title="How the data was built">
        <p>
          Every event was manually researched and cross-checked against the cited articles — nothing here is
          synthetic. Attendance and baptism figures are quoted as reported by organizers, journalists, or
          participants; almost none come from an independently audited count, which is why many entries say
          "not independently tallied" rather than giving a hard number. Treat every figure as an estimate with a
          named source, not a verified statistic.
        </p>
        <p className="mt-2">
          The baptism totals shown on the map and Insights pages are deliberately conservative: an event only
          contributes to those totals when a source gave an actual number (e.g. "60 baptized," "124 baptized").
          Events where the only reporting was a vague "hundreds" — which is most of them — are described in text
          but excluded from the count. That means every baptism total on this site is a floor, not a real total.
        </p>
      </Section>

      <Section title="On demographics — read this before drawing conclusions">
        <p>
          It's common to hear this trend described as concentrated among young, politically-engaged, white men.
          The best-documented part of that claim is the <strong>gender</strong> pattern: Barna Group's 2025 State
          of the Church data shows Gen Z and Millennial men now attending church more than women for the first
          time in its 25 years of tracking (46% of Gen Z men vs. 44% of Gen Z women attended in the past week;
          45% of men vs. 36% of women overall attend weekly). That is real, survey-based, and citable.
        </p>
        <p className="mt-2">
          The <strong>racial</strong> component is much weaker. Several news accounts describe the post-2025,
          politically-linked wave as disproportionately white and conservative, but that appears to be journalistic
          characterization, not a finding from an independent demographic study. This site flags those claims as
          anecdotal on the relevant event pages rather than presenting them as established fact.
        </p>
      </Section>

      <Section title="This is a contested topic — the skeptical case">
        <p>
          Not every researcher agrees these events add up to a "revival." Worth reading before treating any chart
          on this site as settled:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
          <li>
            Religion researcher Ryan Burge, reviewed by Axios, argues the data doesn't show anything "at the scale
            that would even begin to point ... in the direction of a sustained, significant, substantive revival."
          </li>
          <li>
            The UK's "quiet revival" claim (churchgoing among 18-24s quadrupling) was retracted after YouGov
            acknowledged flawed methodology — a cautionary tale for any single striking statistic in this space.
          </li>
          <li>
            The General Social Survey still shows Gen Z (18-29) as the age group least likely to attend church
            weekly, with 38% saying they never attend and a 34% religious-disaffiliation rate — higher than the
            23% average across all Americans.
          </li>
          <li>
            Christianity Today's own framing: "The Revival That Wasn't — and the One That May Be" — the honest
            read is local, real, youth-driven upticks in specific places, not (yet) proof of a national Third
            Great Awakening.
          </li>
        </ul>
        <div className="flex flex-col gap-1 mt-3 text-sm">
          <a className="underline" href="https://www.axios.com/2025/05/10/religious-young-people-christianity-rise" target="_blank" rel="noreferrer">Axios — "Young men are leading a religious resurgence"</a>
          <a className="underline" href="https://wordandway.org/2026/04/27/no-gen-z-is-not-undergoing-a-religious-revival/" target="_blank" rel="noreferrer">Word&Way — "No, Gen Z Is Not Undergoing a 'Religious Revival'"</a>
          <a className="underline" href="https://www.salon.com/2026/05/04/young-mens-religious-revival-is-a-myth/" target="_blank" rel="noreferrer">Salon — "Young men's religious revival is a myth"</a>
          <a className="underline" href="https://research.lifeway.com/2026/01/06/is-a-gen-z-religious-rebound-happening/" target="_blank" rel="noreferrer">Lifeway Research — "Is a Gen Z Religious Rebound Happening?"</a>
          <a className="underline" href="https://www.christianitytoday.com/2026/04/quiet-revival-that-wasnt-gen-z-church-america/" target="_blank" rel="noreferrer">Christianity Today — "The Revival That Wasn't—and the One That May Be"</a>
          <a className="underline" href="https://www.deseret.com/opinion/2026/01/05/religious-revival-america-church-closings-gen-z/" target="_blank" rel="noreferrer">Deseret News — "Religious revival in America? What the data really says"</a>
        </div>
      </Section>

      <Section title="Editing this site">
        <p>
          Every event lives in <code className="bg-black/5 dark:bg-white/10 rounded px-1.5 py-0.5">src/data/revivals.ts</code>,
          and the national survey series live in <code className="bg-black/5 dark:bg-white/10 rounded px-1.5 py-0.5">src/data/trends.ts</code>.
          Add a new object to either array — with sources — and it flows automatically into the map, the state
          pages, the event pages, and the Insights charts.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="leading-relaxed text-black/80 dark:text-white/70 flex flex-col gap-2">{children}</div>
    </div>
  );
}
