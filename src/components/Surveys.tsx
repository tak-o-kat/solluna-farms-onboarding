"use server";

import { cookies } from "next/headers";
import { columns } from "@/components/dashboard/surveys/Columns";
import { SurveyLinkTable } from "@/components/dashboard/surveys/SurveyLinkTable";
import { SurveyLinkGenerator } from "@/components/dashboard/surveys/SurveyLinkGenerator";
import { getUrlListApi } from "@/utils/urlBuilder";
import { insertUrl } from "@/app/actions/surveyTableActions";
import ReloadTableButton from "@/components/dashboard/surveys/ReloadTableButton";

export interface TableData {
  id: string;
  url: string;
  nanoId: string;
  status: "new" | "sent" | "completed";
  isCopied: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

async function getUrlList(cookie: string) {
  // TODO: Check for db health and handle appropriately
  const url = getUrlListApi(cookie);
  const resp = await fetch(url);
  const json = await resp.json();
  return json;
}

export default async function Surveys() {
  // Grab the statusColumn cookie to determine the filter on the table query
  const rawCookie = cookies().get("statusColumn")?.value as string;
  const cookie = (
    rawCookie === "undefined" || rawCookie === undefined
      ? "new-sent"
      : rawCookie
  ) as statusDropDown;
  const data: Array<TableData> = await getUrlList(cookie);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-start rounded-lg border shadow-sm p-4">
        <div className="flex flex-row w-full justify-between gap-2">
          <SurveyLinkGenerator onFormAction={insertUrl} />
          <div className="flex flex-row justify-end">
            <ReloadTableButton />
          </div>
        </div>
        <SurveyLinkTable data={data} columns={columns} statusType={cookie} />
      </div>
    </div>
  );
}
