"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { usePathname } from "next/navigation";
import { usePostData, handleLike, handleAddComment } from "@/lib/interactionUtils";

interface InteractionButtonProps {
  postId: string;
}

const disabledCommentPaths = ["/profile"];

export default function InteractionButton({ postId }: InteractionButtonProps) {
  const {
    session,
    liked,
    likeCount,
    comments,
    showComments,
    toggleComments,
    newComment,
    setNewComment,
  } = usePostData(postId);

  const pathname = usePathname();

  return (
    <div className="cursor-pointer flex flex-col gap-y-5 items-start">
      <div className="flex gap-x-5 items-center">
        <div className="flex flex-col items-center">
          {liked ? (
            <AiFillHeart
              className="text-like text-3xl animate-like"
              onClick={() => handleLike(postId, session, liked)}
            />
          ) : (
            <AiOutlineHeart
              className="text-3xl"
              onClick={() => handleLike(postId, session, liked)}
            />
          )}
          <span className="text-sm">{likeCount}</span>
        </div>
        <FaRegCommentDots className="text-3xl mb-4" onClick={toggleComments} />
      </div>
      {showComments && !disabledCommentPaths.includes(pathname) && (
        <CommentSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={() =>
            handleAddComment(postId, session, newComment, setNewComment)
          }
        />
      )}
    </div>
  );
}
