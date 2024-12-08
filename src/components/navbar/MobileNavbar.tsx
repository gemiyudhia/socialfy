'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";

export default function MobileNavbar() {

  const pathname = usePathname();
  return (
    <div className="fixed rounded-full bottom-4 pt-5 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.2)] md:hidden">
      <nav className="flex justify-center items-center">
        <div className="flex justify-between w-full max-w-md mx-12 relative">
          {/* Link Home */}
          <Link href="/">
            <FaHome
              className={`${
                pathname === "/" ? "text-gray-800" : "text-gray-400"
              } text-3xl`}
            />
          </Link>

          {/* Link Posting */}
          <Link href="/post">
            <div className="relative -top-10 bg-textPrimary p-5 rounded-full shadow-md">
              <FaPlus
                className={`${
                  pathname === "/post" ? "text-white" : "text-white"
                } text-3xl`}
              />
            </div>
          </Link>

          {/* Link Profile */}
          <Link href="/profile">
            <FaUser
              className={`${
                pathname === "/profile" ? "text-gray-800" : "text-gray-400"
              } text-3xl`}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}