"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { headers } from "next/headers";

import { nanoid } from "nanoid";
import { makeSurveyUrl } from "@/utils/urlBuilder";
import { schema } from "@/utils/zod/urlGeneratorSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Function to check if caller is authenticated
export const protectedServerAction = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  // check if user is authenticated
  if (!isAuth) {
    // Not Auth, build the base url and redirect to login page
    const headersList = headers();
    const proto = headersList.get("x-forwarded-proto");
    const uri = headersList.get("x-forwarded-host");
    const baseUrl = `${proto}://${uri}`;
    redirect(`${baseUrl}/api/auth/login`);
  }
  console.log("finished auth");
};

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
  await protectedServerAction();
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
  await protectedServerAction();
  try {
    console.log("trying update url state");
    const data = await prisma.urlStatus.update({
      where: {
        urlId: id,
      },
      data: {
        status: status,
        isCopied: status !== "new",
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

export const setStatusColumnInCookie = async (value: string) => {
  await protectedServerAction();
  cookies().set("statusColumn", value);
};