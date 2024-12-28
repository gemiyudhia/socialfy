import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-center text-gray-500">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="relative w-full h-64">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
