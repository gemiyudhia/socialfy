export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  username: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}
