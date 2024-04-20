"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";
import { redirect } from "next/navigation";
import { protectedServerAction } from "./surveyTableActions";

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
    const id = data?.id.toString();
    const blockchain_course = data.blockchain_course.toString() === "true";

    // ** make a DB call here **
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
    } catch (err: any) {
      let msg = err.name;
      if (err.message.includes("account") && err.message.includes("Unique")) {
        msg = "This account/address has already been used!";
      }
      await prisma.$disconnect();
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
  // No errors encountered, redirect to success page
  redirect("/survey/success");
}
