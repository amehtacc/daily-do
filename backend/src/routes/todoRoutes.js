import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { createTodoSchema, updateTodoSchema } from '../validations/todo.schema.js';
import { getTodosController, createTodoController, updateTodoController, deleteTodoController } from '../controllers/todoController.js';

const router = express.Router()

router.get('/', authMiddleware, getTodosController)
router.post('/', authMiddleware, validateSchema(createTodoSchema), createTodoController)
router.put('/:id', authMiddleware, validateSchema(updateTodoSchema), updateTodoController)
router.delete('/:id', authMiddleware, deleteTodoController)

export default router