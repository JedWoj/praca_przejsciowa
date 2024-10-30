"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function addPart(_: string, formData: FormData) {
  try {
    await prisma.part.create({
      data: {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
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
