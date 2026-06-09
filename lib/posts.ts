import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import matter from 'gray-matter';

export type FaqItem = { q: string; a: string };

export type Quote = { text: string; author?: string };

export type ReaderSection = {
  id: string;
  title: string;
  /** Optional SEO keyword shown as the section eyebrow. */
  keyword?: string;
  /** One-line framing under the section title. */
  intro?: string;
  /** Longer depth-prose paragraphs. */
  body: string[];
  /** Practitioner "when to reach for these" note. */
  whenToUse?: string;
  quotes: Quote[];
  /** Reflection / journaling prompt closing the section. */
  prompt?: string;
};

/**
 * Optional structured `reader:` frontmatter that powers the full Scroll reader.
 * Posts without it fall back to styled MDX prose.
 */
export type Reader = {
  tag: string;
  subtitle?: string;
  opening?: { quote: string; note?: string };
  intro: string[];
  sections: ReaderSection[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  author: string;
  tags: string[];
  readingTime: number;
  createdTime: string;
  lastEditedTime: string;
  featuredImage: string | null;
  /** Optional FAQ pairs (frontmatter `faq:`) used for an on-page FAQ + FAQPage schema. */
  faq: FaqItem[];
  /** Optional structured reader (frontmatter `reader:`); null → render prose. */
  reader: Reader | null;
  /** Raw MDX body (without frontmatter). */
  content: string;
};

function parseFaq(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => ({ q: String(item?.q ?? '').trim(), a: String(item?.a ?? '').trim() }))
    .filter((item) => item.q && item.a);
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function strList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(str).filter(Boolean);
  const s = str(v);
  return s ? [s] : [];
}

function parseQuotes(raw: unknown): Quote[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((q) => {
      if (typeof q === 'string') return { text: q.trim() };
      return { text: str(q?.text), author: str(q?.author) || undefined };
    })
    .filter((q) => q.text);
}

function parseReader(raw: unknown): Reader | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const sectionsRaw = Array.isArray(r.sections) ? r.sections : [];
  const sections: ReaderSection[] = sectionsRaw
    .map((s, i) => {
      const sec = (s ?? {}) as Record<string, unknown>;
      return {
        id: str(sec.id) || `section-${i + 1}`,
        title: str(sec.title),
        keyword: str(sec.keyword) || undefined,
        intro: str(sec.intro) || undefined,
        body: strList(sec.body),
        whenToUse: str(sec.whenToUse) || undefined,
        quotes: parseQuotes(sec.quotes),
        prompt: str(sec.prompt) || undefined,
      };
    })
    .filter((s) => s.title && s.quotes.length > 0);

  if (sections.length === 0) return null;

  const openingRaw = (r.opening ?? null) as Record<string, unknown> | null;
  return {
    tag: str(r.tag) || 'Affirmations',
    subtitle: str(r.subtitle) || undefined,
    opening: openingRaw && str(openingRaw.quote)
      ? { quote: str(openingRaw.quote), note: str(openingRaw.note) || undefined }
      : undefined,
    intro: strList(r.intro),
    sections,
  };
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function readPostFile(slug: string): Post | undefined {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));
  return {
    slug,
    title: data.title ?? 'Untitled Post',
    excerpt: data.excerpt ?? '',
    metaDescription: data.metaDescription ?? '',
    author: data.author ?? 'Aurasyncs Team',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: typeof data.readingTime === 'number' ? data.readingTime : 5,
    createdTime: data.createdTime ?? new Date(0).toISOString(),
    lastEditedTime: data.lastEditedTime ?? data.createdTime ?? new Date(0).toISOString(),
    featuredImage: data.featuredImage ?? null,
    faq: parseFaq(data.faq),
    reader: parseReader(data.reader),
    content,
  };
}

export const getAllPosts = React.cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
  const posts = slugs
    .map((slug) => readPostFile(slug))
    .filter((p): p is Post => Boolean(p));
  return posts.sort(
    (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
  );
});

export const getPostBySlug = React.cache((slug: string): Post | undefined => readPostFile(slug));

export const getAllSlugs = (): string[] =>
  fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
    : [];
