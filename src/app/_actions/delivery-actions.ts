"use server";
import type { Delivery } from "../utils/types";
import { writeDataToDB } from "./db-actions";

export const addDelivery = async (delivery: Delivery) => {
  const id = crypto.randomUUID();
  writeDataToDB(`/deliveries/${id}`, { ...delivery, id });
};
