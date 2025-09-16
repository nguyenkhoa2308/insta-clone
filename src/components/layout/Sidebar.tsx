"use client";

import { useEffect, useState } from "react";
import type { MouseEventHandler } from "react";
import { usePathname } from "next/navigation";
import InstagramIcon from "../icons/InstagramIcon";
import InstagramLogo from "../icons/InstagramLogo";
import NavLink from "./NavLink";
import { cn } from "~/lib/utils";
import CreatePostDialog from "./sidebar/CreatePostDialog";
import SidePanel from "./sidebar/SidePanel";
import { menuItems, PanelType } from "./sidebar/menuItems";

type ActiveItemId = string | null;

export default function Sidebar() {
  const pathname = usePathname();
  const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    setActivePanel(null);
    setIsCreateOpen(false);
  }, [pathname]);

  const handleNavLinkClick: MouseEventHandler<HTMLAnchorElement> = () => {
    setActivePanel(null);
    setIsCreateOpen(false);
  };

  const isMessagesRoute = pathname.startsWith("/messages");
  const isSidebarCollapsed = isMessagesRoute || activePanel !== null;
  const activeLinkId = getActiveLinkId(pathname);
  const activeItemId: ActiveItemId =
    activePanel ?? (isCreateOpen ? "create" : activeLinkId);

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex fixed top-0 left-0 z-50 h-screen w-[72px] flex-col items-stretch gap-2 overflow-hidden border-r border-black/10 bg-background/80 backdrop-blur transition-[width] duration-300 ease-in-out supports-[backdrop-filter]:bg-background/60 dark:border-white/10",
          isSidebarCollapsed ? "lg:w-[72px]" : "lg:w-[240px]"
        )}
      >
        <div className="h-[73px] w-full px-3 pb-4 pt-6">
          <div className="relative h-8">
            <InstagramIcon
              className={cn(
                "absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 text-foreground transition-opacity duration-300",
                isSidebarCollapsed ? "opacity-100" : "opacity-0"
              )}
            />
            <InstagramLogo
              width={103}
              height={29}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 text-foreground transition-all duration-300",
                isSidebarCollapsed
                  ? "opacity-0 -translate-x-4"
                  : "opacity-100 translate-x-0"
              )}
            />
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            if (item.type === "link") {
              return (
                <NavLink
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  compact={isSidebarCollapsed}
                  icon={<item.icon className="h-6 w-6" />}
                  exact={item.exact}
                  isActive={activeItemId === item.id}
                  onClick={handleNavLinkClick}
                />
              );
            }

            const Icon = item.icon;
            const isActive = activeItemId === item.id;
            const handleClick = () => {
              if (item.type === "panel") {
                setIsCreateOpen(false);
                setActivePanel((prev) =>
                  prev === item.panel ? null : item.panel
                );
              } else {
                setActivePanel(null);
                setIsCreateOpen((prev) => !prev);
              }
            };

            return (
              <button
                key={item.id}
                type="button"
                onClick={handleClick}
                className={cn(
                  "group flex w-full items-center rounded-xl p-3 transition-colors md:justify-center lg:justify-start",
                  isActive
                    ? "bg-black/5 dark:bg-white/10"
                    : "hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                <span className="shrink-0 leading-none">
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-black/60 dark:text-white/60"
                    )}
                    filled={isActive}
                  />
                </span>
                <span
                  className={cn(
                    "hidden text-sm transition-all duration-200 ease-in-out lg:block lg:overflow-hidden lg:whitespace-nowrap",
                    isActive ? "font-semibold" : "font-medium",
                    isSidebarCollapsed
                      ? "lg:ml-0 lg:max-w-0 lg:opacity-0"
                      : "lg:ml-3 lg:max-w-[160px] lg:opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
      <SidePanel
        activePanel={activePanel}
        onClose={() => setActivePanel(null)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <CreatePostDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}

function getActiveLinkId(pathname: string): ActiveItemId {
  let matchedId: string | null = null;
  let matchedHrefLength = -1;

  for (const item of menuItems) {
    if (item.type !== "link") continue;
    const matches = item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);
    if (!matches) continue;

    const hrefLength = item.href.length;
    if (hrefLength > matchedHrefLength) {
      matchedId = item.id;
      matchedHrefLength = hrefLength;
    }
  }

  return matchedId;
}
