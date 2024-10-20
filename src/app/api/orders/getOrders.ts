import { getDataFromDB } from "@/app/actions/db-actions";
import type { Order } from "./models/Order";

export async function getOrders(): Promise<Record<string, Order>> {
  const data = await getDataFromDB("/orders");
  return await data.val();
}
