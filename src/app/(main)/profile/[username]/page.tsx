import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, users } from "~/lib/data";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = users.find((u) => u.username === params.username);
  if (!user) return notFound();
  const userPosts = posts.filter((p) => p.author.username === user.username);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[900px]">
      <section className="flex items-center gap-6">
        <div className="rounded-full overflow-hidden w-24 h-24 bg-black/5 dark:bg-white/10">
          <Image src={user.avatarUrl} alt={user.name} width={96} height={96} />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">{user.username}</h1>
          <div className="text-sm text-black/70 dark:text-white/70">{user.name}</div>
          {user.bio && <p className="text-sm max-w-prose">{user.bio}</p>}
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {userPosts.map((p) => (
          <Link key={p.id} href={`/p/${p.id}`} className="relative aspect-square rounded overflow-hidden">
            <Image src={p.imageUrl} alt={p.caption ?? "Post"} fill className="object-cover" />
          </Link>
        ))}
      </section>
    </div>
  );
}

