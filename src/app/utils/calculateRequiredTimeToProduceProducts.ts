type CalculatedProduct = {
  operations: Array<{
    sequence: number;
    time: number;
  }>;
  id: string;
  quantity: number;
};

export function calculateRequiredTimeToProduceProducts(
  products: CalculatedProduct[]
): number {
  return products.reduce((acc, product) => {
    return (
      acc +
      product.operations.reduce((acc, { time }) => acc + time, 0) *
        product.quantity
    );
  }, 0);
}
