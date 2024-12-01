// packages
import { Globe2Icon, SaveIcon } from "lucide-react";

// components
import SaveFormDialog from "@/components/dialogs/save-form-dialog";
import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import SidebarFormElementButton from "@/components/form-builder-elements/sidebar-form-element-button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PublishFormDialog from "@/components/dialogs/publish-form-dialog";

type FormBuilderSidebarProps = {
  published: boolean;
};

export default function FormBuilderSidebar({
  published,
}: FormBuilderSidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[450px] overflow-y-auto border-l border-sidebar-border bg-sidebar lg:block">
      <div className="space-y-6 px-5 py-6">
        <div className="flex items-center gap-3">
          {!published && (
            <Dialog>
              <DialogTrigger className="w-full">
                <Button className="w-full" variant={"default"} size={"sm"}>
                  <Globe2Icon />
                  Publish
                </Button>
              </DialogTrigger>
              <PublishFormDialog />
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger className="w-full">
              <Button className="w-full" variant={"secondary"} size={"sm"}>
                <SaveIcon />
                Save
              </Button>
            </DialogTrigger>
            <SaveFormDialog />
          </Dialog>
        </div>

        <div className="space-y-3">
          <h2 className="font-medium">Elements</h2>
          <div className="grid grid-cols-3 gap-3">
            <SidebarFormElementButton formElement={FormElements.TextField} />
            {/*   <SidebarFormElementButton formElement={FormElements.TextField} />
            <SidebarFormElementButton formElement={FormElements.TextField} />
            <SidebarFormElementButton formElement={FormElements.TextField} />
            <SidebarFormElementButton formElement={FormElements.TextField} />
            <SidebarFormElementButton formElement={FormElements.TextField} /> */}
          </div>
        </div>
      </div>
    </aside>
  );
}
