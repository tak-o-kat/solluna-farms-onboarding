"use server";

import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";
import { getIsUrlValid } from "@/utils/urlBuilder";

export type SurveyFormState = {
  status?: number;
  message: string;
  data?: z.infer<typeof schema>;
  issues?: z.ZodIssue[];
};

export async function onFormSurveyAction(
  _prevState: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  // Get form data and parse it
  const data = Object.fromEntries(formData);
  const parsed = await schema.safeParseAsync(data);

  if (parsed.success) {
    // First thing to do is check to see if url is still active
    try {
      const endPoint = getIsUrlValid(data?.id.toString());
      const response = await fetch(endPoint, {
        method: "GET",
        headers: {},
      });
      // check and see if it's a valid url id
      const resp = await response.json();
      if (resp.status === 200 && resp?.isValid) {
        // ** make a DB call here **

        return {
          status: 200,
          message: "Survey successfully submitted!",
          data: parsed.data,
        };
      } else {
        // ID is either incorrect or not longer active
        return {
          status: 403,
          message: "Server Error: ID not valid!",
        };
      }
    } catch (err) {
      return {
        status: 403,
        message: "Server Error: ID not valid!",
      };
    }
  } else {
    return {
      status: 400,
      message: "Server Error: Invalid field(s)",
      issues: parsed.error.issues,
    };
  }
}
