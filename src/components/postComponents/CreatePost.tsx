"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Mengambil username dari session menggunakan next-auth
  const { data: session, status } = useSession();
  const username = session?.user?.username || ""; // Gunakan "name" sesuai dengan properti username dalam session

  const handleSubmit = async () => {
    if (!image || !caption) {
      alert("Please provide an image and a caption.");
      return;
    }

    setLoading(true);

    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const postData = {
        username, // Sertakan username dalam data yang akan dikirim
        caption,
        imageUrl: base64Image, // store base64 string here
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
        } else {
          alert(data.message || "Failed to create post.");
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setLoading(false);
        alert("An error occurred while creating the post.");
      }
    };
    reader.readAsDataURL(image); // Convert to Base64
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1>Create a Post</h1>
      {status === "authenticated" ? (
        <p>
          Logged in as: <strong>{username}</strong>
        </p>
      ) : (
        <p>Loading session...</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <textarea
        placeholder="Enter caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || status !== "authenticated"}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
