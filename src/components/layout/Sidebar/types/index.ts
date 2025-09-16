import { JSX } from "react";

export type PanelType = "search" | "notifications";

export type IconComponent = (props: {
  className?: string;
  filled?: boolean;
}) => JSX.Element;

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

export type ActiveItemId = string | null;
