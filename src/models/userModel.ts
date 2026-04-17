import { Schema, model, Document } from "mongoose";
import argon2 from "argon2";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "member";
  active: boolean;
  created_at: Date;
  updated_at: Date;
  verifyPassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager", "member"], required: true },
  active: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  strict: true
});

userSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
});


userSchema.methods.verifyPassword = async function (candidate: string) {
  return argon2.verify(this.password, candidate);
};

export const UserModel = model<IUser>("User", userSchema);