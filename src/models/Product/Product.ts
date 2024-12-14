import { z } from "zod";
import { PartsSchema } from "../Part/Part";
import { ProductOperationSchema } from "../ProductOperation";

export const ProductSchema = z.object({
  id: z.string().cuid(),
  price: z.coerce.number().gt(0, { message: "Price must be higher than 0!" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long!" })
    .max(50, { message: "Name must be at most 50 characters long!" }),
  description: z.string().optional(),
  parts: PartsSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  ProductOperation: z.array(ProductOperationSchema),
});

export type Product = z.infer<typeof ProductSchema>;
