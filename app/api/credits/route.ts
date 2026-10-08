import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";
import { notifyCreditAdded } from "@/lib/notifications";
import { creditSchema } from "@/lib/validators";

export async function GET() {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;
  const credits = await prisma.credit.findMany({
    where: { customer: { is: { userId: auth.id } } },
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
  return NextResponse.json({ credits }, { headers: { "Cache-Control": "private, no-store" } });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const parsed = creditSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid credit payload." }, { status: 400 });
  }
  const { customerId, amount, note, date } = parsed.data;

  const customer = await prisma.customer.findFirst({ where: { id: customerId, userId: auth.id } });
  if (!customer) {
    return NextResponse.json({ error: "Customer not found." }, { status: 404 });
  }

  const credit = await prisma.credit.create({
    data: {
      amount: Number(amount),
      note: note?.trim() || null,
      createdAt: new Date(`${date}T00:00:00.000Z`),
      customerId: customer.id,
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
