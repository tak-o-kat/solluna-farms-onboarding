import { NextRequest, NextResponse } from "next/server";

import { schema } from "@/app/survey/[...id]/registrationSchema";

export async function Post(req: NextRequest) {
  const data = await req.json();
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    // Add parsed.data to the database here

    return NextResponse.json({ message: "URL ID is valid!", id: parsed.data });
  } else {
    return NextResponse.json(
      {
        message: "Invalid survey data",
        error: parsed.error,
      },
      { status: 400 }
    );
  }

  return;
}
