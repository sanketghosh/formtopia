import { SaveIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import { DialogClose } from "@/components/ui/dialog";

export default function SaveFormDialog() {
  return (
    <DialogContentWrapper
      title="Save form"
      description="Saving form will prevent losing your progress you made."
    >
      <div className="flex items-center gap-3">
        <form>
          <Button>
            <SaveIcon />
            Save form
          </Button>
        </form>
        <DialogClose>
          <Button variant={"destructive"}>
            <XIcon />
            Cancel
          </Button>
        </DialogClose>
      </div>
    </DialogContentWrapper>
  );
}
