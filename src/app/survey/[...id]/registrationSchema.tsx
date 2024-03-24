import { z } from "zod";

import { validateAlgorandAddress } from "@/app/api/validate/url/validateAlgorandAddress";

export const schema = z.object({
  // email: z.string().trim().email({
  //   message: "Invalid email address",
  // }),
  address: z.string().trim().refine(validateAlgorandAddress, {
    message: "Invalid NFD or Algorand Address",
  }),
});
