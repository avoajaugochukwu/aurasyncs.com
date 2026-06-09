import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { MdxContent } from '@/components/MdxContent';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { baseUrl } from '@/app/metadata';
import type { Metadata } from 'next';

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

// The full set of posts is known at build time, so any other slug is a true 404
// (not a soft-404 with a 200 status).
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/**
 * Generate metadata for the blog post
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `${baseUrl}/blog/${slug}`;
  const description = post.metaDescription || post.excerpt;
  const images = post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 800, alt: post.title }]
    : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'x-default': url,
      },
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime: post.createdTime,
      modifiedTime: post.lastEditedTime,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${baseUrl}/blog/${slug}`;
  const formattedDate = format(new Date(post.createdTime), 'MMMM d, yyyy');
  const readingTime = `${post.readingTime} min read`;
  const imageAbsolute = post.featuredImage ? `${baseUrl}${post.featuredImage}` : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: imageAbsolute ? [imageAbsolute] : undefined,
    datePublished: post.createdTime,
    dateModified: post.lastEditedTime,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Aurasyncs.com',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Affirmations', item: `${baseUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary">Affirmations</Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
        <div className="text-muted-foreground text-sm mb-4">
          <span>{formattedDate}</span> · <span>{readingTime}</span> · <span>By {post.author}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </header>

      <MdxContent source={post.content} />
    </article>
  );
}
