"use client";

import { searchDocs, queryTerms, type SearchDoc } from "@/lib/search";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

/** Wrap query-term occurrences in <mark> for the warm highlight. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "ig"
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        pattern.test(part) && part ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SearchResults({ index }: { index: SearchDoc[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [value, setValue] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep ?q in the URL in sync (shareable), debounced so we don't spam history.
  useEffect(() => {
    const id = setTimeout(() => {
      const q = value.trim();
      const next = q ? `/search?q=${encodeURIComponent(q)}` : "/search";
      router.replace(next, { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [value, router]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const terms = useMemo(() => queryTerms(value), [value]);
  const results = useMemo(() => searchDocs(value, index), [value, index]);
  const trimmed = value.trim();

  return (
    <>
      <form
        className="search-field"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="search-field-icon" size={20} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search affirmations, topics, words…"
          aria-label="Search affirmations"
          autoComplete="off"
        />
      </form>

      {trimmed === "" ? (
        <p className="search-status">
          Search {index.length} collections by topic, title, or the words inside.
        </p>
      ) : results.length === 0 ? (
        <p className="search-status">
          No collections match “{trimmed}”. Try a broader word like “calm”,
          “money”, or “morning”.
        </p>
      ) : (
        <>
          <p className="search-status">
            {results.length} {results.length === 1 ? "result" : "results"} for “
            {trimmed}”
          </p>
          <div className="list">
            {results.map((r) => (
              <Link key={r.slug} className="entry" href={`/blog/${r.slug}`}>
                <span className="when">{r.clusterLabel}</span>
                <div className="entry-body">
                  <h2>
                    <Highlight text={r.title} terms={terms} />
                  </h2>
                  <p>
                    <Highlight text={r.snippet} terms={terms} />
                  </p>
                  <span className="search-date">
                    {format(new Date(r.date), "MMM d, yyyy")}
                  </span>
                </div>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
