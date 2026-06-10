import type { Metadata } from 'next';
import { PrintButton } from './PrintButton';
import { SETS } from '../affirmation-sets';
import styles from './cards.module.css';

// The raw printable sheets. This is the artifact the landing page hands out as a
// PDF; it is intentionally noindex (the /printables landing is the indexed page).
export const metadata: Metadata = {
  title: 'Printable Affirmation Cards',
  robots: { index: false, follow: false },
};

export default function AffirmationCardsPrintable() {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>Free Printable Affirmation Cards</h1>
        <p>
          Print on US Letter, cut along the dashed lines, and keep them where you’ll see them —
          a mirror, a desk, a dashboard. Four sets below.
        </p>
        <PrintButton />
      </div>

      {SETS.map((set) => (
        <section className={styles.sheet} key={set.eyebrow}>
          <header className={styles.sheetHead}>
            <span className={styles.eyebrow}>{set.eyebrow}</span>
            <span className={styles.brand}>aurasyncs.com</span>
          </header>
          <div className={styles.grid}>
            {set.cards.map((text) => (
              <article className={styles.card} key={text}>
                <span className={styles.dot} aria-hidden="true" />
                <p className={styles.aff}>{text}</p>
                <span className={styles.mark}>aurasyncs.com</span>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
