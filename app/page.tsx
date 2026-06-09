import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <>
      <section className="hero">
        <span className="eyebrow">Daily affirmations</span>
        <h1 className="hero-quote">
          A quiet word, read slowly, can{" "}
          <span className="soft">change the whole day.</span>
        </h1>
        <p className="hero-sub">
          Aurasyncs is a calm place to read affirmations — one standalone line at a
          time. No noise, no rush. Just words to elevate your mind.
        </p>
        <div className="hero-breath" aria-hidden="true" />
      </section>

      <section className="intro-band">
        <p className="lead">
          Most affirmation sites bury you in a wall of quotes. We give each one room
          to land.
        </p>
        <p>
          Every line here is meant to be read on its own — slowly, with space around
          it — so a single sentence has a chance to actually reach you. Some are
          timeless; many are written here and credited to the people who wrote them.
          Read them however suits the moment, and copy any that resonate to keep
          close.
        </p>
      </section>

      <div className="section-label">
        <span className="eyebrow">Latest collections</span>
        <span className="rule" />
      </div>

      <div className="list">
        {posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <p className="meta" style={{ padding: "2rem 0" }}>
            No collections yet.
          </p>
        )}
      </div>

      <div className="section-label" style={{ marginTop: "2.5rem" }}>
        <span className="rule" />
        <Link href="/blog" className="eyebrow" style={{ textDecoration: "none" }}>
          View all affirmations →
        </Link>
        <span className="rule" />
      </div>
      <div style={{ height: "3rem" }} />
    </>
  );
}
