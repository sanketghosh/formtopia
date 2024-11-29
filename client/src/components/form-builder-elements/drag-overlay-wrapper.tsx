import { ElementsType } from "@/types";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarFormElementButtonDragOverlay } from "./sidebar-form-element-button";
import { FormElements } from "./form-builder-elements";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>();

  useDndMonitor({
    onDragStart: (event) => {
      //   console.log(`@@DRAG ITEM`, event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  let node = <div>No drag overlay</div>;
  const isSidebarButtonElement =
    draggedItem.data?.current?.isDesignerButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <SidebarFormElementButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}
