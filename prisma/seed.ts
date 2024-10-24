import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialProducts: Prisma.ProductCreateInput[] = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    price: 100.0,
    id: "product1",
    parts: {
      create: [
        {
          part: {
            connectOrCreate: {
              where: { id: "part1" },
              create: {
                id: "part1",
                name: "Part 1",
                description: "Description for Part 1",
                price: 10.0,
              },
            },
          },
          quantity: 2,
        },
        {
          part: {
            connectOrCreate: {
              where: { id: "part2" },
              create: {
                id: "part2",
                name: "Part 2",
                description: "Description for Part 2",
                price: 20.0,
              },
            },
          },
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
          part: {
            connectOrCreate: {
              where: { id: "part3" },
              create: {
                id: "part3",
                name: "Part 3",
                description: "Description for Part 3",
                price: 30.0,
              },
            },
          },
          quantity: 1,
        },
        {
          part: {
            connectOrCreate: {
              where: { id: "part4" },
              create: {
                id: "part4",
                name: "Part 4",
                description: "Description for Part 4",
                price: 40.0,
              },
            },
          },
          quantity: 4,
        },
      ],
    },
  },
];

const initialOrders: Prisma.OrderCreateInput[] = [
  {
    id: "order1",
    products: {
      create: [
        { product: { connect: { id: "product1" } } },
        { product: { connect: { id: "product2" } } },
      ],
    },
  },
  {
    id: "order2",
    products: {
      create: [{ product: { connect: { id: "product2" } } }],
    },
  },
];

async function main() {
  for (const product of initialProducts) {
    await prisma.product.create({ data: product });
  }
  for (const order of initialOrders) {
    await prisma.order.create({ data: order });
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
