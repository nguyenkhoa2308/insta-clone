import type { Post, User } from "./types";

export const users: User[] = [
  {
    id: "u1",
    username: "jane",
    name: "Jane Cooper",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    bio: "Traveler | Coffee | Frontend",
  },
  {
    id: "u2",
    username: "alex",
    name: "Alex Kim",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    bio: "Product designer",
  },
  {
    id: "u3",
    username: "marco",
    name: "Marco Rossi",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "Photographer",
  },
];

function u(username: string) {
  const found = users.find((x) => x.username === username);
  if (!found) throw new Error(`User ${username} not found`);
  return found;
}

const now = new Date();
function isoShift(minutesAgo: number) {
  return new Date(now.getTime() - minutesAgo * 60000).toISOString();
}

export const posts: Post[] = [
  {
    id: "p1",
    author: u("jane"),
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    caption: "Golden hour hits different 🌅",
    likes: 124,
    isLiked: false,
    comments: [
      { id: "c1", user: u("alex"), text: "So pretty!", createdAt: isoShift(45) },
      { id: "c2", user: u("marco"), text: "Great shot", createdAt: isoShift(44) },
    ],
    createdAt: isoShift(120),
  },
  {
    id: "p2",
    author: u("alex"),
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    caption: "Mood.",
    likes: 89,
    isLiked: true,
    comments: [{ id: "c3", user: u("jane"), text: "Vibes ✨", createdAt: isoShift(180) }],
    createdAt: isoShift(240),
  },
  {
    id: "p3",
    author: u("marco"),
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    caption: "Weekend escape",
    likes: 312,
    isLiked: false,
    comments: [],
    createdAt: isoShift(600),
  },
  {
    id: "p4",
    author: u("alex"),
    imageUrl:
      "https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=1200&auto=format&fit=crop",
    caption: "Cafe run ☕",
    likes: 40,
    isLiked: false,
    comments: [],
    createdAt: isoShift(800),
  },
  {
    id: "p5",
    author: u("jane"),
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    caption: "Focus.",
    likes: 201,
    isLiked: true,
    comments: [],
    createdAt: isoShift(1200),
  },
];

export const currentUser = users[0];

