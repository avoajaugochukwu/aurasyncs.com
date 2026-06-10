import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { allDailySlugs } from '@/lib/daily'
import { getAllJournalSlugs } from '@/lib/journal'
import { getAllAuthorSlugs } from '@/lib/authors'
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

  const authorUrls: MetadataRoute.Sitemap = getAllAuthorSlugs().map((slug) => ({
    url: `${baseUrl}/author/${slug}`,
    lastModified: formattedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Journal section: its own landing + one page per prompt guide.
  const journalIndex: MetadataRoute.Sitemap = [{
    url: `${baseUrl}/journal`,
    lastModified: formattedDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }];

  const journalUrls: MetadataRoute.Sitemap = getAllJournalSlugs().map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: formattedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Printables landing (the free affirmation-cards lead magnet). The raw print
  // routes + the PDF/PNG assets are intentionally excluded (noindex / not pages).
  const printables: MetadataRoute.Sitemap = [{
    url: `${baseUrl}/printables`,
    lastModified: formattedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }];

  return [...routeUrls, ...dailyHub, ...dailyUrls, ...journalIndex, ...journalUrls, ...printables, ...blogUrls, ...authorUrls];
}
