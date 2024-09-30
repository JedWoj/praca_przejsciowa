import type { Product } from "./models/Product";
import { getDataFromDB } from "../utils/getDataFromDB";

export const getProduct = async (id: string): Promise<Product> => {
  const data = await getDataFromDB(`/products/${id}`);
  return data.exportVal();
};
