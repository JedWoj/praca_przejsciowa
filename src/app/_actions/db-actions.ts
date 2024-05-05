"use server";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

import { get, getDatabase, onValue, ref, set, remove } from "firebase/database";
import type { Item } from "../utils/types";
import { initializeApp } from "firebase/app";

export const writeDataToDB = (path: string, item: Item) => {
  const db = getDatabase();
  const reference = ref(db, path);
  set(reference, item);
};

export const removeDataFromDB = async (path: string) => {
  const db = getDatabase();
  const reference = ref(db, path);
  await remove(reference);
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
