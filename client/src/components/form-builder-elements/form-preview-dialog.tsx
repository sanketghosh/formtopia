// packages
import { Columns2Icon } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { FormElements } from "./form-builder-elements";
import SingleElementBaseStyle from "./single-element-base-style";

type FormPreviewDialogProps = {
  title: string;
  description?: string;
};

export default function FormPreviewDialog({
  title,
  description,
}: FormPreviewDialogProps) {
  const { elements } = useFormBuilderContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant={"secondary"} size={"sm"}>
          <Columns2Icon />
          <p className="hidden lg:block">Preview</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
        <div className="border-b px-2 py-2">
          <h2 className="text-lg font-semibold">Form Preview</h2>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to users.
          </p>
        </div>
        <div className="bg-chequered-size flex h-full w-full items-center justify-center overflow-y-auto bg-chequered p-4 md:p-6 lg:p-8">
          <div className="max-h-[650px] min-h-[800px] w-[650px] space-y-6 overflow-y-auto rounded-lg bg-sidebar p-3">
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm font-medium text-muted-foreground">
                {description}
              </p>
            </div>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <SingleElementBaseStyle>
                  <FormComponent key={element.id} elementInstance={element} />
                </SingleElementBaseStyle>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
