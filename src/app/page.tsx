import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/socialfy.png"
            alt="Socialfy logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Feed Section */}
        <div className="space-y-4">
          {/* Post */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/user-avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">
              Just sharing a great moment from my vacation! 🌴☀️
            </p>
            <Image
              src="/images/post-image.png"
              alt="Post Image"
              width={500}
              height={300}
              className="w-full h-auto rounded-lg mt-3"
            />
          </div>

          {/* Post */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/user-avatar2.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">
              Excited to announce my new project launch 🚀!
            </p>
            <Image
              src="/images/post-image2.png"
              alt="Post Image"
              width={500}
              height={300}
              className="w-full h-auto rounded-lg mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
