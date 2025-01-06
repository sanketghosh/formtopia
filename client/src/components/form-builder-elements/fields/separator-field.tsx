// packages
import { SeparatorHorizontalIcon } from "lucide-react";

// local modules
import { ElementsType, FormElement } from "@/types";

// components
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),

  designerButton: {
    icon: SeparatorHorizontalIcon,
    label: "Separator Field",
  },

  formElementComponent: FormElementComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

/*************************** */
/**
 *
 */

function FormElementComponent() {
  /*   const element = elementInstance as CustomInstance;
  const { paragraph } = element.extraAttributes; */

  return (
    <div className="flex w-full flex-col gap-3">
      <Label className="text-muted-foreground">Separator</Label>
      <Separator />
    </div>
  );
}

/***************************** */

function FormComponent() {
  /* const element = elementInstance as CustomInstance;
  const { paragraph } = element.extraAttributes; */

  return <Separator />;
}

/***
 *
 *
 *
 *
 */

function PropertiesComponent({}) {
  return <p>No properties of this element available to customize.</p>;
}
