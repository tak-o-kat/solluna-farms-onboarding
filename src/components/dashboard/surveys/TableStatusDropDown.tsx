"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2 } from "lucide-react";
import { setStatusColumnInCookie } from "@/app/actions/surveyTableActions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type StatusDropDown = "new-sent" | "new" | "sent" | "completed";

export default function TableStatusDropDown({
  statusType,
}: {
  statusType: StatusDropDown;
}) {
  const [status, setStatus] = useState<string>(statusType);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateTableStatus = async (status: StatusDropDown) => {
    startTransition(async () => {
      await setStatusColumnInCookie(status);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-32">
          <div className="flex flex-row w-full items-center justify-between">
            {isPending ? (
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            ) : (
              "Status"
            )}
            <ChevronDown className="sm:ml-2 h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem
            value={"new-sent"}
            onClick={() => updateTableStatus("new-sent")}
          >
            New & Sent
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="new"
            onClick={() => updateTableStatus("new")}
          >
            New
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="sent"
            onClick={() => updateTableStatus("sent")}
          >
            Sent
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="completed"
            onClick={() => updateTableStatus("completed")}
          >
            Completed
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
