import { z } from "zod";
import { ProductSchema } from "./Product";
import { Prisma } from "@prisma/client";

export const ProductCreateInputSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}) satisfies z.Schema<Prisma.ProductCreateInput>;
