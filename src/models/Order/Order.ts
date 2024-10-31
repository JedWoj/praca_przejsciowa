import { z } from "zod";
import { OrderProductSchema } from "../OrderProduct";

export const OrderSchema = z.object({
  id: z.string().cuid(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  products: z.array(OrderProductSchema),
  totalPrice: z.number(),
});
