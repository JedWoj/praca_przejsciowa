import { getDataFromDB } from "../utils/getDataFromDB";
import type { Order } from "./models/Order";

export async function getOrder(id: string): Promise<Order> {
  const data = await getDataFromDB(`/orders/${id}`);
  return await data.val();
}
