import { describe, it, expect } from "vitest";
import { calculateAllProductsInOrder } from "./calculateAllProductsInOrder";
import type { MappedOrders } from "../api/check-orders/route";

describe("calculateAllProductsInOrder", () => {
  it("should calculate the total quantity of each product in the orders", () => {
    const orders: MappedOrders = [
      {
        id: "order1",
        dueDate: new Date(),
        products: [
          {
            id: "product1",
            quantity: 2,
            requiredMaterials: [],
            requiredTime: 0,
            dueDate: new Date(),
          },
          {
            id: "product2",
            quantity: 3,
            requiredMaterials: [],
            requiredTime: 0,
            dueDate: new Date(),
          },
        ],
        status: "IDLE",
      },
      {
        id: "order2",
        dueDate: new Date(),
        products: [
          {
            id: "product1",
            quantity: 1,
            requiredMaterials: [],
            requiredTime: 0,
            dueDate: new Date(),
          },
          {
            id: "product3",
            quantity: 4,
            requiredMaterials: [],
            requiredTime: 0,
            dueDate: new Date(),
          },
        ],
        status: "IDLE",
      },
    ];

    const result = calculateAllProductsInOrder(orders);

    expect(result).toEqual([
      { id: "product1", value: 3 },
      { id: "product2", value: 3 },
      { id: "product3", value: 4 },
    ]);
  });

  it("should return an empty array if there are no products in the orders", () => {
    const orders: MappedOrders = [
      {
        id: "order1",
        dueDate: new Date(),
        products: [],
        status: "IDLE",
      },
    ];

    const result = calculateAllProductsInOrder(orders);

    expect(result).toEqual([]);
  });

  it("should handle orders with no products", () => {
    // ARRANGE
    const orders: MappedOrders = [
      {
        id: "order1",
        dueDate: new Date(),
        products: [],
        status: "IDLE",
      },
      {
        id: "order2",
        dueDate: new Date(),
        products: [
          {
            id: "product1",
            quantity: 1,
            requiredMaterials: [],
            requiredTime: 0,
            dueDate: new Date(),
          },
        ],
        status: "IDLE",
      },
    ];
    // ACT
    const result = calculateAllProductsInOrder(orders);
    // ASSERT
    expect(result).toEqual([{ id: "product1", value: 1 }]);
  });
});
