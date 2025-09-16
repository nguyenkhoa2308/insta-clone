import Avatar from "~/components/ui/Avatar";
import { currentUser, users } from "~/lib/data";
import Link from "next/link";

export default function MessagesPage() {
  const people = users.filter((user) => user.id !== currentUser.id);

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6">
      <header>
        <h1 className="text-lg font-semibold">Messages</h1>
        <p className="text-sm text-black/60 dark:text-white/60">
          Start a chat by selecting a friend below.
        </p>
      </header>
      <ul className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 dark:divide-white/10 dark:border-white/10">
        {people.map((user) => (
          <li key={user.id} className="bg-background">
            <Link
              href="/messages/"
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Avatar src={user.avatarUrl} alt={user.username} size={44} />
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-black/60 dark:text-white/60">
                  {user.name}
                </p>
              </div>
              <span className="text-xs font-medium text-black/60 dark:text-white/60">
                View
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
