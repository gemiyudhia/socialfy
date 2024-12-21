import Image from "next/image";
import useProfileStore from "@/store/useProfileStore";

interface ProfilePictureProps {
  photoUrl: string;
}

export default function ProfilePicture({ photoUrl }: ProfilePictureProps) {
  const { profilePicture } = useProfileStore();

  // Check if photoUrl or profilePicture is a valid base64 string
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
