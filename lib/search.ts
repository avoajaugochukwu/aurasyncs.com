import type { Post } from './posts';
import { clusterFor } from './clusters';

/**
 * A single indexed post. Built server-side from a {@link Post} and shipped to the
 * client as plain JSON so search can run entirely in the browser — no API round
 * trips, which is fine for a small library (tens of posts).
 */
export type SearchDoc = {
  slug: string;
  title: string;
  excerpt: string;
  clusterId: string;
  clusterLabel: string;
  tags: string[];
  date: string;
  /** Short, snippet-worthy lines (affirmations, section titles, FAQ, subtitle). */
  snippets: string[];
};

export type SearchResult = SearchDoc & {
  score: number;
  /** Best display line for the query: a matching snippet, else the excerpt. */
  snippet: string;
};

const trim = (s: string, max = 180) =>
  s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;

/** Build the client search index from posts. Runs server-side at build/request time. */
export function buildSearchIndex(posts: Post[]): SearchDoc[] {
  return posts.map((post) => {
    const cluster = clusterFor(post.slug);
    const r = post.reader;
    const snippets: string[] = [];

    if (r?.subtitle) snippets.push(r.subtitle);
    for (const sec of r?.sections ?? []) {
      if (sec.title) snippets.push(sec.title);
      if (sec.intro) snippets.push(sec.intro);
      for (const q of sec.quotes) if (q.text) snippets.push(q.text);
      if (sec.prompt) snippets.push(sec.prompt);
    }
    for (const f of post.faq) {
      if (f.q) snippets.push(f.q);
    }

    // Dedup, trim, and cap so the shipped index stays lean.
    const seen = new Set<string>();
    const cleaned: string[] = [];
    for (const s of snippets) {
      const t = trim(s.trim());
      const key = t.toLowerCase();
      if (t && !seen.has(key)) {
        seen.add(key);
        cleaned.push(t);
      }
      if (cleaned.length >= 40) break;
    }

    return {
      slug: post.slug,
      title: post.title,
      excerpt: trim((post.excerpt || post.metaDescription).trim(), 200),
      clusterId: cluster.id,
      clusterLabel: cluster.label,
      tags: post.tags,
      date: post.createdTime,
      snippets: cleaned,
    };
  });
}

/** Split a raw query into lowercased terms. */
export function queryTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 0);
}

// Field weights — title matches dominate, snippets are the faint signal.
const W_TITLE = 12;
const W_TITLE_PREFIX = 6; // bonus when a title word starts with the term
const W_TAG = 6;
const W_CLUSTER = 5;
const W_EXCERPT = 3;
const W_SNIPPET = 2;

function scoreTerm(term: string, doc: SearchDoc): { score: number; snippet?: string } {
  let score = 0;
  let snippet: string | undefined;

  const title = doc.title.toLowerCase();
  if (title.includes(term)) {
    score += W_TITLE;
    if (new RegExp(`\\b${term}`).test(title)) score += W_TITLE_PREFIX;
  }
  if (doc.tags.some((t) => t.toLowerCase().includes(term))) score += W_TAG;
  if (doc.clusterLabel.toLowerCase().includes(term)) score += W_CLUSTER;
  if (doc.excerpt.toLowerCase().includes(term)) score += W_EXCERPT;

  for (const s of doc.snippets) {
    if (s.toLowerCase().includes(term)) {
      score += W_SNIPPET;
      if (!snippet) snippet = s;
      break;
    }
  }

  return { score, snippet };
}

/**
 * Rank docs for a query. A doc must match every term somewhere (AND) to qualify,
 * which keeps a small library's results precise. Results are sorted by score, then
 * recency as a tiebreak.
 */
export function searchDocs(query: string, docs: SearchDoc[]): SearchResult[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const doc of docs) {
    let total = 0;
    let matchedAll = true;
    let bestSnippet: string | undefined;

    for (const term of terms) {
      const { score, snippet } = scoreTerm(term, doc);
      if (score === 0) {
        matchedAll = false;
        break;
      }
      total += score;
      if (!bestSnippet && snippet) bestSnippet = snippet;
    }

    if (matchedAll) {
      results.push({ ...doc, score: total, snippet: bestSnippet || doc.excerpt });
    }
  }

  results.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return results;
}
