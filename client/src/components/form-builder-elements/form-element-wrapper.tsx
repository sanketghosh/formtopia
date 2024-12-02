import { FormElementInstance } from "@/types";
import { FormElements } from "./form-builder-elements";

export default function FormElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const FormElement = FormElements[element.type].formElementComponent;
  return <FormElement elementInstance={element} />;
}
