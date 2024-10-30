import { z } from "zod";
import { Prisma } from "@prisma/client";

export const OrderProductCreateInputSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number(),
  order: z.object({
    connect: z
      .object({
        id: z.string().cuid(),
      })
      .optional(),
    create: z
      .object({
        dueDate: z.date(),
      })
      .optional(),
  }),
  product: z.object({
    connect: z
      .object({
        id: z.string().cuid(),
      })
      .optional(),
    create: z
      .object({
        name: z.string(),
        price: z.number(),
      })
      .optional(),
  }),
}) satisfies z.Schema<Prisma.OrderProductCreateInput>;
