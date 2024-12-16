import Image from "next/image";

type ImagePostProps = {
  image: File | null;
};

export default function ImagePost({ image }: ImagePostProps) {
  return (
    <div className="relative w-full h-0 pt-[100%] bg-gray-200 border border-gray-300 rounded-lg overflow-hidden">
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt="Preview"
          fill
          className="absolute inset-0 object-cover"
        />
      )}
    </div>
  );
}
