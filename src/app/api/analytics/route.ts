// src/app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

      // Fetch all orders with user data
      const orders = await prisma.order.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              createdAt: true,
            }
          }
        },
        orderBy: {
          orderDate: 'desc'
        }
      });

      // Fetch all users
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Calculate analytics
      const totalOrders = orders.length;
      const totalUsers = users.filter(user => user.role === 'USER').length;
      const completedOrders = orders.filter(order => order.status === "Completed").length;
      const pendingOrders = orders.filter(order => order.status === "Pending").length;
      const processingOrders = orders.filter(order => order.status === "Processing").length;
      const cancelledOrders = orders.filter(order => order.status === "Cancelled").length;
      
      // Calculate revenue (assuming $299 per completed order)
      const revenue = completedOrders * 299;
      
      // Calculate conversion rate
      const conversionRate = totalUsers > 0 ? Math.round((completedOrders / totalUsers) * 100) : 0;
      
      // Get recent activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentActivity = orders.filter(order => new Date(order.orderDate) >= sevenDaysAgo).length;
      
      // Get service distribution
      const serviceDistribution: { [key: string]: number } = {};
      orders.forEach(order => {
        serviceDistribution[order.serviceType] = (serviceDistribution[order.serviceType] || 0) + 1;
      });
      
      // Calculate monthly growth (simplified)
      const monthlyGrowth = {
        orders: Math.round(totalOrders * 0.15), // 15% growth
        users: Math.round(totalUsers * 0.12),   // 12% growth
        revenue: Math.round(revenue * 0.15)     // 15% growth
      };

      // Get orders by status for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentOrders = orders.filter(order => new Date(order.orderDate) >= thirtyDaysAgo);
      
      const recentOrdersByStatus = {
        completed: recentOrders.filter(order => order.status === "Completed").length,
        pending: recentOrders.filter(order => order.status === "Pending").length,
        processing: recentOrders.filter(order => order.status === "Processing").length,
        cancelled: recentOrders.filter(order => order.status === "Cancelled").length,
      };

      // Get top performing services
      const topServices = Object.entries(serviceDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([service, count]) => ({ service, count }));

      return NextResponse.json({
        success: true,
        analytics: {
          totalOrders,
          totalUsers,
          completedOrders,
          pendingOrders,
          processingOrders,
          cancelledOrders,
          revenue,
          conversionRate,
          recentActivity,
          serviceDistribution,
          monthlyGrowth,
          recentOrdersByStatus,
          topServices
        },
        orders: orders.map(order => ({
          id: order.id,
          serviceType: order.serviceType,
          description: order.description,
          status: order.status,
          orderDate: order.orderDate,
          userId: order.userId,
          adminNotes: order.adminNotes,
          adminResponseDate: order.adminResponseDate,
          user: order.user
        })),
        users: users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }))
      }, { status: 200 });

    } catch (dbError) {
      console.error("Database error in analytics API:", dbError);
      return NextResponse.json(
        { message: "Database connection error. Please try again." },
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
    console.error("Error in analytics API:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
