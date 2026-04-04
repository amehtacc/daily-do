import * as z from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: "At least one field is required to update",
  });
