// src/app/api/blog/admin/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all blog posts (admin only)
export async function GET() {
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

    await prisma.$connect();

    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
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
