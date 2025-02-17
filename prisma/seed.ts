import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialParts: Prisma.PartCreateInput[] = [
  {
    id: "part1",
    name: "Part 1",
    price: 10.0,
  },
  {
    id: "part2",
    name: "Part 2",
    price: 20.0,
  },
  {
    id: "part3",
    name: "Part 3",
    price: 30.0,
  },
  {
    id: "part4",
    name: "Part 4",
    price: 40.0,
  },
];

const initialProducts: Prisma.ProductCreateInput[] = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    price: 100.0,
    id: "product1",
    parts: {
      create: [
        {
          part: { connect: { id: "part1" } },
          quantity: 2,
        },
        {
          part: { connect: { id: "part2" } },
          quantity: 3,
        },
      ],
    },
  },
  {
    name: "Product 2",
    id: "product2",
    description: "Description for Product 2",
    price: 200.0,
    parts: {
      create: [
        {
          part: { connect: { id: "part3" } },
          quantity: 1,
        },
        {
          part: { connect: { id: "part4" } },
          quantity: 4,
        },
      ],
    },
  },
];

const initialOperations: Prisma.OperationCreateInput[] = [
  {
    id: "operation1",
    name: "Operation 1",
    time: 10,
  },
  {
    id: "operation2",
    name: "Operation 2",
    time: 20,
  },
];

const initialOrders: Prisma.OrderCreateInput[] = [
  {
    dueDate: new Date(),
    id: "order1",
    products: {
      create: [
        { productId: "product1", quantity: 2 },
        { productId: "product2", quantity: 1 },
      ],
    },
  },
  {
    id: "order2",
    dueDate: new Date(),
    products: {
      create: [{ productId: "product2", quantity: 3 }],
    },
  },
];

const initialProductOperations: Prisma.ProductOperationCreateInput[] = [
  {
    product: { connect: { id: "product1" } },
    operation: { connect: { id: "operation1" } },
    sequence: 1,
  },
  {
    product: { connect: { id: "product1" } },
    operation: { connect: { id: "operation2" } },
    sequence: 2,
  },
  {
    product: { connect: { id: "product2" } },
    operation: { connect: { id: "operation1" } },
    sequence: 1,
  },
];

const initialStorage: Prisma.StorageCreateInput[] = [
  {
    id: "storage1",
    name: "Storage 1",
    products: {
      connectOrCreate: [
        {
          where: { id: "product1" },
          create: {
            product: {
              connectOrCreate: {
                where: { id: "product1" },
                create: {
                  id: "product1",
                  name: "Product 1",
                  description: "Description for Product 1",
                  price: 100.0,
                },
              },
            },
            quantity: 10,
          },
        },
        {
          where: { id: "product2" },
          create: {
            product: {
              connectOrCreate: {
                where: { id: "product2" },
                create: {
                  id: "product2",
                  name: "Product 2",
                  description: "Description for Product 2",
                  price: 200.0,
                },
              },
            },
            quantity: 5,
          },
        },
      ],
    },
  },
];

async function main() {
  for (const part of initialParts) {
    await prisma.part.create({ data: part });
  }
  for (const product of initialProducts) {
    await prisma.product.create({ data: product });
  }
  for (const operation of initialOperations) {
    await prisma.operation.create({ data: operation });
  }
  for (const order of initialOrders) {
    await prisma.order.create({ data: order });
  }
  for (const productOperation of initialProductOperations) {
    await prisma.productOperation.create({ data: productOperation });
  }
  for (const storage of initialStorage) {
    await prisma.storage.create({ data: storage });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
