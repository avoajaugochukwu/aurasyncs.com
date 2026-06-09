// 301 redirects for consolidated/merged posts (cannibalization fixes).
// Each entry: a retired slug -> the canonical post that absorbed its content.
const POST_REDIRECTS = {
  // Merged the two competing "self love affirmations" pages into one stronger page.
  'affirmations-for-self-love': 'self-love-affirmations-confidence-worth',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next.js doesn't infer it from a stray parent lockfile.
  outputFileTracingRoot: __dirname,
  async redirects() {
    return Object.entries(POST_REDIRECTS).map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      statusCode: 301,
    }));
  },
  images: {
    remotePatterns: [
      {
        // Fallback placeholder used when a featured image is missing.
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
