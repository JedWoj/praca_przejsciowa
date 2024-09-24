"use server";
import { initializeApp } from "firebase/app";
import {
  get,
  getDatabase,
  onValue,
  ref,
  set,
  remove,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

initializeApp(firebaseConfig);

export const writeDataToDB = <TItem>(path: string, item: TItem) => {
  const db = getDatabase();
  const reference = ref(db, path);
  set(reference, item);
};

export const removeDataFromDB = async (path: string) => {
  const db = getDatabase();
  const reference = ref(db, path);
  await remove(reference);
};

export const removeMultipleRecordsFromDB = async (paths: string[]) => {
  const db = getDatabase();
  const updates = {} as Record<string, null>;
  paths.forEach((path) => (updates[path] = null));

  return update(ref(db), updates);
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

export const updateDataToDB = async <TValue>(path: string, value: TValue) => {
  const db = getDatabase();

  const updates = { [path]: value };

  return update(ref(db), updates);
};
