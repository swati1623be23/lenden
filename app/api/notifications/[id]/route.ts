import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  try {
    // Verify the notification belongs to the user
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== auth.id) {
      return NextResponse.json({ error: "Notification not found." }, { status: 404 });
    }

    const body = await request.json();
    const { isRead } = body;

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: isRead ?? true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/notifications/[id] error:", error);
    return NextResponse.json({ error: "Unable to update notification." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  try {
    // Verify the notification belongs to the user
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.userId !== auth.id) {
      return NextResponse.json({ error: "Notification not found." }, { status: 404 });
    }

    await prisma.notification.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Notification deleted." });
  } catch (error) {
    console.error("DELETE /api/notifications/[id] error:", error);
    return NextResponse.json({ error: "Unable to delete notification." }, { status: 500 });
  }
}
