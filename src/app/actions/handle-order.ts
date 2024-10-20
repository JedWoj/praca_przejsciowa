"use server";
import { removeDataFromDB } from "./db-actions";
import { DEFAULT_ERROR_MESSAGE, SUCCESS_MESSAGES } from "./utils/messages";

export async function acceptOrder(id: string) {
  try {
    await removeDataFromDB(`/orders/${id}`);
    return SUCCESS_MESSAGES.acceptOrder;
  } catch (error) {
    return DEFAULT_ERROR_MESSAGE;
  }
}
