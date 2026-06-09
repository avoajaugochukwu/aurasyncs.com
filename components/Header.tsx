import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchToggle } from "@/components/SearchToggle";
import { getAllPosts } from "@/lib/posts";
import { buildSearchIndex } from "@/lib/search";

export function Header() {
  // Lightweight index for the header's live suggestions: metadata only (no
  // snippets) so the payload shipped on every page stays small. The /search page
  // builds the full snippet index for deep matching.
  const index = buildSearchIndex(getAllPosts()).map((doc) => ({
    ...doc,
    snippets: [],
  }));

  return (
    <header className="site-head">
      <Link className="brand" href="/">
        <span className="mark" aria-hidden="true" />
        Aurasyncs
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <Link href="/">Home</Link>
        <Link href="/daily">Daily</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/blog">Blog</Link>
        <SearchToggle index={index} />
        <ThemeToggle />
      </nav>
    </header>
  );
}
