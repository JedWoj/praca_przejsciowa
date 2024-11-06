"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";
import { OperationCreateInputSchema } from "@/models/Operation/OperationCreateInput";
import { revalidatePath } from "next/cache";

export async function addOperation(_: string, formData: FormData) {
  try {
    const { name, time } = Object.fromEntries(formData);

    const parsedOperation = OperationCreateInputSchema.parse({ name, time });

    await prisma.operation.create({
      data: parsedOperation,
    });

    revalidatePath("/operations");

    return SUCCESS_MESSAGES.operation;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
