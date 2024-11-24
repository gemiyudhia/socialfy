import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // Cek jika halaman membutuhkan autentikasi dan pastikan pengguna sudah login
    if (requireAuth.includes(pathname) || pathname === "/") {
      const token = await getToken({
        req,
      });

      // Jika tidak ada token dan halaman bukan login/register, arahkan ke halaman login
      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Jika ada token dan mengakses halaman login/register, arahkan ke halaman utama
      if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Lanjutkan ke middleware berikutnya
    return middleware(req, next);
  };
}
