import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { BlogPostCard } from "@/components/BlogPostCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affirmations Blog',
  description:
    'Browse our full library of daily affirmations for confidence, anxiety, money, love, sleep, work and more. Find the words to elevate your mind.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  const posts = getAllPosts().map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || 'No excerpt available.',
    formattedDate: format(new Date(post.createdTime), 'MMMM d, yyyy'),
    readingTime: `${post.readingTime} min read`,
    tags: post.tags,
    author: post.author,
    featuredImage: post.featuredImage,
  }));

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Affirmations</h1>
        <div className="text-center text-muted-foreground">No posts found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Affirmations
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          All our latest affirmations.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogPostCard key={post.id} post={post} priority={i < 3} />
          ))}
        </div>
      </main>
    </div>
  );
}
