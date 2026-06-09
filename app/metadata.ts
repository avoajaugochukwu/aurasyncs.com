import { Metadata } from "next";

export const baseUrl = 'https://aurasyncs.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Aurasyncs.com',
    default: 'Aurasyncs.com - Daily Affirmations to Elevate Your Mind',
  },
  description: 'Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!',
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
      'x-default': baseUrl
    },
  },
  openGraph: {
    title: "Aurasyncs.com - Daily Affirmations to Elevate Your Mind",
    description: "Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!",
    url: baseUrl,
    siteName: "Aurasyncs.com",
    locale: "en_US",
    type: "website",
    // og:image is provided automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurasyncs.com - Daily Affirmations to Elevate Your Mind",
    description: "Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!",
    // twitter image is derived from app/opengraph-image.tsx
  },
  robots: {
    index: true,
    follow: true,
  },
  // Search Console is verified at the domain level (DNS / linked GA4 property),
  // and analytics runs via GA4 (<GoogleAnalytics gaId="G-QNX4KVJTK5" /> in layout.tsx),
  // so no google-site-verification meta tag is needed here.
  // Icons are auto-detected from app/favicon.ico, app/icon.png and app/apple-icon.png
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aurasyncs.com',
  description: 'Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!',
  url: baseUrl,
  publisher: {
    '@type': 'Organization',
    name: 'Aurasyncs.com',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  }
};
