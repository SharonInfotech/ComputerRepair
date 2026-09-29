import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/services',
          '/brands',
          '/service-areas',
          '/products',
          '/blog',
          '/support',
          '/about',
          '/contact',
          '/sitemap.xml',
          '/llms.txt',
          '/.well-known/security.txt',
        ],
        disallow: ['/api/', '/admin/', '/private/', '/dashboard/', '/internal/', '/404'],
      },
    ],
    sitemap: [
      'https://computerrepairnagpur.com/sitemap.xml',
      'https://computerrepairnagpur.com/sitemap-pages.xml',
      'https://computerrepairnagpur.com/sitemap-services.xml',
      'https://computerrepairnagpur.com/sitemap-brands-1.xml',
      'https://computerrepairnagpur.com/sitemap-brands-2.xml',
      'https://computerrepairnagpur.com/sitemap-brands-3.xml',
      'https://computerrepairnagpur.com/sitemap-brands-4.xml',
      'https://computerrepairnagpur.com/sitemap-brands-5.xml',
      'https://computerrepairnagpur.com/sitemap-brands-6.xml',
      'https://computerrepairnagpur.com/sitemap-brands-7.xml',
      'https://computerrepairnagpur.com/sitemap-brands-8.xml',
      'https://computerrepairnagpur.com/sitemap-blog.xml',
    ],
    host: 'https://computerrepairnagpur.com',
  };
}
