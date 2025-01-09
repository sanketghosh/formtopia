// packages
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// local modules
import { deletePermanentlyAction } from "@/actions/form.actions";

// components
import { Loader2Icon, TrashIcon } from "lucide-react";
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

type DeleteFromTrashAlertProps = {
  formId: string;
};

export default function DeleteFromTrashAlert({
  formId,
}: DeleteFromTrashAlertProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePermanentlyAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["fetch-trashed-forms"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleDeleteFormPermanently = () => {
    mutation.mutate(formId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size={"sm"} variant={"destructive"}>
          <TrashIcon />
          Delete Permanently
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recover your form from trash ?</AlertDialogTitle>
          <AlertDialogDescription>
            Continuing this will recover your form from trash.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteFormPermanently}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
