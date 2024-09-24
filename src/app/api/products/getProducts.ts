import { getDataFromDB } from "@/app/actions/db-actions";
import type { Products } from "@/app/products/types";

export const getProducts = async (): Promise<Products> => {
  const data = await getDataFromDB("/products");
  return data.exportVal();
};
