import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await verifyPassword(parsed.data.password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = signToken({ userId: user.id });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch {
    return NextResponse.json({ error: "Unable to log in. Please try again." }, { status: 500 });
  }
}
