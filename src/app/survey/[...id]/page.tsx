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
    <div className="flex flex-col w-full max-w-3xl">
      <div className="flex flex-col w-full max-w-3xl px-4 pb-4">
        <SurveyForm onFormAction={onFormSurveyAction} />
      </div>
    </div>
  );
}
