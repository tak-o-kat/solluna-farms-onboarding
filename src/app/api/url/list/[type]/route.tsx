import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
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
  return NextResponse.json(data);
}
