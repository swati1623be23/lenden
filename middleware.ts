import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

const protectedPrefixes = ["/dashboard", "/customers", "/credits", "/payments", "/balances", "/reports", "/settings"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((path) => pathname.startsWith(path));
  const isAuthPage = authPaths.includes(pathname);

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/customers/:path*", "/credits/:path*", "/payments/:path*", "/balances/:path*", "/reports/:path*", "/settings/:path*", "/login", "/register"],
};
