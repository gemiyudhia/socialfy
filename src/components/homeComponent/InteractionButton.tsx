"use client";

import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { useSession } from "next-auth/react";

interface InteractionButtonProps {
  postId: string;
}

export default function InteractionButton({ postId }: InteractionButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>();

  useEffect(() => {
    if (!postId) return;

    // Real-time listener for like updates
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        setLikeCount(postData.likes?.length);
        setLiked(postData.likes?.includes(session?.user?.userId) || false);
      }
    });

    return () => unsubscribe();
  }, [postId, session]);

  const handleLike = async () => {
    if (!session) {
      alert("You need to sign in to like posts!");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      if (liked) {
        // Remove like
        await updateDoc(postRef, {
          likes: arrayRemove(session.user.userId),
        });
      } else {
        // Add like
        await updateDoc(postRef, {
          likes: arrayUnion(session.user.userId),
        });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="cursor-pointer flex gap-x-5 items-center">
      <div className="flex flex-col items-center">
        {liked ? (
          <AiFillHeart
            className="text-like text-3xl animate-like"
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart className="text-3xl" onClick={handleLike} />
        )}
        <span className="text-sm">{likeCount}</span>
      </div>
      <FaRegCommentDots className="text-3xl mb-4" />
    </div>
  );
}
