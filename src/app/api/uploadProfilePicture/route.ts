import { NextResponse } from "next/server";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "@/lib/firebase/init";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, fileData, fileType } = body;

    if (!userId || !fileData || !fileType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const firestore = getFirestore(app);
    const userRef = doc(firestore, "users", userId);

    // Update user's profile picture in Firestore
    await updateDoc(userRef, {
      profilePicture: fileData,
      profilePictureType: fileType,
    });

    return NextResponse.json({ message: "Profile picture updated" });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
