/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Next.js doesn't infer it from a stray parent lockfile.
  outputFileTracingRoot: __dirname,
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
