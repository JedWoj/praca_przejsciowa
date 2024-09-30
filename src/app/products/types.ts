type Part = {
  name: string;
  price: number;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  parts: {
    [id: string]: Part;
  };
};

export type Products = Record<string, Product>;
