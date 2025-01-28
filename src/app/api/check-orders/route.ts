import { NextResponse } from "next/server";

import { calculateMissingMaterialsinStorage } from "@/app/utils/calculateMissingMaterialsInStorage";
import { calculateRequiredMaterialsFromMappedOrders } from "@/app/utils/calculateRequiredMaterialsFromMappedOrders";
import { calculateRequiredMaterialsFromOrder } from "@/app/utils/calculateRequiredMaterialsFromOrder";
import { calculateRequiredTimeToProduceProducts } from "@/app/utils/calculateRequiredTimeToProduceProducts";
import { filterMappedOrdersToBeHandled } from "@/app/utils/filterMappedOrdersToBeHandled";
import prisma from "@/lib/db";
import { filterMappedOrdersToOrderMaterials } from "@/app/utils/filterMappedOrdersToOrderMaterials";
import { calculateAllProductsInOrder } from "@/app/utils/calculateAllProductsInOrder";
import { getFinishedOrders } from "@/app/utils/getFinishedOrders";

type OrderStatus =
  | "IDLE"
  | "ORDERED"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";

export type MappedOrders = Array<{
  products: Array<{
    id: string;
    requiredTime: number;
    requiredMaterials: Array<{
      id: string;
      value?: number;
    }>;
    dueDate: Date;
    quantity: number;
  }>;
  id: string;
  dueDate: Date;
  status: OrderStatus;
}>;

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: {
        not: "COMPLETED",
      },
    },
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
        id: product.product.id,
        quantity: product.quantity,
        operations: product.product.ProductOperation.map((op) => ({
          time: op.operation.time,
          sequence: op.sequence,
        })),
      };
      const requiredTime = calculateRequiredTimeToProduceProducts([products]);
      const requiredMaterials = calculateRequiredMaterialsFromOrder([order]);
      return {
        id: product.product.id,
        requiredTime,
        requiredMaterials,
        dueDate: order.dueDate,
        quantity: product.quantity,
      };
    });

    return {
      products,
      id: order.id,
      totalRequiredTime: products.reduce(
        (acc, product) => acc + product.requiredTime,
        0
      ),
      dueDate: order.dueDate,
      status: order.status,
    };
  });

  const ordersToOrderMaterials = filterMappedOrdersToOrderMaterials(
    mappedOrders.filter((order) => order.status === "IDLE")
  );

  await prisma.order.updateMany({
    where: {
      id: {
        in: ordersToOrderMaterials.map((it) => it.id),
      },
    },
    data: {
      status: "ORDERED",
    },
  });

  const requiredMaterials = calculateRequiredMaterialsFromMappedOrders(
    ordersToOrderMaterials
  );

  const currentStorage = await prisma.storage.findMany({
    where: {
      parts: {
        some: {
          id: {
            in: requiredMaterials.map((it) => it.id),
          },
        },
      },
    },
    include: { parts: true },
  });

  const missingMaterials = calculateMissingMaterialsinStorage(
    requiredMaterials,
    currentStorage
  );

  for (const material of missingMaterials) {
    await prisma.storagePart.upsert({
      where: {
        storageId_partId: {
          storageId: "storage1",
          partId: material.id,
        },
      },
      update: {
        quantity: {
          increment: material.value ?? 0,
        },
      },
      create: {
        storageId: "storage1",
        partId: material.id,
        quantity: material.value ?? 0,
      },
    });
  }

  const ordersWithOrderedParts = await prisma.order.findMany({
    where: {
      status: "ORDERED",
    },
  });

  const ordersToBeProcessed = filterMappedOrdersToBeHandled(
    mappedOrders.filter((order) =>
      ordersWithOrderedParts.some((it) => it.id === order.id)
    )
  );

  await prisma.order.updateMany({
    where: {
      id: {
        in: ordersToBeProcessed.map((it) => it.id),
      },
    },
    data: {
      status: "PROCESSING",
    },
  });

  const processedMaterials =
    calculateRequiredMaterialsFromMappedOrders(ordersToBeProcessed);

  for (const material of processedMaterials) {
    await prisma.storagePart.updateMany({
      where: {
        storageId: "storage1",
        partId: material.id,
      },
      data: {
        quantity: {
          decrement: material.value ?? 0,
        },
      },
    });
  }

  const producedProducts = calculateAllProductsInOrder(ordersToBeProcessed);

  for (const product of producedProducts) {
    await prisma.storageProduct.upsert({
      where: {
        storageId_productId: {
          storageId: "storage1",
          productId: product.id,
        },
      },
      update: {
        quantity: {
          increment: product.value,
        },
      },
      create: {
        storageId: "storage1",
        productId: product.id,
        quantity: product.value ?? 0,
      },
    });
  }

  const finishedOrders = getFinishedOrders(mappedOrders);

  await prisma.order.updateMany({
    where: {
      id: {
        in: finishedOrders.map((it) => it.id),
      },
    },
    data: {
      status: "COMPLETED",
    },
  });

  const productsInFinishedOrders = calculateAllProductsInOrder(finishedOrders);

  for (const product of productsInFinishedOrders) {
    await prisma.storageProduct.updateMany({
      where: {
        storageId: "storage1",
        productId: product.id,
      },
      data: {
        quantity: {
          decrement: product.value ?? 0,
        },
      },
    });
  }

  return NextResponse.json({ mappedOrders });
}
