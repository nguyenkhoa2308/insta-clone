"use client";

import Image from "next/image";
import Link from "next/link";
import Avatar from "~/components/ui/Avatar";
import type { Post } from "~/lib/types";
import { timeAgo } from "~/lib/utils";
import { useState } from "react";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(!!post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => (liked ? Math.max(0, n - 1) : n + 1));
  };

  return (
    <article className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-background">
      <header className="flex items-center gap-3 p-3">
        <Avatar src={post.author.avatarUrl} alt={post.author.name} />
        <div className="flex flex-col leading-tight">
          <Link href={`/profile/${post.author.username}`} className="font-medium">
            {post.author.username}
          </Link>
          <span className="text-xs text-black/60 dark:text-white/60">{timeAgo(post.createdAt)}</span>
        </div>
      </header>

      <div className="relative bg-black/5 dark:bg-white/5 aspect-[4/5]">
        <Image src={post.imageUrl} alt={post.caption ?? "Post image"} fill className="object-cover" />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button
            aria-label="Like"
            className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
            onClick={toggleLike}
          >
            {liked ? "❤️" : "🤍"}
          </button>
          <Link
            aria-label="Comment"
            href={`/p/${post.id}`}
            className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
          >
            💬
          </Link>
          <button aria-label="Share" className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10">
            🔗
          </button>
        </div>
        <div className="text-sm font-medium">{likes} likes</div>
        {post.caption && (
          <div className="text-sm">
            <Link href={`/profile/${post.author.username}`} className="font-medium mr-2">
              {post.author.username}
            </Link>
            {post.caption}
          </div>
        )}
        {post.comments.length > 0 && (
          <Link href={`/p/${post.id}`} className="text-sm text-black/60 dark:text-white/70">
            View all {post.comments.length} comments
          </Link>
        )}
      </div>
    </article>
  );
}


