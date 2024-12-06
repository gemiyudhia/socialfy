import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Jika user sudah login dan mencoba mengakses /login
  if (pathname === "/login" && token) {
    const homeUrl = new URL("/home", req.url); // Halaman utama yang diinginkan
    return NextResponse.redirect(homeUrl);
  }

  // Jika user tidak memiliki token dan mencoba mengakses halaman yang memerlukan autentikasi
  if (!token && !["/login", "/register"].includes(pathname)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", encodeURI(req.url)); // Tambahkan callbackUrl
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/profile", "/posting", "/login", "/register"], // Tambahkan semua halaman yang diperiksa
};
