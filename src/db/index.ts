import { PrismaClient } from "@prisma/client";
import {} from "dotenv/config";

declare const global: typeof globalThis & { prisma?: PrismaClient };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;