import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, requireApiUser } from "@/lib/auth";
import { notifyCustomerAdded } from "@/lib/notifications";

export async function GET(request: Request) {
  await requireUser();
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || "";

  const term = search.trim();
  const customers = await prisma.customer.findMany({
    where: term
      ? {
          OR: [
            { name: { contains: term, mode: "insensitive" } },
            { phone: { contains: term, mode: "insensitive" } },
          ],
        }
      : {},
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ customers });
}

export async function POST(request: Request) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { name, phone, address } = body;

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: "Customer name is required." }, { status: 400 });
  }

  const customer = await prisma.customer.create({
    data: { name: name.trim(), phone: phone?.trim() || null, address: address?.trim() || null },
  });

  // Create notification
  try {
    await notifyCustomerAdded(auth.id, customer.name, customer.id);
  } catch (error) {
    console.error("Error creating customer notification:", error);
    // Don't fail the request if notification fails
  }

  return NextResponse.json({ customer });
}
