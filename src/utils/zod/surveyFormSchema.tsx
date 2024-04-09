import { z } from "zod";

import { validateAlgorandAddress } from "@/app/api/validate/url/validateAlgorandAddress";

export const schema = z.object({
  age: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int()
    .gte(8, {
      message: "Must be at least 8 years old",
    })
    .lte(122, {
      message: "Humans can't live this long yet! ",
    }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "You need to select a gender.",
  }),
  race_ethnicity: z.enum(
    ["native", "asian", "black", "pacific", "latino", "white", "mixed", "no"],
    {
      required_error: "You need to select a race/ethnicity.",
    }
  ),
  fungi_exp: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "You need to select an experience.",
  }),
  blockchain_course: z.boolean().default(false),
  address: z
    .string()
    .max(58, {
      message: "Must not exceed 58 characters",
    })
    .trim()
    .refine(validateAlgorandAddress, {
      message: "Invalid NFD or Algorand Address",
    }),
});
