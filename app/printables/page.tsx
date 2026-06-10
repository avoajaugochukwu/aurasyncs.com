import type { Metadata } from 'next';
import Link from 'next/link';
import { SETS } from './affirmation-sets';
import { baseUrl } from '@/app/metadata';
import styles from './printables.module.css';

export const metadata: Metadata = {
  title: 'Free Printable Affirmation Cards (PDF)',
  description:
    'Download free printable affirmation cards as a PDF — 24 cards in four sets (self-love, gratitude, calm, morning). Print on US Letter, cut out, and keep them close. No email required.',
  alternates: { canonical: '/printables' },
};

const PDF = '/printables/affirmation-cards.pdf';
const COLORING_PDF = '/printables/affirmation-cards-coloring.pdf';

// A few cards rendered live as a preview of what's in the PDF.
const PREVIEW = [
  'I am enough, exactly as I am.',
  'I am safe in this moment.',
  'Today is a fresh start.',
  'I have enough, and I am enough.',
  'I let go of what I cannot control.',
  'I am worthy of love, including my own.',
];

const FAQ = [
  {
    q: 'Are these affirmation cards really free?',
    a: 'Yes — the PDF is a free download with no email required. Print it on regular US Letter paper, cut the cards out along the dashed lines, and keep them wherever you’ll see them.',
  },
  {
    q: 'How do I print the affirmation cards?',
    a: 'Download the PDF and print it at home on US Letter paper (cardstock holds up better, but regular paper is fine). Each page holds six cards on a 2×3 grid with dashed cut lines. There’s also a color-in version if you’d like to decorate them yourself.',
  },
  {
    q: 'What affirmations are included?',
    a: 'Twenty-four cards across four sets — self-love, gratitude, calm, and morning — each written in the present tense and kept believable rather than over-the-top, so they’re easy to actually repeat.',
  },
  {
    q: 'How should I use affirmation cards?',
    a: 'Prop one on your mirror, desk, or dashboard, tuck a few in your journal or wallet, or pull one each morning. Reading a line aloud and pairing it with a slow breath helps it land.',
  },
];

export default function PrintablesLanding() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Printables', item: `${baseUrl}/printables` },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="hero">
        <span className="eyebrow">Free printable</span>
        <h1 className="hero-quote">Free printable affirmation cards.</h1>
        <p className="hero-sub">
          Twenty-four warm, believable affirmation cards in four sets — self-love, gratitude,
          calm, and morning. Print them on US Letter, cut along the dashed lines, and keep them
          where you’ll see them. No email required.
        </p>
      </section>

      <div className={styles.cta}>
        <div className={styles.btnRow}>
          <a className={styles.primaryBtn} href={PDF} download>
            Download the free PDF
          </a>
          <a className={styles.secondaryLink} href={COLORING_PDF} download>
            Color-in version (PDF)
          </a>
          <Link className={styles.secondaryLink} href="/printables/affirmation-cards">
            Print from your browser
          </Link>
        </div>
        <p className={styles.note}>PDF · US Letter · 4 pages · no sign-up</p>
      </div>

      <div className={styles.preview} aria-label="A preview of the cards">
        {PREVIEW.map((t) => (
          <div className={styles.pcard} key={t}>
            <span className={styles.pdot} aria-hidden="true" />
            <p className={styles.paff}>{t}</p>
            <span className={styles.pmark}>aurasyncs.com</span>
          </div>
        ))}
      </div>

      {SETS.map((set) => (
        <section key={set.eyebrow} style={{ scrollMarginTop: '2rem' }}>
          <div className="section-label" style={{ marginTop: '2.5rem' }}>
            <span className="eyebrow">{set.eyebrow}</span>
            <span className="rule" />
          </div>
          <ul className={styles.setList}>
            {set.cards.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      ))}

      <div className="section-label" style={{ marginTop: '2.5rem' }}>
        <span className="eyebrow">Keep going</span>
        <span className="rule" />
      </div>
      <div className="list">
        <Link className="entry" href="/journal/journal-prompts">
          <span className="when">Journal</span>
          <div className="entry-body">
            <h2>Journal Prompts</h2>
            <p>80+ prompts to fill the blank page — pair them with your cards.</p>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link className="entry" href="/journal/self-love-journal-prompts">
          <span className="when">Journal</span>
          <div className="entry-body">
            <h2>Self-Love Journal Prompts</h2>
            <p>40 prompts to build worth and be on your own side.</p>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link className="entry" href="/blog/self-love-affirmations-confidence-worth">
          <span className="when">Affirmations</span>
          <div className="entry-body">
            <h2>Self-Love Affirmations</h2>
            <p>More affirmations to read, save, and repeat.</p>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>

      <section className="faq faq-standalone" aria-label="Frequently asked questions">
        <h2 className="faq-head">Questions, gently answered</h2>
        <div className="faq-list">
          {FAQ.map((item) => (
            <div className="faq-item" key={item.q}>
              <h3 className="faq-q">{item.q}</h3>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: '4rem' }} />
    </>
  );
}
