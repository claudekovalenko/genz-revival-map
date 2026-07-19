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
];
