import { ImageResponse } from 'next/og';

export const alt = 'Aurasyncs.com - Daily Affirmations to Elevate Your Mind';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
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
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)',
          color: 'white',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 24, opacity: 0.9 }}>
          AURASYNCS
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Daily Affirmations to Elevate Your Mind
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.9 }}>
          Boost confidence · Manifest positivity
        </div>
      </div>
    ),
    { ...size }
  );
}
