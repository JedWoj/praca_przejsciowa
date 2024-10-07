import { getDataFromDB } from "../utils/getDataFromDB";

export async function getOrders() {
  return getDataFromDB("/orders");
}
