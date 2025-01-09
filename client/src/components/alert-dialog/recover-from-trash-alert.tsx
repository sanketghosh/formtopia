import { Loader2Icon, RotateCwIcon } from "lucide-react";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recoverFormTrashAction } from "@/actions/form.actions";

type RecoverFromTrashAlertProps = {
  formId: string;
};

export default function RecoverFromTrashAlert({
  formId,
}: RecoverFromTrashAlertProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: recoverFormTrashAction,
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

  const recoverFromTrashHandler = () => {
    mutation.mutate(formId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" size={"sm"} variant={"secondary"}>
          <RotateCwIcon />
          Recover
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
            onClick={recoverFromTrashHandler}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Recover"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
