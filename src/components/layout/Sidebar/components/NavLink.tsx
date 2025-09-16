"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import type { MouseEventHandler } from "react";
import { cn } from "~/lib/utils";

type IconProps = { size?: number; className?: string; filled?: boolean };

type Props = {
  href: string;
  title: string;
  icon: React.ReactNode;
  exact?: boolean;
  compact?: boolean;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function NavLink({
  href,
  title,
  icon,
  exact = false,
  compact = false,
  isActive,
  onClick,
}: Props) {
  const pathname = usePathname();
  const derivedActive = exact ? pathname === href : pathname.startsWith(href);
  const active = typeof isActive === "boolean" ? isActive : derivedActive;
  const renderedIcon = isValidElement<IconProps>(icon)
    ? cloneElement(icon as React.ReactElement<IconProps>, {
        size: (icon as React.ReactElement<IconProps>).props.size ?? 24,
        filled: active,
        className: cn(
          active ? "text-foreground" : "text-black/60 dark:text-white/60",
          (icon as React.ReactElement<IconProps>).props.className
        ),
      })
    : icon;

  return (
    <Link
      href={href}
      aria-label={title}
      onClick={onClick}
      className={cn(
        "group flex w-full items-center rounded-xl p-3 transition-colors md:justify-center lg:justify-start",
        active
          ? "bg-black/5 dark:bg-white/10"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      )}
    >
      <span className="shrink-0 leading-none">{renderedIcon}</span>
      <span
        className={cn(
          "hidden text-sm transition-all duration-200 ease-in-out lg:block lg:overflow-hidden lg:whitespace-nowrap",
          active ? "font-semibold" : "font-medium",
          compact
            ? "lg:ml-0 lg:max-w-0 lg:opacity-0"
            : "lg:ml-3 lg:max-w-[160px] lg:opacity-100"
        )}
      >
        {title}
      </span>
    </Link>
  );
}
