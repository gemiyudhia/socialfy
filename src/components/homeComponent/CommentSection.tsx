import { Comment } from "@/types/post";

interface CommentSectionProps {
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  onAddComment: () => void;
}

const CommentSection = ({
  comments,
  newComment,
  setNewComment,
  onAddComment,
}: CommentSectionProps) => (
  <div className="w-full">
    <div className="mb-3">
      {comments.map((comment, index) => (
        <div key={index} className="border-b border-gray-200 py-2 text-sm">
          <strong>{comment.username}</strong>: {comment.text}
        </div>
      ))}
    </div>
    <div className="flex items-center gap-x-2">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
        placeholder="Add a comment..."
      />
      <button
        onClick={onAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
      >
        Post
      </button>
    </div>
  </div>
);

export default CommentSection;
