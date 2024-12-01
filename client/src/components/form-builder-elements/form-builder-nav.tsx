// packages
import {
  ChevronRightCircleIcon,
  Columns2Icon,
  EllipsisVerticalIcon,
  Globe2Icon,
  SaveIcon,
} from "lucide-react";

// components
import PublishFormDialog from "@/components/dialogs/publish-form-dialog";
import SaveFormDialog from "@/components/dialogs/save-form-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

type FormBuilderNavProps = {
  published: boolean;
  title: string;
};

export default function FormBuilderNav({
  published,
  title,
}: FormBuilderNavProps) {
  return (
    <div className="sticky top-0 z-20 h-16 w-full border-b border-sidebar-border bg-sidebar">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="truncate font-medium">{title}</h2>
        </div>

        <Button className="" variant={"secondary"} size={"sm"}>
          <Columns2Icon />
          <p className="hidden lg:block">Preview</p>
        </Button>
      </div>
    </div>
  );
}
