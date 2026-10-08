import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("PATCH /api/payments/[id]:", id);

  try {
    const body = await request.json();
    const { customerId, amount, date } = body;

    if (!customerId || !amount || amount <= 0 || !date) {
      return NextResponse.json({ error: "Invalid payment payload." }, { status: 400 });
    }

    const customer = await prisma.customer.findFirst({ where: { id: customerId, userId: auth.id } });
    if (!customer) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const result = await prisma.payment.updateMany({
      where: { id, customer: { is: { userId: auth.id } } },
      data: {
        customerId: customer.id,
        amount: Number(amount),
        createdAt: new Date(date),
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }

    const payment = await prisma.payment.findFirst({
      where: { id, customer: { is: { userId: auth.id } } },
      include: { customer: true },
    });

    return NextResponse.json({ payment });
  } catch (error) {
    console.error("PATCH /api/payments/[id] error:", error);
    return NextResponse.json({ error: "Unable to update payment." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("DELETE /api/payments/[id]:", id);

  try {
    const result = await prisma.payment.deleteMany({ where: { id, customer: { is: { userId: auth.id } } } });
    if (result.count === 0) {
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/payments/[id] error:", error);
    return NextResponse.json({ error: "Unable to delete payment." }, { status: 500 });
  }
}
