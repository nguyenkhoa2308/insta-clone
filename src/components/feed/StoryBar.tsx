import { users } from "~/lib/data";
import Avatar from "~/components/ui/Avatar";
import Link from "next/link";

export default function StoryBar() {
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-xl p-3 bg-background">
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {users.map((u) => (
          <Link key={u.id} href={`/profile/${u.username}`} className="flex flex-col items-center gap-2 shrink-0">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400">
              <Avatar src={u.avatarUrl} alt={u.name} size={56} className="ring-2 ring-background" />
            </div>
            <span className="text-xs max-w-16 truncate">{u.username}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

