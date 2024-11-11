import { z } from "zod";
import { OrderSchema } from "./Order";
import { Prisma } from "@prisma/client";
import { OrderProductCreateInputSchema } from "../OrderProduct/OrderProductCreateInput";

export const OrderCreateInputSchema = OrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  products: z
    .object({
      create: z.array(OrderProductCreateInputSchema),
    })
    .optional(),
}) satisfies z.Schema<Prisma.OrderCreateInput>;
