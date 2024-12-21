"use client";

import { useSession } from "next-auth/react";
import PostUser from "./PostUser";
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase/init";

const firestore = getFirestore(app);

export default function MainProfile() {
  const { data: session } = useSession();

  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (session?.user?.userId) {
      // Ambil data pengguna dari Firestore
      const userRef = doc(firestore, "users", session.user.userId);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            // Ambil URL foto profil dari Firestore (base64 atau URL)
            const profilePicture = docSnap.data().profilePicture;
            setProfilePictureUrl(profilePicture || null); // Set photoUrl jika ada
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [session?.user?.userId]);

  return (
    <div className="md:container md:mx-auto md:w-2/4 md:ml-96 lg:w-1/2 lg:ml-[390px]">
      {/* Profile Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-x-6 gap-x-4">
          <ProfilePicture
            photoUrl={profilePictureUrl || "/images/default-profile.png"}
          />
          <ProfileInfo session={session} />
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4">
        <PostUser username={session?.user?.username || ""} />
      </section>
    </div>
  );
}
