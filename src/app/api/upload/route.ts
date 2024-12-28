import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export async function POST(req: Request) {
  try {
    const { username, caption, imageUrl } = await req.json();

    if (!imageUrl || !caption) {
      return NextResponse.json(
        { message: "Image and caption are required." },
        { status: 400 }
      );
    }

    // Save metadata to Firestore with Base64 image
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      username,
      caption,
      imageUrl, // Save the Base64 encoded image
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Post created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in upload route:", error);

    // Handle unknown error type
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { message: `Failed to create post: ${errorMessage}` },
      { status: 500 }
    );
  }
}
