import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";

import { updateIsCopied } from "@/app/actions/url-table";
import { type TableData } from "@/components/Surveys";

export default function CopiedColumn({ data }: { data: TableData }) {
  const [isCopied, setIsCopied] = useState(data.isCopied);
  const executeIsCopiedUpdateAction = async (id: string, bool: boolean) => {
    const resp = await updateIsCopied(id, bool);
    if (resp.status === 200) {
      toast(`${resp.message} ${data.url}`);
      navigator.clipboard.writeText(data.url);
      //setIsCopied(bool);
    } else if (resp.status >= 400) {
      toast("Something went wrong updating status", {
        description: resp.message,
      });
    }
  };

  useEffect(() => {
    setIsCopied(data.isCopied);
  }, [data.isCopied]);

  return (
    <Button
      onClick={() => executeIsCopiedUpdateAction(data.id, !isCopied)}
      variant={"ghost"}
      className="flex justify-center font-medium"
    >
      {isCopied ? <CopyCheck /> : <Copy />}
    </Button>
  );
}
