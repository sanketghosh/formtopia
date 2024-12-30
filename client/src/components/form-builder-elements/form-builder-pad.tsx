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

  const {
    elements,
    addElementHandler,
    selectedElement,
    setSelectedElement,
    removeElementHandler,
  } = useFormBuilderContext();

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
      const isDroppingOverFormBuilderDropArea =
        over.data?.current?.isFormBuilderDropArea;

      // first scenario
      if (isFormBuilderButtonElement && isDroppingOverFormBuilderDropArea) {
        const type = active?.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(uuidGenerator());

        //  add a new element
        addElementHandler(elements.length, newElement);
        return;
      }
      // console.log("@@EVENT --> DRAG END", event);

      const isDroppingOverFormBuilderElementTopHalf =
        over.data?.current?.isTopHalfFormElement;

      const isDroppingOverFormBuilderElementBottomHalf =
        over.data?.current?.isBottomHalfFormElement;

      const isDroppingOverFormBuilderElement =
        isDroppingOverFormBuilderElementTopHalf ||
        isDroppingOverFormBuilderElementBottomHalf;

      // second scenario
      if (isFormBuilderButtonElement && isDroppingOverFormBuilderElement) {
        const type = active?.data?.current?.type;
        const newElement =
          FormElements[type as ElementsType].construct(uuidGenerator());

        const overId = over.data?.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("ERROR! Element not found.");
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverFormBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        //  add a new element
        addElementHandler(indexForNewElement, newElement);
        return;
      }

      // third scenario
      const isDraggingFormElement = active.data?.current?.isFormBuilderElement;

      if (isDraggingFormElement && isDroppingOverFormBuilderElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("ERROR! Element not found.");
        }
        const activeElement = { ...elements[activeElementIndex] };
        removeElementHandler(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverFormBuilderElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElementHandler(indexForNewElement, activeElement);
      }
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
