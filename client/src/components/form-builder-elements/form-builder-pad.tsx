// packages
import { GripIcon } from "lucide-react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { v4 as uuidGenerator } from "uuid";

// local modules
import { cn } from "@/lib/utils";
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { ElementsType } from "@/types";

// components
import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import FormElementWrapper from "@/components/form-builder-elements/form-element-wrapper";

type FormBuilderPadProps = {
  title: string;
  description?: string;
};

export default function FormBuilderPad({
  title,
  description,
}: FormBuilderPadProps) {
  // const [elements, setElements] = useState<FormElementInstance[]>([]);

  const { elements, addElementHandler, selectedElement, setSelectedElement } =
    useFormBuilderContext();

  // console.log(elements, addElementHandler);

  const droppable = useDroppable({
    id: "form-builder-drop-area",
    data: {
      isFormBuilderDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isFormBuilderButtonElement =
        active.data?.current?.isFormBuilderButtonElement;

      if (isFormBuilderButtonElement) {
        const type = active?.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(uuidGenerator());

        //  add a new element
        addElementHandler(0, newElement);
      }
      // console.log("@@EVENT --> DRAG END", event);
    },
  });

  return (
    <div
      ref={droppable.setNodeRef}
      onClick={() => {
        if (selectedElement) {
          setSelectedElement(null);
        }
      }}
      className={cn(
        "flex h-full max-w-3xl flex-grow flex-col rounded-lg bg-sidebar p-2",
        droppable.isOver && "ring-2 ring-primary",
      )}
    >
      {elements.length > 0 && (
        <div className="mb-3 p-2">
          <h1 className="text-xl font-semibold lg:text-2xl">{title}</h1>
          <p className="text-sm font-medium text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
      )}
      {!droppable.isOver && elements.length === 0 && (
        <div className="flex h-full w-full select-none flex-col items-center justify-center gap-2 text-muted-foreground">
          <GripIcon size={30} />
          <p className="text-lg font-semibold capitalize">drop here</p>
        </div>
      )}

      {elements.length > 0 && (
        <div className="flex w-full flex-col gap-3 p-2">
          {elements.map((element) => (
            <FormElementWrapper key={element.id} element={element} />
          ))}
        </div>
      )}

      {droppable.isOver && elements.length === 0 && (
        <div className="w-full p-2">
          <div className="h-24 rounded-lg bg-secondary"></div>
        </div>
      )}
    </div>
  );
}
