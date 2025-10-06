// src/app/api/admin/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Find the first admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true, name: true, email: true }
    });

    if (!adminUser) {
      return NextResponse.json(
        { message: "No admin user found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ admin: adminUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin user:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}