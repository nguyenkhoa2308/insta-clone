import Link from "next/link";
import Image from "next/image";
import { posts } from "~/lib/data";

export default function ExplorePage() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 w-full max-w-[900px]">
      {posts.map((p) => (
        <Link
          key={p.id}
          href={`/p/${p.id}`}
          className="relative aspect-square bg-black/5 dark:bg-white/5 overflow-hidden rounded"
        >
          <Image src={p.imageUrl} alt={p.caption ?? "Post"} fill className="object-cover" />
        </Link>
      ))}
    </div>
  );
}

