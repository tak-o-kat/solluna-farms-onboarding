import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { updateCookieForStatusColumn } from "@/app/actions/url-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUrlStatusApi } from "@/utils/urlBuilder";
import { stat } from "fs";

export default function TableStatusDropDown({
  cookieStatus,
}: {
  cookieStatus: string;
}) {
  const [status, setStatus] = useState(cookieStatus);

  useEffect(() => {
    async function fetchData() {
      const siteUrl = window.location.href.replace(
        window.location.pathname,
        ""
      );
      await fetch(`${siteUrl}/api/url/status/${status}`, {
        method: "GET",
      });
      updateCookieForStatusColumn(status, "/dashboard/surveys");
    }
    if (cookieStatus !== status) {
      fetchData();
    }
  }, [status, cookieStatus]);

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
