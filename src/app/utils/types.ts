export type Location = "A1" | "A2" | "B1";

export type Delivery = {
  id: string;
  items: Item[];
  name: string;
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
