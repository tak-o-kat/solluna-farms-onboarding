"use server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Make a query to urlStatus table to see if the id is already marked completed
  let record = await prisma.urlStatus.findUnique({
    where: {
      urlId: params.id,
    },
  });

  const isValid = record !== null;
  let isCompleted = record?.status === "completed";

  await prisma.$disconnect();
  const resp = {
    status: 200,
    message: "Success",
    isValid: isValid,
    isCompleted: isCompleted,
  };

  return NextResponse.json(resp);
}
