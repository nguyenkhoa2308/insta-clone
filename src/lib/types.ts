export type ID = string;

export interface User {
  id: ID;
  username: string;
  name: string;
  avatarUrl: string;
  bio?: string;
}

export interface Comment {
  id: ID;
  user: User;
  text: string;
  createdAt: string; // ISO
}

export interface Post {
  id: ID;
  author: User;
  imageUrl: string;
  caption?: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  createdAt: string; // ISO
}

