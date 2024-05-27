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

type FormSchema = z.infer<typeof schema>;
type KindeUser = { id: string; name: string; email: string };

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
};

export const insertUrlAction = async (data: FormSchema, user: KindeUser) => {
  await protectedServerAction();
  // Get form data and parse it
  const parsed = await schema.safeParseAsync(data);

  if (parsed.success) {
    try {
      // generate url id and connect status to url
      const numRecords = parsed.data.numLinks;
      const ids = [];
      // const queryList = [];
      for (let i = 0; i < numRecords; i++) {
        const nanoId = nanoid();
        // queryList.push({
        //   id: nanoId,
        //   creator: userId,
        //   url: makeSurveyUrl(nanoId),
        //   urlStatus: {
        //     create: {
        //       status: "new",
        //       isCopied: false,
        //     },
        //   },
        // });
        ids.push(
          await prisma.url.create({
            data: {
              id: nanoId,
              creatorId: user.id,
              creatorName: user.name,
              creatorEmail: user.email,
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

      await prisma.totals.upsert({
        where: {
          type: "urls_created",
        },
        update: {
          total: {
            increment: numRecords,
          },
        },
        create: {
          type: "urls_created",
          total: ids.length,
        },
      });

      return {
        statusCode: 200,
        message: "Successfully added records to database",
        numLinks: ids.length,
      };
    } catch (err: any) {
      console.log(err.message);
      return {
        statusCode: 400,
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
      statusCode: 400,
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};

// Form Actions
export const insertUrl = async (
  _prevState: {
    status?: number;
    numLinks?: number;
    message: string;
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
      await prisma.totals.upsert({
        where: {
          type: "urls_created",
        },
        update: {
          total: {
            increment: numRecords,
          },
        },
        create: {
          type: "urls_created",
          total: ids.length,
        },
      });

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
    const data = await prisma.urlStatus.update({
      where: {
        urlId: id,
      },
      data: {
        status: status,
        isCopied: status !== "new",
      },
    });

    const total = await prisma.totals.upsert({
      where: {
        type: "urls_sent",
      },
      create: {
        type: "urls_sent",
        total: 1,
      },
      update: {
        total: {
          increment: 1,
        },
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
