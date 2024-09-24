import { getDataFromDB } from "@/app/actions/db-actions";
import { Parts } from "@/app/api/parts/models/Parts";

export const getParts = async (): Promise<Parts> => {
  const data = await getDataFromDB("/parts");
  return data.exportVal();
};
