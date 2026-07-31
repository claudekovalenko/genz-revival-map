import type { TrendSeries } from "./types";

/**
 * National-level metrics referenced alongside the event map. These are
 * sparse, real anchor points pulled directly from cited research — not
 * smoothed or interpolated year-by-year data. See /about for caveats.
 */
export const trends: TrendSeries[] = [
  {
    id: "weekly-attendance-women",
    title: "Weekly church attendance — women",
    unit: "% of women attending weekly",
    source: {
      title: "New study shows men now surpass women in church attendance in major reversal",
      source: "Religion News Service",
      url: "https://religionnews.com/2025/10/07/new-study-shows-men-now-surpass-women-in-church-attendance-in-major-reversal/",
      date: "2025-10-07",
    },
    note: "Anchor points only — 2009 and pandemic-era figures are cited ranges, not exact matched-year survey waves.",
    points: [
      { year: 2009, value: 53 },
      { year: 2021, value: 25 },
      { year: 2025, value: 36 },
    ],
  },
  {
    id: "weekly-attendance-men",
    title: "Weekly church attendance — men",
    unit: "% of men attending weekly",
    source: {
      title: "New Research on Church Attendance: Decline of Women or the Rise of Men?",
      source: "Barna Group",
      url: "https://www.barna.com/trends/church-attendance-women-men/",
      date: "2025-10-01",
    },
    points: [
      { year: 2025, value: 45 },
    ],
  },
  {
    id: "genz-attendance-by-gender",
    title: "Gen Z weekly church attendance by gender (2025)",
    unit: "% attended in past week",
    source: {
      title: "New Barna Data: Young Adults Lead a Resurgence in Church Attendance",
      source: "Barna Group",
      url: "https://www.barna.com/research/young-adults-lead-resurgence-in-church-attendance/",
      date: "2025-09-01",
    },
    note: "Single-year snapshot comparing Gen Z men (46%) vs. Gen Z women (44%) — included for the map's demographics view, not a multi-year trend.",
    points: [
      { year: 2025, label: "Gen Z men", value: 46 },
      { year: 2025, label: "Gen Z women", value: 44 },
    ],
  },
  {
    id: "bible-sales-index",
    title: "US Bible unit sales (index, 2023 = 100)",
    unit: "index",
    source: {
      title: "Bible sales surge: Gen Z is sick and tired of predecessors' self-centered, godlike hubris",
      source: "The Washington Times",
      url: "https://www.washingtontimes.com/news/2024/dec/8/bible-sales-surge-gen-z-sick-tired-predecessors-se/",
      date: "2024-12-08",
    },
    note: "2024 sales reached ~17 million units, up 22% year over year. Post-Kirk-assassination weekly sales spiked an additional 36% in September 2025 (short-term, not reflected in this annual index). Digital engagement points the same direction: YouVersion's Bible app passed 1 billion lifetime installs in November 2025, set a single-day install record (798,000 on Jan 5, 2025), and reported North American daily use up 15% year over year.",
    points: [
      { year: 2023, value: 100 },
      { year: 2024, value: 122 },
    ],
  },
  {
    id: "sbc-baptisms",
    title: "Southern Baptist baptisms per year (Annual Church Profile)",
    unit: "baptisms (thousands)",
    source: {
      title: "Southern Baptists' Membership Decline Continues Amid Other Areas of Growth",
      source: "Lifeway Research",
      url: "https://research.lifeway.com/2025/04/30/southern-baptists-membership-decline-continues-amid-other-areas-of-growth/",
      date: "2025-04-30",
    },
    note: "The hardest data on this site: actual denominational counts, not organizer estimates or survey samples. Four consecutive years of growth — a streak not seen since the early 1990s — ending 2024 at the highest total since 2017. All-ages counts, not Gen Z-specific, and reported during the same years SBC total membership kept declining.",
    points: [
      { year: 2020, value: 123.2 },
      { year: 2021, value: 154.7 },
      { year: 2022, value: 180.2 },
      { year: 2023, value: 226.9 },
      { year: 2024, value: 250.6 },
    ],
  },
  {
    id: "gallup-church-membership",
    title: "US church membership (all adults)",
    unit: "% who belong to a church, synagogue, or mosque",
    source: {
      title: "U.S. Church Membership Falls Below Majority for First Time",
      source: "Gallup",
      url: "https://news.gallup.com/poll/341963/church-membership-falls-below-majority-first-time.aspx",
      date: "2021-03-29",
    },
    note: "The 15-year backdrop this whole project sits against: steady long-term decline, not a rebound, at the whole-population level. Any Gen Z-specific upturn shown elsewhere on this site is a divergence from this baseline, not a continuation of it.",
    points: [
      { year: 2010, value: 61 },
      { year: 2020, value: 47 },
      { year: 2024, value: 45 },
    ],
  },
  {
    id: "pew-religious-nones",
    title: "US adults with no religious affiliation ('nones')",
    unit: "% religiously unaffiliated",
    source: {
      title: "PRRI Generation Z Fact Sheet",
      source: "PRRI",
      url: "https://prri.org/spotlight/prri-generation-z-fact-sheet/",
      date: "2024-01-01",
    },
    note: "Whole-population trend. 2025 figure is an approximate 'leveling off' point cited alongside the 2007-2022 rise, not a new all-time high.",
    points: [
      { year: 2007, value: 16 },
      { year: 2022, value: 31 },
      { year: 2025, value: 28 },
    ],
  },
  {
    id: "nones-by-generation",
    title: "Religiously unaffiliated, by generation (2024)",
    unit: "% religiously unaffiliated",
    source: {
      title: "PRRI Generation Z Fact Sheet",
      source: "PRRI",
      url: "https://prri.org/spotlight/prri-generation-z-fact-sheet/",
      date: "2024-01-01",
    },
    note: "Single-year snapshot, not a trend — shows a clean generational gradient rather than a Gen Z-specific reversal.",
    points: [
      { year: 2024, label: "Gen Z", value: 34 },
      { year: 2024, label: "Millennial", value: 29 },
      { year: 2024, label: "Gen X", value: 25 },
      { year: 2024, label: "Boomer", value: 18 },
      { year: 2024, label: "Silent", value: 9 },
    ],
  },
  {
    id: "genz-scripture-engagement",
    title: "Gen Z 'Scripture Engaged' rate",
    unit: "% of Gen Z adults classified as Scripture Engaged",
    source: {
      title: "New Research Shows Gen Z Is the Least Scripture Engaged Generation",
      source: "American Bible Society (State of the Bible)",
      url: "https://www.americanbible.org/news/press-releases/articles/new-research-shows-gen-z-is-the-least-scripture-engaged-generation/",
      date: "2023-04-01",
    },
    note: "Gen Z remains the least Scripture-engaged generation by this measure even during the same years the campus revival wave was making headlines — a useful check against reading the event map as proof of a broad-based shift.",
    points: [
      { year: 2021, value: 14 },
      { year: 2022, value: 12 },
      { year: 2023, value: 10 },
      { year: 2024, value: 11 },
    ],
  },
  {
    id: "bible-total-accuracy-belief",
    title: "Adults who strongly agree the Bible is totally accurate in what it teaches",
    unit: "% strongly agreeing",
    source: {
      title: "How Millennials and Gen Z Are Driving a Bible Reading Comeback",
      source: "Barna Group (State of the Church 2025)",
      url: "https://www.barna.com/trends/bible-reading-trends/",
      date: "2025-11-01",
    },
    note: "Whole-population belief measure, tracked against a rising reading rate driven by young adults and young men specifically. Barna CEO David Kinnaman's framing for the gap: \"engagement is outpacing conviction\" — more people opening the Bible, fewer strongly affirming its accuracy.",
    points: [
      { year: 2000, value: 43 },
      { year: 2025, value: 36 },
    ],
  },
  {
    id: "genz-phone-vs-scripture",
    title: "Gen Z reporting an unhealthy relationship with their phone",
    unit: "% of Gen Z",
    source: {
      title: "83% of Gen Z say they have an unhealthy relationship with their phone, data shows",
      source: "LiveNOW from FOX (citing BePresent survey)",
      url: "https://www.livenowfox.com/news/gen-z-phone-addiction-bepresent-2024",
      date: "2024-01-01",
    },
    note: "Cited alongside the Scripture-engagement trend above, not as a matched study — no single source directly compares phone time to Bible-reading time for the same Gen Z sample. Other surveys put Gen Z self-reported phone addiction anywhere from 69% to 83% depending on how the question is asked and average daily screen time around 6.5 hours; treat this as a directional read (heavy phone dependency, low Scripture engagement, same generation, same years), not a precise ratio.",
    points: [{ year: 2024, value: 83 }],
  },
  {
    id: "christian-identification-by-generation",
    title: "Adults identifying as Christian, by generation",
    unit: "% identifying as Christian",
    source: {
      title: "2023-24 Religious Landscape Study: Executive Summary",
      source: "Pew Research Center",
      url: "https://www.pewresearch.org/religion/2025/02/26/religious-landscape-study-executive-summary/",
      date: "2025-02-26",
    },
    note: "Single-survey snapshot, not a trend over time — shows a steep generational gradient. Millennial figure is Pew's own imprecise 'more than half'; shown here as 54% per widely-cited secondary summaries of the same study, not a Pew-published exact number. Complements the 'nones-by-generation' trend above (same underlying decline, viewed from the Christian-identification side rather than the unaffiliated side).",
    points: [
      { year: 2024, label: "Gen Z", value: 45 },
      { year: 2024, label: "Millennial", value: 54 },
      { year: 2024, label: "Gen X", value: 72 },
    ],
  },
  {
    id: "genz-mental-health-vs-boomers",
    title: "Gen Z vs. Boomer/Elder: frequent anxiety and loneliness",
    unit: "% reporting frequently",
    source: {
      title: "New Data on Gen Z: Perceptions of Pressure, Anxiety and Empowerment",
      source: "Barna Group",
      url: "https://www.barna.com/research/gen-z-success/",
      date: "2024-01-01",
    },
    note: "Cited alongside this map's church-attendance and Bible-engagement trends, not as proof of a causal link — Barna itself frames rising Gen Z mental-health strain as an opening for ministry, not a measured driver of the campus wave. 39% of Gen Z report frequent uncertainty about the future and frequent anxiety about decisions, more than double the combined Boomer/Elder rate (16%); 29% of Gen Z report frequent loneliness, roughly 3-7x the Boomer (8%) and Elder (4%) rates.",
    points: [
      { year: 2024, label: "Gen Z: frequent anxiety", value: 39 },
      { year: 2024, label: "Boomer/Elder: frequent anxiety", value: 16 },
      { year: 2024, label: "Gen Z: frequent loneliness", value: 29 },
      { year: 2024, label: "Boomer: frequent loneliness", value: 8 },
      { year: 2024, label: "Elder: frequent loneliness", value: 4 },
    ],
  },
  {
    id: "genz-religious-affiliation-breakdown",
    title: "Gen Z religious affiliation, by race/ethnicity and tradition",
    unit: "% of all Gen Z adults",
    source: {
      title: "PRRI Generation Z Fact Sheet",
      source: "PRRI",
      url: "https://prri.org/spotlight/prri-generation-z-fact-sheet/",
      date: "2024-01-01",
    },
    note: "The clearest published answer to 'who is this happening among': two-thirds of Gen Z is religiously affiliated at all, split across many small groups rather than one dominant tradition. White evangelical Protestants (10%) and Hispanic Catholics (9%) are the two largest single groups — both larger than any one racial/ethnic group within mainline Protestantism or Catholicism alone. Read alongside the gender-attendance trends elsewhere on this page: this shows the racial/denominational split, not the gender split, of the same generation.",
    points: [
      { year: 2024, label: "White evangelical Protestant", value: 10 },
      { year: 2024, label: "Hispanic Catholic", value: 9 },
      { year: 2024, label: "White mainline Protestant", value: 8 },
      { year: 2024, label: "Black Protestant", value: 7 },
      { year: 2024, label: "White Catholic", value: 7 },
      { year: 2024, label: "Hispanic Protestant", value: 6 },
      { year: 2024, label: "Other Protestants of color", value: 3 },
      { year: 2024, label: "Other Catholics of color", value: 2 },
    ],
  },
];
