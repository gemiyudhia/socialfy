import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import useProfileStore from "@/store/useProfileStore";
import { app } from "@/lib/firebase/init";

const firestore = getFirestore(app);

const useEditProfile = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const { profilePicture, setProfilePicture } = useProfileStore();

  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user?.userId) return;

    const fetchUserData = async () => {
      const userId = session?.user?.userId;

      if (!userId) return;

      try {
        const userRef = doc(firestore, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const profilePictureBase64 = `data:${userData.profilePictureType};base64,${userData.profilePicture}`;
          setProfilePicture(profilePictureBase64);
          setBio(userData.bio || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session?.user?.userId, setProfilePicture]);

  const handleSave = async () => {
    if (!session?.user?.userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const userRef = doc(firestore, "users", session.user.userId);
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
            setProfilePicture(profilePictureBase64);
          } else {
            throw new Error("Error uploading photo");
          }
        };
        reader.readAsDataURL(photo);
      }

      push("/profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bio,
    setBio,
    setPreview,
    profilePicture,
    preview,
    setPhoto,
    handleSave,
    isLoading,
    error,
  };
};

export default useEditProfile;
