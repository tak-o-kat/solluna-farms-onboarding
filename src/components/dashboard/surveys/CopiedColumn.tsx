import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";

export default function CopiedColumn({ url }: { url: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  };

  return (
    <Button
      onClick={() => copyUrl()}
      variant={"ghost"}
      className="flex justify-center font-medium"
    >
      {isCopied ? <CopyCheck /> : <Copy />}
    </Button>
  );
}
