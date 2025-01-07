// local modules
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";

// components
import ElementsPropertiesSidebar from "@/components/form-builder-elements/sidebar/elements-properties-sidebar";
import ElementsButtonsSidebar from "@/components/form-builder-elements/sidebar/elements-buttons-sidebar";
import PublishFormAlert from "@/components/alert-dialog/publish-form-alert";
import SaveFormAlert from "@/components/alert-dialog/save-form-alert";
import { Separator } from "../ui/separator";

export default function FormBuilderSidebar() {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();

  return (
    <aside className="sticky top-0 hidden h-screen w-[400px] overflow-y-auto border-l border-sidebar-border bg-sidebar lg:block">
      <div className="space-y-6 px-5 py-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <PublishFormAlert />
            <SaveFormAlert />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            *Make sure to save the latest change before making it public.
          </p>
          <Separator />
        </div>
        {!selectedElement && <ElementsButtonsSidebar />}
        {selectedElement && <ElementsPropertiesSidebar />}
      </div>
    </aside>
  );
}
