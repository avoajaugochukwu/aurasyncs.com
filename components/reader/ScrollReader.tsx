"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CopyButton, useCopied } from "@/components/reader/CopyButton";
import type { FaqItem, Reader } from "@/lib/posts";

export type RelatedLink = { title: string; note: string; href: string };

type ScrollReaderProps = {
  reader: Reader;
  title: string;
  author: string;
  authorHref: string;
  date: string;
  readingTime: string;
  faq: FaqItem[];
  related: RelatedLink[];
};

/** Reveal-on-scroll for `.reveal` elements; survives nothing fancy — just adds `.in`. */
function useReveal(scope: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope]);
}

export function ScrollReader({
  reader,
  title,
  author,
  authorHref,
  date,
  readingTime,
  faq,
  related,
}: ScrollReaderProps) {
  const [copiedKey, copy] = useCopied();
  const scope = useRef<HTMLDivElement | null>(null);
  useReveal(scope);

  return (
    <div className="reader reader-mode-scroll" ref={scope}>
      <div className="reader-scroll">
        <header className="article-head">
          <span className="eyebrow">{reader.tag}</span>
          <h1 className="article-title">{title}</h1>
          {reader.subtitle && <p className="article-sub">{reader.subtitle}</p>}
          <div className="article-meta meta">
            <Link href={authorHref}>{author}</Link>
            <span className="dot">·</span>
            <span>{date}</span>
            <span className="dot">·</span>
            <span>{readingTime}</span>
          </div>
        </header>

        {reader.opening && (
          <div className="opening reveal">
            <p className="opening-quote">{reader.opening.quote}</p>
            {reader.opening.note && <p className="opening-note">{reader.opening.note}</p>}
          </div>
        )}

        {reader.intro.length > 0 && (
          <div className="article-intro reveal">
            {reader.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {reader.sections.map((s) => (
          <section className="sec" key={s.id} id={s.id}>
            <div className="sec-head reveal">
              {s.keyword && <span className="eyebrow">{s.keyword}</span>}
              <h2 className="sec-title">{s.title}</h2>
              {s.intro && <p className="sec-intro">{s.intro}</p>}
              {s.body.length > 0 && (
                <div className="sec-body">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {s.whenToUse && (
                <p className="when-note">
                  <span className="when-label">When</span>
                  {s.whenToUse}
                </p>
              )}
            </div>

            <div className="qlist">
              {s.quotes.map((q, i) => {
                const key = `${s.id}-${i}`;
                return (
                  <figure className="qband reveal" key={key}>
                    <blockquote className="qband-text">{q.text}</blockquote>
                    <figcaption className="qband-foot">
                      {q.author ? (
                        <span className="qband-author">— {q.author}</span>
                      ) : (
                        <span />
                      )}
                      <CopyButton onClick={() => copy(q.text, key)} copied={copiedKey === key} />
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            {s.prompt && (
              <aside className="prompt reveal">
                <span className="prompt-label">Reflection</span>
                <p className="prompt-text">{s.prompt}</p>
              </aside>
            )}
          </section>
        ))}

        {related.length > 0 && (
          <section className="related reveal">
            <span className="eyebrow">Keep reading</span>
            <h2 className="related-head">More gentle collections</h2>
            <div className="related-grid">
              {related.map((r) => (
                <Link className="related-card" href={r.href} key={r.href}>
                  <span className="related-title">{r.title}</span>
                  <span className="related-note">{r.note}</span>
                  <span className="related-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {faq.length > 0 && (
          <section className="faq reveal" aria-label="Frequently asked questions">
            <h2 className="faq-head">Questions, gently answered</h2>
            <div className="faq-list">
              {faq.map((f) => (
                <div className="faq-item" key={f.q}>
                  <h3 className="faq-q">{f.q}</h3>
                  <p className="faq-a">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
