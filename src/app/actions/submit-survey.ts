"use server";

import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";

export type SurveyFormState = {
  status: number;
  message: string;
  data?: z.infer<typeof schema>;
  issues?: z.ZodIssue[];
};

export async function onFormSurveyAction(
  prevState: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  formData.set("age", 0);
  formData.set("gender", "");
  formData.set("location", "boston");
  formData.set("fungi_exp", "professional");
  const data = Object.fromEntries(formData);
  const parsed = await schema.safeParseAsync(data);

  if (parsed.success) {
    // Add to db here
    console.log("Survey Submitted!");
    return {
      status: 200,
      message: "Survey successfully submitted!",
      data: parsed.data,
    };
  } else {
    return {
      status: 403,
      message: "Server Error: Invalid field(s)",
      issues: parsed.error.issues,
    };
  }
}
