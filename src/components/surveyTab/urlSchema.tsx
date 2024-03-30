import { z } from "zod";

export const schema = z.object({
  numLinks: z.coerce
    .number()
    .int()
    .gte(1, {
      message: "1 - 10 range",
    })
    .lte(10, {
      message: "1 - 10 range",
    }),
});
