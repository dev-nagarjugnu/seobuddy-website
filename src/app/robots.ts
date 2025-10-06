// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/user-dashboard/', '/admin/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}


