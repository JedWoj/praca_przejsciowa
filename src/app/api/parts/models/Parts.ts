import { z } from "zod";
import { PartSchema } from "./Part";

export const PartsSchema = z
  .record(z.string(), PartSchema.and(z.object({ quantity: z.number() })))
  .refine((parts) => Object.keys(parts).length > 0, {
    message: "At least one part is required",
  });

export type Parts = z.infer<typeof PartsSchema>;
