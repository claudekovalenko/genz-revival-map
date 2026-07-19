import type { RevivalEvent } from "./types";
import { revivals } from "./revivals";

export const allYears = revivals.map((e) => e.year);
export const minYear = Math.min(...allYears);
export const maxYear = Math.max(...allYears);

export type YearMode = "cumulative" | "single";

export function filterByYear(
  events: RevivalEvent[],
  year: number,
  mode: YearMode
): RevivalEvent[] {
  return events.filter((e) => (mode === "cumulative" ? e.year <= year : e.year === year));
}

export type StateAggregate = {
  stateName: string;
  stateCode: string;
  count: number;
  events: RevivalEvent[];
};

export function aggregateByState(events: RevivalEvent[]): Map<string, StateAggregate> {
  const map = new Map<string, StateAggregate>();
  for (const e of events) {
    const existing = map.get(e.state);
    if (existing) {
      existing.count += 1;
      existing.events.push(e);
    } else {
      map.set(e.state, {
        stateName: e.state,
        stateCode: e.stateCode,
        count: 1,
        events: [e],
      });
    }
  }
  return map;
}

export function eventsPerYear(events: RevivalEvent[]): { year: number; count: number }[] {
  const map = new Map<number, number>();
  for (const e of events) {
    map.set(e.year, (map.get(e.year) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, count]) => ({ year, count }));
}

export function eventById(id: string): RevivalEvent | undefined {
  return revivals.find((e) => e.id === id);
}

export function eventsByStateCode(code: string): RevivalEvent[] {
  return revivals.filter((e) => e.stateCode === code);
}

/** Sum of only the events with a sourced, specific baptism figure — a documented floor, not a full count. */
export function totalDocumentedBaptisms(events: RevivalEvent[]): number {
  return events.reduce((sum, e) => sum + (e.baptismsCount ?? 0), 0);
}

export function baptismsPerYear(events: RevivalEvent[]): { year: number; count: number }[] {
  const map = new Map<number, number>();
  for (const e of events) {
    if (!e.baptismsCount) continue;
    map.set(e.year, (map.get(e.year) ?? 0) + e.baptismsCount);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, count]) => ({ year, count }));
}

export function originByYear(events: RevivalEvent[]): { year: number; organic: number; organized: number }[] {
  const map = new Map<number, { organic: number; organized: number }>();
  for (const e of events) {
    const entry = map.get(e.year) ?? { organic: 0, organized: 0 };
    entry[e.origin] += 1;
    map.set(e.year, entry);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, counts]) => ({ year, ...counts }));
}
