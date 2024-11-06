"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";
import type { Order } from "../api/orders/models/Order";

export async function orderProducts(order: Order) {
  try {
    await prisma.order.create({
      data: {
        dueDate: order.orderDate,
        products: {
          create: order.products.map((product) => ({
            quantity: product.quantity,
            product: {
              connect: {
                id: product.id,
              },
            },
          })),
        },
      },
    });

    return SUCCESS_MESSAGES.order;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
