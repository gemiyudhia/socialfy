"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { app } from "@/lib/firebase/init";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import useProfileStore from "@/store/useProfileStore";
import ProfilePicture from "@/components/profileComponents/ProfilePicture";

const firestore = getFirestore(app);

export default function EditProfilePage() {
  const { data: session } = useSession();
  const { push } = useRouter();

  const { profilePicture, setProfilePicture } = useProfileStore();

  const [bio, setBio] = useState(session?.user?.bio || "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.userId) return;

      const userRef = doc(firestore, "users", session.user.userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const profilePictureBase64 = `data:${userData.profilePictureType};base64,${userData.profilePicture}`;
        setProfilePicture(profilePictureBase64); // Update Zustand state
        setBio(userData.bio || "");
      }
    };

    fetchUserData();
  }, [session, setProfilePicture]);

  const handleSave = async () => {
    if (!session?.user?.userId) return;

    try {
      const userRef = doc(firestore, "users", session.user.userId);

      // Update bio field
      await updateDoc(userRef, { bio });

      if (photo) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const fileData = reader.result?.toString().split(",")[1];
          const fileType = photo.type;

          const response = await fetch("/api/uploadProfilePicture", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.userId,
              fileData,
              fileType,
            }),
          });

          if (response.ok) {
            const profilePictureBase64 = `data:${fileType};base64,${fileData}`;
            setProfilePicture(profilePictureBase64); // Update Zustand state

            console.log("Photo uploaded successfully");
          } else {
            console.error("Error uploading photo");
          }
        };
        reader.readAsDataURL(photo);
      }

      push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Profile
        </h2>

        <div className="mb-4">
          <ProfilePicture
            photoUrl={profilePicture || "/images/default-profile.png"}
          />
        </div>

        <label htmlFor="bio" className="text-sm font-medium text-gray-600">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={5}
        />

        <label
          htmlFor="photo"
          className="text-sm font-medium text-gray-600 mt-4 block"
        >
          Profile Picture
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setPhoto(file);
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="mt-2"
        />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="mt-4 w-24 h-24 rounded-full"
          />
        )}

        <button
          onClick={handleSave}
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
