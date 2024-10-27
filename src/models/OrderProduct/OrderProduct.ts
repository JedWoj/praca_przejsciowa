import { z } from "zod";

export const OrderProductSchema = z.object({
  id: z.string().cuid(),
  orderId: z.string().cuid(),
  productId: z.string().cuid(),
  quantity: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
