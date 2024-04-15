"use server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const isCompleted = async (id: string) => {
  // Make a query to urlStatus table to see if the id is already marked completed
  const bool = await prisma.urlStatus
    .findUnique({
      where: {
        urlId: id,
        status: "completed",
      },
    })
    .then((r) => Boolean(r));

  await prisma.$disconnect();

  const resp = {
    status: 200,
    message: "Success",
    isCompleted: bool,
  };

  return NextResponse.json(resp);
};
