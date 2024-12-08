'use client'

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

export default function InteractionButton() {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = () => {
    setLiked(!liked);
  };

 return (
   <div className="cursor-pointer flex gap-x-5">
     {liked ? (
      <div className="flex flex-col">
        <AiFillHeart
          className="text-like text-3xl animate-like"
          onClick={handleLike}
        />
        <span className="text-center text-sm">1</span>
      </div>
     ) : (
       <AiOutlineHeart className="text-3xl" onClick={handleLike} />
     )}
     <FaRegCommentDots className="text-3xl" />
   </div>
 );
}
