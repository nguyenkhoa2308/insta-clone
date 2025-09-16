import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  NotificationsIcon,
  ReelsIcon,
  SearchIcon,
} from "../../../icons";
import { MenuItem } from "../types";

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
