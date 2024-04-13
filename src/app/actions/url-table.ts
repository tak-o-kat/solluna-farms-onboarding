"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

import { schema } from "@/utils/zod/urlGeneratorSchema";
import { generateInsertUrlQuery } from "@/utils/queryBuilder";

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
      // generate link id and save it to db
      const query = await generateInsertUrlQuery(parsed.data.numLinks);
      const newUrls = await prisma.url.createMany({
        data: query,
      });

      return {
        status: 200,
        message: "successfully sent to server and db",
        numLinks: newUrls.count,
      };
    } catch (err: any) {
      console.log(err.message);
      return {
        status: 400,
        name: err.name,
        message: err?.message,
      };
    } finally {
      revalidatePath("/dashboard/surveys");
      prisma.$disconnect;
    }
  } else {
    prisma.$disconnect;
    return {
      status: 400,
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

export const updateIsCopied = async (id: string, bool: boolean) => {
  try {
    const resp = await prisma.url.update({
      where: {
        id: id,
      },
      data: {
        isCopied: bool,
      },
    });
    const msg = bool ? "Successfully copied" : "Removed copied from";
    return {
      status: 200,
      message: msg,
    };
  } catch (err: any) {
    console.log(err.message);
    return {
      status: 400,
      name: err.name,
      message: err?.message,
    };
  } finally {
    revalidatePath("/dashboard/surveys");
    prisma.$disconnect;
  }
};

export const updateUrlStatus = async (
  id: string,
  status: "new" | "sent" | "completed"
) => {
  try {
    const data = await prisma.url.update({
      where: {
        id: id,
      },
      data: {
        status: status,
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
    revalidatePath("/dashboard/surveys");
    prisma.$disconnect;
  }
};

export const customRevalidate = (tag: string) => {
  revalidatePath(tag);
};
