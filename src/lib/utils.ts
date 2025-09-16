export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function timeAgo(iso: string): string {
  const now = new Date();
  const then = new Date(iso);
  const diff = Math.max(0, (now.getTime() - then.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(diff / (86400 * 7));
  const months = Math.floor(diff / (86400 * 30));
  const years = Math.floor(diff / (86400 * 365));
  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}mo`;
  if (weeks > 0) return `${weeks}w`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `now`;
}

