"use client";

import { app } from "@/lib/firebase/init";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const firestore = getFirestore(app);

export default function EditProfilePage() {
  const { data: session } = useSession();
  const [bio, setBio] = useState(session?.user?.bio || "");
  const { push } = useRouter();

  const handleSave = async () => {
    if (!session?.user?.userId) return;

    try {
      // Referensi ke dokumen pengguna di koleksi 'users' berdasarkan ID dokumen
      const userRef = doc(firestore, "users", session.user.userId);

      // Cek apakah dokumen pengguna ada
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        // Jika dokumen ada, perbarui field 'bio'
        await updateDoc(userRef, {
          bio: bio, // Memperbarui field 'bio' di dokumen pengguna
        });

        push("/profile");
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Bio</h2>
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
        <button
          onClick={handleSave}
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 focus:outline-none"
        >
          Save Bio
        </button>
      </div>
    </div>
  );
}
