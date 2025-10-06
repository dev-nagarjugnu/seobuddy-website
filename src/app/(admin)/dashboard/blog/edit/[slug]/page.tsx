// src/app/(admin)/dashboard/blog/edit/[slug]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline'

interface BlogPostForm {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  featuredImage?: string
  status: 'draft' | 'published'
}

export default function EditBlogPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const [form, setForm] = useState<BlogPostForm | null>(null)
  const [tagInput, setTagInput] = useState('')

  // Auth gate
  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") router.push("/auth/signin")
  }, [status, router])

  useEffect(() => {
    if (slug && status === "authenticated") {
      loadPost()
    }
  }, [slug, status])

  const loadPost = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/blog/${slug}`)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Failed to load post')
      }
      const data = await res.json()
      const p = data.post
      setForm({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        tags: p.tags || [],
        featuredImage: p.featuredImage || '',
        status: p.status
      })
    } catch (e:any) {
      setError(e.message || 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (!form) return
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (!form) return
    setForm({ ...form, tags: form.tags.filter(t => t !== tagToRemove) })
  }

  const savePost = async () => {
    if (!form) return
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError('Please fill in all required fields')
      return
    }
    try {
      setSaving(true)
      setError(null)
      const res = await fetch(`/api/blog/admin/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          tags: form.tags,
          featuredImage: form.featuredImage,
          status: form.status
        })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Failed to save post')
      }
      router.push('/dashboard/blog')
    } catch (e:any) {
      setError(e.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  if (status === "loading" || loading || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/blog" className="p-2 text-slate-400 hover:text-white transition-colors duration-200">
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Post</h1>
              <p className="text-slate-300">Editing "{form.title}"</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setPreviewMode(!previewMode)} className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl transition-colors duration-200 flex items-center space-x-2">
              <EyeIcon className="w-4 h-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button onClick={savePost} disabled={saving} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
            <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt *</label>
            <textarea value={form.excerpt} onChange={(e)=>setForm({...form, excerpt:e.target.value})} rows={3} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Content *</label>
            {previewMode ? (
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: form.content }} />
              </div>
            ) : (
              <textarea value={form.content} onChange={(e)=>setForm({...form, content:e.target.value})} rows={20} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono text-sm" />
            )}
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Featured Image</label>
            <input value={form.featuredImage || ''} onChange={(e)=>setForm({...form, featuredImage:e.target.value})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="https://..." />
            {form.featuredImage && <img src={form.featuredImage} alt="Featured" className="w-full h-32 object-cover rounded-lg mt-2" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />}
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
            <div className="flex space-x-2 mb-3">
              <input value={tagInput} onChange={(e)=>setTagInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); addTag(); }}} className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" placeholder="Add tag" />
              <button onClick={addTag} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(t => (
                <span key={t} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full flex items-center space-x-1">
                  <span>{t}</span>
                  <button onClick={()=>removeTag(t)} className="text-blue-300 hover:text-red-400">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select value={form.status} onChange={(e)=>setForm({...form, status: e.target.value as 'draft'|'published'})} className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
