import PostList from "@/components/userProfile/PostList";
import ProfileCard from "@/components/userProfile/ProfileCard";
import { getUserPosts, getUserProfile } from "@/lib/firebase/service";

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = params;

  // Fetch data langsung di server
  const profileData = await getUserProfile(userId);
  const posts = profileData?.username
    ? await getUserPosts(profileData.username)
    : [];

  if (!profileData) return <div>User not found</div>;

  return (
    <div className="md:container md:mx-auto md:w-2/4 md:ml-96 lg:w-1/2 lg:ml-[390px]">
      <section className="container mx-auto px-4 py-6">
        <ProfileCard profileData={profileData} />
      </section>
      <section className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
