// src/app/api/blog/[slug]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch a single blog post by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    await prisma.$connect();

    const post = await prisma.blogPost.findUnique({
      where: { 
        slug,
        status: 'published'
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

    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    // Get related posts (same tags, excluding current post)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        id: { not: post.id },
        tags: {
          hasSome: post.tags
        }
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
      },
      take: 3
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
      },
      relatedPosts: relatedPosts.map(relatedPost => ({
        id: relatedPost.id,
        title: relatedPost.title,
        slug: relatedPost.slug,
        excerpt: relatedPost.excerpt,
        author: relatedPost.author,
        publishedAt: relatedPost.publishedAt,
        tags: relatedPost.tags,
        featuredImage: relatedPost.featuredImage,
        readTime: relatedPost.readTime
      }))
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog post." },
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

// PUT - Update a blog post (admin only)
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { title, excerpt, content, tags, featuredImage, status } = await request.json();

    await prisma.$connect();

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    // Calculate read time
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: {
        title,
        excerpt,
        content,
        tags: tags || [],
        featuredImage,
        status,
        readTime,
        publishedAt: status === 'published' && !existingPost.publishedAt ? new Date() : existingPost.publishedAt,
        updatedAt: new Date()
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
        id: updatedPost.id,
        title: updatedPost.title,
        slug: updatedPost.slug,
        excerpt: updatedPost.excerpt,
        content: updatedPost.content,
        author: updatedPost.author,
        publishedAt: updatedPost.publishedAt,
        updatedAt: updatedPost.updatedAt,
        status: updatedPost.status,
        tags: updatedPost.tags,
        featuredImage: updatedPost.featuredImage,
        readTime: updatedPost.readTime
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "Failed to update blog post." },
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

// DELETE - Delete a blog post (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    await prisma.$connect();

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { slug }
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully."
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "Failed to delete blog post." },
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
