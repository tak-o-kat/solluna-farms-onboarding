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
    where: {
      status: {
        in: statusFilter,
      },
    },
    orderBy: [
      {
        status: "asc",
      },
      {
        isCopied: "desc",
      },
    ],
  });
  prisma.$disconnect;
  return NextResponse.json(data);
}
