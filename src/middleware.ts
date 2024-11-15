import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(requset: NextRequest) {
  const isLogin = false
  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", requset.url))
  }
}

export const config = {
  matcher: ["/",]
}