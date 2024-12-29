/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase/init";
import { Comment } from "@/types/post";

export function usePostData(postId: string) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showComments, setShowComments] = useState<boolean>(false);

useEffect(() => {
  if (!postId) return;

  const unsubscribe = onSnapshot(doc(db, "posts", postId), (docSnapshot) => {
    if (docSnapshot.exists()) {
      const postData = docSnapshot.data();
      setLikeCount(postData.likes?.length || 0);
      setLiked(postData.likes?.includes(session?.user?.userId) || false);

      // Memastikan komentar sesuai dengan tipe Comment
      setComments(
        (postData.comments || []).map((comment: any) => ({
          id: comment.id || "", // Pastikan id ada
          username: comment.username || "Unknown", // Jika tidak ada, gunakan "Unknown"
          text: comment.text || "", // Jika tidak ada, gunakan string kosong
          timestamp: comment.timestamp || "", // Jika tidak ada, gunakan string kosong
        }))
      );
    }
  });

  return () => unsubscribe();
}, [postId, session]);


  const toggleComments = () => setShowComments((prev) => !prev);

  return {
    session,
    liked,
    likeCount,
    comments,
    newComment,
    setNewComment,
    showComments,
    toggleComments,
  };
}

export async function handleLike(postId: string, session: any, liked: boolean) {
  if (!session) {
    alert("You need to sign in to like posts!");
    return;
  }

  const postRef = doc(db, "posts", postId);

  try {
    if (liked) {
      await updateDoc(postRef, { likes: arrayRemove(session.user.userId) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(session.user.userId) });
    }
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}

export async function handleAddComment(
  postId: string,
  session: any,
  newComment: string,
  setNewComment: (value: string) => void
) {
  if (!session?.user?.userId || !session?.user?.username) {
    alert("Unable to add comment due to incomplete user data.");
    return;
  }

  if (!newComment.trim()) {
    alert("Comment cannot be empty!");
    return;
  }

  const postRef = doc(db, "posts", postId);
  const newCommentObj = {
    userId: session.user.userId,
    username: session.user.username,
    text: newComment.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    await updateDoc(postRef, { comments: arrayUnion(newCommentObj) });
    setNewComment("");
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}
