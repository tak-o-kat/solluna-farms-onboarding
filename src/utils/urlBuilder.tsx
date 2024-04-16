// Build a url for the server being used
import { headers } from "next/headers";

const getBaseUrl = () => {
  const headersList = headers();
  const proto = headersList.get("x-forwarded-proto");
  const uri = headersList.get("x-forwarded-host");
  return `${proto}://${uri}`;
};

export const makeSurveyUrl = (id: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/survey/${id}`;
};

export const getUrlListApi = (status: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/url/list/${status}`;
};

export const getIsUrlValid = (id: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/url/valid/${id}`;
};

export const getStatusCheckUrl = (id: string) => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api/url/completed/${id}`;
};
