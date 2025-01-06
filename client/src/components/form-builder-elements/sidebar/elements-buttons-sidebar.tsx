import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import SidebarFormElementButton from "@/components/form-builder-elements/sidebar-form-element-button";
import { v4 as uuidGenerator } from "uuid";
import { FormElement } from "@/types";
import { Separator } from "@/components/ui/separator";

type SidebarArrayElementType = {
  id: string;
  element: FormElement;
};

type SidebarArrayType = {
  id: string;
  title: string;
  elements: SidebarArrayElementType[];
};

export default function ElementsButtonsSidebar() {
  const sidebarArray: SidebarArrayType[] = [
    {
      id: uuidGenerator(),
      title: "Layout Elements",
      elements: [
        {
          id: uuidGenerator(),
          element: FormElements.TitleField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.SubtitleField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.ParagraphField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.SeparatorField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.SpacerField,
        },
      ],
    },
    {
      id: uuidGenerator(),
      title: "Form Elements",
      elements: [
        {
          id: uuidGenerator(),
          element: FormElements.TextField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.NumberField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.TextareaField,
        },
        {
          id: uuidGenerator(),
          element: FormElements.DateField,
        },
      ],
    },
  ];

  return (
    <div className="space-y-3">
      {/*  <div className="grid grid-cols-2 gap-3">
        <SidebarFormElementButton formElement={FormElements.TextField} />
        <SidebarFormElementButton formElement={FormElements.TitleField} />
        <SidebarFormElementButton formElement={FormElements.SubtitleField} />
      </div> */}
      <div className="space-y-6">
        {sidebarArray.map((item: SidebarArrayType) => (
          <div key={item.id} className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {item.title}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {item.elements.map((item: SidebarArrayElementType) => (
                  <SidebarFormElementButton
                    key={item.id}
                    formElement={item.element}
                  />
                ))}
              </div>
            </div>
            {item.title === "Layout Elements" ? <Separator /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
