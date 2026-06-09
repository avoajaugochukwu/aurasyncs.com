import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import { getAuthorBySlug, getAllAuthorSlugs } from '@/lib/authors';
import { AuthorArticles } from '@/components/AuthorArticles';
import { baseUrl } from '@/app/metadata';
import type { Metadata } from 'next';

type AuthorPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  const url = `${baseUrl}/author/${author.slug}`;
  const description = author.bio[0] ?? `Affirmation collections written by ${author.name}.`;
  return {
    title: author.name,
    description,
    alternates: { canonical: url },
    openGraph: { title: author.name, description, url, type: 'profile' },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getAllPosts().filter((p) => p.author === author.name);
  const url = `${baseUrl}/author/${author.slug}`;

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio[0],
    jobTitle: author.role,
    url,
    sameAs: [author.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <section className="hero" style={{ paddingBottom: '1.5rem' }}>
        <span className="eyebrow">Author</span>
        <h1 className="hero-quote" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
          {author.name}
        </h1>
        <p className="hero-sub" style={{ marginTop: '1rem' }}>{author.role}</p>
      </section>

      <div className="author-bio">
        {author.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <a className="btn-link" href={author.github} target="_blank" rel="me noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
          </svg>
          GitHub
        </a>
      </div>

      {posts.length > 0 && (
        <>
          <div className="section-label" style={{ marginTop: '2.5rem' }}>
            <span className="eyebrow">Articles by {author.name}</span>
            <span className="rule" />
          </div>
          <AuthorArticles
            posts={posts.map((post) => ({
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt || post.metaDescription,
              createdTime: post.createdTime,
            }))}
          />
        </>
      )}
      <div style={{ height: '4rem' }} />
    </>
  );
}
