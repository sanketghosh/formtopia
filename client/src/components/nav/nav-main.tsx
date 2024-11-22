// packages
import {
  AppWindowIcon,
  BellIcon,
  ChartPieIcon,
  CirclePlusIcon,
  LibraryIcon,
  PlusCircleIcon,
  SettingsIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const MENU_LINKS = [
  {
    href: "/dashboard",
    text: "Dashboard",
    icon: AppWindowIcon,
  },
  {
    href: "/statistics",
    text: "Statistics",
    icon: ChartPieIcon,
  },
  {
    href: "/all-forms",
    text: "All Forms",
    icon: LibraryIcon,
  },
  {
    href: "/notifications",
    text: "Notifications",
    icon: BellIcon,
  },
  {
    href: "/settings",
    text: "Settings",
    icon: SettingsIcon,
  },
];

export default function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore Options</SidebarGroupLabel>
      <SidebarMenu>
        {MENU_LINKS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link to={item.href}>
              <SidebarMenuButton
                tooltip={item.text}
                className="hover:bg-secondary"
              >
                {item.icon && <item.icon />}
                <span>{item.text}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
        {/*   <SidebarMenuItem>
          <SidebarMenuButton>
            <CirclePlusIcon />
            Create Form
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
