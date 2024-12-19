import Image from "next/image";

export default function ProfilePicture() {
  return (
    <Image
      src=""
      alt="Profile Picture"
      height={100}
      width={100}
      className="w-28 h-28 rounded-full border-2 border-gray-300"
    />
  );
}
