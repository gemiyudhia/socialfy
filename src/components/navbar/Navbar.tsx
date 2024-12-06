"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const { status }: { status: string } =
    useSession();

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4">
      <nav className="flex justify-center items-center">
        <div className="flex justify-between w-full mx-6">
          <Link href="/home">
            <FaHome
              className={`${
                pathname === "/home" ? "bg-white text-gray-800" : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>
          <Link href="/posting">
            <FaPlus
              className={`${
                pathname === "/posting"
                  ? "bg-white text-gray-800"
                  : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>
          <Link href="/profile">
            <FaUser
              className={`${
                pathname === "/profile"
                  ? "bg-white text-gray-800"
                  : "text-white"
              } text-4xl p-1 rounded-lg`}
            />
          </Link>

          {status === "authenticated" && (
            <Button onClick={() => signOut({ callbackUrl: "/login" })}>
              Logout
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
