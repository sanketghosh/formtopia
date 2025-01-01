import { cn } from "@/lib/utils";

type SingleElementBaseStyleProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

export default function SingleElementBaseStyle({
  children,
  className,
}: SingleElementBaseStyleProps) {
  return (
    <div
      className={cn(
        "flex h-32 items-center rounded-lg border bg-background/40 px-3 py-3 opacity-100 transition-all",
        className,
      )}
    >
      {children}
    </div>
  );
}
