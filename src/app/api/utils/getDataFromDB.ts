import { firebaseConfig } from "@/app/utils/firebaseConfig";
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref } from "firebase/database";

initializeApp(firebaseConfig);

export const getDataFromDB = async (path: string) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);
  return await get(userDataRef);
};
