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
  id: string; // ID unik komentar
  username: string; // Nama pengguna
  text: string; // Isi komentar
  timestamp: string; // Waktu komentar
}

export interface UserProfile {
  username: string;
  profilePicture: string;
  profilePictureType: string;
  role?: string;
  email?: string;
}

