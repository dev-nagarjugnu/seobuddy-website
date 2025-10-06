// src/app/api/user/password/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // <-- CORRECTED IMPORT PATH
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check if user is authenticated
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const { newPassword } = await request.json();

    // Basic validation
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: session.user.id }, // Update currently logged-in user
      data: { password: hashedPassword },
    });

    // Return success response
    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user password:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}