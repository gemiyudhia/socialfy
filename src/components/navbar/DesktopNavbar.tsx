"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import Header from "../homeComponent/Header";

export default function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col justify-center fixed top-0 left-0 h-full w-1/6 bg-gray-100 shadow-xl border-r-[1px] border-slate-300">
      <div className="mx-5">
        <Header />
      </div>
      <nav className="flex flex-col space-y-12 mx-5 mt-10">
        {/* Link Home */}
        <Link href="/" className="flex items-center gap-x-6">
          <FaHome
            className={`${
              pathname === "/" ? "text-gray-800" : "text-gray-400"
            } text-3xl ml-3`}
          />
          <p
            className={`${
              pathname === "/"
                ? "text-lg font-semibold"
                : "text-gray-400 text-lg font-semibold"
            }`}
          >
            Home
          </p>
        </Link>

        {/* Link Posting */}
        <Link href="/post" className="flex items-center gap-x-3">
          <div className="bg-textPrimary p-3 rounded-full shadow-md">
            <FaPlus
              className={`${
                pathname === "/post" ? "text-white" : "text-white"
              } text-3xl`}
            />
          </div>
          <p
            className={`${
              pathname === "/post"
                ? "text-lg font-semibold"
                : "text-gray-400 text-lg font-semibold"
            }`}
          >
            Create
          </p>
        </Link>

        {/* Link Profile */}
        <Link href="/profile" className="flex items-center gap-x-6">
          <FaUser
            className={`${
              pathname === "/profile" ? "text-gray-800" : "text-gray-400"
            } text-3xl ml-3`}
          />
          <p
            className={`${
              pathname === "/profile"
                ? "text-lg font-semibold"
                : "text-gray-400 text-lg font-semibold"
            }`}
          >
            Profile
          </p>
        </Link>
      </nav>
    </div>
  );
}
