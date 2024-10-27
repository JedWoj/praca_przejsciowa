import { z } from "zod";

export const ProductOperationSchema = z.object({
  productId: z.string().cuid(),
  operationId: z.string().cuid(),
  sequence: z.number().int().positive(),
});
