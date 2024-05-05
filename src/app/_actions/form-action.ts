"use server";
import type { Item } from "../utils/types";
import { writeDataToDB } from "./db-actions";

const validateItem = (formData: FormData) => {
  const price = formData.get("price");
  const name = formData.get("name") as string;
  const stock = formData.get("stock");
  const location = formData.get("location") as string;
  const severity = formData.get("severity") as "0" | "1" | "2" | "3";

  if (Number(price) < 0) {
    return "Price must be higher than 0!";
  }

  if (!name || !name.trim().length) {
    return "Name is required!";
  }

  if (Number(stock) < 0 || typeof stock === "undefined") {
    return "Minimal value of stock must be 0!";
  }

  if (!location || !location.trim().length) {
    return "Location is required!";
  }

  return { price, name, stock, location, severity };
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
    lastOrder: "2024-02-01",
    severity: Number(validation.severity) as Item["severity"],
  });

  return "Item added successfully!";
};
