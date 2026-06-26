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

    const customer = await prisma.customer.update({
      where: { id },
      data: { name: name.trim(), phone: phone?.trim() || null, address: address?.trim() || null },
    });

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
    await prisma.$transaction([
      prisma.payment.deleteMany({ where: { customerId: id } }),
      prisma.credit.deleteMany({ where: { customerId: id } }),
      prisma.customer.delete({ where: { id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Unable to delete customer." }, { status: 500 });
  }
}
