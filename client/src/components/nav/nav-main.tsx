// packages
import {
  AppWindowIcon,
  ArchiveIcon,
  BellIcon,
  ChartPieIcon,
  LibraryIcon,
  SettingsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// local modules
import { cn } from "@/lib/utils";

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
    href: "/trash",
    text: "Trash",
    icon: ArchiveIcon,
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
  const location = useLocation();
  // console.log(location.pathname);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Explore Options</SidebarGroupLabel>
      <SidebarMenu>
        {MENU_LINKS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link to={item.href}>
              <SidebarMenuButton
                tooltip={item.text}
                className={cn(
                  "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  item.href === location.pathname &&
                    "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                )}
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
