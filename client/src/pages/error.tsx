import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlagIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="mx-auto grid h-screen place-items-center px-8 text-center">
      <div>
        <FlagIcon className="mx-auto h-20 w-20" />
        <p className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> It looks like something went wrong.
        </p>
        <p className="mx-auto mb-14 mt-8 text-[18px] font-normal text-gray-500 md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </p>
        <Link
          to={"/"}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "lg",
            }),
          )}
        >
          <HomeIcon />
          Back Home
        </Link>
      </div>
    </div>
  );
}
