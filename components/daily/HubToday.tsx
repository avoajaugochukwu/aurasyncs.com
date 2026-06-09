"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyButton, useCopied } from "@/components/reader/CopyButton";
import { randomMoodEntry } from "@/lib/moods-client";
import type { MoodKey } from "@/lib/daily";

type HubTodayProps = {
  dateLabel: string;
  affirmation: string;
  todaySlug: string;
  moodList: { key: MoodKey; label: string }[];
};

/**
 * The hub's featured card — today's line, plus the mood picker surfaced up front
 * so it's obvious you can tap a mood for a random line. Links into the full reader.
 */
export function HubToday({ dateLabel, affirmation, todaySlug, moodList }: HubTodayProps) {
  const [copiedKey, copy] = useCopied();
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [line, setLine] = useState(affirmation);

  const pickMood = async (key: MoodKey) => {
    const next = await randomMoodEntry(key, line);
    if (!next) return;
    setMood(key);
    setLine(next.affirmation);
  };

  const reset = () => {
    setMood(null);
    setLine(affirmation);
  };

  const activeLabel = mood ? moodList.find((m) => m.key === mood)?.label : null;

  return (
    <div className="today-card today-card-live">
      <span className="today-eyebrow eyebrow">
        {activeLabel ? `${activeLabel} · random` : `Today · ${dateLabel}`}
      </span>
      <p className="today-affirmation" key={line}>{line}</p>

      <div className="hub-moods">
        <span className="hub-moods-label meta">Pick a mood for a random line</span>
        <div className="mood-chips mood-chips-left" role="group" aria-label="Pick a mood">
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
      </div>

      <div className="today-card-actions">
        <CopyButton onClick={() => copy(line, "today")} copied={copiedKey === "today"} label="Copy this" />
        <Link className="today-open" href={`/daily/${todaySlug}`}>
          Open the daily reader <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
