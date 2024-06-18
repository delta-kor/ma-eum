import { PrismaClient } from '@prisma/client';
import 'server-only';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      $allOperations: ({ args, model, operation, query }) => {
        // console.log(`Query: ${model}.${operation}`, args);
        return query(args);
      },
    },
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
