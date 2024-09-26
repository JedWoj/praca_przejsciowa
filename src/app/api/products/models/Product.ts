import { z } from "zod";
import { PartsSchema } from "../../parts/models/Parts";

export const ProductSchema = z.object({
  id: z.string(),
  price: z.coerce.number().gt(0, { message: "Price must be higher than 0!" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(50, { message: "Name must be at most 50 characters long!" }),
  parts: PartsSchema,
});

export type Product = z.infer<typeof ProductSchema>;
