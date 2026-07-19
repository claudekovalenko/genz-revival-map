export type Article = {
  title: string;
  source: string;
  url: string;
  date: string; // ISO
};

export type RevivalCategory =
  | "campus"
  | "national-moment"
  | "movement";

/**
 * organic: unplanned outbreak, or grassroots/student-organized with no professional touring
 * ministry behind it. organized: planned and produced by a named touring ministry or parachurch org
 * (Unite US, Passion Conferences, The Send, Azusa Now, IF:Gathering, The Call, Together, The Return).
 */
export type RevivalOrigin = "organic" | "organized";

export type RevivalEvent = {
  id: string;
  name: string;
  city: string;
  state: string; // full name
  stateCode: string; // 2-letter USPS
  lat: number;
  lon: number;
  year: number;
  startDate: string; // ISO
  endDate?: string; // ISO, omit if single day or ongoing
  category: RevivalCategory;
  origin: RevivalOrigin;
  denominationTradition: string;
  summary: string;
  estimatedAttendance?: string;
  reportedBaptisms?: string;
  /** Only set when a source gives an actual figure (not just "hundreds") — used for charting/totals. */
  baptismsCount?: number;
  followThrough: string;
  demographicsNote: string;
  tags: string[];
  articles: Article[];
};

export type TrendPoint = {
  year: number;
  label?: string;
  value: number;
};

export type TrendSeries = {
  id: string;
  title: string;
  unit: string;
  source: Article;
  points: TrendPoint[];
  note?: string;
};
