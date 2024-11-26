// packages
import { CirclePlusIcon } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import StartFormCreation from "@/components/forms/create-form/start-form-creation";

export default function FormCreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <CirclePlusIcon size={22} />
          Create Form
        </Button>
      </DialogTrigger>
      <DialogContentWrapper
        title="Start creating form"
        description="Entering a title and description will redirect you to the form creation page."
      >
        <StartFormCreation />
      </DialogContentWrapper>
    </Dialog>
  );
}
