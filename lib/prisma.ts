import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

/*
const prismaClientSingleton = () => {
  return new PrismaClient()
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
};

export const prisma = globalThis.prisma ?? prismaClientSingleton();


if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export const db = prisma;
*/