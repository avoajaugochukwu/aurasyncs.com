import type { Metadata } from 'next';
import styles from './pin.module.css';

// Source for the Pinterest pin image (noindex). Screenshotted to a PNG by
// scripts/gen-printables.mjs at 1000x1500.
export const metadata: Metadata = {
  title: 'Affirmation Cards — Pin',
  robots: { index: false, follow: false },
};

const PREVIEW = [
  'I am enough, exactly as I am.',
  'I am safe in this moment.',
  'Today is a fresh start.',
];

export default function AffirmationCardsPin() {
  return (
    <div className={styles.pin}>
      <span className={styles.eyebrow}>Free Printable</span>
      <span className={styles.dot} aria-hidden="true" />
      <h1 className={styles.title}>Affirmation Cards</h1>
      <p className={styles.sub}>24 cards to print, cut out, and keep where you’ll see them.</p>

      <div className={styles.cards}>
        {PREVIEW.map((t) => (
          <div className={styles.card} key={t}>
            {t}
          </div>
        ))}
      </div>

      <div className={styles.foot}>
        <span className={styles.free}>Free PDF — no email needed</span>
        <span className={styles.brand}>aurasyncs.com</span>
      </div>
    </div>
  );
}
