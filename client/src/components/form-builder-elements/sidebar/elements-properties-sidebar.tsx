import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { FormElements } from "../form-builder-elements";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export default function ElementsPropertiesSidebar() {
  const { selectedElement } = useFormBuilderContext();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-muted-foreground">
          Element Properties
        </h2>
        <Button size={"icon"} variant={"secondary"}>
          <XIcon />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
