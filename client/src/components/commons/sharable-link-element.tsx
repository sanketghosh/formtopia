import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleCheckIcon, CopyIcon } from "lucide-react";

type SharableLinkElementProps = {
  sharableUrl?: string;
};

export default function SharableLinkElement({
  sharableUrl,
}: SharableLinkElementProps) {
  const [isCopied, setIsCopied] = useState(false);

  const fullUrlToShare = `http://${window.location.host}/submit/${sharableUrl}`;
  const urlCopyHandler = async () => {
    await copyToClipboard(fullUrlToShare);
    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        value={fullUrlToShare}
        readOnly
        className="text-[13px] font-medium"
      />
      <Button size={"sm"} variant={"default"} onClick={urlCopyHandler}>
        {isCopied ? (
          <>
            <CircleCheckIcon /> Copied
          </>
        ) : (
          <>
            <CopyIcon />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
