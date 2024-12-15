"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function acceptOrder(id: string) {
  try {
    await prisma.order.update({
      where: { id: id as string },
      data: { status: "PROCESSING" },
    });

    revalidatePath("/orders");

    return SUCCESS_MESSAGES.acceptOrder;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}

export async function rejectOrder(id: string) {
  try {
    await prisma.order.delete({
      where: { id: id as string },
    });

    revalidatePath("/orders");

    return SUCCESS_MESSAGES.rejectOrder;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
