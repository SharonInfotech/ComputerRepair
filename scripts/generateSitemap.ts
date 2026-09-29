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

function createUrlsetXml(entries: UrlEntry[]): string {
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
  return xml;
}

function createSitemapIndexXml(sitemapFiles: string[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const fileName of sitemapFiles) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${DOMAIN}/${fileName}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;
  return xml;
}

function writeSitemapFile(fileName: string, content: string) {
  const publicPath = path.join(process.cwd(), 'public', fileName);
  fs.writeFileSync(publicPath, content, 'utf-8');

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, fileName), content, 'utf-8');
  }

  const sizeKb = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(1);
  console.log(`  -> Generated ${fileName} (${sizeKb} KB)`);
}

// ============================================================================
// 1. sitemap-pages.xml (Core Pages, Main Hubs, Products, Support & 220+ Areas)
// ============================================================================
const pagesEntries: UrlEntry[] = [];
const pagesSeen = new Set<string>();

function addPageEntry(loc: string, priority = '0.85', changefreq = 'weekly') {
  const clean = loc.trim();
  if (!pagesSeen.has(clean)) {
    pagesSeen.add(clean);
    pagesEntries.push({ loc: clean, lastmod: TODAY, changefreq, priority });
  }
}

const corePages = [
  { url: '/', priority: '1.00', changefreq: 'daily' },
  { url: '/services', priority: '0.95', changefreq: 'daily' },
  { url: '/brands', priority: '0.90', changefreq: 'daily' },
  { url: '/service-areas', priority: '0.95', changefreq: 'daily' },
  { url: '/products', priority: '0.85', changefreq: 'weekly' },
  { url: '/support', priority: '0.85', changefreq: 'weekly' },
  { url: '/blog', priority: '0.90', changefreq: 'daily' },
  { url: '/about', priority: '0.75', changefreq: 'monthly' },
  { url: '/contact', priority: '0.85', changefreq: 'weekly' },
];

for (const p of corePages) {
  addPageEntry(`${DOMAIN}${p.url}`, p.priority, p.changefreq);
}
for (const s of CORE_SERVICE_SLUGS) {
  addPageEntry(`${DOMAIN}/services/${s.slug}`, '0.90', 'weekly');
}
for (const b of CORE_BRAND_SLUGS) {
  addPageEntry(`${DOMAIN}/brands/${b.slug}`, '0.85', 'weekly');
}
for (const c of CORE_PRODUCT_SLUGS) {
  addPageEntry(`${DOMAIN}/products/${c.slug}`, '0.80', 'weekly');
}
for (const sup of CORE_SUPPORT_SLUGS) {
  addPageEntry(`${DOMAIN}/support/${sup.slug}`, '0.80', 'weekly');
}
for (const loc of ALL_NAGPUR_LOCATIONS) {
  addPageEntry(`${DOMAIN}/service-areas/${loc.id}`, '0.85', 'weekly');
}

// ============================================================================
// 2. sitemap-services.xml (All Service Pages across Nagpur - ~1.8 MB)
// ============================================================================
const servicesEntries: UrlEntry[] = [];
const servicesSeen = new Set<string>();

for (const s of CORE_SERVICE_SLUGS) {
  const loc = `${DOMAIN}/services/${s.slug}`;
  servicesSeen.add(loc);
  servicesEntries.push({ loc, lastmod: TODAY, changefreq: 'weekly', priority: '0.90' });
}

const allServicePages = getServicePages();
for (const sp of allServicePages) {
  const loc = `${DOMAIN}/services/${sp.slug}`;
  if (!servicesSeen.has(loc)) {
    servicesSeen.add(loc);
    servicesEntries.push({
      loc,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: sp.slug.endsWith('-dhantoli') ? '0.85' : '0.80',
    });
  }
}

// ============================================================================
// 3. sitemap-brands-1.xml, sitemap-brands-2.xml, sitemap-brands-3.xml
//    (Divided into ~1.45 MB chunks of 7,500 URLs each)
// ============================================================================
const brandsEntries: UrlEntry[] = [];
const brandsSeen = new Set<string>();

for (const b of CORE_BRAND_SLUGS) {
  const loc = `${DOMAIN}/brands/${b.slug}`;
  brandsSeen.add(loc);
  brandsEntries.push({ loc, lastmod: TODAY, changefreq: 'weekly', priority: '0.85' });
}

const allBrandPages = getBrandPages();
for (const bp of allBrandPages) {
  const loc = `${DOMAIN}/brands/${bp.slug}`;
  if (!brandsSeen.has(loc)) {
    brandsSeen.add(loc);
    brandsEntries.push({
      loc,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: bp.slug.endsWith('-dhantoli') ? '0.85' : '0.75',
    });
  }
}

const BRAND_CHUNK_SIZE = 7500; // ~1.45 MB per file
const brandChunks: UrlEntry[][] = [];
for (let i = 0; i < brandsEntries.length; i += BRAND_CHUNK_SIZE) {
  brandChunks.push(brandsEntries.slice(i, i + BRAND_CHUNK_SIZE));
}

// ============================================================================
// 4. sitemap-blog.xml (All Blog Categories & 1,200+ Articles - ~240 KB)
// ============================================================================
const blogEntries: UrlEntry[] = [];
const blogSeen = new Set<string>();

const blogCats = ['all', 'hardware-tips-replacement', 'software-fixes', 'technology-news'];
for (const cat of blogCats) {
  const loc = `${DOMAIN}/blog/${cat}`;
  blogSeen.add(loc);
  blogEntries.push({ loc, lastmod: TODAY, changefreq: 'weekly', priority: '0.80' });
}

for (const post of GENERATED_BLOG_POSTS) {
  const loc = `${DOMAIN}/blog/${post.id}`;
  if (!blogSeen.has(loc)) {
    blogSeen.add(loc);
    blogEntries.push({ loc, lastmod: TODAY, changefreq: 'weekly', priority: '0.75' });
  }
}

// ============================================================================
// Write all child sitemaps and connect them inside Master sitemap.xml
// ============================================================================
console.log('Generating connected multi-file Sitemap Index architecture...');

const childSitemapFiles: string[] = [
  'sitemap-pages.xml',
  'sitemap-services.xml',
];

writeSitemapFile('sitemap-pages.xml', createUrlsetXml(pagesEntries));
writeSitemapFile('sitemap-services.xml', createUrlsetXml(servicesEntries));

brandChunks.forEach((chunk, idx) => {
  const fileName = `sitemap-brands-${idx + 1}.xml`;
  childSitemapFiles.push(fileName);
  writeSitemapFile(fileName, createUrlsetXml(chunk));
});

childSitemapFiles.push('sitemap-blog.xml');
writeSitemapFile('sitemap-blog.xml', createUrlsetXml(blogEntries));

// Write Master Sitemap Index (sitemap.xml) that connects all child sitemaps
const masterIndexXml = createSitemapIndexXml(childSitemapFiles);
writeSitemapFile('sitemap.xml', masterIndexXml);

const totalUrls =
  pagesEntries.length +
  servicesEntries.length +
  brandsEntries.length +
  blogEntries.length;

console.log(
  `Successfully generated connected Sitemap Index (sitemap.xml -> ${childSitemapFiles.join(', ')}) covering ${totalUrls} total URLs!`
);
