"use server";

import { nanoid } from "nanoid";
import { makeSurveyUrl } from "@/utils/urlBuilder";

export type InsertUrl = {
  url: string;
  nanoId: string;
  status: "new" | "sent" | "completed";
};

export const generateInsertUrlQuery = async (numLinks: number) => {
  // generate an array of url entries
  let i = numLinks;
  const query: Array<InsertUrl> = [];
  for (let i = 0; i < numLinks; i++) {
    const nanoId = nanoid();
    query.push({
      url: makeSurveyUrl(nanoId),
      nanoId: nanoId,
      status: "new",
    });
  }

  return query;
};
