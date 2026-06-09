/**
 * Reader-shaped loading placeholder.
 *
 * Mirrors the Scroll reader (`.reader` → `.reader-scroll` → `.article-head` → bands)
 * so the loading state feels like the warm editorial design rather than a card skeleton.
 * Every surface comes from a token (`var(--surface)`) so Sand and Dusk both work;
 * the gentle pulse uses a scoped opacity keyframe that is suppressed under
 * `prefers-reduced-motion: reduce`.
 */

const shimmer: React.CSSProperties = {
  background: "var(--surface)",
  borderRadius: "5px",
};

const pulseStyles = `
  @keyframes blogSkeletonPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
  .blog-skeleton-block { animation: blogSkeletonPulse 1.8s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .blog-skeleton-block { animation: none; opacity: 0.75; }
  }
`;

function Block({
  width,
  height,
  style,
}: {
  width: string;
  height: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className="blog-skeleton-block"
      style={{ ...shimmer, display: "block", width, height, ...style }}
    />
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="reader reader-mode-scroll" aria-busy="true" aria-label="Loading article">
      <style>{pulseStyles}</style>
      <div className="reader-scroll">
        <div
          className="article-head"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* eyebrow */}
          <Block width="7rem" height="0.85rem" style={{ marginBottom: "1.1rem" }} />
          {/* title — two centered serif-sized rows */}
          <Block width="min(100%, 30rem)" height="2.6rem" style={{ marginBottom: "0.6rem" }} />
          <Block width="min(80%, 22rem)" height="2.6rem" />
          {/* subtitle */}
          <Block width="min(90%, 26rem)" height="1.3rem" style={{ marginTop: "1.1rem" }} />
          {/* meta line */}
          <Block width="16rem" height="0.95rem" style={{ marginTop: "1.6rem" }} />
        </div>

        {/* affirmation-band-height shimmer rows */}
        <div style={{ marginTop: "2.5rem" }}>
          {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
            <div
              key={i}
              style={{
                padding: "2.2rem 0",
                borderTop: i === 0 ? "none" : "1px solid var(--line-soft)",
              }}
            >
              <Block
                width={`${Math.round(w * 100)}%`}
                height="2rem"
                style={{ margin: "0 auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
