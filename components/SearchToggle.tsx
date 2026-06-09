"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchDocs, type SearchDoc } from "@/lib/search";

const MAX_SUGGESTIONS = 6;

/**
 * Header search as a quiet icon. Clicking it drops a search bar under the header
 * with up to {@link MAX_SUGGESTIONS} live suggestions (title + topic). Picking one
 * opens the post; Enter (or "View all") goes to the full `/search` page.
 */
export function SearchToggle({ index }: { index: SearchDoc[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const trimmed = value.trim();
  const results = useMemo(
    () => (trimmed ? searchDocs(value, index).slice(0, MAX_SUGGESTIONS) : []),
    [value, trimmed, index]
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else {
      setValue("");
      setActive(-1);
    }
  }, [open]);

  // Reset the active row whenever the result set changes.
  useEffect(() => setActive(-1), [trimmed]);

  // Close on outside click or Escape (returning focus to the toggle).
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown" && results.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp" && results.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && results[active]) go(`/blog/${results[active].slug}`);
      else if (trimmed) go(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div className="search-toggle" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="icon-btn"
        aria-label="Search"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Search size={17} aria-hidden="true" />
      </button>

      {open && (
        <div className="search-pop" role="search">
          <div className="search-pop-bar">
            <Search className="search-pop-icon" size={18} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search affirmations…"
              aria-label="Search affirmations"
              autoComplete="off"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="search-pop-list"
            />
            <button
              type="button"
              className="search-pop-close"
              aria-label="Close search"
              onClick={() => {
                setOpen(false);
                btnRef.current?.focus();
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {trimmed && (
            <ul className="search-pop-list" id="search-pop-list" role="listbox">
              {results.length === 0 ? (
                <li className="search-pop-empty">No matches for “{trimmed}”.</li>
              ) : (
                <>
                  {results.map((r, i) => (
                    <li key={r.slug} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        className={`search-pop-item${i === active ? " is-active" : ""}`}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(`/blog/${r.slug}`)}
                      >
                        <span className="search-pop-title">{r.title}</span>
                        <span className="search-pop-type">{r.clusterLabel}</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      className="search-pop-all"
                      onClick={() => go(`/search?q=${encodeURIComponent(trimmed)}`)}
                    >
                      View all results for “{trimmed}” →
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
