// src/app/feed.xml/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  const prisma = new PrismaClient()
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      select: { title: true, slug: true, excerpt: true, publishedAt: true, updatedAt: true }
    })

    const items = posts.map((p) => `
      <item>
        <title>${escapeXml(p.title)}</title>
        <link>${site}/blog/${p.slug}</link>
        <guid>${site}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.publishedAt || new Date()).toUTCString()}</pubDate>
        <description>${escapeXml(p.excerpt || '')}</description>
      </item>
    `).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>SEO Buddy Blog</title>
        <link>${site}</link>
        <description>Latest posts from SEO Buddy</description>
        ${items}
      </channel>
    </rss>`

    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
    })
  } catch (e) {
    return new NextResponse('Service Unavailable', { status: 503 })
  } finally {
    try { await prisma.$disconnect() } catch {}
  }
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}


