import { getProduct } from "./getProduct";
import { getProducts } from "./getProducts";

export const products = {
  get_all: getProducts,
  get: getProduct,
};
