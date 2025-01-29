import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const requestToNext = req.nextUrl.pathname === "/api/admin/login";
  const isLoginPageRequest = req.nextUrl.pathname === "/admin/login";
  const isApiRequest = req.nextUrl.pathname.startsWith("/api");
  const loginUrl = new URL("/admin/login", new URL(req.url).origin);
  const adminHomeUrl = new URL("/admin", new URL(req.url).origin);

  if (requestToNext) return NextResponse.next();

  if (!req.cookies.get("token")?.value) {
    if (isApiRequest) return new NextResponse(null, { status: 401 });
    if (isLoginPageRequest) return NextResponse.next();
    return NextResponse.redirect(loginUrl);
  }

  try {
    const jwt = req.cookies.get("token")!.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
    await jose.jwtVerify(jwt, secret);

    if (isLoginPageRequest) return NextResponse.redirect(adminHomeUrl);
    return NextResponse.next();
  } catch (error) {
    if (isApiRequest) return new NextResponse(null, { status: 401 });
    if (isLoginPageRequest) return NextResponse.next();
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    // "/api/:path*"
  ],
};
