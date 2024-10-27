"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import type { MapppedPart } from "../products/utils/convertPartsToArray";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function addProduct(
  parts: Map<string, MapppedPart & { quantity: number }>,
  _: string,
  formData: FormData,
) {
  try {
    const id = crypto.randomUUID();

    console.log(parts);

    const product = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      parts: Object.fromEntries(parts),
      id,
    };

    await prisma.product.create({ data: product });

    return SUCCESS_MESSAGES.product;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    console.log(error);

    return DEFAULT_ERROR_MESSAGE;
  }
}
