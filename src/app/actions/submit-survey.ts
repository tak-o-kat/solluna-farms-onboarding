"use server";

import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";

export type SurveyFormState = {
  message: string;
  data?: z.infer<typeof schema>;
  issues?: string[];
};

export const onFormSurveyAction = async (
  prevState: SurveyFormState,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = await schema.safeParseAsync(data);

  console.log(parsed);

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
