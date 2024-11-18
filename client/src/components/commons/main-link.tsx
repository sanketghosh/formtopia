import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

type MainLinkProps = {
  hrefLink: string;
  iconStyle?: string;
  textStyle?: string;
} & React.ComponentPropsWithRef<"a">;

export default function MainLink({
  hrefLink = "/",
  className,
  iconStyle,
  textStyle,
}: MainLinkProps) {
  return (
    <Link
      to={hrefLink}
      className={cn("font-spaceGrotesk flex items-center", className)}
    >
      <CircleIcon className={cn(iconStyle)} />
      <h2 className={cn(textStyle)}>formtopia</h2>
    </Link>
  );
}
