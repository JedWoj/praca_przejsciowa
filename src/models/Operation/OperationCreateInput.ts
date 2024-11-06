import { z } from "zod";

export const OperationCreateInputSchema = z.object({
  name: z.string().min(3).max(255),
  time: z.coerce.number().int().positive(),
});
