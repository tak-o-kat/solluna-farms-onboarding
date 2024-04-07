import { z } from "zod";

import { validateAlgorandAddress } from "@/app/api/validate/url/validateAlgorandAddress";

export const schema = z.object({
  gender: z.enum(["male", "female", "other"]),
  address: z.string().trim().refine(validateAlgorandAddress, {
    message: "Invalid NFD or Algorand Address",
  }),
});
