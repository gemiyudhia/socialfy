import Image from "next/image";
import InteractionButton from "./InteractionButton";

export default function Post() {
  return (
    <>
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
      <div className="mt-3">
        <InteractionButton />
      </div>
      
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
      <InteractionButton />
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
      <InteractionButton />
    </>
  );
}