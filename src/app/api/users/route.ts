// src/app/api/users/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check if user is authenticated
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    // 2. Check if user has ADMIN role
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Access Denied. Admin privileges required." }, { status: 403 });
    }

    // 3. Test database connection first
    try {
      await prisma.$connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json(
        { message: "Database connection error. Please try again later." },
        { status: 503 }
      );
    }

    // 4. If authenticated and admin, fetch all users with error handling
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ users: allUsers }, { status: 200 });
    } catch (queryError) {
      console.error("Error fetching users from database:", queryError);
      return NextResponse.json(
        { message: "Database query error. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in users API:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
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