"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import type { MapppedPart } from "../products/utils/convertPartsToArray";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";
import { Prisma } from "@prisma/client";

export async function addProduct(
  parts: Map<string, MapppedPart>,
  _: string,
  formData: FormData,
) {
  try {
    const product: Prisma.ProductCreateInput = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      parts: {
        create: Array.from(parts.values()).map((part) => ({
          part: {
            connectOrCreate: {
              where: { id: part.id },
              create: {
                id: part.id,
                name: part.name,
                price: part.price,
              },
            },
          },
          quantity: part.quantity,
        })),
      },
    };

    await prisma.product.create({ data: product });

    return SUCCESS_MESSAGES.product;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.map((err) => err.message).join("\n");
    }

    console.error(error);
    return DEFAULT_ERROR_MESSAGE;
  }
}
