import { NextResponse } from "next/server";
import { calculateRequiredMaterialsFromOrder } from "@/app/utils/calculateRequiredMaterialsFromOrder";
import { calculateRequiredTimeToProduceProducts } from "@/app/utils/calculateRequiredTimeToProduceProducts";
import { calculateRequiredMaterialsFromMappedOrders } from "@/app/utils/calculateRequiredMaterialsFromMappedOrders";
import prisma from "@/lib/db";

export type MappedOrders = Array<{
  products: Array<{
    id: string;
    requiredTime: number;
    requiredMaterials: Array<{
      id: string;
      value?: number;
    }>;
    dueDate: Date;
  }>;
  id: string;
  dueDate: Date;
}>;

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      products: {
        include: {
          product: {
            include: {
              parts: { include: { part: true } },
              ProductOperation: { include: { operation: true } },
            },
          },
        },
      },
    },
  });

  const mappedOrders: MappedOrders = orders.map((order) => {
    const products = order.products.map((product) => {
      const products = {
        id: product.id,
        quantity: product.quantity,
        operations: product.product.ProductOperation.map((op) => ({
          time: op.operation.time,
          sequence: op.sequence,
        })),
      };
      const requiredTime = calculateRequiredTimeToProduceProducts([products]);
      const requiredMaterials = calculateRequiredMaterialsFromOrder([order]);
      return {
        id: product.id,
        requiredTime,
        requiredMaterials,
        dueDate: order.dueDate,
      };
    });

    return {
      products,
      id: order.id,
      totalRequiredTime: products.reduce(
        (acc, product) => acc + product.requiredTime,
        0,
      ),
      dueDate: order.dueDate,
    };
  });

  const requiredMaterials =
    calculateRequiredMaterialsFromMappedOrders(mappedOrders);

  console.log(requiredMaterials);

  return NextResponse.json({ mappedOrders });
}
