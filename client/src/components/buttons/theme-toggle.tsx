import { LaptopMinimalIcon, Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/theme-context-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Change your theme</CardTitle>
        <CardDescription>
          Select your theme according to your choice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-between gap-3">
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "light" ? "default" : "secondary"}
          onClick={() => setTheme("light")}
        >
          <SunIcon />
          Light
        </Button>
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "dark" ? "default" : "secondary"}
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
          Dark
        </Button>
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "system" ? "default" : "secondary"}
          onClick={() => setTheme("system")}
        >
          <LaptopMinimalIcon />
          System
        </Button>
      </CardContent>
    </Card>
  );
}

{
  /* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */
}
