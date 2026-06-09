import { getAllPosts } from "@/lib/posts";
import { buildSearchIndex } from "@/lib/search";
import { SearchResults } from "@/components/SearchResults";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Affirmations",
  description:
    "Search the full Aurasyncs library of affirmations by topic, title, or the words inside each collection.",
  alternates: { canonical: "/search" },
  // Search results are thin/duplicative — keep them out of the index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  const index = buildSearchIndex(getAllPosts());

  return (
    <>
      <section className="hero hero-compact">
        <span className="eyebrow">The library</span>
        <h1 className="hero-quote">Find your words.</h1>
      </section>

      <div className="search-page">
        <Suspense fallback={<p className="search-status">Loading search…</p>}>
          <SearchResults index={index} />
        </Suspense>
      </div>

      <div style={{ height: "4rem" }} />
    </>
  );
}
