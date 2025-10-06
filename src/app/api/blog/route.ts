// src/app/api/blog/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all published blog posts
export async function GET() {
  try {
    await prisma.$connect();

    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published'
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      posts: posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        status: post.status,
        tags: post.tags,
        featuredImage: post.featuredImage,
        readTime: post.readTime
      }))
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog posts." },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.warn("Error disconnecting from database:", disconnectError);
    }
  }
}

// POST - Create a new blog post (admin only)
export async function POST(request: Request) {
  try {
    const { title, slug, excerpt, content, authorId, tags, featuredImage, status } = await request.json();

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !authorId) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    await prisma.$connect();

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return NextResponse.json(
        { message: "A blog post with this slug already exists." },
        { status: 409 }
      );
    }

    // Calculate read time
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        authorId,
        tags: tags || [],
        featuredImage,
        status: status || 'draft',
        readTime,
        publishedAt: status === 'published' ? new Date() : null
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        status: post.status,
        tags: post.tags,
        featuredImage: post.featuredImage,
        readTime: post.readTime
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Failed to create blog post." },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.warn("Error disconnecting from database:", disconnectError);
    }
  }
} 