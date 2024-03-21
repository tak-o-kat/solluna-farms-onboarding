"use server";

import { headers } from "next/headers";
import { nanoid } from "nanoid";

export default async function Survey() {
  const headersList = headers();
  const proto = headersList.get("x-forwarded-proto");
  const uri = headersList.get("x-forwarded-host");
  const url = `${proto}://${uri}/survey/${nanoid()}`;

  return <>{url}</>;
}
