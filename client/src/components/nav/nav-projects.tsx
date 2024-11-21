import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export default function NavProjects() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Latest Created Forms</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton size={"lg"} className="hover:bg-secondary">
              <Link
                to={"/single-form-data/23616"}
                className="flex w-full flex-col"
              >
                <h1 className="text-left text-base font-medium">
                  Collect data
                </h1>
                <p className="line-clamp-1 text-left text-muted-foreground">
                  https://ui.shadcn.com/docs/components/sidebar#sidebarcontent
                </p>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <Folder className="mr-2 text-muted-foreground" size={20} />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Forward className="mr-2 text-muted-foreground" size={20} />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Trash2 className="mr-2 text-muted-foreground" size={20} />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}