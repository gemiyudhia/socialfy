"use client";

import { useSession } from "next-auth/react";
import PostUser from "./PostUser";
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";

export default function MainProfile() {
  const { data: session } = useSession();

  return (
    <div className="md:container md:mx-auto md:w-2/4 md:ml-96 lg:w-1/2 lg:ml-[390px]">
      {/* Profile Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-x-6 gap-x-4">
          <ProfilePicture photoUrl={session?.user?.username || '/images/default-profile.png'} />
          <ProfileInfo session={session} />
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4">
        <PostUser username={session?.user?.username || ""} />
      </section>
    </div>
  );
}
