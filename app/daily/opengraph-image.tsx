import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Daily Affirmations — a new line for every day of the year';

export default function Image() {
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
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, letterSpacing: '0.18em', color: '#b07d52', marginBottom: 26 }}>
          DAILY AFFIRMATIONS
        </div>
        <div style={{ display: 'flex', fontSize: 66, fontWeight: 500, lineHeight: 1.15, maxWidth: 920 }}>
          A new affirmation for every day of the year
        </div>
        <div style={{ display: 'flex', fontSize: 27, color: '#837a6e', marginTop: 30 }}>aurasyncs.com</div>
      </div>
    ),
    { ...size }
  );
}
