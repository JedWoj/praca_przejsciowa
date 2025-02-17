import { PartCreateInputSchema } from "@/models/Part/PartCreateInput";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma.$extends({
  query: {
    part: {
      create({ args, query }) {
        args.data = PartCreateInputSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
