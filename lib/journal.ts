import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { parsePostFile, type Post } from './posts';

/**
 * The journal is its own content section, separate from the blog. Posts live in
 * `content/journal/*.mdx` and render at `/journal/<slug>` with their own layout
 * freedom — but reuse the exact same frontmatter + `reader:` contract as blog
 * posts (parsed by `parsePostFile`), so the warm reader renders them unchanged.
 */
const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');

/** The pillar hub every spoke links up to. */
export const JOURNAL_HUB_SLUG = 'journal-prompts';

/**
 * Cross-link map: each journal spoke pairs with its matching affirmations post
 * (which lives in the blog at `/blog/<slug>`). This is the authority play —
 * journaling ↔ affirmations — made explicit instead of inferred from clusters.
 */
export const AFFIRMATION_SIBLING: Record<string, string> = {
  'journaling-for-anxiety': 'affirmations-for-anxiety-finding-peace-inner-calm',
  'gratitude-journal-prompts': 'gratitude-affirmations-cultivating-a-positive-and-abundant-mindset',
  'manifestation-journal-prompts': 'manifestation-affirmations-for-beginners',
  'shadow-work-prompts': 'spiritual-affirmations-for-growth-healing-and-awakening',
  'journal-prompts-for-teens': 'positive-affirmations-for-teens-boosting-confidence-and-self-worth',
  'self-love-journal-prompts': 'self-love-affirmations-confidence-worth',
};

/** Display order for the section landing: hub first, then spokes by impact. */
const ORDER = [
  'journal-prompts',
  'journaling-for-anxiety',
  'gratitude-journal-prompts',
  'manifestation-journal-prompts',
  'shadow-work-prompts',
  'journal-prompts-for-teens',
  'self-love-journal-prompts',
];

function orderIndex(slug: string): number {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
}

function readJournalFile(slug: string): Post | undefined {
  const file = path.join(JOURNAL_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return parsePostFile(slug, fs.readFileSync(file, 'utf-8'));
}

export const getAllJournalPosts = React.cache((): Post[] => {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .map((slug) => readJournalFile(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug));
});

export const getJournalPostBySlug = React.cache(
  (slug: string): Post | undefined => readJournalFile(slug)
);

export const getAllJournalSlugs = (): string[] =>
  fs.existsSync(JOURNAL_DIR)
    ? fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
    : [];

export const isJournalHub = (slug: string): boolean => slug === JOURNAL_HUB_SLUG;
