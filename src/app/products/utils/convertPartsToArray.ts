import type { Parts } from "@/app/api/parts/models/Parts";

export type MapppedPart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const convertPartsToArray = (parts: Parts): MapppedPart[] => {
  return Object.entries(parts).map(([key, value]) => {
    return {
      id: key,
      ...value,
    };
  });
};
