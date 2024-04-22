import { headers } from "next/headers";

export const baseUrl = () => {
  const headersList = headers();
  const proto = headersList.get("x-forwarded-proto");
  const uri = headersList.get("x-forwarded-host");
  const baseUrl = `${proto}://${uri}`;
  return baseUrl;
};
