import { ImageResponse } from 'next/og';
import { getDayBySlug, allDailySlugs } from '@/lib/daily';

export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'A daily affirmation from Aurasyncs';

export function generateStaticParams() {
  return allDailySlugs().map((date) => ({ date }));
}

// Per-day share image: the affirmation set on the warm Aurasyncs gradient.
export default async function Image({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const day = getDayBySlug(date);
  const text = day?.affirmation ?? 'A daily affirmation';
  const label = day ? `Daily Affirmation · ${day.monthName} ${day.day}` : 'Daily Affirmation';
  const fontSize = text.length > 95 ? 48 : text.length > 60 ? 58 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f5efe6 0%, #faf8f4 55%, #f3ece1 100%)',
          padding: '76px 90px',
          color: '#2b2a27',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, letterSpacing: '0.16em', color: '#b07d52' }}>
          {label.toUpperCase()}
        </div>
        <div style={{ display: 'flex', fontSize, lineHeight: 1.25, fontWeight: 500, maxWidth: 1010 }}>
          {text}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, color: '#837a6e' }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#b07d52',
              marginRight: 14,
            }}
          />
          aurasyncs.com
        </div>
      </div>
    ),
    { ...size }
  );
}
