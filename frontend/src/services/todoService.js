import api from "./api.js";

export function getTodos() {
  return api.get("/todos");
}

export function createTodo(data) {
  return api.post("/todos", data);
}

export function updateTodo(id, data) {
  return api.put(`/todos/${id}`, data);
}

export function deleteTodo(id) {
  return api.delete(`/todos/${id}`);
}
