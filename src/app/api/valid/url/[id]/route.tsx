"use server";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();

  // Check and see if the nanoId exists and make sure the link hasn't been submitted and marked completed
  const exists = await prisma.url
    .findFirst({
      where: {
        nanoId: params.id,
        status: { not: "completed" },
      },
    })
    .then((r) => Boolean(r));

  prisma.$disconnect;

  const resp = {
    status: 200,
    message: "Success",
    isValid: exists,
  };

  return NextResponse.json(resp);
}
