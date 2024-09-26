import type { Products } from "@/app/products/types";
import { getDataFromDB } from "../utils/getDataFromDB";

export const getProducts = async (): Promise<Products> => {
  const data = await getDataFromDB("/products");
  return data.exportVal();
};
