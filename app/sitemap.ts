import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { allDailySlugs } from '@/lib/daily'
import { baseUrl } from './metadata';

// Define static routes directly
const staticRoutes = [
  '/',
  '/blog',
  '/privacy-policy',
  '/terms-of-service',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const formattedDate = new Date().toISOString();

  const blogUrls: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastEditedTime || post.createdTime),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routeUrls: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: formattedDate,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Daily hub rotates its featured entry every day; the 366 day pages are evergreen.
  const dailyHub: MetadataRoute.Sitemap = [{
    url: `${baseUrl}/daily`,
    lastModified: formattedDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }];

  const dailyUrls: MetadataRoute.Sitemap = allDailySlugs().map((slug) => ({
    url: `${baseUrl}/daily/${slug}`,
    lastModified: formattedDate,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...routeUrls, ...dailyHub, ...dailyUrls, ...blogUrls];
}
