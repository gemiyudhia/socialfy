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

interface Comment {
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export default function InteractionButton({ postId }: InteractionButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
      if (session) {
        console.log("Session has been updated:", session);
      }
    if (!postId) return;

    // Real-time listener untuk likes dan comments
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        setLikeCount(postData.likes?.length);
        setLiked(postData.likes?.includes(session?.user?.userId) || false);
        setComments(postData.comments || []); // Memastikan comments diset ke array
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
        // Hapus like
        await updateDoc(postRef, {
          likes: arrayRemove(session.user.userId),
        });
      } else {
        // Tambah like
        await updateDoc(postRef, {
          likes: arrayUnion(session.user.userId),
        });
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleAddComment = async () => {
    if (!session?.user?.userId || !session?.user?.username) {
      console.error("Session user data is incomplete:", session?.user);
      alert("Unable to add comment due to incomplete user data.");
      return;
    }

    if (!session) {
      alert("You need to sign in to comment!");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          userId: session.user.userId,
          username: session.user.username,
          text: newComment.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="cursor-pointer flex flex-col gap-y-5 items-start">
      {/* Tombol Like */}
      <div className="flex gap-x-5 items-center">
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
        <FaRegCommentDots
          className="text-3xl mb-4"
          onClick={() => setShowComments((prev) => !prev)} // Toggle komentar
        />
      </div>

      {/* Bagian Komentar */}
      {showComments && (
        <div className="w-full">
          <div className="mb-3">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-2 text-sm"
              >
                <strong>{comment.username}</strong>: {comment.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
