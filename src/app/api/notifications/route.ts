// src/app/api/notifications/route.ts

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

    // 4. Fetch notifications with proper error handling
    let unreadMessagesCount = 0;
    let pendingOrdersCount = 0;
    let recentNotifications: any[] = [];

    try {
      // Check if Message model exists and is accessible
      unreadMessagesCount = await prisma.message.count({
        where: {
          recipientId: session.user.id,
          read: false,
        },
      });
    } catch (messageError) {
      console.warn("Message model not accessible:", messageError);
      // Continue without message notifications
    }

    try {
      // Check if Order model exists and is accessible
      pendingOrdersCount = await prisma.order.count({
        where: {
          status: "Pending",
        },
      });
    } catch (orderError) {
      console.warn("Order model not accessible:", orderError);
      // Continue without order notifications
    }

    // 5. Fetch recent notifications with error handling
    try {
      const [messages, orders] = await Promise.allSettled([
        prisma.message.findMany({
          where: {
            recipientId: session.user.id,
            read: false,
          },
          select: { 
            id: true, 
            content: true, 
            timestamp: true, 
            sender: { select: { name: true, email: true } } 
          },
          orderBy: { timestamp: 'desc' },
          take: 5,
        }),
        prisma.order.findMany({
          where: {
            status: "Pending",
          },
          select: { 
            id: true, 
            serviceType: true, 
            orderDate: true, 
            user: { select: { name: true, email: true } } 
          },
          orderBy: { orderDate: 'desc' },
          take: 5,
        })
      ]);

      const messagesData = messages.status === 'fulfilled' ? messages.value : [];
      const ordersData = orders.status === 'fulfilled' ? orders.value : [];

      const msgs = messagesData.map((msg: any) => ({
        id: msg.id,
        type: 'message',
        content: `New message from ${msg.sender?.name || msg.sender?.email}: ${msg.content.substring(0, 30)}...`,
        timestamp: msg.timestamp,
        read: false,
      }));

      const ords = ordersData.map((order: any) => ({
        id: order.id,
        type: 'order',
        content: `New pending order: ${order.serviceType} by ${order.user?.name || order.user?.email}.`,
        timestamp: order.orderDate,
        read: false,
      }));

      recentNotifications = [...msgs, ...ords].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (notificationError) {
      console.warn("Error fetching recent notifications:", notificationError);
      recentNotifications = [];
    }

    return NextResponse.json({
      totalNotifications: unreadMessagesCount + pendingOrdersCount,
      unreadMessages: unreadMessagesCount,
      pendingOrders: pendingOrdersCount,
      recentNotifications: recentNotifications.slice(0, 10),
    }, { status: 200 });

  } catch (error) {
    console.error("Error in notifications API:", error);
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

export async function PATCH(request: Request) {
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

    // 3. Mark all notifications as read
    try {
      await prisma.$connect();
      
      // Mark all messages as read for this admin
      await prisma.message.updateMany({
        where: {
          recipientId: session.user.id,
          read: false,
        },
        data: {
          read: true,
        },
      });

      return NextResponse.json({ message: "All notifications marked as read." }, { status: 200 });
    } catch (dbError) {
      console.error("Error marking notifications as read:", dbError);
      return NextResponse.json(
        { message: "Failed to mark notifications as read." },
        { status: 500 }
      );
    } finally {
      try {
        await prisma.$disconnect();
      } catch (disconnectError) {
        console.warn("Error disconnecting from database:", disconnectError);
      }
    }
  } catch (error) {
    console.error("Error in notifications PATCH API:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}