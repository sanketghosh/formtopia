/** PACKAGES */
import { Outlet, useLocation, useParams } from "react-router-dom";

/** COMPONENTS */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        {location.pathname === "/create-form" ? null : (
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        )}

        <main
          className={cn(
            location.pathname === "/create-form"
              ? "min-h-screen"
              : "min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8",
          )}
        >
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
