import Image from "next/image";

type ProfilePictureProps = {
  photoUrl: string;
};

export default function ProfilePicture({ photoUrl }: ProfilePictureProps) {
  // Validasi apakah photoUrl adalah URL relatif atau absolut
  const validPhotoUrl =
    photoUrl.startsWith("/") || photoUrl.startsWith("http")
      ? photoUrl
      : "/images/default-profile.png";

  return (
    <Image
      src={validPhotoUrl}
      alt="Profile Picture"
      height={100}
      width={100}
      className="w-28 h-28 rounded-full border-2 border-gray-300"
    />
  );
}
