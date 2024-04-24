"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

import { columns } from "@/components/dashboard/surveys/Columns";
import { SurveyLinkTable } from "@/components/dashboard/surveys/SurveyLinkTable";
import { SurveyLinkGenerator } from "@/components/dashboard/surveys/SurveyLinkGenerator";
import { insertUrl } from "@/app/actions/surveyTableActions";
import ReloadTableButton from "@/components/dashboard/surveys/ReloadTableButton";

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

export interface TableData {
  id: string;
  url: string;
  nanoId: string;
  status: statusDropDown;
  isCopied: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

async function getUrlList(filteredValue: string) {
  // Convert the cookie value to a boolean
  const statusFilter = (
    filteredValue === "new-sent" ? ["new", "sent"] : [filteredValue]
  ) as string[];

  const data = await prisma.url.findMany({
    relationLoadStrategy: "join",
    include: {
      urlStatus: {
        select: {
          status: true,
          isCopied: true,
        },
      },
    },
    where: {
      urlStatus: {
        status: {
          in: statusFilter,
        },
      },
    },
    orderBy: [
      {
        urlStatus: {
          status: "asc",
        },
      },
      {
        urlStatus: {
          updatedAt: "desc",
        },
      },
    ],
  });

  // Add the urlStatus to the root of the obj
  const updatedData: TableData[] = data.map((record) => {
    return {
      id: record.id,
      nanoId: record.id,
      status: record.urlStatus?.status as statusDropDown,
      isCopied: record.urlStatus?.isCopied as boolean,
      url: record.url,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  });

  await prisma.$disconnect();
  return updatedData;
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
