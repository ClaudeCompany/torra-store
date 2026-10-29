import { PrismaClient } from "@prisma/client";

// Singleton: em dev o hot-reload do Next recria modulos e abriria varias
// conexoes sem isto.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
