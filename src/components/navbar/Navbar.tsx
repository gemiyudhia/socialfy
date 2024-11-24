"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4">
      <nav className="flex justify-center items-center">
        <div className="flex justify-between w-full mx-6">
          <Link href="/">
            <FaHome
              className={`${
                pathname === "/" ? "bg-white text-gray-800" : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>
          <Link href="/posting">
            <FaPlus
              className={`${
                pathname === "/posting" ? "bg-white text-gray-800" : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>
          <Link href="/profile">
            <FaUser
              className={`${
                pathname === "/profile" ? "bg-white text-gray-800" : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
