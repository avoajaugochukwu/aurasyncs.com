import Link from 'next/link';
import type { Post } from '@/lib/posts';

export function RelatedPosts({ posts, heading = 'Related affirmations' }: { posts: Post[]; heading?: string }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 border-t pt-8" aria-label={heading}>
      <h2 className="text-2xl font-bold mb-6">{heading}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block rounded-lg border p-4 transition-colors hover:border-primary hover:bg-muted/40"
            >
              <span className="font-medium group-hover:text-primary">{p.title}</span>
              {p.excerpt && (
                <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{p.excerpt}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
