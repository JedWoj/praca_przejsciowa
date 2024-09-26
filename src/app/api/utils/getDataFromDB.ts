import { get, getDatabase, ref } from "firebase/database";

export const getDataFromDB = async (path: string) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);
  return await get(userDataRef);
};
