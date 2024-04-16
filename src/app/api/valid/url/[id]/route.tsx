"use server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// ****** No longer needed ********
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check and see if the nanoId exists and make sure the link hasn't been submitted and marked completed
  const exists = await prisma.url
    .findFirst({
      where: {
        id: params.id,
      },
    })
    .then((r) => Boolean(r));

  await prisma.$disconnect();

  const resp = {
    status: 200,
    message: "Success",
    isValid: exists,
  };

  return NextResponse.json(resp);
}
