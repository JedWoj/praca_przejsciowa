"use server";
import { get, getDatabase, onValue, ref, set, remove } from "firebase/database";
import type { Item } from "../utils/types";

export const writeDataToDB = (path: string, item: Item) => {
  const db = getDatabase();
  const reference = ref(db, path);
  set(reference, item);
};

export const removeDataFromDB = async (path: string) => {
  const db = getDatabase();
  const reference = ref(db, path);
  return await remove(reference);
};

export const subscribeDataFromDB = <TData>(
  path: string,
  onChange: (data: TData) => void
) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);

  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val() as TData;
    onChange(data);
  });
};

export const getDataFromDB = async (path: string) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);
  return await get(userDataRef);
};
