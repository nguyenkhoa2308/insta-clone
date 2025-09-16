import { JSX } from "react";
import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  NotificationsIcon,
  ReelsIcon,
  SearchIcon,
} from "../../icons";

export type PanelType = "search" | "notifications";

type IconComponent = (props: { className?: string; filled?: boolean }) => JSX.Element;

export type MenuItem =
  | {
      id: string;
      label: string;
      icon: IconComponent;
      type: "link";
      href: string;
      exact?: boolean;
    }
  | {
      id: string;
      label: string;
      icon: IconComponent;
      type: "panel";
      panel: PanelType;
    }
  | { id: string; label: string; icon: IconComponent; type: "dialog" };

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    type: "link",
    href: "/",
    exact: true,
  },
  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    type: "panel",
    panel: "search",
  },
  {
    id: "explore",
    label: "Explore",
    icon: ExploreIcon,
    type: "link",
    href: "/explore",
  },
  {
    id: "reels",
    label: "Reels",
    icon: ReelsIcon,
    type: "link",
    href: "/reels",
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessagesIcon,
    type: "link",
    href: "/messages",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: NotificationsIcon,
    type: "panel",
    panel: "notifications",
  },
  { id: "create", label: "Create", icon: CreateIcon, type: "dialog" },
];
