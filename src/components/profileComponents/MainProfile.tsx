"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase/init";
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";
import PostUser from "./PostUser";
import { useSession } from "next-auth/react";

const firestore = getFirestore(app);

interface MainProfileProps {
  userId: string;
}

export default function MainProfile({ userId }: MainProfileProps) {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  const { data: session } = useSession();

  useEffect(() => {
    if (userId) {
      const userRef = doc(firestore, "users", userId);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfilePictureUrl(userData.profilePicture || null);
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [userId]);

  return (
    <div className="md:container md:mx-auto md:w-2/4 md:ml-96 lg:w-1/2 lg:ml-[390px]">
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-x-6 gap-x-4">
          <ProfilePicture
            photoUrl={profilePictureUrl || "/images/default-profile.png"}
          />
          <ProfileInfo session={session} />
        </div>
      </section>
      <section className="container mx-auto px-4">
        <PostUser username={session?.user.username || ""} />
      </section>
    </div>
  );
}
