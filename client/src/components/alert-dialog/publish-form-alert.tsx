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
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { useState } from "react";

export default function PublishFormAlert() {
  const { formId, formData } = useSingleFormData();
  // const [isPublishContentLengthZero, setIsPublishContentLengthZero] =
  //   useState(false);

  const { elements } = useFormBuilderContext();
  const navigate = useNavigate();
  const { confettiOn } = useConfetti();

  // console.log(formData?.content.length);

  const mutation = useMutation({
    mutationFn: publishFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      confettiOn();
      setInterval(() => {
        navigate(0);
      }, 1200);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const contentArray = JSON.parse(formData?.content!);
  function publishFormHandler() {
    if (elements.length === 0) {
      toast.error("Sorry you must add at least one element to publish form.");
    } else if (Array.isArray(contentArray) && contentArray.length === 0) {
      toast.error(
        "Sorry, you must add at least one element to publish the form.",
      );
    } else {
      mutation.mutate(formId!);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full"
          variant={"default"}
          size={"sm"}
          disabled={contentArray.length === 0}
        >
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
