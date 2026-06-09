export type Author = {
  slug: string;
  name: string;
  role: string;
  /** Bio paragraphs. */
  bio: string[];
  github: string;
};

export const AUTHORS: Record<string, Author> = {
  'Ugo Charles': {
    slug: 'ugo-charles',
    name: 'Ugo Charles',
    role: 'Founder & Writer, Aurasyncs',
    bio: [
      'Ugo Charles is the founder of Aurasyncs, where he writes and curates affirmation collections meant to be read slowly — one standalone line at a time.',
      'He builds calm, considered reading experiences on the web, and pairs each collection with practical guidance on how and when to use the lines so a single sentence has a chance to actually land.',
    ],
    github: 'https://github.com/avoajaugochukwu',
  },
};

const FALLBACK_NAME = 'Ugo Charles';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getAuthor(name: string): Author {
  return AUTHORS[name] ?? AUTHORS[FALLBACK_NAME];
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return Object.values(AUTHORS).find((a) => a.slug === slug);
}

export function authorSlug(name: string): string {
  return AUTHORS[name]?.slug ?? slugify(name);
}

export function authorHref(name: string): string {
  return `/author/${authorSlug(name)}`;
}

export function getAllAuthorSlugs(): string[] {
  return Object.values(AUTHORS).map((a) => a.slug);
}
