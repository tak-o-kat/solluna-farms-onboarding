"use server";

import { NextResponse, NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

export async function GET(
  req: NextRequest,
  { params }: { params: { type: statusDropDown } }
) {
  const cookieValue = params.type;
  const filteredValue = cookieValue === undefined ? "new-sent" : cookieValue;

  // Convert the cookie value to a boolean
  const statusFilter = (
    filteredValue === "new-sent" ? ["new", "sent"] : [filteredValue]
  ) as string[];

  const data = await prisma.url.findMany({
    relationLoadStrategy: "join",
    include: {
      urlStatus: {
        select: {
          status: true,
          isCopied: true,
        },
      },
    },
    where: {
      urlStatus: {
        status: {
          in: statusFilter,
        },
      },
    },
    orderBy: [
      {
        urlStatus: {
          status: "asc",
        },
      },
      {
        urlStatus: {
          updatedAt: "desc",
        },
      },
    ],
  });

  // Add the urlStatus to the root of the obj
  const updatedData = data.map((record) => {
    const mutatedRecord: any = {
      id: record.id,
      status: record.urlStatus?.status as string,
      isCopied: record.urlStatus?.isCopied as boolean,
      url: record.url,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
    return mutatedRecord;
  });

  await prisma.$disconnect();
  return NextResponse.json(updatedData);
}
