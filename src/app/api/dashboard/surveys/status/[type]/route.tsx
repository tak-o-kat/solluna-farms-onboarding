"use server";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

type statusDropDown = "new-sent" | "new" | "sent" | "completed";

export async function GET(
  _request: NextRequest,
  { params }: { params: { type: statusDropDown } }
) {
  cookies().set("statusColumn", params.type);
  return NextResponse.json({});
}
