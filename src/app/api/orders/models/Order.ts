import { z } from "zod";

const OrderProductSchema = z.object({ id: z.string(), quantity: z.number() });

export const OrderSchema = z.object({
  products: z.array(OrderProductSchema),
});

export type Order = z.infer<typeof OrderSchema>;
