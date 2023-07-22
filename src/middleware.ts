import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  console.debug("---middleware-entry--", Date.now());
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const loginUrl = new URL("/admin/login", new URL(req.url).origin);
  const successUrl = new URL("/admin", new URL(req.url).origin);

  if (req.cookies.has("token")) {
    try {
      const jwt = req.cookies.get("token")!.value;
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);

      console.debug("---middleware-1--", Date.now());
      await jose.jwtVerify(jwt, secret);
      console.debug("---middleware-2--", Date.now());

      if (isLoginPage) return NextResponse.redirect(successUrl);
    } catch (error) {
      console.debug("---middleware-?--", Date.now());
      if (isLoginPage) return NextResponse.next();

      return NextResponse.redirect(loginUrl);
    }
  } else if (!isLoginPage) {
    return NextResponse.redirect(loginUrl);
  }

  console.debug("---middleware-exit--", Date.now());
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin/login"],
};
