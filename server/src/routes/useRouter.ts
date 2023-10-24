import { Express } from "express";
import { createTodo, getTodos, updateTodo } from "../handler/todoHandler.js";
import { authHandler } from "../middleware/auth.js";
import { login, logout, register } from "../handler/userHandler.js";

export const useRouter = (server: Express): Express => {
  server
    .get("/todo", authHandler, getTodos)
    .post("/todo", authHandler, createTodo)
    .put("/todo/{id}", authHandler, updateTodo);

  server
    .post("/register", register)
    .post("/login", login)
    .post("/logout", authHandler, logout);

  return server;
};
