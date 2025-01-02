// packages
import { Loader2Icon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

// local modules
import { useSingleFormData } from "@/hooks/use-single-form-data";
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { updateFormAction } from "@/actions/form.actions";

// components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function SaveFormAlert() {
  const { formId } = useSingleFormData();
  const { elements } = useFormBuilderContext();

  const mutation = useMutation({
    mutationFn: updateFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const saveFormHandler = () => {
    // e.preventDefault();
    const FormJSONData = JSON.stringify(elements);
    mutation.mutate({
      formId: formId!,
      formContent: FormJSONData,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"secondary"} size={"sm"}>
          <SaveIcon />
          Save
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save your form</AlertDialogTitle>
          <AlertDialogDescription>
            Saving form will make sure your progress is saved so that next time
            you come back and start from where you left.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={saveFormHandler}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Save"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
