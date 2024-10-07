import { getDataFromDB } from "../utils/getDataFromDB";
import { Order } from "./models/Order";

export async function getOrders(): Promise<Record<string, Order>> {
  const data = await getDataFromDB("/orders");
  return await data.val();
}
