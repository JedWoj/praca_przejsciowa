"use server";
import { writeDataToDB } from "./db-actions";
import { ProductSchema } from "../api/products/models/Product";
import { ZodError } from "zod";
import type { MapppedPart } from "../products/utils/convertPartsToArray";

export async function addProduct(
  parts: Map<string, MapppedPart & { quantity: number }>,
  _: string,
  formData: FormData,
) {
  try {
    const id = crypto.randomUUID();

    if (!parts.size) {
      throw new Error("Product must have at least one part!");
    }

    const product = ProductSchema.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      parts: Object.fromEntries(parts),
      id,
    });

    writeDataToDB(`products/${id}`, product);

    return "Product added successfully!";
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return (error as { message: string }).message ?? "An error occurred!";
  }
}
