import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Singleton PrismaClient (important for dev/watch)
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined");
}

// Prisma v7 peut fonctionner en mode "driver adapters" (engineType=client).
// Dans ce mode, il faut fournir un `adapter` au constructeur.
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
	adapter,
	errorFormat: "pretty",
});

export type PrismaUser = Awaited<ReturnType<typeof prisma.user.findFirst>>;
