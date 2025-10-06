// src/app/api/blog/admin/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT - Update a blog post (admin only)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    // Check admin role
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Access Denied. Admin privileges required." }, { status: 403 });
    }

    const { id } = params;
    const { title, excerpt, content, tags, featuredImage, status } = await request.json();

    await prisma.$connect();

    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
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
      where: { id },
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    // Check admin role
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Access Denied. Admin privileges required." }, { status: 403 });
    }

    const { id } = params;

    await prisma.$connect();

    const existingPost = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id }
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
