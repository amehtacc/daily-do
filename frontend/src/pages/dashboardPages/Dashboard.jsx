import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useTodo } from "../../contexts/TodoContext";
import { toast } from "react-toastify";

function Dashboard() {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { todos, loadingTodos, handleCreateTodo } = useTodo();

  console.log(todos);

  async function handleAddTodo() {
    if (!todo.trim()) {
      return toast.error("Todo title required!");
    }

    try {
      setLoading(true);
      const res = await handleCreateTodo(todo);

      if (res?.success) {
        toast.success(res?.message || "Todo created successfully");
      }
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    } finally {
      setTodo("");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <p className="text-gray-500">
          {">"} <span className="underline">Dashboard</span>
        </p>
        <h2 className="text-4xl font-bold mt-2 px-3">
          Hello, {user?.name}! <span className="animate-pulse">👋</span>
        </h2>
      </div>

      <div className="w-full flex items-start justify-center gap-10 mt-16">
        <div className="w-[60%] flex flex-col gap-3">
          <p className="text-2xl text-gray-700 font-bold px-3">Today's Tasks</p>

          <div className="w-full bg-black/7 p-5 rounded-xl flex flex-col items-start justify-start gap-5">
            {todos?.length < 1 ? (
              <div className="w-full flex items-center justify-center text-gray-400">
                No tasks available!
              </div>
            ) : (
              todos?.slice(0, 7).map((todo) => (
                <div
                  key={todo.id}
                  className="w-full ring-2 ring-gray-300 px-3 py-2 rounded-md"
                >
                  {todo.title}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-3">
          <p className="text-2xl text-gray-700 font-bold px-3">Add Task</p>
          <div className="w-full bg-black/7 p-5 rounded-xl flex flex-col items-end justify-start gap-3">
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. My Task"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />

            <Button
              variant="primary"
              size="md"
              className="rounded-md max-w-full"
              onClick={handleAddTodo}
              disabled={loading}
            >
              + Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
