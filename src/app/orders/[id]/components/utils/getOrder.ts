"use server";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/db";

export const getOrder = unstable_cache(async (id: string) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        select: {
          quantity: true,
          product: true,
        },
      },
    },
  });
});
