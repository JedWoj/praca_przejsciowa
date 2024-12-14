export type Location = "A1" | "A2" | "B1";

export type Delivery = {
  id: string;
  items: ItemForDelivery[];
  name: string;
};

export type ItemForDelivery = Omit<
  StorageItem,
  "location" | "lastOrder" | "optimalStock"
> & {
  orderSize: number;
  location: Location | null;
};

export type StorageItem = {
  name: string;
  id: string;
  type: "product" | "part";
  quantity: number;
  price: number;
  updatedAt: Date;
  createdAt: Date;
};

export type Storage = {
  capacity: number;
  name: string;
};

export type DynamicPageProps<T extends Record<string, unknown>> = {
  params: Promise<T>;
};
