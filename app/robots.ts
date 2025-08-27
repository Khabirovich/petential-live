import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/quiz/',
          '/breeds',
          '/about',
          '/blog',
          '/contact',
          '/pet-care-guide',
          '/training-tips',
          '/nutrition-guide',
          '/how-to-choose-pet',
          // Allow crawling of public breed pages
          '/breed/',
        ],
        disallow: [
          '/admin/',
          '/api/auth/',
          '/api/admin/',
          '/api/user-data/',
          '/results',
          '/_next/',
          '/node_modules/',
        ],
      },
      // Specific rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/auth/', '/api/admin/'],
      },
    ],
    sitemap: 'https://petential.es/sitemap.xml',
    host: 'https://petential.es',
  }
}