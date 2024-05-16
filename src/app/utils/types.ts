export type Location = "A1" | "A2" | "B1";

export type Delivery = {
  id: string;
  items: ItemForDelivery[];
  name: string;
};

export type ItemForDelivery = Omit<
  Item,
  "location" | "lastOrder" | "optimalStock"
> & {
  orderSize: number;
  location: Location | null;
};

export type Item = {
  name: string;
  currentStock: number;
  price: number;
  lastOrder: string;
  location: Location;
  optimalStock: number;
  id: string;
};

export type Storage = {
  capacity: number;
  name: string;
};
