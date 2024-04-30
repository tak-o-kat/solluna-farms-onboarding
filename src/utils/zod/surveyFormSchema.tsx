import { z } from "zod";

import { validateAlgorandAddress } from "@/utils/zod/validateAlgorandAddress";

export const schema = z.discriminatedUnion("blockchain_course", [
  z.object({
    id: z.string(),
    age: z.coerce
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      })
      .int()
      .gte(6, {
        message: "Must be at least 8 years old",
      })
      .lte(122, {
        message: "Humans can't live this long yet! ",
      }),
    gender: z.enum(["male", "female", "other"], {
      required_error: "You need to select a gender.",
    }),
    fungi_exp: z.enum(["none", "beginner", "intermediate", "advanced"], {
      required_error: "You need to select an experience.",
    }),
    location: z.enum(["oregon", "florida", "california"]),
    blockchain_course: z.literal("true"),
    address: z
      .string()
      .max(58, {
        message: "Must not exceed 58 characters",
      })
      .trim()
      .refine(validateAlgorandAddress, {
        message: "Invalid NFD or Algorand Address",
      })
      .optional(),
    comp_exp: z
      .enum(["none", "beginner", "intermediate", "advanced"], {
        required_error: "You need to select an experience.",
      })
      .optional(),
    blockchain_exp: z
      .enum(["none", "beginner", "intermediate", "advanced"], {
        required_error: "You need to select an experience.",
      })
      .optional(),
    nft_exp: z
      .enum(["none", "beginner", "intermediate", "advanced"], {
        required_error: "You need to select an experience.",
      })
      .optional(),
  }),
  z.object({
    id: z.string(),
    age: z.coerce
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      })
      .int()
      .gte(16, {
        message: "Must be at least 16 years old",
      })
      .lte(122, {
        message: "Humans can't live this long yet! ",
      }),
    gender: z.enum(["male", "female", "other"], {
      required_error: "You need to select a gender.",
    }),
    fungi_exp: z.enum(["none", "beginner", "intermediate", "advanced"], {
      required_error: "You need to select an experience.",
    }),
    location: z.enum(["oregon", "florida", "california"]),
    blockchain_course: z.literal("false"),
  }),
]);
