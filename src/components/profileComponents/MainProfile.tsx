"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MainProfile() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">MyProfile</h1>
        </div>
      </header>

      {/* Profile Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <Image
            src=""
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div className="ml-8 flex-1">
            <div className="flex items-center space-x-8 justify-between">
              {status === "authenticated" && <h4>{session?.user?.username}</h4>}
              <Link
                href="/profile/edit-profile"
                className="bg-gray-200 px-4 py-1 rounded text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Edit Profile
              </Link>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
            <div className="flex space-x-6 mt-4">
              <div>
                <span className="font-semibold">125</span> posts
              </div>
             
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Web Developer | Coffee Enthusiast | Traveler 🌍
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {/* Example Thumbnails */}
          <div className="aspect-square bg-gray-200">
            <Image src="" alt="Post Thumbnail" className="object-cover" />
          </div>
          <div className="aspect-square bg-gray-200">
            <Image src="" alt="Post Thumbnail" className="object-cover" />
          </div>
          <div className="aspect-square bg-gray-200">
            <Image src="" alt="Post Thumbnail" className="object-cover" />
          </div>
          {/* Add more thumbnails */}
        </div>
      </section>
    </div>
  );
}
