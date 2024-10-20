import { getOrder } from "./getOrder";
import { getOrders } from "./getOrders";

export const orders = {
  get_all: getOrders,
  get: getOrder,
};
