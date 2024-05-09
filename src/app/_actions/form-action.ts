"use server";
import type { Item, Location } from "../utils/types";
import { writeDataToDB } from "./db-actions";
import { convertDate } from "../utils/convertDate";

const validateItem = (formData: FormData) => {
  const price = formData.get("price");
  const name = formData.get("item-name") as string;
  const stock = formData.get("stock");
  const location = formData.get("location") as string as Location;
  const optimalStock = formData.get("optimal-stock") as string;

  if (Number(price) < 0) {
    return "Price must be higher than 0!";
  }

  if (!name || !name.trim().length) {
    return "Name is required!";
  }

  if (
    Number(stock) < 0 ||
    typeof stock === "undefined" ||
    Number(optimalStock) < 0 ||
    typeof optimalStock === "undefined"
  ) {
    return "Minimal value of stock must be 0!";
  }

  if (!location || !location.trim().length) {
    return "Location is required!";
  }

  return { price, name, stock, location, optimalStock };
};

export const changeItem = async (item: Item, _: string, formData: FormData) => {
  const validation = validateItem(formData);

  if (typeof validation !== "object") {
    return validation;
  }

  writeDataToDB(`items/${item.id}`, {
    ...item,
    price: Number(validation.price),
    name: validation.name,
    currentStock: Number(validation.stock),
    location: validation.location,
    lastOrder: convertDate(new Date()),
  });

  return "Item changed successfully!";
};

export const addItem = async (_: string, formData: FormData) => {
  const validation = validateItem(formData);

  if (typeof validation !== "object") {
    return validation;
  }

  const itemId = crypto.randomUUID();

  writeDataToDB(`items/${itemId}`, {
    price: Number(validation.price),
    name: validation.name,
    currentStock: Number(validation.stock),
    location: validation.location,
    id: itemId,
    lastOrder: convertDate(new Date()),
    optimalStock: Number(validation.optimalStock),
  });

  return "Item added successfully!";
};

export const orderItem = async (item: Item, _: string, formData: FormData) => {
  const orderSize = formData.get("order-size") as string;

  if (Number(orderSize) <= 0) {
    return "Order must be higher than 0!";
  }

  writeDataToDB(`items/${item.id}`, {
    ...item,
    currentStock: Number(Number(orderSize) + item.currentStock),
    lastOrder: convertDate(new Date()),
  });

  return "Item ordered successfully!";
};
