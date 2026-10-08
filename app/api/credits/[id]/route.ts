import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("PATCH /api/credits/[id]:", id);

  try {
    const body = await request.json();
    const { customerId, amount, note, date } = body;

    if (!customerId || !amount || amount <= 0 || !date) {
      return NextResponse.json({ error: "Invalid credit payload." }, { status: 400 });
    }

    const customer = await prisma.customer.findFirst({ where: { id: customerId, userId: auth.id } });
    if (!customer) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const result = await prisma.credit.updateMany({
      where: { id, customer: { is: { userId: auth.id } } },
      data: {
        customerId: customer.id,
        amount: Number(amount),
        note: note?.trim() || null,
        createdAt: new Date(date),
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Credit not found." }, { status: 404 });
    }

    const credit = await prisma.credit.findFirst({
      where: { id, customer: { is: { userId: auth.id } } },
      include: { customer: true },
    });

    return NextResponse.json({ credit });
  } catch (error) {
    console.error("PATCH /api/credits/[id] error:", error);
    return NextResponse.json({ error: "Unable to update credit." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("DELETE /api/credits/[id]:", id);

  try {
    const result = await prisma.credit.deleteMany({ where: { id, customer: { is: { userId: auth.id } } } });
    if (result.count === 0) {
      return NextResponse.json({ error: "Credit not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/credits/[id] error:", error);
    return NextResponse.json({ error: "Unable to delete credit." }, { status: 500 });
  }
}
