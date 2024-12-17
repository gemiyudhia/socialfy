"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import UploadImage from "./UploadImage";
import CaptionPost from "./CaptionPost";
import { Button } from "../ui/button";
import ImagePost from "./ImagePost";
import { Loader2 } from "lucide-react";
import Header from "../homeComponent/Header";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const { data: session, status } = useSession();
  const username = session?.user?.username || "";

  const handleSubmit = async () => {
    if (!image || !caption) {
      alert("Please provide an image and a caption.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const postData = {
        username,
        caption,
        imageUrl: base64Image,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify(postData),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        setLoading(false);

        if (response.ok) {
          alert("Post created successfully!");
          setImage(null);
          setCaption("");
          push("/");
        } else {
          alert(data.message || "Failed to create post.");
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setLoading(false);
        alert("An error occurred while creating the post.");
      }
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 px-4 pb-32">
      <Header />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">New Post</h1>
        <UploadImage setImage={setImage} labelImage="Upload" />

        <ImagePost image={image} />

        <CaptionPost
          caption={caption}
          setCaption={setCaption}
          labelCaption="Caption"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || status !== "authenticated"}
          className={`w-full py-2 px-4 text-sm font-medium text-white rounded-lg focus:outline-none transition-colors ${
            loading || status !== "authenticated"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" />
              Please wait...
            </div>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </div>
  );
}
