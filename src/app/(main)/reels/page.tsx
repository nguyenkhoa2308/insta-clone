import Image from "next/image";
import Link from "next/link";
import { posts } from "~/lib/data";

export default function ReelsPage() {
  return (
    <div className="w-full max-w-5xl">
      <h1 className="mb-4 text-lg font-semibold">Reels</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href="/p"
            className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption ?? "Post"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white">
              <p className="line-clamp-2">{post.caption}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
