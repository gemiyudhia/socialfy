'use client'

import { fetchPostByUser } from "@/lib/firebase/service";
import { Post } from "@/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";

type PostUserProps = {
  username: string;
};

export default function PostUser({ username }: PostUserProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostByUser(username);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="mt-12">
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              {/* Gambar Post */}
              <div className="relative w-full h-64">
                <Image
                  src={post.imageUrl || ""}
                  alt="Post Image"
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <FiCameraOff className="text-4xl text-gray-500" />
          <p className="text-center text-gray-500">No posts available.</p>
        </div>
      )}
    </div>
  );
}
