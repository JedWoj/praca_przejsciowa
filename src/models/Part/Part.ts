import { z } from "zod";

export const PartSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be longer than 2 chars!" })
    .max(100, { message: "Name must be shorter than 100 chars!" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be higher than 0!" })
    .max(100000, { message: "Price must be lower than 100000!" }),
});

export type Part = z.infer<typeof PartSchema>;

export const PartsSchema = z.record(
  z.string(),
  PartSchema.and(z.object({ quantity: z.number() })),
);

export type Parts = z.infer<typeof PartsSchema>;
