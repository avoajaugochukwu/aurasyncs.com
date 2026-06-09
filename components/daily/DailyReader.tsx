"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CopyButton, useCopied } from "@/components/reader/CopyButton";
import type { Moods, MoodKey, MoodWriteups } from "@/lib/daily";

export type RelatedLink = { title: string; excerpt: string; slug: string; clusterLabel: string };

type DailyReaderProps = {
  /** This date's affirmation — the server-rendered, crawlable default line. */
  affirmation: string;
  /** Short label for the reset chip + reflection heading, e.g. "June 9". */
  dateLabel: string;
  position: number;
  total: number;
  prevHref: string;
  nextHref: string;
  moods: Moods;
  moodList: { key: MoodKey; label: string }[];
  moodWriteups: MoodWriteups;
  /** The date's reflection block (shown when no mood is active). */
  reflection: string;
  practice?: string;
  sourceIdea: string;
  authorName: string;
  authorHref: string;
  related: RelatedLink | null;
};

/**
 * Full-screen reader. The affirmation is the hero — nothing above it. Below sit
 * the mood chips, the day arrows + copy, then a write-up: the date's reflection
 * by default, or the active mood's write-up once a mood is tapped. Day nav is
 * real prefetched links; the default (no-mood) state is what gets server-rendered.
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
  moodWriteups,
  reflection,
  practice,
  sourceIdea,
  authorName,
  authorHref,
  related,
}: DailyReaderProps) {
  const [copiedKey, copy] = useCopied();
  const router = useRouter();

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

  const activeLabel = mood ? moodList.find((m) => m.key === mood)?.label : null;

  return (
    <>
      <div className="reader-focus reader-focus-daily">
        <div className="focus-stage">
          <Link className="focus-zone focus-zone-prev" href={prevHref} prefetch scroll={false} aria-label="Previous day" />
          <Link className="focus-zone focus-zone-next" href={nextHref} prefetch scroll={false} aria-label="Next day" />
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

      <article className="daily-prose">
        {mood === null || !activeLabel ? (
          <>
            <div className="section-label">
              <span className="eyebrow">{dateLabel} · Reflection</span>
              <span className="rule" />
            </div>
            <p className="daily-reflection">{reflection}</p>
            {practice && (
              <aside className="prompt">
                <span className="prompt-label">Carry it today</span>
                <p className="prompt-text">{practice}</p>
              </aside>
            )}
            <p className="daily-source meta">
              Inspired by the old idea of <em>{sourceIdea}</em>. Written by{" "}
              <Link href={authorHref}>{authorName}</Link>.
            </p>
          </>
        ) : (
          <>
            <div className="section-label">
              <span className="eyebrow">{activeLabel} · About these affirmations</span>
              <span className="rule" />
            </div>
            <p className="daily-reflection">{moodWriteups[mood]}</p>
          </>
        )}

        {related && (
          <div className="related" style={{ marginTop: "2.5rem" }}>
            <span className="eyebrow">Keep reading</span>
            <h2 className="related-head">More on {related.clusterLabel.toLowerCase()}</h2>
            <div className="related-grid">
              <Link className="related-card" href={`/blog/${related.slug}`}>
                <span className="related-title">{related.title}</span>
                <span className="related-note">{related.excerpt}</span>
                <span className="related-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}

        <div className="daily-nav">
          <Link href={prevHref}>← Previous day</Link>
          <Link href="/daily">All days</Link>
          <Link href={nextHref}>Next day →</Link>
        </div>
      </article>
    </>
  );
}
