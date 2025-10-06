// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  const staticPaths = [
    '',
    '/about',
    '/blog',
    '/services',
    '/services/technical-seo',
    '/services/local-seo',
    '/services/on-page-seo',
    '/services/off-page-seo',
    '/contact',
    '/seo-audit'
  ]

  const prisma = new PrismaClient()
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true, publishedAt: true }
    })
    blogEntries = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt || p.publishedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }))
  } catch (e) {
    console.warn('sitemap: failed to fetch blog posts', e)
  } finally {
    try { await prisma.$disconnect() } catch {}
  }

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7
  }))

  return [...staticEntries, ...blogEntries]
}


