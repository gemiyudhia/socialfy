type UploadImageProps = {
  setImage: (image: File | null) => void;
  labelImage: string;
};

export default function UploadImage({
  setImage,
  labelImage,
}: UploadImageProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {labelImage}
      </label>
      <div className="flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
        <label className="flex flex-col items-center w-full py-6 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm font-medium">
            Click to upload or drag & drop
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
