import type { Moods, MoodKey, MoodEntry } from "@/lib/daily";

/**
 * Client-side, lazy loader for the mood pools. The ~176KB moods.json is NOT
 * shipped in every daily page's payload — it loads as a separate chunk only on
 * the first mood tap, then is cached for the rest of the session.
 */
let cache: Moods | null = null;
let inflight: Promise<Moods> | null = null;

export async function loadMoods(): Promise<Moods> {
  if (cache) return cache;
  if (!inflight) {
    inflight = import("@/content/daily/moods.json").then((mod) => {
      cache = mod.default as Moods;
      return cache;
    });
  }
  return inflight;
}

/** A random entry of a mood, avoiding `exclude` (the line currently shown) when possible. */
export async function randomMoodEntry(key: MoodKey, exclude?: string): Promise<MoodEntry | null> {
  const pool = (await loadMoods())[key] ?? [];
  if (pool.length === 0) return null;
  let next = pool[Math.floor(Math.random() * pool.length)];
  for (let i = 0; i < 4 && next.affirmation === exclude && pool.length > 1; i++) {
    next = pool[Math.floor(Math.random() * pool.length)];
  }
  return next;
}
