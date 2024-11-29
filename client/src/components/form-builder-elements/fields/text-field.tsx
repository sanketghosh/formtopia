// packages
import { LetterText } from "lucide-react";

// local modules
import { ElementsType, FormElement } from "@/types";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "helper text",
      required: false,
      placeHolder: "Placeholder here.",
    },
  }),

  designerButton: {
    icon: LetterText,
    label: "Text Item",
  },

  designerComponent: () => <div>Designer Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
