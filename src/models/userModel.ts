import argon2 from "argon2";
import { prisma } from "../db/prisma";
import { UserPublic, UserRole, CreateUserInput } from "../type"

function toPublicUser(u: any): UserPublic {
  return {
    id: u.id,
    firstname: u.firstname,
    lastname: u.lastname,
    email: u.email,
    number: u.number,
    role: u.role,
    active: u.active,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export async function listUsers(): Promise<UserPublic[]> {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  return users.map(toPublicUser);
}

export async function getUserById(id: number): Promise<UserPublic | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  return user ? toPublicUser(user) : null;
}

export async function createUser(data: CreateUserInput
): Promise<UserPublic> {
  const hashedPassword = await argon2.hash(data.password);
  const user = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      number: data.number,
      password: hashedPassword,
    }
  });

  return toPublicUser(user);
}

export async function verifyUserPasswordByEmail(params: {
  email: string;
  password: string;
}): Promise<{ user: UserPublic; ok: true } | { ok: false }> {
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user) return { ok: false };
  if (!user.active) return { ok: false };

  const isValid = await argon2.verify(user.password, params.password);
  if (!isValid) return { ok: false };

  return { ok: true, user: toPublicUser(user) };
}

export async function toggleUserActive(id: number): Promise<UserPublic | null> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return null;

  const updated = await prisma.user.update({
    where: { id },
    data: { active: !user.active },
  });

  return toPublicUser(updated);
}