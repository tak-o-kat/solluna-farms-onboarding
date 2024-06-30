"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { schema } from "@/utils/zod/surveyFormSchema";

export type FormSchema = z.infer<typeof schema>;
// export type SurveyFormState = {
//   status?: number;
//   message: string;
//   data?: z.infer<typeof schema>;
//   issues?: z.ZodIssue[];
//   submitting?: boolean;
// };

const submitSurvey = async (
  data: FormSchema | any,
  isBlockChainCourse: boolean,
  id: string,
  hasNFD: boolean,
  nfd: string
) => {
  await prisma.$transaction([
    prisma.survey.create({
      data: {
        gender: data.gender.toString(),
        age: parseInt(data.age.toString()),
        location: data.location.toString(),
        fungi_exp: data.fungi_exp.toString(),
        blockchain_course: isBlockChainCourse,
        account: isBlockChainCourse ? data?.address?.toString() : null,
        hasNFD: hasNFD,
        nfd: nfd || null,
        comp_exp: isBlockChainCourse ? data?.comp_exp?.toString() : null,
        blockchain_exp: isBlockChainCourse
          ? data?.blockchain_exp?.toString()
          : null,
        nft_exp: isBlockChainCourse ? data?.nft_exp?.toString() : null,
        url: {
          connect: {
            id: id,
          },
        },
      },
      select: {
        id: true,
      },
    }),
    prisma.urlStatus.update({
      where: {
        urlId: id,
      },
      data: {
        status: "completed",
      },
    }),
    // Add in survey completed and total accounts being tracked
    prisma.totals.upsert({
      where: {
        type: "surveys_completed",
      },
      create: {
        type: "surveys_completed",
        total: 1,
      },
      update: {
        total: {
          increment: 1,
        },
      },
    }),
  ]);
};
const submitSurveyAndUpdateAccountTotal = async (
  data: FormSchema | any,
  isBlockChainCourse: boolean,
  id: string,
  hasNFD: boolean,
  nfd: string
) => {
  await prisma.$transaction([
    prisma.survey.create({
      data: {
        gender: data.gender.toString(),
        age: parseInt(data.age.toString()),
        location: data.location.toString(),
        fungi_exp: data.fungi_exp.toString(),
        blockchain_course: isBlockChainCourse,
        account: isBlockChainCourse ? data?.address?.toString() : null,
        hasNFD: hasNFD,
        nfd: nfd || null,
        comp_exp: isBlockChainCourse ? data?.comp_exp?.toString() : null,
        blockchain_exp: isBlockChainCourse
          ? data?.blockchain_exp?.toString()
          : null,
        nft_exp: isBlockChainCourse ? data?.nft_exp?.toString() : null,
        url: {
          connect: {
            id: id,
          },
        },
      },
      select: {
        id: true,
      },
    }),
    prisma.urlStatus.update({
      where: {
        urlId: id,
      },
      data: {
        status: "completed",
      },
    }),
    // Add in survey completed and total accounts being tracked
    prisma.totals.upsert({
      where: {
        type: "surveys_completed",
      },
      create: {
        type: "surveys_completed",
        total: 1,
      },
      update: {
        total: {
          increment: 1,
        },
      },
    }),
    prisma.totals.upsert({
      where: {
        type: "accounts_tracked",
      },
      create: {
        type: "accounts_tracked",
        total: 1,
      },
      update: {
        total: {
          increment: 1,
        },
      },
    }),
  ]);
};

export const onDataAction = async (data: FormSchema | any) => {
  // Get form data and parse it
  const parsed = await schema.safeParseAsync(data);

  if (parsed.success) {
    const id = data?.id.toString();
    const blockchain_course = data.blockchain_course.toString() === "true";
    let hasNFD = false;
    let nfd = "";

    // Determine the NFD data if it exists
    const nfdRegex = new RegExp("^(.+.algo)$", "g");
    if (nfdRegex.test(data.address)) {
      const nfdApiEndPoint = "https://api.nf.domains/nfd";
      const defaultParams = "view=tiny&poll=false&nocache=false";
      const nfdApiUrl = `${nfdApiEndPoint}/${data.address}?${defaultParams}`;
      const results = await fetch(nfdApiUrl);
      if (results.ok) {
        const resp = await results.json();
        if (resp?.depositAccount) {
          data.address = resp?.depositAccount as string;
          hasNFD = true;
          nfd = resp.name;
          console.log(data);
        } else {
          return {
            status: 500,
            message: `NFD Error: ${"NFD account has no deposit account"}`,
          };
        }
      }
    } else {
      data.hasNfd = false;
    }
    // ** make a DB call here **
    try {
      if (blockchain_course) {
        await submitSurveyAndUpdateAccountTotal(
          data,
          blockchain_course,
          id,
          hasNFD,
          nfd
        );
      } else {
        await submitSurvey(data, blockchain_course, id, hasNFD, nfd);
      }

      await prisma.$disconnect();

      return {
        status: 200,
        message: "Successfully submitted survey",
      };
    } catch (err: any) {
      let msg = err.name;
      if (err.message.includes("account") && err.message.includes("Unique")) {
        msg = "This account/address has already been used!";
      }
      await prisma.$disconnect();
      return {
        status: 500,
        message: `Server Error: ${msg}`,
      };
    }
  } else {
    return {
      status: 403,
      message: "Server Error: Invalid field(s)",
      issues: parsed.error.issues,
    };
  }
};
