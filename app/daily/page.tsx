import Link from "next/link";
import type { Metadata } from "next";
import { getToday, monthIndex, DISPLAY_TOTAL } from "@/lib/daily";
import { MonthIndex } from "@/components/daily/MonthIndex";
import { baseUrl } from "@/app/metadata";

// The featured "today" card rotates daily; refresh the static shell hourly.
export const revalidate = 3600;

const FAQ = [
  {
    q: "What are daily affirmations?",
    a: "Daily affirmations are short, present-tense lines you read and repeat to steady your mindset for the day. Ours pair one affirmation with a brief reflection, so the line has something to stand on.",
  },
  {
    q: "How do I use this every day?",
    a: "Open today's date and read the affirmation slowly, once or twice. Sit with the short reflection, then carry the one-line practice into your day. Use the arrows or ← → keys to move to any other day.",
  },
  {
    q: "Where do these affirmations come from?",
    a: "Each one is written fresh and quietly inspired by timeless ideas about what's in your control — turned into a plain, present-tense line you can actually say to yourself today.",
  },
  {
    q: "Is there an affirmation for every day of the year?",
    a: "Yes — one for all 365 days, plus a bonus affirmation for February 29. Each date keeps the same affirmation year to year, so you can return to it like a page in a daily book.",
  },
];

export const metadata: Metadata = {
  title: "Daily Affirmations — A New Line for Every Day of the Year",
  description:
    "A daily affirmation for every day of the year. Read today's line and reflection, or browse all 365 days.",
  alternates: { canonical: "/daily" },
  openGraph: {
    title: "Daily Affirmations — A New Line for Every Day",
    description:
      "A daily affirmation for every day of the year. Read today's line and reflection, or browse all 365 days.",
    url: `${baseUrl}/daily`,
    type: "website",
  },
};

export default function DailyHub() {
  const today = getToday();
  const months = monthIndex();
  const total = DISPLAY_TOTAL;

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Daily Affirmations",
    description:
      "A daily affirmation for every day of the year, each paired with a short reflection.",
    url: `${baseUrl}/daily`,
    isPartOf: { "@type": "WebSite", name: "Aurasyncs", url: baseUrl },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="hero hero-compact">
        <span className="eyebrow">Daily Affirmations</span>
        <h1 className="hero-quote">
          A daily affirmation for <span className="soft">every day of the year.</span>
        </h1>
        <p className="hero-sub">
          One short line a day, with a brief reflection to give it ground —
          today&apos;s is below, and all {total} days are a tap away.
        </p>
      </section>

      <Link className="today-card" href={`/daily/${today.slug}`}>
        <span className="today-eyebrow eyebrow">Today · {today.monthName} {today.day}</span>
        <p className="today-affirmation">{today.affirmation}</p>
        <span className="today-foot meta">
          {today.theme} <span className="arrow" aria-hidden="true">→</span>
        </span>
      </Link>

      <section className="daily-about">
        <p>
          A <strong>daily affirmation</strong> is a short, present-tense line you read and repeat to
          steady your mindset for the day. Ours are written in plain words you can actually say to
          yourself — quietly inspired by old ideas about what&apos;s in your control — each paired with
          a brief reflection so the line has something to stand on. No magic spells, no forced positivity.
        </p>
      </section>

      <div className="section-label" style={{ marginTop: "2.5rem" }}>
        <span className="eyebrow">Browse all {total} days</span>
        <span className="rule" />
      </div>
      <MonthIndex months={months} />

      <section className="faq" aria-label="Frequently asked questions" style={{ marginTop: "3rem" }}>
        <h2 className="faq-head">Questions, gently answered</h2>
        <div className="faq-list">
          {FAQ.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3 className="faq-q">{f.q}</h3>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <div style={{ height: "4rem" }} />
    </>
  );
}
