import fs from 'fs';
import path from 'path';
import { ALL_NAGPUR_LOCATIONS } from '../src/data/nagpurLocations';
import { GENERATED_BLOG_POSTS } from '../src/data/blogEngine';
import { getServicePages } from '../src/data/servicesPageEngine';
import { getBrandPages } from '../src/data/brandsPageEngine';
import {
  CORE_SERVICE_SLUGS,
  CORE_BRAND_SLUGS,
  CORE_PRODUCT_SLUGS,
  CORE_SUPPORT_SLUGS,
} from '../src/utils/sitemapGenerator';

const DOMAIN = 'https://computerrepairnagpur.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const entries: UrlEntry[] = [];
const seenLocs = new Set<string>();

function addEntry(loc: string, priority: string = '0.80', changefreq: string = 'weekly') {
  const cleanLoc = loc.trim();
  if (!seenLocs.has(cleanLoc)) {
    seenLocs.add(cleanLoc);
    entries.push({
      loc: cleanLoc,
      lastmod: TODAY,
      changefreq,
      priority,
    });
  }
}

// 1. Core Pages
const corePages = [
  { url: '/', priority: '1.00', changefreq: 'daily' },
  { url: '/services', priority: '0.90', changefreq: 'daily' },
  { url: '/brands', priority: '0.90', changefreq: 'daily' },
  { url: '/products', priority: '0.85', changefreq: 'weekly' },
  { url: '/support', priority: '0.80', changefreq: 'weekly' },
  { url: '/service-areas', priority: '0.95', changefreq: 'daily' },
  { url: '/blog', priority: '0.90', changefreq: 'daily' },
  { url: '/about', priority: '0.70', changefreq: 'monthly' },
  { url: '/contact', priority: '0.80', changefreq: 'weekly' },
];

for (const p of corePages) {
  addEntry(`${DOMAIN}${p.url}`, p.priority, p.changefreq);
}

// 2. Core Services Subpages
for (const s of CORE_SERVICE_SLUGS) {
  addEntry(`${DOMAIN}/services/${s.slug}`, '0.85', 'weekly');
}

// 3. Core Brand Subpages
for (const b of CORE_BRAND_SLUGS) {
  addEntry(`${DOMAIN}/brands/${b.slug}`, '0.85', 'weekly');
}

// 4. Products Subpages
for (const c of CORE_PRODUCT_SLUGS) {
  addEntry(`${DOMAIN}/products/${c.slug}`, '0.80', 'weekly');
}

// 5. Support Desk Subpages
for (const sup of CORE_SUPPORT_SLUGS) {
  addEntry(`${DOMAIN}/support/${sup.slug}`, '0.80', 'weekly');
}

// 6. Blog Category Subpages
const blogCats = [
  'all',
  'hardware-tips-replacement',
  'software-fixes',
  'technology-news',
];
for (const cat of blogCats) {
  addEntry(`${DOMAIN}/blog/${cat}`, '0.80', 'weekly');
}

// 6. All Nagpur Service Area Hubs (220+ Localities)
for (const loc of ALL_NAGPUR_LOCATIONS) {
  addEntry(`${DOMAIN}/service-areas/${loc.id}`, '0.80', 'weekly');
}

// 7. All Dynamic Service Pages (6,870+ Location-Specific Service Pages)
console.log('Fetching dynamic service pages...');
const servicePages = getServicePages();
for (const sp of servicePages) {
  addEntry(`${DOMAIN}/services/${sp.slug}`, '0.80', 'weekly');
}

// 8. All Generated Blog Posts (1,200+ blog articles)
for (const post of GENERATED_BLOG_POSTS) {
  addEntry(`${DOMAIN}/blog/${post.id}`, '0.70', 'weekly');
}

// 9. Top Brand Local Pages (up to ~25,000 URLs max for optimal sitemap size)
console.log('Fetching dynamic brand pages...');
const brandPages = getBrandPages();
// Include top brand pages
const maxBrandPages = 20000;
let brandCount = 0;
for (const bp of brandPages) {
  if (brandCount >= maxBrandPages) break;
  addEntry(`${DOMAIN}/brands/${bp.slug}`, '0.75', 'weekly');
  brandCount++;
}

console.log(`Generating sitemap.xml with ${entries.length} total URLs...`);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

for (const entry of entries) {
  xml += `  <url>\n`;
  xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
  xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
  xml += `    <priority>${entry.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`Successfully regenerated sitemap.xml at ${outputPath}! Total URLs: ${entries.length}`);

