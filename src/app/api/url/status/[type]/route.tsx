"use server";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  cookies().set("statusColumn", params.type);
  return NextResponse.json({});
}
