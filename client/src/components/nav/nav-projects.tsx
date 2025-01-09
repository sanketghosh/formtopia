// packages
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// local modules
import { fetchFormActions } from "@/actions/form.actions";
import { FormCardType } from "@/types";

// components
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export default function NavProjects() {
  const { isMobile } = useSidebar();

  const { error, data, isLoading, isError } = useQuery({
    queryKey: ["fetch-forms-nav-projects"],
    queryFn: () => fetchFormActions("latest"),
    staleTime: 5000,
  });

  if (isLoading) {
    return <Loader2Icon className="animate-spin" />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Latest Created Forms</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {data?.data.slice(0, 5).map((form: FormCardType) => (
          <SidebarMenuItem key={form.id}>
            <SidebarMenuButton size={"lg"} className="hover:bg-secondary">
              <Link
                to={`/single-form-data/${form.id}`}
                className="flex w-full flex-col"
              >
                <h1 className="truncate text-left text-sm font-medium">
                  {form.title}
                </h1>
                <p className="line-clamp-1 text-left text-muted-foreground">
                  {form.description}
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
