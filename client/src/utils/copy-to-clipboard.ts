import { toast } from "sonner";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard.");
    return true;
  } catch (error) {
    console.error("Failed to copy text: ", text);
    alert("Failed to copy text");
    return false;
  }
};
