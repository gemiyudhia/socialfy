import Image from "next/image";
import useEditProfile from "@/hooks/useEditProfile"; // Import custom hook

interface ProfilePictureProps {
  photoUrl?: string; // Optional, in case it's provided
}

export default function ProfilePicture({ photoUrl }: ProfilePictureProps) {
  const { profilePicture } = useEditProfile(); // Use custom hook

  // Determine which image to display
  const imageSrc = photoUrl?.startsWith("data:image/")
    ? photoUrl
    : profilePicture || "/images/default-profile.png";

  return (
    <Image
      src={imageSrc}
      alt="Profile Picture"
      width={100}
      height={100}
      className="w-28 h-28 rounded-full border-2 border-gray-300"
    />
  );
}
