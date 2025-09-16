"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Avatar from "~/components/ui/Avatar";
import { currentUser, posts, users } from "~/lib/data";
import { cn, timeAgo } from "~/lib/utils";
import { PanelType } from "~/components/layout/Sidebar/types";

type PanelBaseProps = {
  onClose: () => void;
};

type PanelHeaderProps = {
  title: string;
  onClose: () => void;
};

type SidePanelProps = {
  activePanel: PanelType | null;
  onClose: () => void;
  isSidebarCollapsed: boolean;
};

export default function SidePanel({
  activePanel,
  onClose,
  isSidebarCollapsed,
}: SidePanelProps) {
  const isOpen = activePanel !== null;
  const sidebarOffsetLg = isSidebarCollapsed
    ? "lg:left-[72px]"
    : "lg:left-[240px]";

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed top-0 right-0 bottom-0 left-0 md:left-[72px] z-30 bg-black/20 transition-all duration-300 ease-in-out",
          sidebarOffsetLg,
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        className={cn(
          "fixed top-0 bottom-0 left-0 md:left-[72px] z-40 w-[min(360px,100vw)] max-w-full border-r border-black/10 bg-background shadow-xl transition-all duration-300 ease-in-out dark:border-white/10",
          sidebarOffsetLg,
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {activePanel === "search" && <SearchPanel onClose={onClose} />}
        {activePanel === "notifications" && (
          <NotificationsPanel onClose={onClose} />
        )}
      </div>
    </>
  );
}

function SearchPanel({ onClose }: PanelBaseProps) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return users.filter((user) => {
      if (user.id === currentUser.id) return false;
      if (!normalized) return true;
      return (
        user.username.toLowerCase().includes(normalized) ||
        user.name.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Search" onClose={onClose} />
      <div className="border-b border-black/10 px-4 py-3 dark:border-white/10">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 focus:dark:border-white/30"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {results.length ? (
          <ul className="space-y-1 px-2 py-3">
            {results.map((user) => (
              <li key={user.id}>
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Avatar src={user.avatarUrl} alt={user.username} size={40} />
                  <div>
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-black/60 dark:text-white/60">
                      {user.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-black/60 dark:text-white/60">
            No accounts found.
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsPanel({ onClose }: PanelBaseProps) {
  const notifications = useMemo(() => {
    return posts
      .flatMap((post) =>
        post.comments.map((comment) => ({
          id: `${post.id}-${comment.id}`,
          user: comment.user,
          text: comment.text,
          createdAt: comment.createdAt,
          postId: post.id,
          imageUrl: post.imageUrl,
        }))
      )
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, []);

  return (
    <div className="flex h-full flex-col">
      <PanelHeader title="Notifications" onClose={onClose} />
      <div className="flex-1 overflow-y-auto">
        {notifications.length ? (
          <ul className="space-y-1 px-2 py-3">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <Link
                  href={`/p/${notification.postId}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Avatar
                    src={notification.user.avatarUrl}
                    alt={notification.user.username}
                    size={40}
                  />
                  <div className="flex-1 text-sm">
                    <p>
                      <span className="font-semibold">
                        {notification.user.username}
                      </span>{" "}
                      commented: {notification.text}
                    </p>
                    <p className="text-xs text-black/60 dark:text-white/60">
                      {timeAgo(notification.createdAt)} ago
                    </p>
                  </div>
                  <div className="h-12 w-12 overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
                    <Image
                      src={notification.imageUrl}
                      alt="Post preview"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-black/60 dark:text-white/60">
            You&apos;re all caught up!
          </div>
        )}
      </div>
    </div>
  );
}

function PanelHeader({ title, onClose }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        className="text-sm font-medium text-black/60 transition-colors hover:text-foreground dark:text-white/60"
      >
        Close
      </button>
    </div>
  );
}
