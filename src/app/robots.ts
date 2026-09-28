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
    sitemap: 'https://computerrepairnagpur.com/sitemap.xml',
    host: 'https://computerrepairnagpur.com',
  };
}
