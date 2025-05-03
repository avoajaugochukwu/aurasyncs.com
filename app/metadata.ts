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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurasyncs.com - Daily Affirmations to Elevate Your Mind",
    description: "Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true, // Allow indexing
    follow: true, // Allow following links
  },
  verification: {
    google: "google-site-verification: 63EE4WX9NK",
  },
  icons: {
    icon: "favicon_io/favicon.ico",
    apple: "favicon_io/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "favicon_io/favicon.ico",
    },
    shortcut: "favicon_io/favicon.ico",
  }
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aurasyncs.com',
  description: 'Aurasyncs offers daily affirmations to elevate your mind, boost confidence, and manifest positivity. Empower your life with self-affirmations!',
  url: baseUrl,
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: `${baseUrl}/blog?q={search_term_string}`
  //   },
  //   'query-input': 'required name=search_term_string'
  // },
  publisher: {
    '@type': 'Organization',
    name: 'Aurasyncs.com',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  }
};