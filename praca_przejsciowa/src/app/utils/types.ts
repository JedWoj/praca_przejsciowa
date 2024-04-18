export type Item = {
  name: string;
  currentStock: number;
  price: number;
  lastOrder: string;
  location: string;
  severity: 0 | 1 | 2 | 3 | 4;
  id: number;
};
