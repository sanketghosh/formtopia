import { SaveIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DialogContentWrapper from "@/components/dialogs/dialog-content-wrapper";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { updateFormAction } from "@/actions/form.actions";
import { toast } from "sonner";
import { useSingleFormData } from "@/hooks/use-single-form-data";

export default function SaveFormDialog() {
  const { formId } = useSingleFormData();

  const mutation = useMutation({
    mutationFn: updateFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const formSubmitHandler = () => {
    mutation.mutate({
      formId: "",
      formContent: "",
    });
  };

  return (
    <DialogContentWrapper
      title="Save form"
      description="Saving form will prevent losing your progress you made."
    >
      <div className="flex items-center gap-3">
        <form onSubmit={formSubmitHandler}>
          <Button size={"sm"}>
            <SaveIcon />
            Save form
          </Button>
        </form>
        <DialogClose>
          <Button size={"sm"} variant={"destructive"}>
            <XIcon />
            Cancel
          </Button>
        </DialogClose>
      </div>
    </DialogContentWrapper>
  );
}
