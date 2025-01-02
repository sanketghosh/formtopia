// packages
import { useNavigate } from "react-router-dom";
import { Globe2Icon, Loader2Icon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

// local modules
import { publishFormAction } from "@/actions/form.actions";
import { useSingleFormData } from "@/hooks/use-single-form-data";
import { useConfetti } from "@/hooks/use-confetti";

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

export default function PublishFormAlert() {
  const { formId } = useSingleFormData();
  const navigate = useNavigate();
  const { confettiOn } = useConfetti();

  const mutation = useMutation({
    mutationFn: publishFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      confettiOn();
      setInterval(() => {
        navigate(0);
      }, 2000);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  function publishFormHandler() {
    mutation.mutate(formId!);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"default"} size={"sm"}>
          <Globe2Icon />
          Public
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you'll not be able to
            edit this form. <br />
            <span>
              By publishing this you'll make it public and will be able to
              collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={mutation.isPending}
            onClick={publishFormHandler}
          >
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Publish"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
