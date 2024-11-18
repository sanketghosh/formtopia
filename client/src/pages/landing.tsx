import MainLink from "@/components/commons/main-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <MainLink
          hrefLink="/"
          iconStyle="size-6"
          textStyle="text-2xl font-semibold"
          className="space-x-1"
        />
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "secondary",
            }),
          )}
          to={"/auth"}
        >
          Start Creating
        </Link>
      </div>
    </main>
  );
}
