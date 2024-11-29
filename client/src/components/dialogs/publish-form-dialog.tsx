// packages
import { Globe2Icon, XIcon } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import { DialogClose } from "@/components/ui/dialog";

export default function PublishFormDialog() {
  return (
    <DialogContentWrapper
      title="Publish Your Form"
      description="On clicking the publish form button your form will be made public."
    >
      <div className="flex items-center gap-3">
        <form>
          <Button size={"sm"}>
            <Globe2Icon />
            Publish your form
          </Button>
        </form>
        <DialogClose>
          <Button variant={"destructive"} size={"sm"}>
            <XIcon />
            Cancel
          </Button>
        </DialogClose>
      </div>
    </DialogContentWrapper>
  );
}
