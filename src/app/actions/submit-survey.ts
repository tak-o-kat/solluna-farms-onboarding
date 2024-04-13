"use server";

import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";

export type SurveyFormState = {
  status?: number;
  message: string;
  data?: z.infer<typeof schema>;
  issues?: z.ZodIssue[];
};

export async function onFormSurveyAction(
  prevState: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  // First thing to do is check to see if url is still active

  // Get form data and parse it
  const data = Object.fromEntries(formData);
  const parsed = await schema.safeParseAsync(data);

  console.log(data);

  if (parsed.success) {
    // Add to db here
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
