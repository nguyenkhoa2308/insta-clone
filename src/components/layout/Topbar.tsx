import Link from "next/link";
import { currentUser } from "~/lib/data";

export default function Topbar() {
  return (
    <header className="md:hidden sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/10 dark:border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          Insta
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10" href="/explore">
            Explore
          </Link>
          <Link className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10" href="/new">
            New
          </Link>
          <Link
            className="px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
            href={`/profile/${currentUser.username}`}
          >
            Me
          </Link>
        </nav>
      </div>
    </header>
  );
}

