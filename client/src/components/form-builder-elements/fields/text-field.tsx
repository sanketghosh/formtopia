// packages
import { LetterText } from "lucide-react";

// local modules
import { ElementsType, FormElement, FormElementInstance } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "helper text",
  required: true,
  placeHolder: "Placeholder here.",
};

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: LetterText,
    label: "Text Item",
  },

  formElementComponent: FormElementComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function FormElementComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { required, helperText, label, placeHolder } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeHolder} readOnly />
      {helperText && (
        <p className="text-sm capitalize text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
