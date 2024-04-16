"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

import { nanoid } from "nanoid";
import { makeSurveyUrl } from "@/utils/urlBuilder";
import { schema } from "@/utils/zod/urlGeneratorSchema";

// Form Actions
export const insertUrl = async (
  _prevState: {
    status?: number;
    numLinks?: number;
    message?: string;
    data?: z.infer<typeof schema>;
    issues?: string[];
  },
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    try {
      // generate url id and connect status to url
      const numRecords = parsed.data.numLinks;
      const ids = [];
      for (let i = 0; i < numRecords; i++) {
        const nanoId = nanoid();
        ids.push(
          await prisma.url.create({
            data: {
              id: nanoId,
              url: makeSurveyUrl(nanoId),
              urlStatus: {
                create: {
                  status: "new",
                  statusCheck: false,
                  isCopied: false,
                },
              },
            },
            select: {
              id: true,
            },
          })
        );
      }

      return {
        status: 200,
        message: "Successfully added records to database",
        numLinks: ids.length,
      };
    } catch (err: any) {
      console.log(err.message);
      return {
        status: 400,
        name: err.name,
        message: err?.message,
      };
    } finally {
      prisma.$disconnect();
      revalidatePath("/dashboard/surveys");
    }
  } else {
    await prisma.$disconnect();
    return {
      status: 400,
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

export const updateUrlStatus = async (
  id: string,
  status: "new" | "sent" | "completed"
) => {
  try {
    const data = await prisma.urlStatus.update({
      where: {
        urlId: id,
      },
      data: {
        status: status,
        isCopied: true,
      },
    });

    return {
      status: 200,
      message: `Successfully updated status on ${id}`,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      status: 400,
      name: err.name,
      message: err?.message,
    };
  } finally {
    prisma.$disconnect();
    revalidatePath("/dashboard/surveys");
  }
};

export const customRevalidate = (tag: string) => {
  revalidateTag(tag);
};
