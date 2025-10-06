// src/app/api/orders/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { sendOrderNotificationEmail } from "../../../lib/email";

const prisma = new PrismaClient();

// Handler for POST requests (Booking New Orders)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const { serviceType, description } = await request.json();

    // Basic validation
    if (!serviceType) {
      return NextResponse.json(
        { message: "Service type is required." },
        { status: 400 }
      );
    }

    // Create the new order in the database
    const newOrder = await prisma.order.create({
      data: {
        serviceType,
        description,
        userId: session.user.id,
        status: "Pending",
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "Order booked successfully!", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking order:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handler for GET requests (Fetching User's Orders or All Orders for Admin)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    let orders;
    if (session.user.role === "ADMIN") {
      // If the user is an ADMIN, fetch ALL orders
      orders = await prisma.order.findMany({
        orderBy: {
          orderDate: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });
    } else {
      // If not an ADMIN, fetch only the logged-in user's orders
      orders = await prisma.order.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          orderDate: "desc",
        },
      });
    }

    return NextResponse.json({ orders: orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Handler for PATCH requests (Updating Order Status with Admin Notes - Admin Only)
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

    const { orderId, status, adminNotes, action } = await request.json();

    // Basic validation
    if (!orderId || !status) {
      return NextResponse.json(
        { message: "Order ID and status are required." },
        { status: 400 }
      );
    }

    // Validate status to be one of the allowed enum values
    const allowedStatuses = ["Pending", "Processing", "Completed", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: `Invalid status provided. Must be one of: ${allowedStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // For accept/reject/update actions, admin notes are required
    if ((action === 'accept' || action === 'reject' || action === 'update') && !adminNotes?.trim()) {
      return NextResponse.json(
        { message: "Admin notes are required when accepting, rejecting, or updating an order." },
        { status: 400 }
      );
    }

    // Get the order with user details for email notification
    const orderWithUser = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    if (!orderWithUser) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      status: status,
      adminResponseDate: new Date(),
    };

    // Add admin notes if provided
    if (adminNotes?.trim()) {
      updateData.adminNotes = adminNotes.trim();
    }

    // Update the order in the database
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    // Send email notification to client (if email is available)
    if (orderWithUser.user?.email && (action === 'accept' || action === 'reject' || action === 'update')) {
      try {
        const emailResult = await sendOrderNotificationEmail({
          to: orderWithUser.user.email,
          userName: orderWithUser.user.name || 'Valued Customer',
          orderId: orderId,
          serviceType: orderWithUser.serviceType,
          status: status,
          adminNotes: adminNotes,
          action: action
        });

        if (emailResult.success) {
          // Mark email as sent
          await prisma.order.update({
            where: { id: orderId },
            data: {
              emailSent: true,
              emailSentAt: new Date(),
            }
          });
        }
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    // Return success response
    return NextResponse.json(
      { 
        message: `Order ${action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'updated'} successfully!`,
        order: updatedOrder 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

