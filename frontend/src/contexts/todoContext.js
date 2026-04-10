import { createContext, useContext, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  async function handleGetTodos() {
    try {
      setLoadingTodos(true);

      const res = await getTodos();

      setTodos(res.data.todos);

      return {
        message: res.data.message,
        success: res.data.success,
      };
    } catch (error) {
      return {
        message: error.response?.data?.message || "Error fetching todos",
        success: false,
      };
    } finally {
      setLoadingTodos(false);
    }
  }

  async function handleCreateTodo(title, completed) {
    if (!title.trim()) {
      return {
        message: "Title is required",
        success: false,
      };
    }

    const data = { title, completed };

    try {
      const res = await createTodo(data);

      setTodos((prev) => [res.data.todo, ...prev]);

      return {
        message: res.data.message,
        success: res.data.success,
        todo: res.data.todo,
      };
    } catch (error) {
      return {
        message: error.response?.data?.message || "Error creating todo",
        success: false,
      };
    }
  }

  async function handleUpdateTodo(id, title, completed) {
    const data = { title, completed };

    try {
      const res = await updateTodo(id, data);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...(title !== undefined && { title }),
                ...(completed !== undefined && { completed }),
              }
            : todo,
        ),
      );

      return {
        message: res.data.message,
        success: res.data.success,
      };
    } catch (error) {
      return {
        message: error.response?.data?.message || "Error updating todo",
        success: false,
      };
    }
  }

  async function handleDeleteTodo(id) {
    try {
      const res = await deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      return {
        message: res.data.message,
        success: res.data.success,
      };
    } catch (error) {
      return {
        message: error.response?.data?.message || "Error deleting todo",
        success: false,
      };
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        loadingTodos,
        handleGetTodos,
        handleCreateTodo,
        handleUpdateTodo,
        handleDeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
