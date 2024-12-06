import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// Halaman yang tidak memerlukan autentikasi
const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = ["/home"] // Daftar halaman yang memerlukan autentikasi
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // Cek token autentikasi
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Jika halaman termasuk dalam `authPage` (login/register)
    if (authPage.includes(pathname)) {
      // Jika token ditemukan, redirect ke halaman utama
      if (token) {
        return NextResponse.redirect(new URL("/home", req.url));
      }
      return NextResponse.next(); // Izinkan akses ke login/register jika tidak ada token
    }

    // Jika halaman memerlukan autentikasi
    if (requireAuth.includes(pathname)) {
      // Jika token tidak ditemukan, redirect ke login
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }

    // Lanjutkan ke middleware berikutnya
    return middleware(req, next);
  };
}
