import { Button } from "@/components/ui/button";
import { FormElement } from "@/types";

type SidebarFormElementButtonProps = {
  formElement: FormElement;
};

export default function SidebarFormElementButton({
  formElement,
}: SidebarFormElementButtonProps) {
  const { icon: Icon, label } = formElement.designerButton;

  return (
    <Button className="flex size-20 flex-col" variant={"outline"}>
      <Icon />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
