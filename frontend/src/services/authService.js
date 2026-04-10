import api from "./api.js";

export function signup(data) {
  return api.post("/auth/signup", data);
}

export function signin(data) {
  return api.post("/auth/signin", data);
}

export function logout() {
  return api.post("/auth/logout");
}

export function checkMe() {
  return api.get("/auth/me");
}
