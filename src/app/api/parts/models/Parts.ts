import { z } from "zod";
import { PartSchema } from "./Part";

export const PartsSchema = z.record(
  z.string(),
  PartSchema.and(z.object({ quantity: z.number() })),
);

export type Parts = z.infer<typeof PartsSchema>;
