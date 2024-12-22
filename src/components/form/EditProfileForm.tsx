"use client";

import ProfilePicture from "@/components/profileComponents/ProfilePicture";
import useEditProfile from "@/hooks/useEditProfile";
import Image from "next/image";

export default function EditProfileForm() {
  const {
    bio,
    setBio,
    profilePicture,
    preview,
    handleSave,
    setPhoto,
    setPreview,
  } = useEditProfile();

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
