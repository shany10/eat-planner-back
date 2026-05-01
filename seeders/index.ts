import "dotenv/config";
import { userSeeder } from "./userSeeder";
import { prisma } from "../src/db/prisma";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not defined in environment variables.");
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;

async function clearDatabase() {
  console.log("\n🗑️  Clearing existing data...");

  await prisma.user.deleteMany({});
  
  console.log("✅ Database cleared\n");
}

async function seedDatabase() {
  try {
    console.log("🚀 Starting database seeding...\n");

    console.log(`📡 Using PostgreSQL (Prisma): ${DATABASE_URL}`);

    await clearDatabase();
    
    const users = await userSeeder();

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Users: ${users.length}`); 
    console.log("\n👤 Test accounts:");
    console.log("   Admin: admin@gym.com / Admin123!");
    console.log("   Manager: jean.manager@gym.com / Manager123!");
    

  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("\n📡 Disconnected from PostgreSQL");
    process.exit(0);
  }
}

seedDatabase();