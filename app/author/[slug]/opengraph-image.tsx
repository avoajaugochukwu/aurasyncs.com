import { ImageResponse } from 'next/og';
import { getAuthorBySlug, getAllAuthorSlugs } from '@/lib/authors';

export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Author at Aurasyncs';

export function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  const name = author?.name ?? 'Aurasyncs';
  const role = author?.role ?? 'Writer, Aurasyncs';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f5efe6 0%, #faf8f4 55%, #f3ece1 100%)',
          padding: '80px',
          color: '#2b2a27',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, letterSpacing: '0.18em', color: '#b07d52', marginBottom: 24 }}>
          AURASYNCS
        </div>
        <div style={{ display: 'flex', fontSize: 70, fontWeight: 600 }}>{name}</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#837a6e', marginTop: 18 }}>{role}</div>
      </div>
    ),
    { ...size }
  );
}
