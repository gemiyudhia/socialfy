type CaptionPostProps = {
  caption: string;
  setCaption: (value: string) => void;
  labelCaption: string;
};

export default function CaptionPost({
  caption,
  setCaption,
  labelCaption,
}: CaptionPostProps) {
  return (
    <div className="mb-4 mt-5">
      <label className="block text-sm font-medium text-gray-700">
        {labelCaption}
      </label>
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={3}
      />
    </div>
  );
}
