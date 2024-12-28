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

export interface UserProfile {
  username: string;
  profilePicture: string;
  profilePictureType: string;
  role?: string;
  email?: string;
}

