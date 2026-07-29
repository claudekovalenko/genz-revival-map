/**
 * % of state adults classified "highly religious" by Pew's 2023-24 Religious
 * Landscape Study (prayer frequency, service attendance, belief in God,
 * importance of religion combined into one index). National average: 31%.
 *
 * This is a PARTIAL table — only states whose figure could be confirmed via
 * public reporting on the study are included (Pew's own full 50-state table
 * sits behind a page this project's tooling couldn't fetch reliably). States
 * not listed here render as "no published figure" on the map rather than a
 * guessed number — see /about for why unverified figures aren't used.
 *
 * Source: Pew Research Center, "Most and least religious U.S. states"
 * https://www.pewresearch.org/short-reads/2025/09/16/how-religious-is-your-state/
 */
export const stateHighlyReligiousPct: Record<string, number> = {
  MS: 50,
  SC: 46,
  LA: 45,
  UT: 42,
  AL: 40,
  ME: 17,
  NH: 15,
  VT: 13,
  MA: 20,
  CA: 24,
};

export const nationalHighlyReligiousAvgPct = 31;
