import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, requireApiUser } from "@/lib/auth";
import { notifyPaymentAdded } from "@/lib/notifications";

export async function GET(request: Request) {
  await requireUser();
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
  return NextResponse.json({ payments });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { customerId, amount, date } = body;

  if (!customerId || !amount || amount <= 0 || !date) {
    return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
  }

  const payment = await prisma.payment.create({
    data: {
      amount: Number(amount),
      createdAt: new Date(date),
      customer: { connect: { id: customerId } },
    },
    include: { customer: true },
  });

  // Create notification
  try {
    await notifyPaymentAdded(auth.id, payment.customer.name, payment.amount, customerId);
  } catch (error) {
    console.error("Error creating payment notification:", error);
    // Don't fail the request if notification fails
  }

  return NextResponse.json({ payment });
}
