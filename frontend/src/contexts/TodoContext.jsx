import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
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
        throw error.response;
      } finally {
        setLoadingTodos(false);
      }
    }

    handleGetTodos();
  }, []);

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
      throw error.response;
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
      throw error.response;
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
      throw error.response;
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        loadingTodos,
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
