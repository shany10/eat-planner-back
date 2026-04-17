import mongoose from "mongoose";

export async function connectMongoose(uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb") {
  await mongoose.connect(uri);
  return mongoose;
}

export async function closeMongoose() {
  await mongoose.disconnect();
}