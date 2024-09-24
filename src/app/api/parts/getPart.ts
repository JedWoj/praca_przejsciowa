import { getDataFromDB } from "@/app/actions/db-actions";

export async function getPart(id: string) {
  const data = await getDataFromDB(`/parts/${id}`);
  return data.exportVal();
}
