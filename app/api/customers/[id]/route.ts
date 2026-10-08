import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("PATCH /api/customers/[id]:", id);

  try {
    const body = await request.json();
    const { name, phone, address } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Customer name is required." }, { status: 400 });
    }

    const result = await prisma.customer.updateMany({
      where: { id, userId: auth.id },
      data: { name: name.trim(), phone: phone?.trim() || null, address: address?.trim() || null },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const customer = await prisma.customer.findFirst({ where: { id, userId: auth.id } });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("PATCH /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Unable to update customer." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  console.log("DELETE /api/customers/[id]:", id);

  try {
    const [, , deleted] = await prisma.$transaction([
      prisma.payment.deleteMany({ where: { customerId: id, customer: { is: { userId: auth.id } } } }),
      prisma.credit.deleteMany({ where: { customerId: id, customer: { is: { userId: auth.id } } } }),
      prisma.customer.deleteMany({ where: { id, userId: auth.id } }),
    ]);

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Unable to delete customer." }, { status: 500 });
  }
}
