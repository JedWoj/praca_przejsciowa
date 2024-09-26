"use server";
import { writeDataToDB } from "./db-actions";
import { ProductSchema } from "../api/products/models/Product";
import { ZodError } from "zod";
import type { MapppedPart } from "../products/utils/convertPartsToArray";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./messages";

export async function addProduct(
  parts: Map<string, MapppedPart & { quantity: number }>,
  _: string,
  formData: FormData,
) {
  try {
    const id = crypto.randomUUID();

    const product = ProductSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      parts: Object.fromEntries(parts),
      id,
    });

    await writeDataToDB(`products/${id}`, product);

    return SUCCESS_MESSAGES.product;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}
