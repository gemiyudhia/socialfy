import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchPostByUser } from "@/lib/firebase/service";
// import Link from "next/link";

type ProfileInfoProps = {
  session: {
    user: {
      username: string;
    };
  } | null;
};

export default function ProfileInfo({ session }: ProfileInfoProps) {
  const [postCount, setPostCount] = useState<number>(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      if (session?.user?.username) {
        try {
          const posts = await fetchPostByUser(session.user.username);
          setPostCount(posts.length);
        } catch (error) {
          console.error("Error to fetch posts: ", error);
        }
      }
    };
    fetchPostCount();
  }, [session?.user?.username]);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-semibold text-gray-800">
          {session?.user?.username || "Username"}
        </h4>
        <Button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
        >
          Logout
        </Button>
      </div>
      <div className="flex space-x-8 mt-4">
        <div className="text-center">
          <span className="block font-bold text-lg">{postCount}</span>
          <span className="text-sm text-gray-600">Posts</span>
        </div>
      </div>
      {/* <div className="mt-4">
        <p className="text-gray-600 text-sm">
          Web Developer | Coffee Enthusiast | Traveler 🌍
        </p>
        <Link
          href="/profile/edit-profile"
          className="mt-2 inline-block bg-textPrimary text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition duration-200"
        >
          Edit Profile
        </Link>
      </div> */}
    </div>
  );
}
