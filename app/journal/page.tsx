import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllJournalPosts, JOURNAL_HUB_SLUG } from '@/lib/journal';
import { baseUrl } from '@/app/metadata';

export const metadata: Metadata = {
  title: 'Journaling Prompts & Guides',
  description:
    'A growing library of journaling prompts and guides — for anxiety, gratitude, manifestation, shadow work, teens, and self-love. Find the right questions for the blank page.',
  alternates: { canonical: '/journal' },
};

// H1 shows the part before the colon (shared title rule); the rest frames the card.
function displayTitle(title: string): string {
  return title.includes(':') ? title.slice(0, title.indexOf(':')).trim() : title;
}

export default function JournalIndex() {
  const all = getAllJournalPosts();
  const hub = all.find((p) => p.slug === JOURNAL_HUB_SLUG);
  const spokes = all.filter((p) => p.slug !== JOURNAL_HUB_SLUG);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${baseUrl}/journal` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="hero">
        <span className="eyebrow">The journal</span>
        <h1 className="hero-quote">Prompts for the blank page.</h1>
        <p className="hero-sub">
          The hardest part of journaling is knowing what to write. These guides hand you the
          questions — grouped by what you need, from a racing mind to gratitude, manifestation,
          shadow work, and being kinder to yourself.
        </p>
      </section>

      {hub && (
        <section style={{ scrollMarginTop: '2rem' }}>
          <div className="section-label" style={{ marginTop: '2.5rem' }}>
            <span className="eyebrow">Start here</span>
            <span className="rule" />
          </div>
          <div className="list">
            <Link className="entry" href={`/journal/${hub.slug}`}>
              <span className="when">The library</span>
              <div className="entry-body">
                <h2>{displayTitle(hub.title)}</h2>
                <p>{hub.excerpt || hub.metaDescription}</p>
              </div>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      <section style={{ scrollMarginTop: '2rem' }}>
        <div className="section-label" style={{ marginTop: '2.5rem' }}>
          <span className="eyebrow">By theme</span>
          <span className="rule" />
        </div>
        <div className="list">
          {spokes.map((post) => (
            <Link key={post.slug} className="entry" href={`/journal/${post.slug}`}>
              <span className="when">{`${post.readingTime} min`}</span>
              <div className="entry-body">
                <h2>{displayTitle(post.title)}</h2>
                <p>{post.excerpt || post.metaDescription}</p>
              </div>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ height: '4rem' }} />
    </>
  );
}
