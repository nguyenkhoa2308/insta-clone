import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "~/lib/data";
import { timeAgo } from "~/lib/utils";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return notFound();
  return (
    <div className="flex flex-col gap-4 w-full max-w-[900px]">
      <div className="relative w-full aspect-[4/5] bg-black/5 dark:bg-white/5 rounded overflow-hidden">
        <Image src={post.imageUrl} alt={post.caption ?? "Post"} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-black/60 dark:text-white/60">{timeAgo(post.createdAt)}</div>
        {post.caption && (
          <div>
            <Link href={`/profile/${post.author.username}`} className="font-medium mr-2">
              {post.author.username}
            </Link>
            {post.caption}
          </div>
        )}
        <div className="text-sm text-black/70 dark:text-white/70">
          {post.likes} likes • {post.comments.length} comments
        </div>
        <div className="flex flex-col gap-2 border-t border-black/10 dark:border-white/10 pt-2">
          {post.comments.map((c) => (
            <div key={c.id} className="text-sm">
              <Link href={`/profile/${c.user.username}`} className="font-medium mr-2">
                {c.user.username}
              </Link>
              {c.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

