import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/survey/[...id]/registrationSchema";

export async function POST(req: NextRequest) {
  // Get form data and convert to object
  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  let parsed = schema.safeParse(data);
  if (parsed.success) {
    // Add parsed.data to the database
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
