import { MetadataRoute } from 'next';
import { getAllSitemapEntries } from '../utils/sitemapGenerator';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllSitemapEntries();

  return entries.map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastmod),
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
