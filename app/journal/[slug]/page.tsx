import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';
import {
  getAllJournalSlugs,
  getJournalPostBySlug,
  getAllJournalPosts,
  AFFIRMATION_SIBLING,
  JOURNAL_HUB_SLUG,
  isJournalHub,
} from '@/lib/journal';
import { authorHref as getAuthorHref } from '@/lib/authors';
import { ScrollReader, type RelatedLink } from '@/components/reader/ScrollReader';
import { format } from 'date-fns';
import { baseUrl } from '@/app/metadata';
import type { Metadata } from 'next';

type JournalPageProps = {
  params: Promise<{ slug: string }>;
};

// Every journal slug is known at build time, so any other slug is a true 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};

  const url = `${baseUrl}/journal/${slug}`;
  const description = post.metaDescription || post.excerpt;
  const images = post.featuredImage
    ? [{ url: post.featuredImage, width: 1200, height: 800, alt: post.title }]
    : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'x-default': url },
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

/**
 * Build the related cards. Spokes link UP to the hub and ACROSS to their matching
 * affirmations post (in the blog); the hub links DOWN to its first few spokes.
 */
function journalRelated(slug: string): RelatedLink[] {
  const links: RelatedLink[] = [];
  const seen = new Set<string>([`/journal/${slug}`]);

  const pushJournal = (s: string) => {
    const href = `/journal/${s}`;
    const p = getJournalPostBySlug(s);
    if (p && !seen.has(href)) {
      seen.add(href);
      links.push({ title: p.title, note: p.excerpt || p.metaDescription || '', href });
    }
  };
  const pushBlog = (s: string) => {
    const href = `/blog/${s}`;
    const p = getPostBySlug(s);
    if (p && !seen.has(href)) {
      seen.add(href);
      links.push({ title: p.title, note: p.excerpt || p.metaDescription || '', href });
    }
  };

  if (isJournalHub(slug)) {
    // Hub → its highest-impact spokes.
    ['journaling-for-anxiety', 'gratitude-journal-prompts', 'manifestation-journal-prompts'].forEach(
      pushJournal
    );
  } else {
    pushJournal(JOURNAL_HUB_SLUG); // up to the hub
    if (AFFIRMATION_SIBLING[slug]) pushBlog(AFFIRMATION_SIBLING[slug]); // across to affirmations
    // Top up with one more journal spoke so the block always has three.
    for (const p of getAllJournalPosts()) {
      if (links.length >= 3) break;
      if (p.slug !== slug) pushJournal(p.slug);
    }
  }
  return links.slice(0, 3);
}

export default async function JournalPostPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  const url = `${baseUrl}/journal/${slug}`;
  const formattedDate = format(new Date(post.createdTime), 'MMMM d, yyyy');
  const readingTime = `${post.readingTime} min read`;
  // Shared title rule: visible H1 = the part before the colon; the keyword-rich
  // remainder lives in reader.subtitle, with the full title kept for SEO/schema.
  const displayTitle = post.title.includes(':')
    ? post.title.slice(0, post.title.indexOf(':')).trim()
    : post.title;
  const authorLink = getAuthorHref(post.author);
  const imageAbsolute = post.featuredImage ? `${baseUrl}${post.featuredImage}` : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
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
      { '@type': 'ListItem', position: 2, name: 'Journal Prompts', item: `${baseUrl}/journal` },
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

  const related = journalRelated(slug);

  return (
    <article>
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

      <nav className="back-link">
        <Link href="/journal">
          <span aria-hidden="true">←</span> All journal prompts
        </Link>
      </nav>

      <ScrollReader
        reader={post.reader!}
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
