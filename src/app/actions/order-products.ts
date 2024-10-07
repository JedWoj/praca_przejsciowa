"use server";
import { writeDataToDB } from "./db-actions";
import { OrderSchema, type Order } from "../api/orders/models/Order";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function orderProducts(order: Order) {
  try {
    const id = crypto.randomUUID();

    const validatedOrder = OrderSchema.parse({
      products: order.products,
    });

    await writeDataToDB(`orders/${id}`, validatedOrder);

    return SUCCESS_MESSAGES.order;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
