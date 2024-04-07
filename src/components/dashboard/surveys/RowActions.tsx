import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { updateUrlStatus } from "@/app/actions/url-table";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type TableData } from "@/components/Surveys";

export default function RowActions({ data }: { data: TableData }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const executeStatusUpdateAction = async (id: string) => {
    setIsUpdating(true);
    const status = data.status === "new" ? "sent" : "new";
    const resp = await updateUrlStatus(id, status);
    if (resp.status === 200) {
      toast(resp.message);
    } else if (resp.status >= 400) {
      toast("Something went wrong updating status", {
        description: resp.message,
      });
    }
    setIsUpdating(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          {isUpdating ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* <DropdownMenuItem onClick={() => copyToClipboard()}>
          <span className="pe-2">{isCopied ? <CopyCheck /> : <Copy />}</span>
          Copy URL
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => executeStatusUpdateAction(data.id)}>
          <span>Mark as {data.status === "new" ? "Sent" : "New"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
