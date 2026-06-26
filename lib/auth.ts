import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const JWT_SECRET = process.env.JWT_SECRET || "change-me-please";
export const COOKIE_NAME = "ld_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getCurrentUser() {
  const token = await getSessionToken();
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  return prisma.user.findUnique({
    where: { id: payload.userId },
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
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireApiUser() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return user;
}
