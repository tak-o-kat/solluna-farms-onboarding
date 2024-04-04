import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const data = await prisma.url.findMany({
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
