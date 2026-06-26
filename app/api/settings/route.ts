import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, requireApiUser, verifyPassword } from "@/lib/auth";
import { settingsSchema, shopSettingsSchema, profilePhotoSchema } from "@/lib/validators";

export async function PATCH(request: NextRequest) {
  const auth = await requireApiUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { type = "profile" } = body;

    const user = await prisma.user.findUnique({
      where: { id: auth.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Profile settings (name, email, password)
    if (type === "profile") {
      const parsed = settingsSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
      }

      const { name, email, currentPassword, newPassword } = parsed.data;

      if (email !== user.email) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return NextResponse.json({ error: "Email is already in use." }, { status: 409 });
        }
      }

      const updateData: { name: string; email: string; password?: string } = {
        name: name.trim(),
        email: email.trim(),
      };

      if (newPassword) {
        const isValidPassword = await verifyPassword(currentPassword ?? "", user.password);
        if (!isValidPassword) {
          return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
        }

        updateData.password = await hashPassword(newPassword);
      }

      const updatedUser = await prisma.user.update({
        where: { id: auth.id },
        data: updateData,
        select: { 
          id: true, 
          name: true, 
          email: true, 
          profilePhotoUrl: true,
          shopName: true,
          shopPhone: true,
          shopAddress: true,
          shopLogoUrl: true,
        },
      });

      return NextResponse.json({ user: updatedUser });
    }

    // Shop settings
    if (type === "shop") {
      const parsed = shopSettingsSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
      }

      const { shopName, shopPhone, shopAddress } = parsed.data;

      const updatedUser = await prisma.user.update({
        where: { id: auth.id },
        data: {
          shopName: shopName?.trim() || null,
          shopPhone: shopPhone?.trim() || null,
          shopAddress: shopAddress?.trim() || null,
        },
        select: { 
          id: true, 
          name: true, 
          email: true, 
          profilePhotoUrl: true,
          shopName: true,
          shopPhone: true,
          shopAddress: true,
          shopLogoUrl: true,
        },
      });

      return NextResponse.json({ user: updatedUser });
    }

    // Profile photo
    if (type === "profilePhoto") {
      const parsed = profilePhotoSchema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
      }

      const { profilePhotoUrl } = parsed.data;

      const updatedUser = await prisma.user.update({
        where: { id: auth.id },
        data: {
          profilePhotoUrl: profilePhotoUrl || null,
        },
        select: { 
          id: true, 
          name: true, 
          email: true, 
          profilePhotoUrl: true,
          shopName: true,
          shopPhone: true,
          shopAddress: true,
          shopLogoUrl: true,
        },
      });

      return NextResponse.json({ user: updatedUser });
    }

    // Shop logo
    if (type === "shopLogo") {
      const { shopLogoUrl } = body;

      if (!shopLogoUrl || typeof shopLogoUrl !== "string") {
        return NextResponse.json({ error: "Invalid logo URL." }, { status: 400 });
      }

      const updatedUser = await prisma.user.update({
        where: { id: auth.id },
        data: {
          shopLogoUrl: shopLogoUrl.trim() || null,
        },
        select: { 
          id: true, 
          name: true, 
          email: true, 
          profilePhotoUrl: true,
          shopName: true,
          shopPhone: true,
          shopAddress: true,
          shopLogoUrl: true,
        },
      });

      return NextResponse.json({ user: updatedUser });
    }

    return NextResponse.json({ error: "Invalid request type." }, { status: 400 });
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json({ error: "Unable to update settings." }, { status: 500 });
  }
}
