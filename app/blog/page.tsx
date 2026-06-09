import { getAllPosts } from "@/lib/posts";
import { groupByCluster } from "@/lib/clusters";
import { format } from "date-fns";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affirmations Blog",
  description:
    "Browse our full library of daily affirmations for confidence, anxiety, money, love, sleep, work and more — organized by topic to help you find the words to elevate your mind.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const all = getAllPosts();

  if (all.length === 0) {
    return (
      <section className="hero">
        <h1 className="hero-quote">Affirmations</h1>
        <p className="hero-sub">No collections yet.</p>
      </section>
    );
  }

  const groups = groupByCluster(all);

  return (
    <>
      <section className="hero">
        <span className="eyebrow">The library</span>
        <h1 className="hero-quote">Affirmations for every part of life.</h1>
        <p className="hero-sub">
          Short, positive lines you repeat to reframe your mindset and stay grounded —
          organized by topic, from self-love and money to anxiety, work, sleep, and
          faith.
        </p>
      </section>

      <nav className="topic-nav" aria-label="Browse by topic">
        {groups.map(({ cluster }) => (
          <a key={cluster.id} href={`#${cluster.id}`} className="topic-chip">
            {cluster.label}
          </a>
        ))}
      </nav>

      <div style={{ height: "1rem" }} />

      {groups.map(({ cluster, posts }) => (
        <section key={cluster.id} id={cluster.id} style={{ scrollMarginTop: "2rem" }}>
          <div className="section-label" style={{ marginTop: "2.5rem" }}>
            <span className="eyebrow">{cluster.label}</span>
            <span className="rule" />
          </div>
          <div className="list">
            {posts.map((post) => (
              <Link key={post.slug} className="entry" href={`/blog/${post.slug}`}>
                <span className="when">
                  {format(new Date(post.createdTime), "MMM d, yyyy")}
                </span>
                <div className="entry-body">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt || post.metaDescription}</p>
                </div>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <div style={{ height: "4rem" }} />
    </>
  );
}
