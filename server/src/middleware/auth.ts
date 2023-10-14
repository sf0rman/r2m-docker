import { RequestHandler } from "express";

export const authHandler: RequestHandler = (req, res, next) => {
  console.log("Hit AuthHandler");
  next();
};
