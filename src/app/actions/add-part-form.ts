"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function addPart(_: string, formData: FormData) {
  try {
    const { name, price } = Object.fromEntries(formData);

    await prisma.part.create({
      data: {
        name: name as string,
        price: Number(price),
      },
    });

    return SUCCESS_MESSAGES.part;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
