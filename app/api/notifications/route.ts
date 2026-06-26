import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Get notifications for the current user, latest first
    const notifications = await prisma.notification.findMany({
      where: { userId: auth.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    // Get unread count
    const unreadCount = await prisma.notification.count({
      where: { userId: auth.id, isRead: false },
    });

    return NextResponse.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("GET /api/notifications error:", error);
    return NextResponse.json({ error: "Unable to fetch notifications." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { type, title, message, relatedCustomerId } = body;

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, message" },
        { status: 400 }
      );
    }

    const notification = await prisma.notification.create({
      data: {
        userId: auth.id,
        type,
        title,
        message,
        relatedCustomerId: relatedCustomerId || null,
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error("POST /api/notifications error:", error);
    return NextResponse.json({ error: "Unable to create notification." }, { status: 500 });
  }
}
