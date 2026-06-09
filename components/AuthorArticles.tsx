"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

export type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  createdTime: string;
};

const PER_PAGE = 10;

export function AuthorArticles({ posts }: { posts: ArticleItem[] }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const visible = posts.slice(start, start + PER_PAGE);

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(1, next), pageCount));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="list">
        {visible.map((post) => (
          <Link key={post.slug} className="entry" href={`/blog/${post.slug}`}>
            <span className="when">
              {format(new Date(post.createdTime), "MMM d, yyyy")}
            </span>
            <div className="entry-body">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <nav className="pagination" aria-label="Article pages">
          <button
            type="button"
            className="page-btn"
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
          >
            ←
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={"page-btn" + (n === current ? " is-current" : "")}
              onClick={() => goTo(n)}
              aria-label={`Page ${n}`}
              aria-current={n === current ? "page" : undefined}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            className="page-btn"
            onClick={() => goTo(current + 1)}
            disabled={current === pageCount}
            aria-label="Next page"
          >
            →
          </button>
        </nav>
      )}
    </>
  );
}
