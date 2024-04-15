import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { type: statusDropDown } }
) {
  // Get the value of the cookie
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
        isCopied: "desc",
      },
    ],
  });

  // Add the urlStatus to the root of the obj
  const updatedData = data.map((record) => {
    const mutatedRecord: any = {
      id: record.id,
      status: record.urlStatus?.status as string,
      url: record.url,
      isCopied: record.isCopied,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
    return mutatedRecord;
  });

  await prisma.$disconnect();
  return NextResponse.json(updatedData);
}
