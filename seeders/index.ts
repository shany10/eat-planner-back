import "dotenv/config";
import { connectMongoose, closeMongoose } from "../src/db/mangoose";
import { userSeeder } from "./userSeeder";
import { UserModel } from "../src/models";

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

const MONGO_URI = process.env.MONGODB_URI;

async function clearDatabase() {
  console.log("\n🗑️  Clearing existing data...");
  
  await UserModel.deleteMany({});
  
  console.log("✅ Database cleared\n");
}

async function seedDatabase() {
  try {
    console.log("🚀 Starting database seeding...\n");
    console.log(`📡 Connecting to MongoDB: ${MONGO_URI}`);
    
    await connectMongoose(MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    await clearDatabase();
    
    const users = await userSeeder();

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Users: ${users.length}`); 
    console.log("\n👤 Test accounts:");
    console.log("   Admin: admin@gym.com / Admin123!");
    console.log("   Manager: jean.manager@gym.com / Manager123!");
    console.log("   Member: marie.dupont@gym.com / Member123!");

  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await closeMongoose();
    console.log("\n📡 Disconnected from MongoDB");
    process.exit(0);
  }
}

seedDatabase();