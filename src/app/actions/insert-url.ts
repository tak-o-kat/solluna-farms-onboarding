"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { schema } from "@/components/surveyTab/urlSchema";
import { generateInsertUrlQuery } from "@/utils/queryBuilder";

// Form Actions
export const insertUrl = async (
  prevState: {
    message: string;
    data?: z.infer<typeof schema>;
    issues?: string[];
  },
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);
  const prisma = new PrismaClient();

  if (parsed.success) {
    try {
      // generate link id and save it to db
      const query = await generateInsertUrlQuery(parsed.data.numLinks);
      const newUrls = await prisma.url.createMany({
        data: query,
      });

      revalidatePath("/dashboard");
      return {
        message: "successfully sent to server and db",
        user: newUrls,
      };
    } catch (err: any) {
      console.log(err.message);
      return {
        name: err.name,
        message: err?.message,
      };
    }
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
