// src/app/(admin)/dashboard/blog/new/page.tsx
"use client"

import { useState, useEffect } from "react"
import Script from "next/script"
// We'll load TinyMCE from Tiny Cloud script and initialize manually to avoid React wrapper issues
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  PhotoIcon,
  TagIcon
} from '@heroicons/react/24/outline'

interface BlogPostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string[]
  featuredImage: string
  status: 'draft' | 'published'
}

export default function NewBlogPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  
  const [form, setForm] = useState<BlogPostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: [],
    featuredImage: '',
    status: 'draft'
  })

  const [tagInput, setTagInput] = useState('')

  // TinyMCE Cloud will load core and plugins via apiKey

  // Redirect logic
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  // Auto-generate slug from title
  useEffect(() => {
    if (form.title) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setForm(prev => ({ ...prev, slug }))
    }
  }, [form.title])

  // Listen for TinyMCE content updates and sync to state
  useEffect(() => {
    const handleContent = (e: any) => {
      const html = e?.detail ?? ''
      setForm(prev => ({ ...prev, content: html }))
    }
    // @ts-ignore - custom event name
    window.addEventListener('tinymce-content-changed', handleContent)
    return () => {
      // @ts-ignore
      window.removeEventListener('tinymce-content-changed', handleContent)
    }
  }, [])

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          authorId: session?.user?.id
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          router.push('/dashboard/blog')
        } else {
          setError(data.message || 'Failed to create blog post')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to create blog post')
      }
    } catch (err) {
      console.error('Error creating blog post:', err)
      setError('Network error while creating blog post')
    } finally {
      setSaving(false)
    }
  }

  // Display loading/redirect states
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <p className="text-white text-lg">Access Denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Script
        src={`https://cdn.tiny.cloud/1/y87w62wahx7pxhg4hubkctd1wuokxm6w6ftzpn785fdcyiur/tinymce/7/tinymce.min.js`}
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          if (window.tinymce && !window.tinymce.get('blog-content-editor')) {
            // @ts-ignore
            window.tinymce.init({
              selector: '#blog-content-editor',
              height: 500,
              menubar: true,
              plugins: 'anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown importword exportword exportpdf',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              setup: (editor: any) => {
                editor.on('change input keyup', () => {
                  const html = editor.getContent()
                  const evt = new CustomEvent('tinymce-content-changed', { detail: html })
                  window.dispatchEvent(evt)
                })
              }
            })
          }
        }}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/blog"
              className="p-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Blog Post</h1>
              <p className="text-slate-300">Write and publish your next blog post</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl transition-colors duration-200 flex items-center space-x-2"
            >
              <EyeIcon className="w-4 h-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <CheckIcon className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Post'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              placeholder="Enter blog post title..."
            />
          </div>

          {/* Slug */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
              placeholder="blog-post-url-slug"
            />
            <p className="text-sm text-slate-400 mt-2">
              This will be the URL: /blog/{form.slug}
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Excerpt *
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
              placeholder="Brief description of your blog post..."
            />
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content *
            </label>
            {previewMode ? (
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: form.content || '<p>No content to preview</p>' }}
                />
              </div>
            ) : (
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl">
                <textarea id="blog-content-editor" defaultValue={form.content} className="w-full h-[500px]"></textarea>
              </div>
            )}
            {!previewMode && (
              <p className="text-sm text-slate-400 mt-2">Use the toolbar to format your content.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Featured Image
            </label>
            <div className="flex items-center gap-3">
            <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const data = new FormData()
                  data.append('file', file)
                  try {
                    const res = await fetch('/api/upload', { method: 'POST', body: data })
                    const json = await res.json()
                    if (json.success && json.url) {
                      setForm(prev => ({ ...prev, featuredImage: json.url }))
                    } else {
                      setError(json.message || 'Image upload failed')
                    }
                  } catch (err) {
                    console.error('Upload failed:', err)
                    setError('Network error during image upload')
                  }
                }}
                className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            {form.featuredImage && (
              <img
                src={form.featuredImage}
                alt="Featured"
                className="w-full h-32 object-cover rounded-lg mt-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            )}
            {form.featuredImage && (
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, featuredImage: '' }))}
                className="mt-2 px-3 py-1 bg-slate-700/70 hover:bg-slate-600/70 text-white rounded-lg text-sm"
              >
                Remove image
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
                placeholder="Add tag..."
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full flex items-center space-x-1"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-blue-300 hover:text-red-400 transition-colors duration-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <p className="text-sm text-slate-400 mt-2">
              {form.status === 'draft' 
                ? 'Save as draft for later editing'
                : 'Publish immediately for public viewing'
              }
            </p>
          </div>

          {/* Word Count */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-sm font-medium text-slate-300 mb-2">Statistics</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>Words: {form.content.split(' ').filter(word => word.length > 0).length}</div>
              <div>Characters: {form.content.length}</div>
              <div>Estimated read time: {Math.ceil(form.content.split(' ').length / 200)} min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
