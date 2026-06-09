import { getAllPosts } from '@/lib/posts';
import { groupByCluster } from '@/lib/clusters';
import { format } from 'date-fns';
import { BlogPostCard } from "@/components/BlogPostCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affirmations Blog',
  description:
    'Browse our full library of daily affirmations for confidence, anxiety, money, love, sleep, work and more — organized by topic to help you find the words to elevate your mind.',
  alternates: { canonical: '/blog' },
};

function toCard(post: ReturnType<typeof getAllPosts>[number], i: number) {
  return {
    card: {
      id: post.slug,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || 'No excerpt available.',
      formattedDate: format(new Date(post.createdTime), 'MMMM d, yyyy'),
      readingTime: `${post.readingTime} min read`,
      tags: post.tags,
      author: post.author,
      featuredImage: post.featuredImage,
    },
    priority: i < 3,
  };
}

export default function BlogIndex() {
  const all = getAllPosts();

  if (all.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Affirmations</h1>
        <div className="text-center text-muted-foreground">No posts found.</div>
      </div>
    );
  }

  const groups = groupByCluster(all);
  let cardIndex = 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Affirmations for Every Part of Life
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Daily affirmations are short, positive statements you repeat to reframe your mindset,
          build confidence, and stay grounded. Our library is organized by topic — from self-love
          and money to anxiety, work, sleep, and faith — so you can find the right words for
          exactly what you&apos;re facing today.
        </p>
      </header>

      {/* Browse by topic — internal links to each cluster section */}
      <nav aria-label="Browse by topic" className="mb-12 flex flex-wrap justify-center gap-2">
        {groups.map(({ cluster }) => (
          <a
            key={cluster.id}
            href={`#${cluster.id}`}
            className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {cluster.label}
          </a>
        ))}
      </nav>

      <main className="space-y-16">
        {groups.map(({ cluster, posts }) => (
          <section key={cluster.id} id={cluster.id} className="scroll-mt-20">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">{cluster.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const { card, priority } = toCard(post, cardIndex++);
                return <BlogPostCard key={card.id} post={card} priority={priority} />;
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
