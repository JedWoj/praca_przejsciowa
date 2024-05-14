"use server";
import { redirect } from "next/navigation";
import type { Delivery } from "../utils/types";
import { removeDataFromDB, writeDataToDB } from "./db-actions";

export const addDelivery = async (delivery: Delivery) => {
  const id = crypto.randomUUID();
  writeDataToDB(`/deliveries/${id}`, { ...delivery, id });
};

export const removeDelivery = async (path: string) => {
  removeDataFromDB(path);
  redirect("/delivery");
};
