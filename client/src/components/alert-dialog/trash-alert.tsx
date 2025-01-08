import { ArchiveIcon, Loader2Icon } from "lucide-react";
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
import { moveFormToTrashAction } from "@/actions/form.actions";
import { toast } from "sonner";

export default function TrashAlert({ formId }: { formId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: moveFormToTrashAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["fetch-forms"],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });

  const trashFormHandler = () => {
    mutation.mutate(formId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"}>
          <ArchiveIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send this form to trash ?</AlertDialogTitle>
          <AlertDialogDescription>
            It will stay in trash for 30 days before it deletes permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={trashFormHandler}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Trash"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
