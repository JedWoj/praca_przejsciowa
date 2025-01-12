import { filterMappedOrdersToOrderMaterials } from "./filterMappedOrdersToOrderMaterials";
import type { MappedOrders } from "../api/check-orders/route";
import { describe, expect, it } from "vitest";

describe("filterMappedOrdersToOrderMaterials", () => {
  it("should filter orders where parts need to be delivered one day before production start", () => {
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    const orders: MappedOrders = [
      {
        dueDate: new Date(now.getTime() + 4 * oneDayInMilliseconds),
        products: [
          {
            id: "product1",
            requiredMaterials: [],
            requiredTime: 24 * 60 * 60, // 1 day in seconds
            dueDate: new Date(now.getTime() + 4 * oneDayInMilliseconds),
            quantity: 1,
          },
        ],
        id: "order1",
        status: "IDLE",
      },
      {
        dueDate: new Date(now.getTime() + 2 * oneDayInMilliseconds),
        products: [
          {
            id: "product2",
            requiredMaterials: [],
            requiredTime: 24 * 60 * 60, // 1 day in seconds
            dueDate: new Date(now.getTime() + 2 * oneDayInMilliseconds),
            quantity: 1,
          },
        ],
        id: "order2",
        status: "IDLE",
      },
      {
        dueDate: new Date(now.getTime() + 4 * oneDayInMilliseconds),
        products: [
          {
            id: "product3",
            requiredMaterials: [],
            requiredTime: 48 * 60 * 60,
            dueDate: new Date(now.getTime() + 4 * oneDayInMilliseconds),
            quantity: 1,
          },
        ],
        id: "order3",
        status: "IDLE",
      },
    ];

    const result = filterMappedOrdersToOrderMaterials(orders);

    expect(result).toHaveLength(2);
    expect(result).toEqual([orders[1], orders[2]]);
  });

  it("should not include orders where parts delivery time is in the future", () => {
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    const orders: MappedOrders = [
      {
        dueDate: new Date(now.getTime() + 5 * oneDayInMilliseconds),
        products: [
          {
            id: "product4",
            requiredMaterials: [],
            requiredTime: 24 * 60 * 60,
            dueDate: new Date(now.getTime() + 5 * oneDayInMilliseconds),
            quantity: 1,
          },
        ],
        id: "order4",
        status: "IDLE",
      },
    ];

    const result = filterMappedOrdersToOrderMaterials(orders);

    expect(result).toHaveLength(0);
  });

  it("should include orders where due date is in the past", () => {
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    const orders: MappedOrders = [
      {
        dueDate: new Date(now.getTime() - oneDayInMilliseconds),
        products: [
          {
            id: "product5",
            requiredMaterials: [],
            requiredTime: 24 * 60 * 60,
            dueDate: new Date(now.getTime() - oneDayInMilliseconds),
            quantity: 1,
          },
        ],
        id: "order5",
        status: "IDLE",
      },
    ];

    const result = filterMappedOrdersToOrderMaterials(orders);

    expect(result).toHaveLength(1);
    expect(result).toEqual([orders[0]]);
  });
});
