import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, requireApiUser } from "@/lib/auth";
import { notifyCreditAdded } from "@/lib/notifications";

export async function GET(request: Request) {
  await requireUser();
  const credits = await prisma.credit.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
  return NextResponse.json({ credits });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { customerId, amount, note, date } = body;

  if (!customerId || !amount || amount <= 0 || !date) {
    return NextResponse.json({ error: "Invalid credit payload." }, { status: 400 });
  }

  const credit = await prisma.credit.create({
    data: {
      amount: Number(amount),
      note: note?.trim() || null,
      createdAt: new Date(date),
      customer: { connect: { id: customerId } },
    },
    include: { customer: true },
  });

  // Create notification
  try {
    await notifyCreditAdded(auth.id, credit.customer.name, credit.amount, customerId);
  } catch (error) {
    console.error("Error creating credit notification:", error);
    // Don't fail the request if notification fails
  }

  return NextResponse.json({ credit });
}
