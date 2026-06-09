import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/posts';
import { getRelatedPosts } from '@/lib/clusters';
import { authorHref as getAuthorHref } from '@/lib/authors';
import { MdxContent } from '@/components/MdxContent';
import { ScrollReader, type RelatedLink } from '@/components/reader/ScrollReader';
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
  // Site rule: the visible H1 shows only the part before the colon (cleaner, shorter).
  // The keyword-rich remainder lives in the subtitle/excerpt; the full keyword title
  // stays in the <title> tag, OpenGraph, and schema below for SEO.
  const displayTitle = post.title.includes(':')
    ? post.title.slice(0, post.title.indexOf(':')).trim()
    : post.title;
  const authorLink = getAuthorHref(post.author);
  const imageAbsolute = post.featuredImage ? `${baseUrl}${post.featuredImage}` : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: imageAbsolute ? [imageAbsolute] : undefined,
    datePublished: post.createdTime,
    dateModified: post.lastEditedTime,
    author: { '@type': 'Person', name: post.author, url: `${baseUrl}${authorLink}` },
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

  const faqLd =
    post.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  const related: RelatedLink[] = getRelatedPosts(post, getAllPosts(), 3).map((p) => ({
    title: p.title,
    note: p.excerpt || p.metaDescription || '',
    href: `/blog/${p.slug}`,
  }));

  const Schema = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
    </>
  );

  const BackLink = (
    <nav className="back-link">
      <Link href="/blog">
        <span aria-hidden="true">←</span> All affirmations
      </Link>
    </nav>
  );

  // --- Structured Scroll reader (posts with `reader:` frontmatter) ---
  if (post.reader) {
    return (
      <article>
        {Schema}
        {BackLink}
        <ScrollReader
          reader={post.reader}
          title={displayTitle}
          author={post.author}
          authorHref={authorLink}
          date={formattedDate}
          readingTime={readingTime}
          faq={post.faq}
          related={related}
        />
      </article>
    );
  }

  // --- Styled-prose fallback (existing MDX posts) ---
  return (
    <article>
      {Schema}
      {BackLink}
      <div className="reader-scroll">
        <header className="article-head">
          <span className="eyebrow">Affirmations</span>
          <h1 className="article-title">{displayTitle}</h1>
          {post.excerpt && <p className="article-sub">{post.excerpt}</p>}
          <div className="article-meta meta">
            <Link href={authorLink}>{post.author}</Link>
            <span className="dot">·</span>
            <span>{formattedDate}</span>
            <span className="dot">·</span>
            <span>{readingTime}</span>
          </div>
        </header>

        <div className="prose-reader">
          <MdxContent source={post.content} />
        </div>

        {post.faq.length > 0 && (
          <section className="faq" aria-label="Frequently asked questions">
            <h2 className="faq-head">Questions, gently answered</h2>
            <div className="faq-list">
              {post.faq.map((item) => (
                <div className="faq-item" key={item.q}>
                  <h3 className="faq-q">{item.q}</h3>
                  <p className="faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="related">
            <span className="eyebrow">Keep reading</span>
            <h2 className="related-head">More gentle collections</h2>
            <div className="related-grid">
              {related.map((r) => (
                <Link className="related-card" href={r.href} key={r.href}>
                  <span className="related-title">{r.title}</span>
                  <span className="related-note">{r.note}</span>
                  <span className="related-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
