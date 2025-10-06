// src/app/blog/[slug]/page.tsx
"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    email: string
  }
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published'
  tags: string[]
  featuredImage?: string
  readTime: number
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [enhancedHtml, setEnhancedHtml] = useState<string>("")
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([])
  const [progress, setProgress] = useState<number>(0)
  const [activeHeadingId, setActiveHeadingId] = useState<string>("")
  const [showTocMobile, setShowTocMobile] = useState<boolean>(false)

  const articleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug)
    }
  }, [slug])

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog/${postSlug}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setPost(data.post)
          if (data.relatedPosts) {
            setRelatedPosts(data.relatedPosts)
          }
        } else {
          setError(data.message || 'Blog post not found')
        }
      } else {
        setError('Blog post not found')
      }
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError('Network error while loading blog post')
    } finally {
      setLoading(false)
    }
  }

  // Calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const slugify = useCallback((value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }, [])

  const getDisplayAuthorName = useCallback((_name?: string) => {
    return 'SEOBuddy Editor'
  }, [])

  // Enhance HTML with heading anchors and build table of contents
  useEffect(() => {
    if (!post?.content) return
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(post.content, 'text/html')
      const headings = Array.from(doc.querySelectorAll('h2, h3, h4')) as HTMLElement[]
      const usedIds = new Set<string>()
      const tocItems: Array<{ id: string; text: string; level: number }> = []

      headings.forEach((el) => {
        const baseId = slugify(el.textContent || '')
        let uniqueId = baseId
        let i = 1
        while (usedIds.has(uniqueId) || uniqueId.length === 0) {
          uniqueId = `${baseId}-${i}`
          i += 1
        }
        usedIds.add(uniqueId)
        el.id = uniqueId
        tocItems.push({ id: uniqueId, text: el.textContent || '', level: parseInt(el.tagName.substring(1), 10) })
      })

      setToc(tocItems)
      setEnhancedHtml(doc.body.innerHTML)
    } catch (e) {
      setEnhancedHtml(post.content)
      setToc([])
    }
  }, [post, slugify])

  // Reading progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const container = articleRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const total = container.scrollHeight - viewportHeight
      const scrolled = Math.min(Math.max(container.scrollTop || (window.scrollY - (container.offsetTop || 0)), 0), total)
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(Math.max(0, Math.min(100, pct)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleShare = async () => {
    const shareData = {
      title: post?.title || 'SEO Buddy Blog',
      text: post?.excerpt || '',
      url: typeof window !== 'undefined' ? window.location.href : ''
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard')
      }
    } catch {}
  }

  // JSON-LD schema for BlogPosting and Breadcrumbs
  const jsonLd = useMemo(() => {
    if (!post) return null
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const image = post.featuredImage ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${origin}${post.featuredImage.startsWith('/') ? '' : '/'}${post.featuredImage}`) : undefined
    const publisherLogo = `${origin}/favicon.svg`
    const authorName = 'SEOBuddy Editor'
    return {
      blogPosting: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        },
        headline: post.title,
        description: post.excerpt,
        image: image ? [image] : undefined,
        author: {
          '@type': 'Person',
          name: authorName
        },
        publisher: {
          '@type': 'Organization',
          name: 'SEO Buddy',
          logo: {
            '@type': 'ImageObject',
            url: publisherLogo
          }
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        url
      },
      breadcrumbs: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${origin}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${origin}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: url
          }
        ]
      }
    }
  }, [post])

  // Observe headings and set active item
  useEffect(() => {
    if (toc.length === 0) return
    const headerOffset = 88
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the heading closest to the top within the viewport
        const sorted = entries
          .filter((e) => e.isIntersecting || e.boundingClientRect.top >= 0)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))
        if (sorted.length > 0) {
          setActiveHeadingId(sorted[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: `-${headerOffset}px 0px -70% 0px`,
        threshold: [0, 0.25, 0.5, 1.0]
      }
    )
    const elements = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is Element => Boolean(el))
    elements.forEach((el) => observer.observe(el))

    // Initialize on load/hash change
    const setActiveFromHashOrTop = () => {
      const id = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || elements[0]?.id
      if (id) setActiveHeadingId(id)
    }
    setActiveFromHashOrTop()
    window.addEventListener('hashchange', setActiveFromHashOrTop)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', setActiveFromHashOrTop)
    }
  }, [toc])

  // Fallback: actively compute current section on scroll for accuracy
  useEffect(() => {
    if (toc.length === 0) return
    const headerOffset = 88
    const computeActive = () => {
      const headingElements = toc
        .map((t) => document.getElementById(t.id))
        .filter((el): el is HTMLElement => Boolean(el))
      if (headingElements.length === 0) return
      // Choose the last heading whose top is above the header offset
      let current: string = headingElements[0].id
      for (const el of headingElements) {
        const top = el.getBoundingClientRect().top
        if (top - headerOffset <= 2) {
          current = el.id
        } else {
          break
        }
      }
      setActiveHeadingId(current)
    }
    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [toc])

  const scrollToHeading = (id: string) => {
    const headerOffset = 80
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
    setShowTocMobile(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {jsonLd && (
        <>
          <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.blogPosting) }} />
          <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumbs) }} />
        </>
      )}
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{post.title}</span>
        </nav>
      </div>

      {/* Hero header */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60">
            {post.featuredImage && (
              <div className="relative">
                <img src={post.featuredImage} alt={post.title} className="w-full h-80 md:h-[28rem] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              </div>
            )}
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/15 text-blue-300 text-xs md:text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                {post.title}
              </h1>
              <p className="text-base md:text-lg text-slate-300/90 mb-6 md:mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-slate-400">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <span>{getDisplayAuthorName(post.author.name)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>{post.readTime || calculateReadTime(post.content)} min read</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button onClick={handleShare} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 transition-colors">
                    Share
                  </button>
                  <a
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  <a
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content with sticky ToC */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" ref={articleRef}>
          <div className="lg:col-span-8">
            <article className="prose prose-lg prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: enhancedHtml || post.content }} />
            </article>
          </div>

          {/* Sticky ToC Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 overflow-hidden">
                <button
                  className="w-full lg:hidden flex items-center justify-between px-5 py-3 text-slate-200 hover:bg-slate-800/60"
                  onClick={() => setShowTocMobile((v) => !v)}
                >
                  <span className="text-sm font-semibold">On this page</span>
                  <span className="text-xs text-slate-400">{showTocMobile ? 'Hide' : 'Show'}</span>
                </button>
                <div className="hidden lg:block px-5 pt-5">
                  <h2 className="text-sm font-semibold text-slate-200 tracking-wide mb-3">On this page</h2>
                </div>
                <div className={(showTocMobile ? 'block' : 'hidden') + ' lg:block px-5 pb-5 max-h-[60vh] overflow-y-auto custom-scrollbar'}>
                  {toc.length === 0 ? (
                    <p className="text-slate-400 text-sm">No section headings available.</p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {toc.map((item) => (
                        <li key={item.id} className={(item.level === 2 ? '' : item.level === 3 ? 'pl-4' : 'pl-8')}>
                          <button
                            className={(activeHeadingId === item.id ? 'text-white bg-white/10 ' : 'text-slate-300 hover:text-white hover:bg-white/5 ') + 'w-full text-left rounded-lg px-2 py-1.5 transition-colors flex items-start gap-2'}
                            onClick={() => scrollToHeading(item.id)}
                            aria-current={activeHeadingId === item.id ? 'true' : undefined}
                          >
                            <span className={(activeHeadingId === item.id ? 'bg-blue-500' : 'bg-slate-500/50') + ' mt-1 inline-block w-1.5 h-1.5 rounded-full'} />
                            <span className="flex-1">{item.text}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {toc.length > 0 && (
                    <div className="mt-4">
                      <button
                        className="w-full text-left text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        Back to top
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border-t border-blue-500/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                  {relatedPost.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img src={relatedPost.featuredImage} alt={relatedPost.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors duration-200">
                      <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-slate-400 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{getDisplayAuthorName(relatedPost.author.name)}</span>
                      <span>{formatDate(relatedPost.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border-t border-blue-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to boost your organic growth?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Get a free, no‑obligation SEO audit tailored to your site and a prioritized roadmap to improve rankings, traffic, and conversions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signin" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Login</Link>
              <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 