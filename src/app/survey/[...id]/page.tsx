import { redirect } from "next/navigation";

import { getIsUrlValid } from "@/utils/urlBuilder";
import SurveyLoader from "@/components/forms/survey/SurveyLoader";
import { SurveyForm } from "@/components/forms/survey/SurveyForm";

type ErrorType = "invalid" | "error" | undefined;

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

  try {
    const endPoint = getIsUrlValid(params.id[0]);
    const response = await fetch(endPoint, {
      method: "GET",
    });
    // check and see if it's a valid url id
    const resp = await response.json();
    if (resp.status === 200 && !resp?.isValid) {
      errorType = "invalid";
    }
  } catch (err) {
    console.log(err);
    redirect(`/not-found/survey/error`);
  }

  // Need to redirect outside try/catch or it will redirect to error instead
  if (errorType === "invalid") {
    redirect(`/not-found/survey/invalid`);
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
