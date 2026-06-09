import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import matter from 'gray-matter';

export type FaqItem = { q: string; a: string };

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
  /** Raw MDX body (without frontmatter). */
  content: string;
};

function parseFaq(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => ({ q: String(item?.q ?? '').trim(), a: String(item?.a ?? '').trim() }))
    .filter((item) => item.q && item.a);
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
