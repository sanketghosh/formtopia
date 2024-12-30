// packages
import { Globe2Icon, SaveIcon } from "lucide-react";

// local modules
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";

// components
import SaveFormDialog from "@/components/dialogs/save-form-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PublishFormDialog from "@/components/dialogs/publish-form-dialog";
import ElementsPropertiesSidebar from "@/components/form-builder-elements/sidebar/elements-properties-sidebar";
import ElementsButtonsSidebar from "@/components/form-builder-elements/sidebar/elements-buttons-sidebar";

type FormBuilderSidebarProps = {
  published: boolean;
};

export default function FormBuilderSidebar({
  published,
}: FormBuilderSidebarProps) {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();

  return (
    <aside className="sticky top-0 hidden h-screen w-[450px] overflow-y-auto border-l border-sidebar-border bg-sidebar lg:block">
      <div className="space-y-6 px-5 py-6">
        <div className="flex items-center gap-3">
          {!published && (
            <Dialog>
              <DialogTrigger className="w-full" asChild>
                <Button className="w-full" variant={"default"} size={"sm"}>
                  <Globe2Icon />
                  Publish
                </Button>
              </DialogTrigger>
              <PublishFormDialog />
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger className="w-full" asChild>
              <Button className="w-full" variant={"secondary"} size={"sm"}>
                <SaveIcon />
                Save
              </Button>
            </DialogTrigger>
            <SaveFormDialog />
          </Dialog>
        </div>

        {!selectedElement && <ElementsButtonsSidebar />}
        {selectedElement && <ElementsPropertiesSidebar />}
      </div>
    </aside>
  );
}
