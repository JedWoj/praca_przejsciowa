import { z } from "zod";
import { ProductSchema } from "./Product";

export const ProductsSchema = z.record(z.string(), ProductSchema);

export type Products = z.infer<typeof ProductsSchema>;
