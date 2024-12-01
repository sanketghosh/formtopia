// packages
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

// local modules
import { ElementsType } from "@/types";

// components
import { SidebarFormElementButtonDragOverlay } from "@/components/form-builder-elements/sidebar-form-element-button";
import { FormElements } from "@/components/form-builder-elements/form-builder-elements";

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
    draggedItem.data?.current?.isFormBuilderButtonElement;

  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <SidebarFormElementButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}
