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

type Status = "new" | "sent" | "completed";

export default function RowActions({ data }: { data: TableData }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const executeStatusUpdateAction = async (id: string, status: Status) => {
    setIsUpdating(true);
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
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => executeStatusUpdateAction(data.id, "new")}
        >
          <span>Mark as New</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => executeStatusUpdateAction(data.id, "sent")}
        >
          <span>Mark as Sent</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
