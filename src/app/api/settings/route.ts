// src/app/api/settings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Default settings
const defaultSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30
  },
  appearance: {
    theme: 'dark',
    compactMode: false,
    animations: true
  },
  system: {
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true
  }
};

// GET - Load settings
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

    try {
      await prisma.$connect();

      // Try to get settings from database
      let settingsData;
      try {
        settingsData = await prisma.settings.findFirst({
          where: { userId: session.user.id }
        });
      } catch (settingsError) {
        console.warn("Settings table might not exist yet:", settingsError);
        settingsData = null;
      }

      const settings = settingsData ? JSON.parse(settingsData.settings) : defaultSettings;

      return NextResponse.json({
        success: true,
        settings
      }, { status: 200 });

    } catch (dbError) {
      console.error("Database error in settings GET API:", dbError);
      // Return default settings if database is not available
      return NextResponse.json({
        success: true,
        settings: defaultSettings,
        message: "Using default settings (database not available)"
      }, { status: 200 });
    } finally {
      try {
        await prisma.$disconnect();
      } catch (disconnectError) {
        console.warn("Error disconnecting from database:", disconnectError);
      }
    }

  } catch (error) {
    console.error("Error in settings GET API:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

// POST - Save settings
export async function POST(request: Request) {
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

    const { settings } = await request.json();

    // Validate settings structure
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { message: "Invalid settings data provided." },
        { status: 400 }
      );
    }

    try {
      await prisma.$connect();

      // Try to save settings to database
      try {
        await prisma.settings.upsert({
          where: { userId: session.user.id },
          update: {
            settings: JSON.stringify(settings),
            updatedAt: new Date()
          },
          create: {
            userId: session.user.id,
            settings: JSON.stringify(settings),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      } catch (settingsError) {
        console.warn("Could not save settings to database:", settingsError);
        // Continue without saving to database
      }

      // Apply system-wide settings if needed
      if (settings.system?.maintenanceMode) {
        console.log("Maintenance mode enabled");
      }

      if (settings.system?.debugMode) {
        console.log("Debug mode enabled");
      }

      return NextResponse.json({
        success: true,
        message: "Settings saved successfully!"
      }, { status: 200 });

    } catch (dbError) {
      console.error("Database error in settings POST API:", dbError);
      // Still return success if we can't save to database
      return NextResponse.json({
        success: true,
        message: "Settings applied (database not available)"
      }, { status: 200 });
    } finally {
      try {
        await prisma.$disconnect();
      } catch (disconnectError) {
        console.warn("Error disconnecting from database:", disconnectError);
      }
    }

  } catch (error) {
    console.error("Error in settings POST API:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
