import Image from "next/image";

export default function PostUser() {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {/* Example Thumbnails */}
      <div className="aspect-square bg-gray-200">
        <Image src="" alt="Post Thumbnail" className="object-cover" />
      </div>
      <div className="aspect-square bg-gray-200">
        <Image src="" alt="Post Thumbnail" className="object-cover" />
      </div>
      <div className="aspect-square bg-gray-200">
        <Image src="" alt="Post Thumbnail" className="object-cover" />
      </div>
    </div>
  );
}