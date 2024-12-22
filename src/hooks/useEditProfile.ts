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
        setProfilePicture(profilePictureBase64);
        setBio(userData.bio || "");
      }
    };

    fetchUserData();
  }, [session, setProfilePicture]);

  const handleSave = async () => {
    if (!session?.user?.userId) return;

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

  return {
    bio,
    setBio,
    setPreview,
    profilePicture,
    preview,
    setPhoto,
    handleSave,
  };
};

export default useEditProfile;
