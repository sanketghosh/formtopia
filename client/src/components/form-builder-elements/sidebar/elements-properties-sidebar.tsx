import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { FormElements } from "../form-builder-elements";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ElementsPropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-muted-foreground">
          Element Properties
        </h2>

        <Button
          size={"icon"}
          variant={"secondary"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <XIcon />
        </Button>
      </div>
      <Separator className="my-6" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
