import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormElement } from "@/types";
import { useDraggable } from "@dnd-kit/core";

type SidebarFormElementButtonProps = {
  formElement: FormElement;
};

export function SidebarFormElementButtonDragOverlay({
  formElement,
}: SidebarFormElementButtonProps) {
  const { icon: Icon, label } = formElement.designerButton;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      className={cn(
        "flex size-20 cursor-grabbing flex-col",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      variant={"outline"}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 cursor-grabbing" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default function SidebarFormElementButton({
  formElement,
}: SidebarFormElementButtonProps) {
  const { icon: Icon, label } = formElement.designerButton;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      className={cn(
        "flex size-20 flex-col",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      variant={"outline"}
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
