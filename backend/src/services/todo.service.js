import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllTodos(userId) {
  try {
    return prisma.todo.findMany({
      where: { userId },
    });
  } catch (error) {
    throw error;
  }
}

export async function createTodo(userId, title, completed) {
  try {
    const data = {
      userId,
      title,
    };

    if (completed !== undefined) {
      data.completed = completed;
    }
    return prisma.todo.create({
      data,
    });
  } catch (error) {
    throw error;
  }
}

export async function updateTodo(userId, todoId, title, completed) {
  try {
    const data = {};

    if (title !== undefined) {
      data.title = title;
    }

    if (completed !== undefined) {
      data.completed = completed;
    }

    return prisma.todo.updateMany({
      where: { userId, id: todoId },
      data,
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTodo(userId, todoId) {
  try {
    return prisma.todo.deleteMany({
      where: { userId, id: todoId },
    });
  } catch (error) {
    throw error;
  }
}
