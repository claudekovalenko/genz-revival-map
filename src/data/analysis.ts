import type { RevivalEvent } from "./types";
import { maxYear } from "./utils";

/**
 * Derived signals — the analytical layer on top of the raw event list.
 *
 * Everything here is computed from the documented events themselves, using
 * explicit, stated rules (no hidden weighting, no external data). The point
 * is to answer three questions the raw dot map can't:
 *   1. Where is activity actually building, versus where did something
 *      happen once and stop?
 *   2. Which specific places have proven receptive enough to host repeat
 *      activity — i.e. where is investment already working?
 *   3. Where is there no documented activity at all — the untested ground?
 *
 * These are read-outs of this dataset's coverage, not a census of reality.
 * A state scoring zero means nothing here got documented, which is not the
 * same as nothing happening. See /about for the full caveat.
 */

/** Events within this many years of the dataset's latest year count as "recent". */
const RECENT_WINDOW = 2;
/** Events within this many years count as "current era" (still weighted above historical). */
const MID_WINDOW = 4;

/**
 * Recency weight. Revival activity is a momentum question, not an all-time
 * tally: an event last year says far more about where things are heading
 * than one a decade ago.
 */
function recencyWeight(year: number): number {
  const age = maxYear - year;
  if (age <= RECENT_WINDOW) return 3;
  if (age <= MID_WINDOW) return 2;
  return 1;
}

/**
 * Organic events weigh more than organized ones for momentum purposes.
 * A touring ministry can schedule an arena night anywhere it books a venue;
 * an unplanned outbreak only happens where there was genuine local
 * receptivity, so it's the stronger signal of underlying conditions.
 */
function originWeight(origin: RevivalEvent["origin"]): number {
  return origin === "organic" ? 1.5 : 1;
}

export type MomentumTier = "high" | "building" | "emerging" | "none";

export type StateMomentum = {
  stateName: string;
  stateCode: string;
  /** Raw weighted score before normalization. */
  rawScore: number;
  /** 0-100, normalized against the highest-scoring state in the set. */
  score: number;
  tier: MomentumTier;
  totalEvents: number;
  recentEvents: number;
  organicEvents: number;
  /** Distinct cities in this state that have hosted 2+ documented events. */
  repeatSites: number;
  latestYear: number;
};

export function momentumByState(events: RevivalEvent[]): Map<string, StateMomentum> {
  const byState = new Map<string, RevivalEvent[]>();
  for (const e of events) {
    const list = byState.get(e.state);
    if (list) list.push(e);
    else byState.set(e.state, [e]);
  }

  const results = new Map<string, StateMomentum>();

  for (const [stateName, stateEvents] of byState) {
    let rawScore = 0;
    for (const e of stateEvents) {
      rawScore += recencyWeight(e.year) * originWeight(e.origin);
    }

    // Repeat-site bonus: a city that hosted activity in two or more distinct
    // years is the clearest "this stuck" signal in the dataset.
    const cityYears = new Map<string, Set<number>>();
    for (const e of stateEvents) {
      const key = `${e.city}`;
      const years = cityYears.get(key) ?? new Set<number>();
      years.add(e.year);
      cityYears.set(key, years);
    }
    const repeatSites = Array.from(cityYears.values()).filter((y) => y.size >= 2).length;
    rawScore += repeatSites * 2;

    results.set(stateName, {
      stateName,
      stateCode: stateEvents[0].stateCode,
      rawScore,
      score: 0, // filled in below once we know the max
      tier: "none",
      totalEvents: stateEvents.length,
      recentEvents: stateEvents.filter((e) => maxYear - e.year <= RECENT_WINDOW).length,
      organicEvents: stateEvents.filter((e) => e.origin === "organic").length,
      repeatSites,
      latestYear: Math.max(...stateEvents.map((e) => e.year)),
    });
  }

  const maxRaw = Math.max(1, ...Array.from(results.values()).map((r) => r.rawScore));
  for (const r of results.values()) {
    r.score = Math.round((r.rawScore / maxRaw) * 100);
    r.tier = r.score >= 60 ? "high" : r.score >= 30 ? "building" : "emerging";
  }

  return results;
}

export type RepeatSite = {
  city: string;
  stateCode: string;
  events: RevivalEvent[];
  years: number[];
  firstYear: number;
  latestYear: number;
  /** True when a later event at this site drew a larger documented crowd than the first. */
  escalated: boolean;
};

/** Pulls a rough headcount out of the free-text attendance field. */
export function estimatedSize(e: RevivalEvent): number {
  const match = e.estimatedAttendance?.replace(/,/g, "").match(/(\d+)/);
  if (match) return parseInt(match[1], 10);
  if (e.baptismsCount) return e.baptismsCount * 15;
  return 0;
}

/**
 * Places that hosted documented activity in two or more distinct years.
 * This is the "proven ground" list — where something already caught and
 * came back, rather than happening once and going quiet.
 */
export function repeatSites(events: RevivalEvent[]): RepeatSite[] {
  const byCity = new Map<string, RevivalEvent[]>();
  for (const e of events) {
    const key = `${e.city}|${e.stateCode}`;
    const list = byCity.get(key);
    if (list) list.push(e);
    else byCity.set(key, [e]);
  }

  const sites: RepeatSite[] = [];
  for (const [key, cityEvents] of byCity) {
    const years = Array.from(new Set(cityEvents.map((e) => e.year))).sort((a, b) => a - b);
    if (years.length < 2) continue;

    const [city, stateCode] = key.split("|");
    const sorted = [...cityEvents].sort((a, b) => a.year - b.year);
    const firstSize = estimatedSize(sorted[0]);
    const laterMax = Math.max(...sorted.slice(1).map(estimatedSize));

    sites.push({
      city,
      stateCode,
      events: sorted,
      years,
      firstYear: years[0],
      latestYear: years[years.length - 1],
      escalated: firstSize > 0 && laterMax > firstSize,
    });
  }

  return sites.sort((a, b) => b.events.length - a.events.length || b.latestYear - a.latestYear);
}

/** Set of "city|stateCode" keys that qualify as repeat sites — for fast marker lookup. */
export function repeatSiteKeys(events: RevivalEvent[]): Set<string> {
  return new Set(repeatSites(events).map((s) => `${s.city}|${s.stateCode}`));
}

/**
 * Year-over-year direction for the whole set: is documented activity
 * accelerating, flat, or falling off in the most recent window?
 */
export function activityTrend(events: RevivalEvent[]): {
  recentCount: number;
  priorCount: number;
  direction: "accelerating" | "steady" | "cooling";
} {
  const recentCount = events.filter((e) => maxYear - e.year <= RECENT_WINDOW).length;
  const priorCount = events.filter(
    (e) => maxYear - e.year > RECENT_WINDOW && maxYear - e.year <= RECENT_WINDOW * 2 + 1
  ).length;

  const direction =
    recentCount > priorCount * 1.15
      ? "accelerating"
      : recentCount < priorCount * 0.85
      ? "cooling"
      : "steady";

  return { recentCount, priorCount, direction };
}
