/** PACKAGES */
import { Link, Outlet, useLocation } from "react-router-dom";

// LOCAL MODULES
import { cn } from "@/lib/utils";

/** COMPONENTS */
import {
  Breadcrumb,
  BreadcrumbItem,
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

export default function MainLayout() {
  const location = useLocation();

  const isCreateFormPage = location.pathname.includes("/create-form");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        {!isCreateFormPage && (
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </BreadcrumbItem>
                  {location.pathname === "/dashboard" ? null : (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="capitalize">
                          {location.pathname.slice(1)}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        )}

        <main
          className={cn(
            isCreateFormPage
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
