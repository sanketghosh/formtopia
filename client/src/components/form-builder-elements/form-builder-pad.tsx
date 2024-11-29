import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { GripIcon } from "lucide-react";
import React from "react";

export default function FormBuilderPad() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div
      ref={droppable.setNodeRef}
      className={cn(
        "flex h-full max-w-3xl flex-grow rounded-lg bg-sidebar p-2",
        droppable.isOver && "ring-2 ring-primary",
      )}
    >
      {!droppable.isOver && (
        <div className="flex h-full w-full select-none flex-col items-center justify-center gap-2 text-muted-foreground">
          <GripIcon size={30} />
          <p className="text-lg font-semibold capitalize">drop here</p>
        </div>
      )}
      {droppable.isOver && (
        <div className="w-full p-2">
          <div className="h-28 rounded-lg bg-secondary"></div>
        </div>
      )}
    </div>
  );
}
