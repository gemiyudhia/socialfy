"use client";

import Image from "next/image";
import InteractionButton from "./InteractionButton";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

// Import date formatting library for relative time
import { formatDistanceToNowStrict } from "date-fns";

interface PostData {
  id: string;
  username: string;
  caption: string;
  createdAt: string;
  imageUrl: string;
}

export default function Post() {
  const [posts, setPost] = useState<PostData[]>([]);
  const [time, setTime] = useState<{ [key: string]: string }>({});

  // Fetch posts from Firebase Firestore
  useEffect(() => {
    const fetchPost = async () => {
      const postCollection = collection(db, "posts");
      const postQuery = query(postCollection, orderBy("createdAt", "desc")); // Sort by createdAt
      const postSnapshot = await getDocs(postQuery);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostData[];

      setPost(postList);

      // Start real-time time updates
      const updateTime = setInterval(() => {
        const updatedTime = postList.reduce((acc, post) => {
          acc[post.id] = formatDistanceToNowStrict(new Date(post.createdAt), {
            addSuffix: true,
          });
          return acc;
        }, {} as { [key: string]: string });

        setTime(updatedTime);
      }, 60000); // Update every minute

      return () => clearInterval(updateTime); // Cleanup on unmount
    };

    fetchPost();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="flex items-center p-4">
              <Image
                src="/images/user-avatar.png" // Default user avatar
                alt={`${post.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold text-sm">{post.username}</p>
                <p className="text-xs text-gray-500">
                  {time[post.id] || "Loading..."}
                </p>
              </div>
            </div>

            {/* Post Image */}
            <div className="w-full">
              <Image
                src={post.imageUrl}
                alt={`${post.username}'s post`}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Caption */}
            <div className="p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{post.username}</span>{" "}
                {post.caption}
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="p-4 border-t">
              <InteractionButton />
            </div>
          </div>
        ))}
    </div>
  );
}
