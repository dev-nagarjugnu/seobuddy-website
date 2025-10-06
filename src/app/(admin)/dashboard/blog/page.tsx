// src/app/(admin)/dashboard/blog/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  status: 'draft' | 'published'
  author: {
    name: string
    email: string
  }
  publishedAt: string | null
  updatedAt: string
  tags: string[]
  readTime: number | null
}

export default function AdminBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [deletePostId, setDeletePostId] = useState<string | null>(null)

  // Redirect logic
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status === "authenticated") {
      const role = session?.user?.role;
      if (role && role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      fetchBlogPosts();
    }
  }, [session, status]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/blog/admin", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          setError(data.message || "Failed to load blog posts");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to load blog posts");
      }
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Network error while loading blog posts");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/blog/admin/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
        setDeletePostId(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete blog post");
      }
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError("Network error while deleting blog post");
    }
  };

  const togglePostStatus = async (postId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const post = posts.find(p => p.id === postId);
      
      if (!post) return;

      const response = await fetch(`/api/blog/admin/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          status: newStatus
        })
      });

      if (response.ok) {
        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, status: newStatus as 'draft' | 'published' }
            : p
        ));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update blog post");
      }
    } catch (err) {
      console.error("Error updating blog post:", err);
      setError("Network error while updating blog post");
    }
  };

  // Filter posts based on search and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Display loading/redirect states
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading blog posts...</p>
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
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
            <p className="text-slate-300">Create, edit, and manage your blog posts</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/blog/new')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
            className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Published</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Tags</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-slate-400">
                      <p className="text-lg font-medium mb-2">No blog posts found</p>
                      <p>Create your first blog post to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-700/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-white font-medium mb-1">{post.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{post.author.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{formatDate(post.publishedAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-slate-600/50 text-slate-400 text-xs rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {/* View Post */}
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-blue-400 transition-colors duration-200"
                          title="View Post"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Link>

                        {/* Edit Post */}
                        <Link
                          href={`/dashboard/blog/edit/${post.slug}`}
                          className="p-2 text-slate-400 hover:text-green-400 transition-colors duration-200"
                          title="Edit Post"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>

                        {/* Toggle Status */}
                        <button
                          onClick={() => togglePostStatus(post.id, post.status)}
                          className={`p-2 transition-colors duration-200 ${
                            post.status === 'published'
                              ? 'text-green-400 hover:text-yellow-400'
                              : 'text-yellow-400 hover:text-green-400'
                          }`}
                          title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {post.status === 'published' ? '📤' : '📥'}
                        </button>

                        {/* Delete Post */}
                        <button
                          onClick={() => setDeletePostId(post.id)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"
                          title="Delete Post"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletePostId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog Post</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeletePostId(null)}
                className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePost(deletePostId)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 