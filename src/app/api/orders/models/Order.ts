import { z } from "zod";

const OrderProductSchema = z.object({ id: z.string(), quantity: z.number() });

export const OrderSchema = z.object({
  products: z.array(OrderProductSchema),
  status: z.enum(["pending", "accepted", "rejected"]),
  orderDate: z.date(),
});

export type Order = z.infer<typeof OrderSchema>;
