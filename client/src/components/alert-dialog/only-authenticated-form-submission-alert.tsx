import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type OnlyAuthenticatedFormSubmissionAlertProps = {
  setShowAuthenticationAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAuthenticationAlert: boolean;
};

export default function OnlyAuthenticatedFormSubmissionAlert({
  showAuthenticationAlert,
}: OnlyAuthenticatedFormSubmissionAlertProps) {
  return (
    <AlertDialog open={showAuthenticationAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Only authenticated user can submit.
          </AlertDialogTitle>
          <AlertDialogDescription>
            You need to register or login in order to submit the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
