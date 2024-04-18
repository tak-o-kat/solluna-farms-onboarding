"use clien";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { customRevalidate } from "@/app/actions/url-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

export default function TableStatusDropDown({
  statusType,
}: {
  statusType: statusDropDown;
}) {
  const [status, setStatus] = useState<string>(statusType);

  useEffect(() => {
    async function fetchData() {
      // get proto and url
      const siteUrl = window.location.href.replace(
        window.location.pathname,
        ""
      );
      await fetch(
        `${siteUrl}/api/dashboard/surveys/status/${status as statusDropDown}`,
        {
          method: "GET",
        }
      );
      customRevalidate("/dashboard/surveys");
    }
    if (statusType !== status) {
      fetchData();
    }
  }, [status, statusType]);

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
          <DropdownMenuRadioItem value="new-sent">
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
