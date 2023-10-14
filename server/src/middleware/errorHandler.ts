import { ErrorRequestHandler } from "express";

export class ForbiddenError extends Error {
  statusCode: 401;
}

export class AlreadyExistsError extends Error {
  context: string;
  statusCode = 403;
  constructor(message: string, context: string) {
    super(message);
    this.context = context;
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error", err.message);
  res.status(500).send("Internal Server Error");
};
