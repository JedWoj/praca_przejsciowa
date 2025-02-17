import { z } from "zod";
import { ProductSchema } from "./Product";
import { Prisma } from "@prisma/client";
import { PartCreateInputSchema } from "../Part/PartCreateInput";
import { ProductOperationSchema } from "../ProductOperation";

export const ProductCreateInputSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  parts: z
    .object({
      create: z.array(
        z.object({
          part: z.object({
            connectOrCreate: z.object({
              where: z.object({
                id: z.string(),
              }),
              create: PartCreateInputSchema,
            }),
          }),
          quantity: z.number(),
        }),
      ),
    })
    .optional(),
  ProductOperation: z
    .object({
      create: z.array(ProductOperationSchema),
    })
    .optional(),
}) satisfies z.Schema<Prisma.ProductCreateInput>;
