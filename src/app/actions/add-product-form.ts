"use server";
import prisma from "@/lib/db";
import { ZodError } from "zod";
import type { MapppedPart } from "../products/utils/convertPartsToArray";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";
import { Prisma } from "@prisma/client";

export async function addProduct(
  operations: Array<{
    operation: Prisma.OperationGetPayload<null>;
    parts: MapppedPart[];
  }>,
  _: string,
  formData: FormData,
) {
  try {
    const parts = operations.flatMap((op) => op.parts);
    const uniqueParts = parts.reduce((acc, curr) => {
      const existing = acc.get(curr.id);
      if (existing) {
        acc.set(curr.id, {
          ...existing,
          quantity: existing.quantity + curr.quantity,
        });
      } else {
        acc.set(curr.id, curr);
      }
      return acc;
    }, new Map<string, MapppedPart>());

    const { name, price } = Object.fromEntries(formData);

    const product: Prisma.ProductCreateInput = {
      name: name as string,
      price: Number(price),
      parts: {
        create: Array.from(uniqueParts.values()).map((part) => ({
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
      ProductOperation: {
        create: operations.map((operation, idx) => ({
          operation: {
            connectOrCreate: {
              where: { id: operation.operation.id },
              create: {
                id: operation.operation.id,
                time: operation.operation.time,
                name: operation.operation.name,
              },
            },
          },
          sequence: idx + 1,
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
