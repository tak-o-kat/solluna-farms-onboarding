import { SurveyLinkTable } from "@/components/surveyTab/SurveyLinkTable";
import { SurveyLinkGenerator } from "./surveyTab/SurveyLinkGenerator";
import { getUrlListApi } from "@/utils/urlBuilder";
import { insertUrl } from "@/app/actions/url-table";

export interface TableData {
  id: string;
  url: string;
  nanoId: string;
  status: string | "new" | "sent" | "completed";
  createdAt: Date | string;
  updatedAt: Date | string;
  isCopied: boolean;
}

async function getUrlList() {
  // TODO: Check for db health and handle appropriately
  const url = getUrlListApi();
  console.log("Getting Table data from DB");
  const resp = await fetch(url, {
    method: "GET",
  });

  return resp.json();
}

export default async function Surveys() {
  const data: Array<TableData> = await getUrlList();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-start rounded-lg border shadow-sm p-4">
        <div className="flex flex-col">
          <SurveyLinkGenerator onFormAction={insertUrl} />
        </div>
        <SurveyLinkTable data={data} />
      </div>
      {/* <h1 className="text-lg font-semibold md:text-2xl">Survey Generator</h1> */}
    </div>
  );
}
