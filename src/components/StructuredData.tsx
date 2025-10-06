// src/components/StructuredData.tsx
"use client"

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

function toTitleCase(segment: string) {
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function StructuredData() {
  const pathname = usePathname()

  const data = useMemo(() => {
    if (typeof window === 'undefined') return null
    const origin = window.location.origin
    const url = window.location.href
    const logo = `${origin}/favicon.svg`

    // Organization
    const organization = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SEO Buddy',
      url: origin,
      logo,
      sameAs: [] as string[]
    }

    // Website with optional SearchAction
    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SEO Buddy',
      url: origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }

    // Breadcrumbs from pathname
    const parts = pathname.split('/').filter(Boolean)
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`
      },
      ...parts.map((seg, idx) => {
        const href = `${origin}/${parts.slice(0, idx + 1).join('/')}`
        return {
          '@type': 'ListItem',
          position: idx + 2,
          name: toTitleCase(seg),
          item: href
        }
      })
    ]
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    }

    return { organization, website, breadcrumbs }
  }, [pathname])

  if (!data) return null
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data.organization) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data.website) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbs) }} />
    </>
  )
}


