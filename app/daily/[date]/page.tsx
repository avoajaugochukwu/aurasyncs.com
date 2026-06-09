import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDayBySlug, allDailySlugs, DISPLAY_TOTAL, getMoods, MOODS } from "@/lib/daily";
import { getAllPosts } from "@/lib/posts";
import { clusterFor, CLUSTERS } from "@/lib/clusters";
import { DailyReader } from "@/components/daily/DailyReader";
import { authorHref } from "@/lib/authors";
import { baseUrl } from "@/app/metadata";

export const dynamicParams = false;

type DailyDatePageProps = { params: Promise<{ date: string }> };

export function generateStaticParams() {
  return allDailySlugs().map((date) => ({ date }));
}

export async function generateMetadata({ params }: DailyDatePageProps): Promise<Metadata> {
  const { date } = await params;
  const day = getDayBySlug(date);
  if (!day) return {};
  const url = `${baseUrl}/daily/${day.slug}`;
  const title = `Daily Affirmation for ${day.monthName} ${day.day} — ${day.theme}`;
  const description =
    `"${day.affirmation}" A daily affirmation for ${day.monthName} ${day.day}, with a short reflection to sit with.`.slice(
      0,
      158
    );
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function DailyDatePage({ params }: DailyDatePageProps) {
  const { date } = await params;
  const day = getDayBySlug(date);
  if (!day) notFound();

  const url = `${baseUrl}/daily/${day.slug}`;

  // Cross-link into the existing topical cluster graph (two-way internal links).
  const related = getAllPosts().find((p) => clusterFor(p.slug).id === day.cluster);
  const clusterLabel = CLUSTERS.find((c) => c.id === day.cluster)?.label;

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Daily Affirmation for ${day.monthName} ${day.day}`,
    text: day.affirmation,
    abstract: day.reflection,
    inLanguage: "en",
    url,
    isPartOf: { "@type": "CreativeWorkSeries", name: "Daily Affirmations", url: `${baseUrl}/daily` },
    citation: `${day.source.thinker}, ${day.source.work}`,
    keywords: [
      "daily affirmation",
      `${day.monthName.toLowerCase()} ${day.day} affirmation`,
      "affirmation of the day",
      day.theme.toLowerCase(),
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Daily Affirmations", item: `${baseUrl}/daily` },
      { "@type": "ListItem", position: 3, name: `${day.monthName} ${day.day}`, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <DailyReader
        affirmation={day.affirmation}
        dateLabel={`${day.monthName} ${day.day}`}
        position={day.displayPosition}
        total={DISPLAY_TOTAL}
        prevHref={`/daily/${day.prevSlug}`}
        nextHref={`/daily/${day.nextSlug}`}
        moods={getMoods()}
        moodList={MOODS}
      />

      <article className="daily-prose">
        <div className="section-label">
          <span className="eyebrow">{day.monthName} {day.day} · Reflection</span>
          <span className="rule" />
        </div>
        <p className="daily-reflection">{day.reflection}</p>

        {day.practice && (
          <aside className="prompt">
            <span className="prompt-label">Carry it today</span>
            <p className="prompt-text">{day.practice}</p>
          </aside>
        )}

        <p className="daily-source meta">
          Inspired by the old idea of <em>{day.source.idea}</em>. Written by{" "}
          <Link href={authorHref("Ugo Charles")}>Ugo Charles</Link>.
        </p>

        {related && clusterLabel && (
          <div className="related" style={{ marginTop: "2.5rem" }}>
            <span className="eyebrow">Keep reading</span>
            <h2 className="related-head">More on {clusterLabel.toLowerCase()}</h2>
            <div className="related-grid">
              <Link className="related-card" href={`/blog/${related.slug}`}>
                <span className="related-title">{related.title}</span>
                <span className="related-note">{related.excerpt || related.metaDescription}</span>
                <span className="related-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}

        <div className="daily-nav">
          <Link href={`/daily/${day.prevSlug}`}>← Previous day</Link>
          <Link href="/daily">All days</Link>
          <Link href={`/daily/${day.nextSlug}`}>Next day →</Link>
        </div>
      </article>
      <div style={{ height: "3rem" }} />
    </>
  );
}
