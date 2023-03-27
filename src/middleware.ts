import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const loginUrl = new URL("/admin/login", new URL(req.url).origin);
  const successUrl = new URL("/admin/temalar", new URL(req.url).origin);

  if (req.cookies.has("token")) {
    try {
      const jwt = req.cookies.get("token")!.value;
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

      await jose.jwtVerify(jwt, secret);

      if (isLoginPage) return NextResponse.redirect(successUrl);
    } catch (error) {
      if (isLoginPage) return NextResponse.next();

      return NextResponse.redirect(loginUrl);
    }
  } else if (!isLoginPage) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/temalar/:path*", "/admin/login"],
};
