export type Location = "A1" | "A2" | "B1";

export type Item = {
  name: string;
  currentStock: number;
  price: number;
  lastOrder: string;
  location: Location;
  optimalStock: number;
  id: string;
};
