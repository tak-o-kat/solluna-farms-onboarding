import { redirect } from "next/navigation";

import { getIsUrlValid, getStatusCheckUrl } from "@/utils/urlBuilder";
import SurveyLoader from "@/components/forms/survey/SurveyLoader";
import { SurveyForm } from "@/components/forms/survey/SurveyForm";

type ErrorType = "invalid" | "completed" | "error" | undefined;

export default async function SurveyPage({
  params,
}: {
  params: { id: string[] };
}) {
  // first thing we need to check if the id is valid
  if (params.id.length > 1) {
    redirect("/not-found");
  }

  // First thing to do is check to see if url is still active
  let errorType: ErrorType = undefined;
  const id = params.id[0];
  try {
    const endPoint = getIsUrlValid(id);
    const response = await fetch(endPoint, {
      method: "GET",
    });
    // check and see if it's a valid url id
    const resp = await response.json();
    if (resp.status === 200 && !resp?.isValid) {
      errorType = "invalid";
    }

    const isStatusCompletedEndPoint = getStatusCheckUrl(id);
    const check = await fetch(isStatusCompletedEndPoint);
    const checkResp = await check.json();
    if (checkResp.status === 200 && checkResp?.isCompleted) {
      // ID is either incorrect or not longer active
      errorType = "completed";
    }
  } catch (err) {
    console.log(err);
    redirect(`/surver/errors/server-error`);
  }

  // Need to redirect outside try/catch or it will redirect to error instead
  if (errorType === "invalid") {
    redirect(`/survey/errors/invalid`);
  }
  if (errorType === "completed") {
    redirect(`/survey/errors/completed`);
  }

  return (
    <div className="flex flex-col w-full max-w-3xl">
      <div className="flex flex-col w-full max-w-3xl px-4 pb-4">
        {/* <SurveyLoader id={params.id[0]} /> */}
        <SurveyForm id={params.id[0]} />
      </div>
    </div>
  );
}
