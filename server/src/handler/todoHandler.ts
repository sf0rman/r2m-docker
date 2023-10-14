import { RequestHandler } from "express";

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).send("It works");
};
export const createTodo: RequestHandler = (req, res, next) => {
  res.status(200).send("It works");
};
export const updateTodo: RequestHandler = (req, res, next) => {
  res.status(200).send("It works");
};
