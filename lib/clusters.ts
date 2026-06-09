import type { Post } from './posts';

export type Cluster = { id: string; label: string; keywords: string[] };

/**
 * Topical clusters for internal linking. Order matters: the first cluster whose
 * keyword is a substring of the slug wins, so more specific topics come first
 * (e.g. "women" before "men" so "...for-women" isn't caught by "men").
 */
export const CLUSTERS: Cluster[] = [
  { id: 'chakra', label: 'Chakra Affirmations', keywords: ['chakra'] },
  { id: 'funny', label: 'Funny & Sweary Affirmations', keywords: ['sweary', 'funny', 'disappointing', 'snoop'] },
  { id: 'money', label: 'Money & Abundance', keywords: ['money', 'wealth', 'abundance', 'prosperity', 'manifestation', 'financial'] },
  { id: 'faith', label: 'Faith & Spiritual', keywords: ['bible', 'biblical', 'christian', 'faith', 'spiritual', 'louise-hay'] },
  { id: 'calm', label: 'Anxiety & Calm', keywords: ['anxiety', 'calm', 'peace', 'stress', 'sleep', 'mental-health'] },
  { id: 'kids', label: 'Kids & Teens', keywords: ['kids', 'children', 'teen'] },
  { id: 'women', label: 'Affirmations for Women', keywords: ['women'] },
  { id: 'men', label: 'Affirmations for Men', keywords: ['for-men'] },
  { id: 'work', label: 'Work & Success', keywords: ['work', 'success', 'productivity', 'career'] },
  { id: 'selflove', label: 'Self-Love & Confidence', keywords: ['self-love', 'self-worth', 'confidence', 'self-esteem', 'worth'] },
  { id: 'health', label: 'Health & Healing', keywords: ['health', 'healing', 'wellness', 'weight-loss'] },
  { id: 'daily', label: 'Daily & Morning', keywords: ['morning', 'monday', 'friday', 'daily'] },
  { id: 'more', label: 'More Affirmations', keywords: [] },
];

const FALLBACK = CLUSTERS[CLUSTERS.length - 1];

export function clusterFor(slug: string): Cluster {
  return CLUSTERS.find((c) => c.keywords.some((k) => slug.includes(k))) || FALLBACK;
}

/**
 * Related posts for the given post: same cluster first (most relevant internal
 * links), topped up with other recent posts if the cluster is small.
 */
export function getRelatedPosts(post: Post, all: Post[], limit = 4): Post[] {
  const cluster = clusterFor(post.slug);
  const others = all.filter((p) => p.slug !== post.slug);
  const sameCluster = others.filter((p) => clusterFor(p.slug).id === cluster.id);
  const rest = others.filter((p) => clusterFor(p.slug).id !== cluster.id);
  return [...sameCluster, ...rest].slice(0, limit);
}

/** Group every post by cluster, preserving CLUSTERS order, dropping empty clusters. */
export function groupByCluster(all: Post[]): { cluster: Cluster; posts: Post[] }[] {
  return CLUSTERS.map((cluster) => ({
    cluster,
    posts: all.filter((p) => clusterFor(p.slug).id === cluster.id),
  })).filter((g) => g.posts.length > 0);
}
