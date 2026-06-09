import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
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

  return [...routeUrls, ...blogUrls];
}
