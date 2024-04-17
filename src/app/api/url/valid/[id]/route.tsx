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

  // Check to see if the form was just submitted, if so update the status check
  if (isCompleted && record?.statusCheck === false) {
    // Means we just submitted, update Status Check, only happens on first submission
    await prisma.urlStatus.update({
      where: {
        urlId: params.id,
      },
      data: {
        statusCheck: true,
      },
    });
    isCompleted = false;
  }

  await prisma.$disconnect();
  const resp = {
    status: 200,
    message: "Success",
    isValid: isValid,
    isCompleted: isCompleted,
  };

  return NextResponse.json(resp);
}
