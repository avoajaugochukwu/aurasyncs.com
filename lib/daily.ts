import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export type DailySource = { thinker: string; work: string; idea: string };

/** Raw shape stored in content/daily/affirmations.json, keyed by "MM-DD". */
export type DailyEntryRaw = {
  theme: string;
  affirmation: string;
  reflection: string;
  source: DailySource;
  practice?: string;
  /** A lib/clusters.ts cluster id, used for the cross-link to a topical post. */
  cluster: string;
};

/** A fully-resolved day, with computed calendar + navigation fields. */
export type DailyEntry = DailyEntryRaw & {
  key: string;        // "06-09"
  slug: string;       // "june-9"
  month: number;      // 1-12
  day: number;        // 1-31
  monthName: string;  // "June"
  /** Position among the 365 standard days (1-365); Feb 29 borrows Feb 28's slot. */
  displayPosition: number;
  /** True for Feb 29 — presented as a bonus day, not counted in the 365. */
  isBonusDay: boolean;
  prevSlug: string;   // wraps Dec 31 -> Jan 1
  nextSlug: string;
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_SLUGS = MONTHS.map((m) => m.toLowerCase());
/** Leap-inclusive month lengths — the set is evergreen (Feb has 29). */
const MONTH_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const pad = (n: number) => String(n).padStart(2, '0');

/** Canonical ordering of all 366 day keys — the source of truth for prev/next nav. */
const ORDER: string[] = (() => {
  const keys: string[] = [];
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= MONTH_DAYS[m - 1]; d++) keys.push(`${pad(m)}-${pad(d)}`);
  }
  return keys;
})();

/**
 * Public-facing count. The collection is presented as 365 days (the familiar,
 * searchable framing); Feb 29 is a navigable bonus day that isn't counted here.
 */
export const DISPLAY_TOTAL = 365;
const STD_ORDER = ORDER.filter((k) => k !== '02-29');
/** 1-365 position; Feb 29 borrows Feb 28's slot so the progress bar stays sensible. */
function stdPosition(key: string): number {
  const ref = key === '02-29' ? '02-28' : key;
  return STD_ORDER.indexOf(ref) + 1;
}

let _data: Record<string, DailyEntryRaw> | null = null;
function load(): Record<string, DailyEntryRaw> {
  if (_data) return _data;
  const file = path.join(process.cwd(), 'content/daily/affirmations.json');
  _data = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, DailyEntryRaw>;
  return _data;
}

export function slugForKey(key: string): string {
  const [m, d] = key.split('-').map(Number);
  return `${MONTH_SLUGS[m - 1]}-${d}`;
}

/** Parse a URL slug ("june-9") back to a canonical key ("06-09"); null if invalid. */
export function keyForSlug(slug: string): string | null {
  const i = slug.lastIndexOf('-');
  if (i < 0) return null;
  const monthSlug = slug.slice(0, i);
  const day = parseInt(slug.slice(i + 1), 10);
  const m = MONTH_SLUGS.indexOf(monthSlug);
  if (m < 0 || !Number.isFinite(day) || day < 1 || day > MONTH_DAYS[m]) return null;
  return `${pad(m + 1)}-${pad(day)}`;
}

function buildEntry(key: string): DailyEntry | null {
  const raw = load()[key];
  if (!raw) return null;
  const [m, d] = key.split('-').map(Number);
  const idx = ORDER.indexOf(key);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  return {
    ...raw,
    key,
    slug: slugForKey(key),
    month: m,
    day: d,
    monthName: MONTHS[m - 1],
    displayPosition: stdPosition(key),
    isBonusDay: key === '02-29',
    prevSlug: slugForKey(prev),
    nextSlug: slugForKey(next),
  };
}

export function getDayBySlug(slug: string): DailyEntry | null {
  const key = keyForSlug(slug);
  return key ? buildEntry(key) : null;
}

/** Today's entry (falls back to Jan 1 if today's key is somehow missing). */
export function getToday(): DailyEntry {
  const now = new Date();
  const key = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  return (buildEntry(key) ?? buildEntry('01-01'))!;
}

/** A window of (2*radius + 1) days centered on `slug`, wrapping around the year. */
export function getWindowAround(slug: string, radius = 2): DailyEntry[] {
  const key = keyForSlug(slug);
  if (!key) return [];
  const idx = ORDER.indexOf(key);
  const out: DailyEntry[] = [];
  for (let d = -radius; d <= radius; d++) {
    const entry = buildEntry(ORDER[(idx + d + ORDER.length) % ORDER.length]);
    if (entry) out.push(entry);
  }
  return out;
}

/** Slugs for every present day, in calendar order — feeds generateStaticParams + sitemap. */
export function allDailySlugs(): string[] {
  const data = load();
  return ORDER.filter((k) => data[k]).map(slugForKey);
}

export function totalDays(): number {
  return ORDER.length;
}

/** Mood pools surfaced as a random-line picker inside the reader (client-only, no URLs). */
export type MoodKey = 'body' | 'wealth' | 'confidence' | 'calm' | 'love';
/** Each mood line carries its own reflection (like a daily entry), surfaced when picked. */
export type MoodEntry = { affirmation: string; reflection: string; practice?: string };
export type Moods = Record<MoodKey, MoodEntry[]>;

export const MOODS: { key: MoodKey; label: string }[] = [
  { key: 'body', label: 'Body' },
  { key: 'wealth', label: 'Wealth' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'calm', label: 'Calm' },
  { key: 'love', label: 'Love' },
];

let _moods: Moods | null = null;
export function getMoods(): Moods {
  if (_moods) return _moods;
  const file = path.join(process.cwd(), 'content/daily/moods.json');
  _moods = JSON.parse(fs.readFileSync(file, 'utf8')) as Moods;
  return _moods;
}


export type MonthGroup = {
  month: number;
  name: string;
  slug: string;
  days: { slug: string; day: number; theme: string }[];
};

/** Month-by-month grouping for the hub index grid. */
export function monthIndex(): MonthGroup[] {
  const data = load();
  return MONTHS.map((name, i) => {
    const m = i + 1;
    const days = ORDER
      .filter((k) => k.startsWith(`${pad(m)}-`) && data[k])
      .map((k) => ({ slug: slugForKey(k), day: Number(k.split('-')[1]), theme: data[k].theme }));
    return { month: m, name, slug: MONTH_SLUGS[i], days };
  });
}
