"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { PartSchema } from "../api/parts/models/Part";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function addPart(_: string, formData: FormData) {
  try {
    const id = crypto.randomUUID();

    const part = PartSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
    });

    await prisma.part.create({
      data: {
        id,
        name: part.name,
        price: Number(part.price),
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
