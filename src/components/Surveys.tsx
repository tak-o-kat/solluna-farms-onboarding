import { SurveyLinkTable } from "@/components/surveyTab/SurveyLinkTable";
import { SurveyLinkGenerator } from "./surveyTab/SurveyLinkGenerator";
import { getUrlListApi } from "@/utils/urlBuilder";
import { insertUrl } from "@/app/actions/insert-url";

export type TableData = {
  id: string;
  url: string;
  nanoId: string;
  status: "new" | "sent" | "completed";
  createdAt: string;
  updatedAt: string;
};

async function getUrlList() {
  const url = getUrlListApi();
  const resp = await fetch(url, {
    method: "GET",
  });

  return resp.json();
}

export default async function Surveys() {
  const data: Array<TableData> = await getUrlList();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 min-w-2xl items-start rounded-lg border shadow-sm p-4">
        <div className="flex flex-col">
          <SurveyLinkGenerator onFormAction={insertUrl} />
        </div>

        <SurveyLinkTable data={data} />
      </div>
      {/* <h1 className="text-lg font-semibold md:text-2xl">Survey Generator</h1> */}
    </div>
  );
}
