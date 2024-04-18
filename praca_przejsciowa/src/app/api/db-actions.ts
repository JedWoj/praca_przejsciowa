import { get, getDatabase, onValue, ref, set } from "firebase/database";
import type { Item } from "../utils/types";

export const writeDataToDB = (path: string, item: Item) => {
  const db = getDatabase();
  //   const reference = ref(db, "items/" + item.id);
  const reference = ref(db, path);
  set(reference, item);
};

export const subscribeDataFromDB = <T>(
  path: string,
  onChange: (data: T) => void
) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);

  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val() as T;
    onChange(data);
  });
};

export const getDataFromDB = async (path: string) => {
  const db = getDatabase();
  const userDataRef = ref(db, path);
  return await get(userDataRef);
};
