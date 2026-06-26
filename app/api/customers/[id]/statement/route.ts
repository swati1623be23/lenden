import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireApiUser } from "@/lib/auth";
import { generateCustomerStatement, getStatementFilename } from "@/lib/pdf/generateStatement";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  try {
    const [customer, user] = await Promise.all([
      prisma.customer.findUnique({
        where: { id },
        include: {
          credits: {
            select: { amount: true, note: true, createdAt: true },
            orderBy: { createdAt: "desc" },
          },
          payments: {
            select: { amount: true, createdAt: true },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.user.findUnique({
        where: { id: auth.id },
        select: { shopName: true, shopLogoUrl: true },
      }),
    ]);

    if (!customer) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const pdfBytes = await generateCustomerStatement({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      credits: customer.credits,
      payments: customer.payments,
      generatedAt: new Date(),
      shopName: user?.shopName || null,
      shopLogoUrl: user?.shopLogoUrl || null,
    });

    const filename = getStatementFilename(customer.name);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/customers/[id]/statement error:", error);
    return NextResponse.json({ error: "Unable to generate statement." }, { status: 500 });
  }
}
