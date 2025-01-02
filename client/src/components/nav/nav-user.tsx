// packages
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  BellIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

// local modules
import { logoutAction } from "@/actions/auth.actions";
import { useAuthContext } from "@/hooks/use-auth-context";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menu_data = [
  {
    icon: <UserIcon className="size-5" />,
    url: "/account",
    title: "account",
  },
];

export default function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      localStorage.removeItem("user_data");
      navigate("/");
      setInterval(() => {
        navigate(0);
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarFallback className="rounded-lg bg-teal-800 text-xl font-bold text-white">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback className="rounded-lg bg-teal-800 text-xl font-bold text-white">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-2">
              {menu_data.map((item) => (
                <DropdownMenuItem key={item.url} asChild>
                  <Link
                    to={item.url}
                    className="flex cursor-pointer items-center gap-1 capitalize"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form onSubmit={formSubmitHandler} className="w-full">
                <Button
                  className="flex w-full cursor-pointer items-center justify-start gap-2"
                  variant={"destructive"}
                >
                  <LogOutIcon className="size-5" />
                  Log out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
