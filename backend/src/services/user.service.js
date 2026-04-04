import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(name, email, password) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}
