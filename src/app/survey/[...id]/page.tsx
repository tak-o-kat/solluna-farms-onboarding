import { redirect } from "next/navigation";

import { onFormSurveyAction } from "@/app/actions/submit-survey";
import { SurveyForm } from "@/components/forms/survey/SurveyForm";

export default async function SurveyPage({
  params,
}: {
  params: { id: string[] };
}) {
  // first thing we need to check if the id is valid
  if (params.id.length !== 1) {
    redirect("/not-found");
  }

  return (
    <>
      <div className="flex flex-col w-full max-w-3xl overflow-hidden">
        <div className="h-[6rem] flex flex-col items-center justify-center mt-4 text-lg font-semibold">
          <span className="px-4 sm:text-2xl text-lg">
            Please fill out the following survey.
          </span>
          <span className="px-4 sm:text-md text-sm">
            if you have any questions please ask your instructor.
          </span>
        </div>
        <div className="flex flex-col flex-1 mx-auto w-full max-w-3xl p-4">
          <SurveyForm onFormAction={onFormSurveyAction} />
        </div>
      </div>
    </>
  );
}
