import type { Metadata } from 'next';
import { PrintButton } from '../affirmation-cards/PrintButton';
import { SETS } from '../affirmation-sets';
import styles from './coloring.module.css';

// Raw coloring sheets (noindex); handed out as a PDF from the /printables landing.
export const metadata: Metadata = {
  title: 'Printable Affirmation Coloring Cards',
  robots: { index: false, follow: false },
};

export default function AffirmationColoringPrintable() {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <h1>Affirmation Cards to Color</h1>
        <p>
          Print on US Letter, color the outlined words and frames, then cut along the edges.
          Four sets below.
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
