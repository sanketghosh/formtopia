import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonProviderProps = {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
};

export default function SkeletonProvider({
  children,
  isLoading,
  fullWidth,
}: SkeletonProviderProps) {
  if (!isLoading) return children;

  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
}
