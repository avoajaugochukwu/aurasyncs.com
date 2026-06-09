"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CopyButton, useCopied } from "@/components/reader/CopyButton";
import type { Moods, MoodKey } from "@/lib/daily";

type DailyReaderProps = {
  /** This date's affirmation — the server-rendered, crawlable default line. */
  affirmation: string;
  /** Short label for the reset chip, e.g. "June 9". */
  dateLabel: string;
  position: number;
  total: number;
  prevHref: string;
  nextHref: string;
  moods: Moods;
  moodList: { key: MoodKey; label: string }[];
};

/**
 * Full-screen reader. The affirmation is the hero — nothing above it. Below sit
 * the mood chips (tap one to drop in a random line of that mood; tap again to
 * reshuffle), then the day arrows + copy. Day nav is real prefetched links.
 */
export function DailyReader({
  affirmation,
  dateLabel,
  position,
  total,
  prevHref,
  nextHref,
  moods,
  moodList,
}: DailyReaderProps) {
  const [copiedKey, copy] = useCopied();
  const router = useRouter();

  // null mood = showing this date's affirmation; otherwise a random mood line.
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [line, setLine] = useState(affirmation);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        router.push(nextHref);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        router.push(prevHref);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prevHref, nextHref]);

  const pickMood = (key: MoodKey) => {
    const pool = moods[key] ?? [];
    if (pool.length === 0) return;
    // Avoid repeating the current line when reshuffling the same mood.
    let next = pool[Math.floor(Math.random() * pool.length)];
    for (let i = 0; i < 4 && next === line && pool.length > 1; i++) {
      next = pool[Math.floor(Math.random() * pool.length)];
    }
    setDir(1);
    setMood(key);
    setLine(next);
  };

  const reset = () => {
    setDir(-1);
    setMood(null);
    setLine(affirmation);
  };

  return (
    <div className="reader-focus reader-focus-daily">
      <div className="focus-stage">
        <Link
          className="focus-zone focus-zone-prev"
          href={prevHref}
          prefetch
          scroll={false}
          aria-label="Previous day"
        />
        <Link
          className="focus-zone focus-zone-next"
          href={nextHref}
          prefetch
          scroll={false}
          aria-label="Next day"
        />
        <figure className={"focus-quote " + (dir > 0 ? "anim-fwd" : "anim-back")} key={line}>
          <blockquote className="focus-text">{line}</blockquote>
        </figure>
      </div>

      <div className="mood-chips" role="group" aria-label="Pick a mood for a random affirmation">
        <button
          type="button"
          className={"mood-chip mood-chip-reset" + (mood === null ? " is-active" : "")}
          onClick={reset}
          aria-pressed={mood === null}
        >
          {dateLabel}
        </button>
        {moodList.map((m) => (
          <button
            key={m.key}
            type="button"
            className={"mood-chip" + (mood === m.key ? " is-active" : "")}
            onClick={() => pickMood(m.key)}
            aria-pressed={mood === m.key}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="focus-controls">
        <Link className="focus-arrow" href={prevHref} prefetch scroll={false} aria-label="Previous day">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <CopyButton onClick={() => copy(line, "daily")} copied={copiedKey === "daily"} label="Copy this" />
        <Link className="focus-arrow" href={nextHref} prefetch scroll={false} aria-label="Next day">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="focus-progress" aria-hidden="true">
        <div className="focus-progress-fill" style={{ width: `${(position / total) * 100}%` }} />
      </div>
      <p className="focus-hint meta">
        {mood === null
          ? "Use ← → for another day, or tap a mood for a random line"
          : "Tap the mood again to reshuffle, or pick another"}
      </p>
    </div>
  );
}
