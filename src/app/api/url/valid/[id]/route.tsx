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

  // In order to display the Successfully submitted view I need to
  // return false to completed on submittion, if the page reload happens
  // within a certain time return false else just return as normal.
  const dbDateTime = record?.updatedAt.toISOString();
  const dbDate = dbDateTime?.slice(0, 17);
  const dbTime = dbDateTime?.slice(17, 23) as string;

  const d = new Date().toISOString();
  const serverDate = d.slice(0, 17);
  const serverTime = d.slice(17, 23);

  // Used this method because I'm unable to make useEffect work properly on the status check
  let bool = record?.status === "completed";
  if (serverDate === dbDate) {
    const diff = parseFloat(serverTime) - parseFloat(dbTime);
    if (diff < 4) {
      bool = false;
    }
  }

  await prisma.$disconnect();

  const isValid = record !== undefined;

  const resp = {
    status: 200,
    message: "Success",
    isValid: isValid,
    isCompleted: bool,
  };

  return NextResponse.json(resp);
}
