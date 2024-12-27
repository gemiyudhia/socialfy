"use client";

import { fetchPostByUser } from "@/lib/firebase/service";
import { Post } from "@/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InteractionButton from "../homeComponent/InteractionButton";

type PostUserProps = {
  username: string;
};

export default function PostUser({ username }: PostUserProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Kontrol modal

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

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12">
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openPostModal(post)}
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

      <Dialog open={isModalOpen} onOpenChange={closePostModal}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[1000px] p-0">
          {selectedPost && (
            <div className="flex flex-col md:flex-row" key={selectedPost.id}>
              {/* Image Section */}
              <div className="relative w-full md:w-[60%] aspect-square bg-black">
                <Image
                  src={selectedPost.imageUrl || ""}
                  alt="Post Image"
                  className="object-contain w-full h-full"
                  layout="fill"
                />
              </div>

              {/* Details Section */}
              <div className="flex flex-col w-full md:w-[40%] bg-white">
                <DialogHeader className="flex items-center p-4 border-b">
                  
                  <DialogTitle className="text-sm font-semibold">
                    {selectedPost.username}
                  </DialogTitle>
                 
                </DialogHeader>

                {/* Caption and Comments */}
                <div className="flex-grow overflow-y-auto p-4">
                  <div className="flex items-start mb-4">
                    
                    <div>
                      <span className="font-semibold text-sm mr-2">
                        {selectedPost.username}
                      </span>
                      <span className="text-sm">{selectedPost.caption}</span>
                    </div>
                  </div>
                  {selectedPost.comments?.map((comment) => (
                    <div key={comment.id} className="flex items-start mb-4">
                    
                      <div>
                        <span className="font-semibold text-sm mr-2">
                          {comment.username}
                        </span>
                        <span className="text-sm">{comment.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <InteractionButton postId={selectedPost.id} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
