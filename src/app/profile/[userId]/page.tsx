"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase/init";
import ProfilePicture from "@/components/profileComponents/ProfilePicture";
import { fetchPostByUser } from "@/lib/firebase/service";
import { Post } from "@/types/post";
import useProfileStore from "@/store/useProfileStore";

const firestore = getFirestore(app);

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = params;
  const [profileData, setProfileData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const { setProfilePicture } = useProfileStore();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile for userId:", userId);

        // Fetch user profile
        const userRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("Fetched user data:", userData);
          setProfileData(userData);

          // Menyimpan foto profil ke store
          if (userData.profilePicture) {
            setProfilePicture(userId, userData.profilePicture); // Simpan foto profil untuk userId
          }

          // Fetch posts by username
          if (userData.username) {
            const userPosts = await fetchPostByUser(userData.username);
            console.log("Fetched user posts:", userPosts);
            setPosts(userPosts);
          } else {
            console.error("Username not found in user data");
          }
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, setProfilePicture]);

  if (loading) return <div>Loading...</div>;
  if (!profileData) return <div>User not found</div>;

  return (
    <div className="md:container md:mx-auto md:w-2/4 md:ml-96 lg:w-1/2 lg:ml-[390px]">
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-x-6 gap-x-4">
          <ProfilePicture
            photoUrl={`data:${profileData.profilePictureType};base64,${profileData.profilePicture}`}
          />
          <div>
            <h1 className="text-2xl font-semibold">{profileData.username}</h1>
            <p className="text-gray-600">{profileData.role || "User"}</p>
            <p className="text-gray-600">
              {profileData.email || "No email available"}
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-64">
                  <img
                    src={post.imageUrl || ""}
                    alt="Post Image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-center text-gray-500">No posts available.</p>
          </div>
        )}
      </section>
    </div>
  );
}
