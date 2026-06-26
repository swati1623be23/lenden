import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  try {
    // Mark all notifications as read for the current user
    await prisma.notification.updateMany({
      where: { userId: auth.id, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({ message: "All notifications marked as read." });
  } catch (error) {
    console.error("PATCH /api/notifications/mark-all-read error:", error);
    return NextResponse.json({ error: "Unable to mark notifications as read." }, { status: 500 });
  }
}
