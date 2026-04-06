import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todo.service.js";

export async function getTodosController(req, res) {
  const userId = req.user.id;

  try {
    const todos = await getAllTodos(userId);

    res.status(200).send({
      message: "Todos fetched successfully",
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

export async function createTodoController(req, res) {
  const userId = req.user.id;

  const { title, completed } = req.body;

  try {
    const todo = await createTodo(userId, title, completed);

    return res.status(201).send({
      message: "Todo created successfully",
      success: true,
      todo,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

export async function updateTodoController(req, res) {
  const userId = req.user.id;
  const todoId = parseInt(req.params.id);

  const { title, completed } = req.body;

  if (isNaN(todoId)) {
    return res.status(400).send({
      message: "Invalid todo id",
      success: false,
    });
  }

  try {
    const updatedTodo = await updateTodo(userId, todoId, title, completed);

    if (updatedTodo.count === 0) {
      return res.status(404).send({
        message: "Todo not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Todo updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}

export async function deleteTodoController(req, res) {
  const userId = req.user.id;
  const todoId = parseInt(req.params.id);

  if (isNaN(todoId)) {
    return res.status(400).send({
      message: "Invalid todo id",
      success: false,
    });
  }

  try {
    const deletedTodo = await deleteTodo(userId, todoId);

    if (deletedTodo.count === 0) {
      return res.status(404).send({
        message: "Todo not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Todo deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
}
