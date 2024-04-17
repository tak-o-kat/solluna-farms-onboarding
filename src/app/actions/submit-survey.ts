"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";
import { getIsUrlValid, getStatusCheckUrl } from "@/utils/urlBuilder";

export type SurveyFormState = {
  status?: number;
  message: string;
  data?: z.infer<typeof schema>;
  issues?: z.ZodIssue[];
  submitting?: boolean;
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
    const id = data?.id.toString();
    const endPoint = getIsUrlValid(id);

    const response = await fetch(endPoint);
    // check if url valid and is completed
    try {
      const resp = await response.json();
      if (resp.status === 200 && !resp?.isValid) {
        // ID is either incorrect or not longer active
        return {
          status: 403,
          message: "Server Error: ID not valid!",
        };
      }

      if (resp.status === 200 && resp?.isCompleted) {
        // ID is either incorrect or not longer active
        return {
          status: 403,
          message: "Server Error: ID already submitted!",
        };
      }
    } catch (err) {
      console.log(err);
    }

    // Need to run another check to see if the algorand address being used
    // has already been submitted.

    // ** make a DB call here **
    const blockchain_course = data.blockchain_course.toString() === "true";
    try {
      const survey = await prisma.survey.create({
        data: {
          gender: data.gender.toString(),
          age: parseInt(data.age.toString()),
          location: data.location.toString(),
          fungi_exp: data.fungi_exp.toString(),
          blockchain_course: blockchain_course,
          account: blockchain_course ? data.address.toString() : null,
          comp_exp: blockchain_course ? data.comp_exp.toString() : null,
          blockchain_exp: blockchain_course
            ? data.blockchain_exp.toString()
            : null,
          nft_exp: blockchain_course ? data.nft_exp.toString() : null,
          url: {
            connect: {
              id: id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      // update url status to completed type
      const status = await prisma.urlStatus.update({
        where: {
          urlId: id,
        },
        data: {
          status: "completed",
        },
      });

      await prisma.$disconnect();
      return {
        status: 200,
        message: "Success",
      };
    } catch (err: any) {
      let msg = err.name;
      if (err.message.includes("account") && err.message.includes("Unique")) {
        msg = "This account/address has alredy been used!";
      }
      return {
        status: 403,
        message: `Server Error: ${msg}`,
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
