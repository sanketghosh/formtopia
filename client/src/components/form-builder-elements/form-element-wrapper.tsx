import { FormElementInstance } from "@/types";
import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { cn } from "@/lib/utils";

export default function FormElementWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const { removeElementHandler } = useFormBuilderContext();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const FormElement = FormElements[element.type].formElementComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfFormElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfFormElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isFormBuilderElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative flex h-32 flex-col rounded-md text-foreground ring-1 ring-secondary hover:cursor-pointer"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute h-1/2 w-full rounded-t-lg"
      ></div>
      <div
        className="absolute bottom-0 h-1/2 w-full rounded-b-lg"
        ref={bottomHalf.setNodeRef}
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full transition-all">
            <Button
              className="h-full"
              variant={"destructive"}
              onClick={() => {
                removeElementHandler(element.id);
              }}
            >
              <Trash2Icon />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse transition-all">
            <p className="text-sm font-medium">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-2 w-full rounded-md rounded-b-none bg-sidebar-primary" />
      )}
      <div
        className={cn(
          "pointer-events-none flex h-32 items-center rounded-lg border bg-background/40 px-3 py-3 opacity-100 transition-all",
          mouseIsOver && "opacity-25",
        )}
      >
        <FormElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-2 w-full rounded-md rounded-t-none bg-sidebar-primary" />
      )}
    </div>
  );
}
