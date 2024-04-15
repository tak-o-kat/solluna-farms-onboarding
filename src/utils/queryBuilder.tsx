"use server";

import { nanoid } from "nanoid";
import { makeSurveyUrl } from "@/utils/urlBuilder";

export type InsertUrl = {
  id: string;
  url: string;
  status: "new" | "sent" | "completed";
  isCopied: boolean;
};

export const generateInsertUrlQuery = async (numLinks: number) => {
  // generate an array of url entries
  const query: Array<any> = [];
  for (let i = 0; i < numLinks; i++) {
    const nanoId = nanoid();
    query.push({
      id: nanoId,
      url: makeSurveyUrl(nanoId),
      status: "new",
      isCopied: false,
      urlStatus: {
        create: {
          status: "new",
        },
      },
    });
  }

  return query;
};

export const connectUrlToStatusQuery = async (ids: string[]) => {
  // generate an array of url entries
  const query: Array<any> = [];
  const length = ids.length;
  for (let i = 0; i < length; i++) {
    query.push({
      status: "new",
    });
  }

  return query;
};
