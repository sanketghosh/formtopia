import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogContentWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function DialogContentWrapper({
  title,
  description,
  children,
}: DialogContentWrapperProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div>{children}</div>
    </DialogContent>
  );
}
