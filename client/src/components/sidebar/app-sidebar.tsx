// packages
import * as React from "react";
import { CircleIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "@/components/nav/nav-main";
import NavProjects from "@/components/nav/nav-projects";
import NavUser from "@/components/nav/nav-user";
import { useSingleFormData } from "@/hooks/use-single-form-data";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { formData } = useSingleFormData();
  const location = useLocation();

  const isPublished = formData?.published;
  // console.log(isPublished);
  const hideSidebarRoute = location.pathname.startsWith("/create-form");

  if (isPublished && hideSidebarRoute) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader className="">
        <SidebarMenu>
          <Link to={"/dashboard"}>
            <SidebarMenuItem>
              <SidebarMenuButton size={"lg"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
                  <CircleIcon className="size-6 stroke-black dark:stroke-white" />
                </div>
                <span className="text-2xl font-bold">formtopia</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
