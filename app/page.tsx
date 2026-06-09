import { getAllPosts } from "@/lib/posts";
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPostCard } from "@/components/BlogPostCard";

export default function Home() {
  const posts = getAllPosts()
    .slice(0, 6)
    .map((post) => ({
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || 'No excerpt available.',
      formattedDate: format(new Date(post.createdTime), 'MMM d, yyyy'),
      featuredImage: post.featuredImage,
      author: post.author,
      readingTime: `${post.readingTime} min read`,
      tags: post.tags,
    }));

  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
      <section className="text-center mb-20 md:mb-24 lg:mb-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
              Daily Affirmations to Elevate Your Mind
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8">
            Empower your life with daily affirmations to elevate your mind, boost confidence, and manifest positivity.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10 md:mb-12">
          Latest Affirmations
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, i) => (
              <BlogPostCard key={post.id} post={post} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mb-12">No recent posts found.</div>
        )}
        <div className="text-center">
          <Link href="/blog" className="text-primary hover:underline font-medium">
            View all affirmations &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
