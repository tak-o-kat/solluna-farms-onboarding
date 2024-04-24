import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";

import { type TableData } from "@/components/dashboard/surveys/Surveys";

export default function CopiedColumn({ data }: { data: TableData }) {
  const [innerIsCopied, setInnerIsCopied] = useState(data.isCopied);

  const copyUrl = () => {
    navigator.clipboard.writeText(data.url);
    setInnerIsCopied(true);
    data.isCopied = true;
  };

  useEffect(() => {
    setInnerIsCopied(data.isCopied);
  }, [data.isCopied]);

  return (
    <Button
      onClick={() => copyUrl()}
      variant={"ghost"}
      className="flex justify-center font-medium"
    >
      {innerIsCopied ? <CopyCheck /> : <Copy />}
    </Button>
  );
}
