"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";
import { revalidatePath } from "next/cache";

export async function changeItemsInStorage(
  itemIds: string[],
  _: string,
  formData: FormData
) {
  try {
    const quantity = parseInt(String(formData.get("quantity")));

    const storage = await prisma.storage.findUnique({
      where: { id: "storage1" },
      include: { products: true, parts: true },
    });

    if (!storage) {
      throw new Error("Storage not found");
    }

    const updatedProducts = storage.products
      .map((product) =>
        itemIds.includes(product.id) ? { ...product, quantity } : product
      )
      .map((product) => ({
        where: { id: product.id },
        data: { quantity: product.quantity },
      }));

    const updatedParts = storage.parts
      .map((part) => (itemIds.includes(part.id) ? { ...part, quantity } : part))
      .map((part) => ({
        where: { id: part.id },
        data: { quantity: part.quantity },
      }));

    await prisma.storage.update({
      where: { id: "storage1" },
      data: {
        products: {
          update: updatedProducts,
        },
        parts: {
          update: updatedParts,
        },
      },
    });

    revalidatePath("/api/storage");

    return SUCCESS_MESSAGES.changeItem;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
}

export const removeItemsFromStorage = async (itemIds: string[]) => {
  try {
    const storage = await prisma.storage.findUnique({
      where: { id: "storage1" },
      include: { products: true, parts: true },
    });

    if (!storage) {
      throw new Error("Storage not found");
    }

    const updatedProducts = storage.products
      .map((product) =>
        itemIds.includes(product.id) ? { ...product, quantity: 0 } : product
      )
      .map((product) => ({
        where: { id: product.id },
        data: { quantity: product.quantity },
      }));

    const updatedParts = storage.parts
      .map((product) =>
        itemIds.includes(product.id) ? { ...product, quantity: 0 } : product
      )
      .map((part) => ({
        where: { id: part.id },
        data: { quantity: part.quantity },
      }));

    await prisma.storage.update({
      where: { id: "storage1" },
      data: {
        products: {
          update: updatedProducts,
        },
        parts: {
          update: updatedParts,
        },
      },
    });

    revalidatePath("/api/storage");

    return SUCCESS_MESSAGES.removeItem;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    return DEFAULT_ERROR_MESSAGE;
  }
};
