"use client";

import Image from "next/image";
import InteractionButton from "./InteractionButton";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";

interface PostData {
  id: string;
  username: string;
  caption: string;
  createdAt: string;
  imageUrl: string;
}

interface UserData {
  id: string;
  username: string;
  profilePicture?: string;
  profilePictureType: string;
}

export default function Post() {
  const [posts, setPost] = useState<PostData[]>([]);
  const [users, setUsers] = useState<{ [key: string]: UserData }>({});
  const [time, setTime] = useState<{ [key: string]: string }>({});

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPost = async () => {
      const postCollection = collection(db, "posts");
      const postQuery = query(postCollection, orderBy("createdAt", "desc"));
      const postSnapshot = await getDocs(postQuery);
      const postList = postSnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<PostData, "id">; // Hapus `id` dari tipe
        return {
          id: doc.id, // Gunakan id dari Firestore document
          ...data, // Gabungkan data lainnya
        };
      }) as PostData[];

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

  // Fetch users from Firestore based on username in posts
  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "users");
      // Get all users
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data() as UserData;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...rest } = data; // Hapus properti 'id' dari data
        acc[data.username] = { id: doc.id, ...rest }; // Gunakan id dari Firestore
        return acc;
      }, {} as { [key: string]: UserData });

      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => {
        const user = users[post.username]; // Match username to users by username

        return (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="flex items-center p-4">
              <Image
                src={`data:${user?.profilePictureType};base64,${user?.profilePicture}`}
                alt={`${user?.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />

              <div className="ml-3">
                <Link href={`/profile/${user?.id || "unknown"}`}>
                  <p className="font-semibold text-sm">
                    {user?.username || "Unknown User"}
                  </p>
                </Link>
                <p className="text-xs text-gray-500">
                  {time[post.id] || "Loading..."}
                </p>
              </div>
            </div>

            {/* Post Image */}
            <div className="w-full">
              <Image
                src={post.imageUrl}
                alt={`${user?.username}'s post`}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Caption */}
            <div className="p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{user?.username}</span>{" "}
                {post.caption}
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="p-4 border-t">
              <InteractionButton postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
