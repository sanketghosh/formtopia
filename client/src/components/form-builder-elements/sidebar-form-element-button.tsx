// packages
import { useDraggable } from "@dnd-kit/core";

// local modules
import { FormElement } from "@/types";
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/button";

type SidebarFormElementButtonProps = {
  formElement: FormElement;
};

export default function SidebarFormElementButton({
  formElement,
}: SidebarFormElementButtonProps) {
  const { icon: Icon, label } = formElement.designerButton;

  const draggable = useDraggable({
    id: `form-builder-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isFormBuilderButtonElement: true,
    },
  });

  return (
    <Button
      className={cn(
        "flex h-20 w-full flex-col",
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

export function SidebarFormElementButtonDragOverlay({
  formElement,
}: SidebarFormElementButtonProps) {
  const { icon: Icon, label } = formElement.designerButton;

  return (
    <Button
      className={cn("flex size-20 cursor-grabbing flex-col")}
      variant={"outline"}
    >
      <Icon className="h-8 w-8 cursor-grabbing" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
