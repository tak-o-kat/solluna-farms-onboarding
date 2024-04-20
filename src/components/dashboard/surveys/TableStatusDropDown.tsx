"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await setStatusColumnInCookie(status as StatusDropDown);
      router.refresh();
    }
    if (statusType !== status) {
      fetchData();
    }
  }, [status, statusType, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full sm:w-32">
          <div className="flex flex-row w-full items-center justify-between">
            Status <ChevronDown className="sm:ml-2 h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value={"new-sent"}>
            New & Sent
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="new">New</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sent">Sent</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completed
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
