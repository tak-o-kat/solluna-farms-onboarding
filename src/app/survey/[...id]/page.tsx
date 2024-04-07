import { redirect } from "next/navigation";
import { z } from "zod";

import { onFormSurveyAction } from "@/app/actions/submit-survey";
import { schema } from "@/utils/zod/surveyFormSchema";
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

  const onFormAction = async (
    prevState: {
      message: string;
      data?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData
  ) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);

    if (parsed.success) {
      // Add to db here
      console.log("Survey Submitted!");
      return { message: "Survey Submitted!", data: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl p-5 sm:p-10">
        <div className="flex justify-center p-4 text-lg font-semibold">
          Onboarding Survey
        </div>
        <SurveyForm onFormAction={onFormSurveyAction} />
      </div>
    </>
  );
}
